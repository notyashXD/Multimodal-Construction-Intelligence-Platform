import React, { useState } from 'react';
import axios from 'axios';
import {
  BookOpen,
  Shield,
  Hammer,
  FileCheck,
  Sparkles,
  Send,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

export const KnowledgeBase = () => {
  const [category, setCategory] = useState("SAFETY");
  const [query, setQuery] = useState("Steps for scaffolding");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    title: "Comprehensive Engineering Standard: Scaffolding Erection & Inspection",
    content: "1. Foundation Verification: Scaffold uprights must be grounded on solid mudsills with steel base plates and adjustable screw jacks. Never place on hollow blocks or loose fill.\n2. Plumbing and Bracing: Plumb all verticals using a spirit level and securely fasten diagonal ledger braces at every lift interval.\n3. Platform Decking: Scaffold planks must be tight-planked with maximum 1-inch gaps and extend between 6 and 12 inches over end supports.\n4. Fall Protection: Install top rails at 42 inches (±3 inches), midrails at halfway height, and 3.5-inch toe-boards along all open working perimeter edges.\n5. Access & Tagging: Provide secured internal ladder access. A certified Competent Person must inspect daily and affix a Green (Safe), Yellow (Caution), or Red (Do Not Use) inspection tag.",
    standards_referenced: ["OSHA 1926.451", "IS 3696 (Part 1): Safety code for scaffolds", "BS EN 12811-1"],
    key_checkpoints: [
      "Verify base plate contact with ground sill and lack of settling",
      "Confirm 100% guardrail and toe-board enclosure on all working decks",
      "Ensure harness anchorage points are independent of scaffold structure"
    ]
  });
  const [error, setError] = useState(null);

  const categories = [
    { id: "SAFETY", label: "SAFETY", icon: Shield },
    { id: "TECHNIQUE", label: "TECHNIQUE", icon: Hammer },
    { id: "DOC GEN", label: "DOC GEN", icon: FileCheck },
  ];

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/knowledge-base", {
        category,
        query
      });
      if (response.data) {
        setResult(response.data);
      }
    } catch (err) {
      console.error("Knowledge Base API Error:", err);
      setError("Failed to query knowledge base.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">KNOWLEDGE ASSISTANT</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="card-panel">
        {/* Category Selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? '1px solid #ea580c' : '1px solid #cbd5e1',
                  backgroundColor: isActive ? '#f97316' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Query */}
        <form onSubmit={handleAsk}>
          <div className="form-group">
            <textarea
              className="form-textarea"
              rows={3}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Steps for scaffolding, M25 concrete mix design, Daily Progress Report template..."
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: 'fit-content', padding: '10px 24px' }}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }}></div>
                <span>QUERYING EXPERT REPOSITORY...</span>
              </>
            ) : (
              <>
                <BookOpen size={16} />
                <span>ASK EXPERT</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: 12, color: '#dc2626', fontSize: '0.8125rem' }}>
            {error}
          </div>
        )}

        {/* Knowledge Results */}
        {result && (
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', marginBottom: 4 }}>
                {category} REPOSITORY REFERENCE
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>
                {result.title}
              </h3>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px 18px', borderRadius: 8, border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.875rem', color: '#334155' }}>
              {result.content}
            </div>

            {/* Standards & Key Checkpoints */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#f1f5f9', padding: '14px', borderRadius: 8 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Referenced Industry Standards
                </span>
                <ul className="bullet-list">
                  {(result.standards_referenced || []).map((std, i) => (
                    <li key={i} className="bullet-item" style={{ fontSize: '0.8125rem' }}>
                      <Bookmark size={14} color="#ea580c" className="bullet-icon" />
                      <span>{std}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: 8, border: '1px solid #dcfce7' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Mandatory Checkpoints
                </span>
                <ul className="bullet-list">
                  {(result.key_checkpoints || []).map((cp, i) => (
                    <li key={i} className="bullet-item" style={{ fontSize: '0.8125rem', color: '#14532d' }}>
                      <CheckCircle2 size={14} color="#16a34a" className="bullet-icon" />
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
