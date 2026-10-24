import React, { useState } from 'react';
import axios from 'axios';
import {
  Upload,
  AlertTriangle,
  CheckCircle,
  FileText,
  ShieldCheck,
  HardHat,
  Sparkles,
  XCircle,
  ArrowRight
} from 'lucide-react';

export const SafetyMonitor = () => {
  const [description, setDescription] = useState("Workers observed on scaffold at 15ft elevation without safety harness or perimeter guardrails.");
  const [imageFile, setImageFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);
    if (docFile) formData.append("doc", docFile);

    try {
      const response = await axios.post("/api/safety-monitor", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(response.data);
    } catch (err) {
      console.error("Safety Monitor API Error:", err);
      setError("Failed to analyze safety data. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'badge-hazard';
      case 'moderate':
        return 'badge-warning';
      default:
        return 'badge-success';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">SITE SAFETY MONITOR</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="panel-grid-2">
        {/* Left Column: Input Panel */}
        <div className="card-panel">
          <div className="panel-title">
            <FileText size={16} />
            <span>INPUT DATA</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Observation Log</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the scene e.g. 'Workers on scaffold without harness...'"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Site Photo (Optional)</label>
              <label className="upload-dropzone">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setImageFile(e.target.files[0] || null)}
                />
                <Upload size={22} color="#f97316" />
                <span className="upload-text">
                  {imageFile ? imageFile.name : "Click to Upload Image"}
                </span>
                <span className="upload-subtext">JPG, PNG, WebP up to 10MB</span>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Safety Doc (Optional)</label>
              <label className="upload-dropzone">
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => setDocFile(e.target.files[0] || null)}
                />
                <FileText size={22} color="#f97316" />
                <span className="upload-text">
                  {docFile ? docFile.name : "Click to Upload Report"}
                </span>
                <span className="upload-subtext">PDF, DOC, TXT logs or permits</span>
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                  <span>ANALYZING MULTIMODAL HAZARDS...</span>
                </>
              ) : (
                <>
                  <HardHat size={18} />
                  <span>ANALYZE HAZARDS</span>
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

        {/* Right Column: Results Panel */}
        <div className="card-panel">
          <div className="panel-title">
            <ShieldCheck size={16} />
            <span>ANALYSIS RESULTS</span>
          </div>

          {!result && !loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 280, color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>
              Waiting for input...
            </div>
          )}

          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Processing vision models & safety standards...</span>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Risk Level Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Calculated Risk Level:</span>
                <span className={`badge-pill ${getRiskBadgeClass(result.risk_level || result.riskLevel)}`} style={{ fontSize: '0.875rem', padding: '6px 14px' }}>
                  {result.risk_level || result.riskLevel || "Moderate"}
                </span>
              </div>

              {/* Identified Hazards */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Identified Hazards
                </h4>
                <ul className="bullet-list">
                  {(result.hazards || []).map((h, i) => (
                    <li key={i} className="bullet-item">
                      <AlertTriangle size={16} color="#ea580c" className="bullet-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PPE Compliance */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  PPE Compliance Assessment
                </h4>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: 4 }}>Observed PPE:</span>
                  {(result.ppe || result.ppe_compliance?.present || []).map((p, i) => (
                    <span key={i} className="badge-pill badge-safety">
                      <CheckCircle size={12} style={{ marginRight: 4 }} /> {p}
                    </span>
                  ))}
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: 4 }}>Missing Mandatory PPE:</span>
                  {(result.missing_ppe || result.ppe_compliance?.missing || []).map((p, i) => (
                    <span key={i} className="badge-pill badge-hazard">
                      <XCircle size={12} style={{ marginRight: 4 }} /> {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* OSHA Regulatory Standards */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Applicable Regulatory Standards
                </h4>
                <ul className="bullet-list">
                  {(result.osha_standards || []).map((s, i) => (
                    <li key={i} className="bullet-item" style={{ fontSize: '0.8125rem', color: '#475569' }}>
                      <span style={{ fontWeight: 600, color: '#ea580c' }}>•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Corrective Actions */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Mandatory Corrective Actions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {(result.actions || result.corrective_actions || []).map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', background: '#f8fafc', padding: '8px 10px', borderRadius: 6, borderLeft: '3px solid #f97316' }}>
                      <ArrowRight size={14} color="#f97316" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
