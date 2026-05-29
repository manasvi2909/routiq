const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const isLocal = process.env.DATABASE_URL && (process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1'));
const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: isLocal ? false : { rejectUnauthorized: false } })
  : new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'habit_tracker',
      password: process.env.DB_PASSWORD || 'postgres',
      port: process.env.DB_PORT || 5432,
    });

// Run live schema alterations immediately upon pool instantiation to support Vercel serverless
pool.query(`
  ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT NULL;
  ALTER TABLE garden_plants ADD COLUMN IF NOT EXISTS growth_cycle_number INTEGER DEFAULT 1;
  ALTER TABLE garden_plants ADD COLUMN IF NOT EXISTS growth_stage_reached INTEGER DEFAULT 0;
`).then(() => {
  console.log('Self-healing database migration completed successfully');
}).catch(err => {
  console.error('Asynchronous pool self-healing migration error:', err);
});

async function initDatabase() {
  console.log('Starting database initialization...');
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    console.log('Reading schema from:', schemaPath);
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schema);
    
    // Dynamically alter existing tables to add avatar column if missing
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT NULL;
      ALTER TABLE garden_plants ADD COLUMN IF NOT EXISTS growth_cycle_number INTEGER DEFAULT 1;
      ALTER TABLE garden_plants ADD COLUMN IF NOT EXISTS growth_stage_reached INTEGER DEFAULT 0;
    `);
    
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('CRITICAL: Database initialization failed:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

module.exports = { pool, initDatabase };

