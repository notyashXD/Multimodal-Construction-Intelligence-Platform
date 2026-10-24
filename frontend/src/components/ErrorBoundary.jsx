import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="card-panel" style={{ padding: '32px', textAlign: 'center', borderColor: '#fca5a5', backgroundColor: '#fef2f2' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: '#fee2e2', borderRadius: '50%', color: '#dc2626' }}>
              <AlertTriangle size={36} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991b1b', marginBottom: '8px' }}>
            Component Rendering Safeguard Triggered
          </h3>
          <p style={{ color: '#7f1d1d', fontSize: '0.875rem', marginBottom: '20px', maxWidth: '540px', margin: '0 auto 20px auto' }}>
            {this.props.fallbackMessage || "An unexpected error occurred in this module. The ConstructAI ErrorBoundary prevented a full UI crash."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={this.handleReset}
              className="btn-primary"
              style={{ margin: 0, padding: '8px 18px' }}
            >
              <RefreshCw size={16} /> Retry Component
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
