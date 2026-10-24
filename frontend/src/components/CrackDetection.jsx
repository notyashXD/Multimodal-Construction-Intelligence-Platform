import React, { useState } from 'react';
import axios from 'axios';
import {
  Activity,
  Upload,
  AlertOctagon,
  Wrench,
  ShieldCheck,
  Search,
  Sparkles,
  Info
} from 'lucide-react';

export const CrackDetection = () => {
  const [description, setDescription] = useState("Diagonal crack propagating at 45 degrees near the column-beam junction on second-floor load-bearing frame.");
  const [imageFile, setImageFile] = useState(null);
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

    try {
      const response = await axios.post("/api/crack-detection", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(response.data);
    } catch (err) {
      console.error("Crack Detection Error:", err);
      setError("Failed to run crack diagnosis. Check backend status.");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'severe':
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
        <h1 className="page-title">STRUCTURAL CRACK DIAGNOSIS</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="panel-grid-2">
        {/* Left Column: Input Form */}
        <div className="card-panel">
          <div className="panel-title">
            <Search size={16} />
            <span>INPUT ANALYSIS DATA</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the crack location and pattern..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Crack Image</label>
              <label className="upload-dropzone">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setImageFile(e.target.files[0] || null)}
                />
                <Upload size={22} color="#f97316" />
                <span className="upload-text">
                  {imageFile ? imageFile.name : "Upload Close-up"}
                </span>
                <span className="upload-subtext">High-res macro crack photography recommended</span>
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                  <span>ANALYZING STRUCTURAL FRACTURE...</span>
                </>
              ) : (
                <>
                  <Activity size={18} />
                  <span>RUN DIAGNOSIS</span>
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

        {/* Right Column: Diagnosis Results */}
        <div className="card-panel">
          <div className="panel-title">
            <AlertOctagon size={16} />
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
              <span>Classifying fracture geometry & assessing load integrity...</span>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Classification Banner */}
              <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>Classification</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{result.crack_type}</div>
                </div>
                <div>
                  <span className={`badge-pill ${getSeverityBadgeClass(result.severity_level)}`} style={{ fontSize: '0.8125rem', padding: '6px 12px' }}>
                    {result.severity_level} Severity
                  </span>
                </div>
              </div>

              {/* Probable Causes */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Probable Causes
                </h4>
                <ul className="bullet-list">
                  {(result.probable_causes || []).map((cause, i) => (
                    <li key={i} className="bullet-item">
                      <Info size={16} color="#0284c7" className="bullet-icon" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Structural Risks */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Potential Structural Risks
                </h4>
                <ul className="bullet-list">
                  {(result.potential_risks || []).map((risk, i) => (
                    <li key={i} className="bullet-item">
                      <AlertOctagon size={16} color="#dc2626" className="bullet-icon" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Repairs */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Recommended Engineering Remediation
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {(result.recommended_repairs || []).map((repair, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', background: '#f8fafc', padding: '8px 10px', borderRadius: 6, borderLeft: '3px solid #f97316' }}>
                      <Wrench size={14} color="#f97316" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>{repair}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preventive Measures */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Preventive Monitoring Protocols
                </h4>
                <ul className="bullet-list">
                  {(result.preventive_measures || []).map((measure, i) => (
                    <li key={i} className="bullet-item">
                      <ShieldCheck size={16} color="#16a34a" className="bullet-icon" />
                      <span>{measure}</span>
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
