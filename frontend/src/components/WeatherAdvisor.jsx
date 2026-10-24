import React, { useState } from 'react';
import axios from 'axios';
import {
  CloudSun,
  CloudRain,
  AlertTriangle,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Compass
} from 'lucide-react';

export const WeatherAdvisor = () => {
  const [formData, setFormData] = useState({
    planned_activity: "Slab Conversion",
    weather: "Cloudy"
  });
  const [loading, setLoading] = useState(false);
  const [advisory, setAdvisory] = useState({
    status_type: "caution",
    banner_title: "PROCEED WITH CAUTION",
    recommendation: "Proceed with slab conversion, but maintain heightened vigilance for safety and be prepared for possible delays.",
    hazards: [
      "REDUCED VISIBILITY",
      "POTENTIAL FOR SCATTERED SHOWERS",
      "INCREASED RISK OF ACCIDENTS DUE TO SLIPPERY SURFACES"
    ],
    required_precautions: [
      "Ensure proper lighting on site",
      "Have a contingency plan for unexpected rain",
      "Use slip-resistant materials and equipment"
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
      const response = await axios.post("/api/weather-advisor", formData);
      if (response.data) {
        setAdvisory(response.data);
      }
    } catch (err) {
      console.error("Weather Advisor API Error:", err);
      setError("Failed to fetch weather feasibility advisory.");
    } finally {
      setLoading(false);
    }
  };

  const getBannerClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'no-go':
        return 'status-banner banner-nogo';
      case 'go':
        return 'status-banner banner-go';
      default:
        return 'status-banner banner-caution';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">WEATHER ADVISOR</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="panel-grid-2">
        {/* Left Card: Input Form */}
        <div className="card-panel">
          <div className="panel-title">
            <CloudSun size={16} />
            <span>CHECK WEATHER IMPACT</span>
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
                placeholder="e.g. Slab Conversion, Crane Lifting, Exterior Painting..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current/Forecast Weather</label>
              <select
                name="weather"
                className="form-select"
                value={formData.weather}
                onChange={handleChange}
              >
                <option value="Cloudy">Cloudy</option>
                <option value="Rain / Monsoonal Downpour">Rain / Monsoonal Downpour</option>
                <option value="High Wind Gusts">High Wind Gusts</option>
                <option value="Extreme Heat (>40°C)">Extreme Heat (&gt;40°C)</option>
                <option value="Clear & Mild">Clear & Mild</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                  <span>ANALYZING METEOROLOGICAL IMPACT...</span>
                </>
              ) : (
                <>
                  <Compass size={18} />
                  <span>CHECK FEASIBILITY</span>
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

        {/* Right Card: Advisory Output */}
        <div className="card-panel">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Simulating environmental risk matrices...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Dynamic Status Banner */}
              <div className={getBannerClass(advisory.status_type)}>
                <div className="banner-title">
                  {advisory.banner_title || "PROCEED WITH CAUTION"}
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {advisory.recommendation}
                </p>
              </div>

              {/* Hazards Badges */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 10, textTransform: 'uppercase' }}>
                  Hazards
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(advisory.hazards || []).map((h, i) => (
                    <span key={i} className="badge-pill badge-hazard" style={{ margin: 0, padding: '6px 12px' }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Precautions */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 10, textTransform: 'uppercase' }}>
                  Required Precautions
                </h4>
                <ul className="bullet-list">
                  {(advisory.required_precautions || advisory.mitigations || []).map((p, i) => (
                    <li key={i} className="bullet-item" style={{ fontSize: '0.8125rem' }}>
                      <span style={{ color: '#f97316', fontWeight: 700, minWidth: 16 }}>•</span>
                      <span>{p}</span>
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
