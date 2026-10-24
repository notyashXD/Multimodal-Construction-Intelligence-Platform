import React, { useState } from 'react';
import axios from 'axios';
import {
  CalendarCheck,
  CheckSquare,
  AlertTriangle,
  HardHat,
  Sparkles,
  Users,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const DailySiteAssistant = () => {
  const [formData, setFormData] = useState({
    planned_activity: "Concreting",
    labour_count: 10,
    site_condition: "Normal"
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({
    plan_title: "Today's Execution Plan",
    tasks: [
      "Prepare the construction site by clearing any debris",
      "Conduct safety checks on the concreting equipment",
      "Lay down the reinforcement steel",
      "Pour the concrete mixture",
      "Finish and cure the concrete"
    ],
    safety_checks: [
      "HARD HAT AND SAFETY VEST USAGE",
      "STEEL-TOED BOOTS AND GLOVES",
      "EYE PROTECTION AND DUST MASKS",
      "REGULAR INSPECTION OF EQUIPMENT"
    ],
    risk_alerts: [
      "Risk of concrete segregation in high-rise pours",
      "Risk of labour accidents during pouring",
      "Risk of equipment failure"
    ]
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/site-assistant", formData);
      if (response.data) {
        setPlan(response.data);
      }
    } catch (err) {
      console.error("Site Assistant API Error:", err);
      setError("Failed to generate daily site plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">DAILY SITE ASSISTANT</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="panel-grid-2">
        {/* Left Card: Site Input */}
        <div className="card-panel">
          <div className="panel-title">
            <Users size={16} />
            <span>SITE INPUT</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Planned Activity</label>
              <input
                type="text"
                name="planned_activity"
                className="form-input"
                value={formData.planned_activity}
                onChange={handleChange}
                placeholder="e.g. Concreting, Excavation, Brickwork..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Labour Count</label>
              <input
                type="number"
                name="labour_count"
                className="form-input"
                value={formData.labour_count}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Site Condition</label>
              <select
                name="site_condition"
                className="form-select"
                value={formData.site_condition}
                onChange={handleChange}
              >
                <option value="Normal">Normal</option>
                <option value="Muddy / Waterlogged">Muddy / Waterlogged</option>
                <option value="Confined Space">Confined Space</option>
                <option value="Elevated / Heightened">Elevated / Heightened</option>
                <option value="Night Shift Operations">Night Shift Operations</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                  <span>OPTIMIZING SITE LOGISTICS...</span>
                </>
              ) : (
                <>
                  <CalendarCheck size={18} />
                  <span>GENERATE TODAY'S PLAN</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: 14, color: '#dc2626', fontSize: '0.8125rem' }}>
              {error}
            </div>
          )}
        </div>

        {/* Right Card: Today's Execution Plan */}
        <div className="card-panel">
          <div className="panel-title">
            <CheckSquare size={16} />
            <span>TODAY'S EXECUTION PLAN</span>
          </div>

          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Sequencing labor tasks & safety protocols...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Tasks List */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase' }}>
                  <span style={{ color: '#f97316' }}>▶</span> TASKS
                </h4>
                <ul className="bullet-list">
                  {(plan.tasks || []).map((task, i) => (
                    <li key={i} className="bullet-item" style={{ fontSize: '0.8125rem' }}>
                      <span style={{ color: '#f97316', fontWeight: 700, minWidth: 16 }}>•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Checks */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase' }}>
                  <HardHat size={16} color="#0284c7" /> SAFETY CHECKS
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(plan.safety_checks || []).map((check, i) => (
                    <span key={i} className="badge-pill badge-safety" style={{ margin: 0 }}>
                      {check}
                    </span>
                  ))}
                </div>
              </div>

              {/* Risk Alerts */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#b91c1c', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'uppercase' }}>
                  <AlertTriangle size={16} color="#dc2626" /> RISK ALERTS
                </h4>
                <ul className="bullet-list">
                  {(plan.risk_alerts || []).map((alert, i) => (
                    <li key={i} className="bullet-item" style={{ color: '#b91c1c', fontSize: '0.8125rem' }}>
                      <span style={{ color: '#dc2626', fontWeight: 700 }}>•</span>
                      <span>{alert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
