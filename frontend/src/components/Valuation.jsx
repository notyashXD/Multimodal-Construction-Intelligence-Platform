import React, { useState } from 'react';
import axios from 'axios';
import {
  Building2,
  TrendingUp,
  DollarSign,
  Sparkles,
  Calculator,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const Valuation = () => {
  const [formData, setFormData] = useState({
    location: "Bandra West, Mumbai",
    area: 1200,
    age: 4,
    property_type: "Residential",
    amenities: "Pool, Gym, 2x Covered Parking, 24/7 Security"
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    market_value_range: "₹ 3,45,00,000 - ₹ 3,75,00,000",
    estimated_value: "₹ 3,60,00,000",
    price_per_sqft: "₹ 30,000 / sq ft",
    rental_potential: "₹ 95,000 - ₹ 1,15,000 / month",
    roi_appreciation: "8.5% projected annual capital growth",
    valuation_factors: [
      "Localized geographic benchmark rate in Bandra West",
      "Age depreciation calibrated for 4-year building structure",
      "Full luxury amenity uplift factor applied",
      "High commercial and arterial transit connectivity premium"
    ]
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/real-estate-valuation", formData);
      if (response.data) {
        setResult(response.data);
      }
    } catch (err) {
      console.error("Valuation API Error:", err);
      setError("Failed to calculate valuation. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">REAL ESTATE ESTIMATOR</h1>
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI ACTIVE</span>
        </div>
      </div>

      <div className="panel-grid-2">
        {/* Left Card: Input Form */}
        <div className="card-panel">
          <div className="panel-title">
            <Building2 size={16} />
            <span>PROPERTY DETAILS</span>
          </div>

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, locality or neighborhood..."
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Area (sq ft)</label>
                <input
                  type="number"
                  name="area"
                  className="form-input"
                  value={formData.area}
                  onChange={handleChange}
                  min="50"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Age (Years)</label>
                <input
                  type="number"
                  name="age"
                  className="form-input"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                name="property_type"
                className="form-select"
                value={formData.property_type}
                onChange={handleChange}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amenities</label>
              <input
                type="text"
                name="amenities"
                className="form-input"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Pool, Gym, Parking, Club..."
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                  <span>CALCULATING VALUATION...</span>
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  <span>CALCULATE VALUE</span>
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

        {/* Right Card: Valuation Breakdown */}
        <div className="card-panel">
          <div className="panel-title">
            <TrendingUp size={16} />
            <span>VALUATION ANALYSIS & METRICS</span>
          </div>

          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Benchmarking registry transactions & yields...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Highlight Card */}
              <div style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', padding: '20px', borderRadius: 8, border: '1px solid #fed7aa' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Estimated Market Value
                </span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#9a3412', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                  {result.estimated_value || result.market_value_range}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#c2410c', marginTop: 4 }}>
                  Estimated Range: <strong>{result.market_value_range}</strong>
                </div>
              </div>

              {/* Metric Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 4 }}>Price per Sq Ft</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                    {result.price_per_sqft}
                  </span>
                </div>

                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 4 }}>Rental Income Potential</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0369a1', fontFamily: 'var(--font-mono)' }}>
                    {result.rental_potential}
                  </span>
                </div>
              </div>

              {/* Capital Appreciation */}
              <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: 8, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <TrendingUp size={20} color="#16a34a" />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#15803d' }}>Projected Capital Appreciation</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#14532d' }}>{result.roi_appreciation}</div>
                </div>
              </div>

              {/* Valuation Drivers */}
              <div>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1e293b', marginBottom: 8, textTransform: 'uppercase' }}>
                  Valuation Drivers & Regional Factors
                </h4>
                <ul className="bullet-list">
                  {(result.valuation_factors || []).map((factor, idx) => (
                    <li key={idx} className="bullet-item">
                      <CheckCircle2 size={15} color="#f97316" className="bullet-icon" />
                      <span>{factor}</span>
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
