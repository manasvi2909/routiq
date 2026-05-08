import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import {
  Send, Sparkles, Loader2, MessageCircle, Bot, Leaf,
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
            <Bot size={24} />
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
                    <Bot size={26} />
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
                      <Bot size={14} />
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
                    <Bot size={14} />
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
