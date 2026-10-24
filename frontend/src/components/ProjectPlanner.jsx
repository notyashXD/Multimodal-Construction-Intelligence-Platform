import React, { useState } from 'react';
import axios from 'axios';
import {
  Layers,
  Coins,
  Calendar,
  Send,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';

const ProjectPlannerInner = () => {
  const [prompt, setPrompt] = useState("Create full plan for 20x30 slab construction");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({
    materials_table: [
      { item: "Cement", qty: "140 bags" },
      { item: "Sand", qty: "16.5 tons" },
      { item: "Aggregate", qty: "24.0 tons" },
      { item: "Steel", qty: "1,850 kg" },
      { item: "Concrete Vol", qty: "17.0 m³" }
    ],
    cost_table: [
      { category: "Materials", cost: "₹ 2,45,000" },
      { category: "Labour", cost: "₹ 85,000" },
      { category: "Finishing", cost: "₹ 45,000" },
      { category: "TOTAL", cost: "₹ 3,75,000" }
    ],
    schedule: [
      { phase: "Phase 1 - Site Prep & Centering", duration: "Days 1-3", details: "Leveling ground, erecting scaffolding props, assembling formwork." },
      { phase: "Phase 2 - Steel Rebar & Shuttering", duration: "Days 4-5", details: "Binding Fe500D TMT reinforcement cages, placing 25mm PVC cover blocks." },
      { phase: "Phase 3 - Pouring & Vibrating", duration: "Day 6", details: "Continuous batch pouring of M25 grade concrete, mechanical compaction." },
      { phase: "Phase 4 - Curing & Finishing", duration: "Days 7-21", details: "Continuous ponding water curing for 14-21 days; formwork de-shuttering." }
    ]
  });
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/project-planner", { prompt });
      if (response.data) {
        setPlan(response.data);
      }
    } catch (err) {
      console.error("Project Planner API Error:", err);
      setError("Failed to generate plan. Please verify backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">CONSTRUCTION PROJECT PLANNER</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      {/* Top Project Brief Bar */}
      <div className="card-panel" style={{ marginBottom: 24, padding: '20px 24px' }}>
        <form onSubmit={handleGenerate}>
          <label className="form-label" style={{ marginBottom: 8 }}>PROJECT BRIEF</label>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              className="form-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Create full plan for 20x30 slab construction..."
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: 0, padding: '10px 24px', whiteSpace: 'nowrap' }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }}></div>
                  <span>CALCULATING...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>GENERATE PLAN</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div style={{ marginTop: 10, color: '#dc2626', fontSize: '0.8125rem' }}>
            {error}
          </div>
        )}
      </div>

      {/* 3-Column Estimator Grid */}
      <div className="panel-grid-3">
        {/* Column 1: Material Estimator */}
        <div className="card-panel">
          <div className="panel-title">
            <Layers size={16} color="#f97316" />
            <span>MATERIAL ESTIMATOR</span>
          </div>

          <table className="styled-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
              </tr>
            </thead>
            <tbody>
              {(plan.materials_table || []).map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{row.item}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#0369a1', fontWeight: 600 }}>
                    {row.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Column 2: Cost Estimator */}
        <div className="card-panel">
          <div className="panel-title">
            <Coins size={16} color="#f97316" />
            <span>COST ESTIMATOR</span>
          </div>

          <table className="styled-table">
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {(plan.cost_table || []).map((row, idx) => {
                const isTotal = row.category?.toLowerCase() === 'total';
                return (
                  <tr key={idx} className={isTotal ? 'total-row' : ''}>
                    <td style={{ fontWeight: isTotal ? 800 : 500 }}>{row.category}</td>
                    <td style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: isTotal ? 800 : 600,
                      color: isTotal ? '#ea580c' : '#1e293b'
                    }}>
                      {row.cost}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Column 3: Time Schedule */}
        <div className="card-panel">
          <div className="panel-title">
            <Calendar size={16} color="#f97316" />
            <span>TIME SCHEDULE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(plan.schedule || []).map((phase, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: 8,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderLeft: '4px solid #f97316'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>
                    {phase.phase}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#c2410c',
                    background: '#ffedd5',
                    padding: '2px 8px',
                    borderRadius: 4
                  }}>
                    <Clock size={12} />
                    {phase.duration}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.4 }}>
                  {phase.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectPlanner = () => (
  <ErrorBoundary fallbackMessage="The Project Planner encountered a rendering exception. Click Retry below to restore state.">
    <ProjectPlannerInner />
  </ErrorBoundary>
);
