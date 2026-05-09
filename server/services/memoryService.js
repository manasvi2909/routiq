const { GoogleGenerativeAI } = require('@google/generative-ai');
const { pool } = require('../database/init');
require('dotenv').config();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

/**
 * Service to manage stateful, retrieval-augmented semantic memories for the Oracle.
 */
class MemoryService {
  /**
   * Generates a 768 or 1536 dimension vector embedding for a piece of text using Gemini.
   */
  static async generateEmbedding(text) {
    if (!genAI) {
      console.warn('MemoryService: GEMINI_API_KEY not configured. Skipping embedding.');
      return null;
    }
    try {
      const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
      const result = await model.embedContent(text);
      return result.embedding.values; // Array of floats
    } catch (error) {
      console.error('Failed to generate embedding:', error.message);
      return null;
    }
  }

  /**
   * Saves a new semantic memory in the database.
   */
  static async saveMemory(userId, content, category = 'dialogue') {
    try {
      const embedding = await this.generateEmbedding(content);
      await pool.query(
        `INSERT INTO oracle_memories (user_id, content, embedding, category)
         VALUES ($1, $2, $3, $4)`,
        [userId, content, embedding, category]
      );
      return true;
    } catch (error) {
      console.error('Failed to save memory:', error.message);
      return false;
    }
  }

  /**
   * Performs cosine similarity matching in JavaScript to return the most relevant memories.
   * This is extremely robust and avoids requiring local native C++ postgres extensions.
   */
  static async retrieveMemories(userId, queryText, limit = 3) {
    try {
      const queryEmbedding = await this.generateEmbedding(queryText);
      if (!queryEmbedding) return [];

      // Fetch all memories for the user
      const res = await pool.query(
        `SELECT id, content, embedding, category, created_at
         FROM oracle_memories
         WHERE user_id = $1 AND embedding IS NOT NULL`,
        [userId]
      );
      const memories = res.rows;
      if (memories.length === 0) return [];

      // Calculate cosine similarity for each memory
      const matchedMemories = memories.map(m => {
        const similarity = cosineSimilarity(queryEmbedding, m.embedding);
        return {
          content: m.content,
          category: m.category,
          similarity,
          createdAt: m.created_at
        };
      });

      // Sort by similarity descending and return top matches above a 0.45 threshold
      return matchedMemories
        .filter(m => m.similarity >= 0.45)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to retrieve memories:', error.message);
      return [];
    }
  }
}

/**
 * Computes Cosine Similarity between two numerical vectors.
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

module.exports = MemoryService;
