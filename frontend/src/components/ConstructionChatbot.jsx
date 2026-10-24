import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Lightbulb
} from 'lucide-react';

export const ConstructionChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I assist you with your construction query today?",
      suggestions: ["ASK A QUESTION", "GET A CONSTRUCTION TIP", "DISCUSS A PROJECT"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputValue;
    if (!query.trim() || loading) return;

    const userMsg = { role: "user", content: query };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chatbot", {
        message: query,
        history: nextHistory.map(m => ({ role: m.role, content: m.content }))
      });

      if (response.data) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: response.data.reply,
            suggestions: response.data.action_suggestions || []
          }
        ]);
      }
    } catch (err) {
      console.error("Chatbot API Error:", err);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I experienced a temporary communication hiccup. However, for structural questions you can ask me about concrete mix ratios, curing periods, or scaffolding guidelines.",
          suggestions: ["Calculate M25 concrete mix ratio", "Shuttering removal schedule", "OSHA safety checks"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">CONSTRUCTION CHATBOT</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="card-panel" style={{ height: '70vh', minHeight: 520, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        {/* Messages Scroll Area */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: 10
                }}
              >
                {!isUser && (
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', flexShrink: 0, marginTop: 2 }}>
                    <Bot size={18} />
                  </div>
                )}

                <div style={{ maxWidth: '78%' }}>
                  <div
                    style={{
                      padding: '12px 18px',
                      borderRadius: 14,
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      backgroundColor: isUser ? '#f97316' : '#f1f5f9',
                      color: isUser ? '#ffffff' : '#0f172a',
                      borderBottomRightRadius: isUser ? 2 : 14,
                      borderTopLeftRadius: !isUser ? 2 : 14,
                      boxShadow: isUser ? '0 2px 8px rgba(249, 115, 22, 0.3)' : 'none',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {m.content}
                  </div>

                  {/* Suggestion Chips */}
                  {!isUser && m.suggestions && m.suggestions.length > 0 && (
                    <div className="chip-group" style={{ marginTop: 10 }}>
                      {m.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          className="chip-btn"
                          onClick={() => handleSend(sug)}
                        >
                          <Lightbulb size={12} style={{ marginRight: 4, display: 'inline' }} />
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', flexShrink: 0, marginTop: 2 }}>
                    <User size={18} />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                <Bot size={18} />
              </div>
              <div style={{ background: '#f1f5f9', padding: '10px 16px', borderRadius: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }}></span>
                <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>ConstructionGPT is analyzing...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            display: 'flex',
            gap: 12
          }}
        >
          <input
            type="text"
            className="form-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
            style={{ borderRadius: 24, paddingLeft: 18, background: '#f8fafc' }}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !inputValue.trim()}
            style={{
              marginTop: 0,
              borderRadius: 24,
              padding: '10px 20px',
              minWidth: 48
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
