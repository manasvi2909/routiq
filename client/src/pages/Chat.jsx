import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import {
  Send, Sparkles, Loader2, MessageCircle, Leaf,
  Search, Sprout, Clock, Brain, AlertTriangle, Flame,
  TrendingDown, CalendarCheck, Moon, HeartPulse, Sunrise,
  ArrowRight, ChevronRight
} from 'lucide-react';
import './Chat.css';

/* ── Icon mapping for insight cards (server sends iconName strings) ── */
const ICON_MAP = {
  flame: Flame,
  'alert-triangle': AlertTriangle,
  brain: Brain,
  'calendar-check': CalendarCheck,
  moon: Moon,
  'trending-down': TrendingDown,
  'heart-pulse': HeartPulse,
  sprout: Sprout,
  leaf: Leaf,
  sunrise: Sunrise,
};

function PlantPersonIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Pot Gradient: 3D spherical shading */}
        <linearGradient id="potGrad" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#f0927a" />
          <stop offset="50%" stopColor="#e07a5f" />
          <stop offset="100%" stopColor="#b55238" />
        </linearGradient>
        
        {/* Pot Rim Gradient */}
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e27c62" />
          <stop offset="50%" stopColor="#d2694e" />
          <stop offset="100%" stopColor="#a84830" />
        </linearGradient>

        {/* Leaf 1 Gradient */}
        <linearGradient id="leafGradLeft" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>

        {/* Leaf 2 Gradient */}
        <linearGradient id="leafGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>

        {/* Flower Gradient */}
        <radialGradient id="flowerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
      </defs>

      {/* Tiny shadow underneath the pot */}
      <ellipse cx="50" cy="94" rx="22" ry="4" fill="#0f172a" opacity="0.15" />

      {/* 🌸 Cute Little Flower on head */}
      <circle cx="34" cy="28" r="6" fill="#fecdd3" />
      <circle cx="44" cy="22" r="6" fill="#fecdd3" />
      <circle cx="44" cy="34" r="6" fill="#fecdd3" />
      <circle cx="34" cy="38" r="6" fill="#fecdd3" />
      <circle cx="39" cy="30" r="4.5" fill="url(#flowerGrad)" />

      {/* 🌱 Lush green sprout leaves growing from head */}
      <path
        d="M 50 35 C 50 15, 68 12, 70 23 C 70 34, 50 35, 50 35 Z"
        fill="url(#leafGradRight)"
      />
      <path
        d="M 50 35 C 50 18, 35 15, 38 25 C 41 35, 50 35, 50 35 Z"
        fill="url(#leafGradLeft)"
      />

      {/* Tiny organic brown stem */}
      <path
        d="M 50 42 C 50 38, 48 35, 49 32"
        stroke="#713f12"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* 🪴 Terracotta pot body with 3D gradient */}
      <path
        d="M 28 50 L 72 50 L 66 85 C 65 89, 61 92, 57 92 L 43 92 C 39 92, 35 89, 34 85 Z"
        fill="url(#potGrad)"
      />
      {/* 3D Pot Rim */}
      <rect
        x="24"
        y="42"
        width="52"
        height="11"
        rx="5.5"
        fill="url(#rimGrad)"
      />

      {/* ✨ Tiny Gold Oracle Sparkle near head */}
      <path
        d="M 80 18 L 82 22 L 86 24 L 82 26 L 80 30 L 78 26 L 74 24 L 78 22 Z"
        fill="#eab308"
      />

      {/* ☺️ Soft Rosy Blushing Cheeks */}
      <circle cx="36" cy="69" r="5" fill="#f43f5e" opacity="0.35" />
      <circle cx="64" cy="69" r="5" fill="#f43f5e" opacity="0.35" />

      {/* 👀 Large, Shiny, Incredibly Cute Eyes (Alive Cartoon Eyes) */}
      {/* Left Eye */}
      <circle cx="40" cy="61" r="5" fill="#1e293b" />
      <circle cx="38" cy="59" r="1.8" fill="#ffffff" /> {/* Eye light reflection */}
      <circle cx="41.5" cy="62.5" r="0.8" fill="#ffffff" /> {/* Eye sub reflection */}

      {/* Right Eye */}
      <circle cx="60" cy="61" r="5" fill="#1e293b" />
      <circle cx="58" cy="59" r="1.8" fill="#ffffff" /> {/* Eye light reflection */}
      <circle cx="61.5" cy="62.5" r="0.8" fill="#ffffff" /> {/* Eye sub reflection */}

      {/* 👄 Cute smiling mouth */}
      <path
        d="M 47 71 Q 50 75 53 71"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cute little green leaf waving hand! */}
      <path
        d="M 70 66 C 76 66, 79 58, 80 54 C 81 50, 77 48, 75 51 C 73 54, 71 61, 70 63"
        fill="#4ade80"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getInsightIcon(iconName) {
  const Icon = ICON_MAP[iconName] || Sparkles;
  return <Icon size={20} />;
}

/* ── Suggested first prompts (icon-only, no emojis) ─────────────── */
const SUGGESTED_PROMPTS = [
  { label: 'Why do I lose consistency?', Icon: Search },
  { label: 'What habit complements my routine?', Icon: Sprout },
  { label: 'When am I most productive?', Icon: Clock },
  { label: 'What patterns do you notice?', Icon: Brain },
  { label: 'Am I close to burnout?', Icon: AlertTriangle },
];

function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchInsights = async () => {
    try {
      const res = await api.get('/chat/insights');
      setInsights(res.data.insights || []);
    } catch (err) {
      console.error('Failed to fetch insights:', err);
    } finally {
      setInsightsLoading(false);
    }
  };

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/chat', {
        message: trimmed,
        history: newMessages.slice(0, -1),
      });

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res.data.reply },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            err.response?.data?.reply ||
            'The Oracle is momentarily unreachable. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  const getPriorityClass = (priority) => {
    if (priority === 'high') return 'insight-high';
    if (priority === 'medium') return 'insight-medium';
    return 'insight-low';
  };

  const renderMessageContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      let processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');

      if (processed.trimStart().startsWith('- ') || processed.trimStart().startsWith('• ')) {
        const text = processed.replace(/^[\s]*[-•]\s*/, '');
        return (
          <div key={i} className="chat-bullet">
            <span className="bullet-dot" />
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        );
      }

      if (processed.trim() === '') {
        return <div key={i} className="chat-line-break" />;
      }

      return (
        <p key={i} className="chat-paragraph" dangerouslySetInnerHTML={{ __html: processed }} />
      );
    });
  };

  return (
    <div className="oracle-page page-shell">
      <div className="page-width">
        {/* ── Header ──────────────────────────────── */}
        <div className="oracle-header">
          <div className="oracle-brand-mark">
            <PlantPersonIcon size={24} />
          </div>
          <span className="oracle-kicker eyebrow">Personalized Intelligence</span>
          <h1 className="oracle-title">The Oracle</h1>
          <p className="oracle-subtitle">
            Your habits tell a story. The Oracle reads between the lines — surfacing patterns,
            sensing burnout, and guiding your next step with precision.
          </p>
        </div>

        {/* ── Insight Cards ───────────────────────── */}
        <div className="insights-section">
          <div className="insights-header">
            <Sparkles size={16} className="insights-icon" />
            <span className="insights-label eyebrow">Live Observations</span>
          </div>
          {insightsLoading ? (
            <div className="insights-loading">
              <Loader2 size={18} className="spin" />
              <span>Reading your patterns...</span>
            </div>
          ) : insights.length > 0 ? (
            <div className="insights-grid">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`insight-card glass-panel ${getPriorityClass(insight.priority)}`}
                  onClick={() => handlePromptClick(`Tell me more about: ${insight.title}`)}
                >
                  <div className="insight-card-header">
                    <div className="insight-icon-wrap">
                      {getInsightIcon(insight.iconName)}
                    </div>
                    <span className="insight-type eyebrow">{insight.type}</span>
                  </div>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-body">{insight.body}</p>
                  <div className="insight-cta">
                    <span>Explore</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="insights-empty glass-panel">
              <Leaf size={28} className="insights-empty-icon" />
              <p>Start logging habits to unlock personalized insights.</p>
            </div>
          )}
        </div>

        {/* ── Chat Section ────────────────────────── */}
        <div className="chat-section">
          <div className="chat-header-bar">
            <MessageCircle size={16} />
            <span className="eyebrow">Reflect with the Oracle</span>
          </div>

          <div className="chat-container glass-panel">
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-empty-state">
                  <div className="chat-oracle-avatar-lg">
                    <PlantPersonIcon size={26} />
                  </div>
                  <h3>What would you like to reflect on?</h3>
                  <p className="chat-empty-desc">
                    The Oracle draws from your real habit data to give deeply personal guidance.
                    Not generic productivity tips.
                  </p>
                  <div className="suggested-prompts">
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        className="prompt-pill"
                        onClick={() => handlePromptClick(prompt.label)}
                      >
                        <prompt.Icon size={14} className="prompt-pill-icon" />
                        <span>{prompt.label}</span>
                        <ChevronRight size={12} className="prompt-pill-arrow" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${msg.role === 'user' ? 'chat-user' : 'chat-oracle'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="chat-avatar oracle-avatar">
                      <PlantPersonIcon size={14} />
                    </div>
                  )}
                  <div className="chat-bubble">
                    {msg.role === 'user' ? (
                      <p>{msg.content}</p>
                    ) : (
                      <div className="oracle-response">
                        {renderMessageContent(msg.content)}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="chat-avatar user-avatar">
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="chat-message chat-oracle">
                  <div className="chat-avatar oracle-avatar">
                    <PlantPersonIcon size={14} />
                  </div>
                  <div className="chat-bubble typing-bubble">
                    <div className="typing-indicator">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <div className="chat-input-wrap">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your habits..."
                  rows={1}
                  disabled={isLoading}
                  id="oracle-input"
                />
                <button
                  className="send-btn"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  id="oracle-send"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                </button>
              </div>
              <span className="chat-disclaimer">
                Responses are grounded in your real habits, streaks, and logged patterns.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
