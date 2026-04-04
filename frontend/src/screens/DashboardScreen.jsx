import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../gs-styles.css';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [rider, setRider] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [selectedTier, setSelectedTier] = useState('standard');

  useEffect(() => {
    const savedRider = localStorage.getItem('rider');
    const savedPolicy = localStorage.getItem('policy');
    if (savedRider) setRider(JSON.parse(savedRider));
    if (savedPolicy) setPolicy(JSON.parse(savedPolicy));
  }, []);

  return (
    <div className="gs-root">
      {/* Nav */}
      <div className="gs-nav">
        <div className="gs-logo">
          <div className="gs-logo-dot"></div>
          GigShield
        </div>
        <div className="gs-nav-pills">
          <div className="gs-pill active" onClick={() => navigate('/dashboard')}>Dashboard</div>
          <div className="gs-pill" onClick={() => navigate('/policy')}>Policy</div>
          <div className="gs-pill" onClick={() => navigate('/claims')}>Claims</div>
          <div className="gs-pill" onClick={() => navigate('/login')}>Logout</div>
        </div>
        <div className="gs-avatar">{rider?.name ? rider.name.slice(0, 2).toUpperCase() : 'RK'}</div>
      </div>

      {/* Hero */}
      <div className="gs-hero">
        <div>
          <div className="gs-rider-name">{rider?.name || 'Rajan Kumar'}</div>
          <div className="gs-rider-meta">
            <span className="gs-platform-badge">{rider?.platform || 'Blinkit'}</span>
            <span className="gs-zone-tag">📍 {rider?.zone || 'Velachery'}, Chennai</span>
            <span className="gs-zone-tag">Fraud score <strong style={{ color: 'var(--color-text-primary)' }}>{rider?.fraudScore || 12}</strong> / 100</span>
          </div>
        </div>
        <div className="gs-policy-card">
          <div className="gs-policy-label">Active Policy</div>
          <div className="gs-policy-tier">{policy?.tier || 'Standard'}</div>
          <div className="gs-policy-sub"><span className="gs-status-dot"></span>Protected · Mon 31 Mar – Sun 6 Apr</div>
          <div className="gs-divider" style={{ margin: '10px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Weekly premium</span>
            <span className="gs-mono" style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>₹{policy?.premium || 61}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Max payout</span>
            <span className="gs-mono" style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>₹{policy?.maxCoverage || 900} / week</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="gs-metrics">
        <div className="gs-metric">
          <div className="gs-metric-label">This week earned</div>
          <div className="gs-metric-val">₹3,840</div>
          <div className="gs-metric-unit">out of ₹4,200 target</div>
          <div className="gs-metric-delta gs-delta-down">▼ ₹360 disruption loss</div>
        </div>
        <div className="gs-metric">
          <div className="gs-metric-label">Payout received</div>
          <div className="gs-metric-val">₹210</div>
          <div className="gs-metric-unit">3 hrs × ₹70/hr</div>
          <div className="gs-metric-delta gs-delta-up">▲ Transferred to UPI</div>
        </div>
        <div className="gs-metric">
          <div className="gs-metric-label">Coverage hours left</div>
          <div className="gs-metric-val">42h</div>
          <div className="gs-metric-unit">of 60h this week</div>
          <div className="gs-metric-delta" style={{ color: 'var(--color-text-tertiary)' }}>18h used</div>
        </div>
        <div className="gs-metric">
          <div className="gs-metric-label">Active triggers</div>
          <div className="gs-metric-val">1</div>
          <div className="gs-metric-unit">rainfall alert live</div>
          <div className="gs-metric-delta" style={{ color: '#A32D2D' }}>▲ Payout pending</div>
        </div>
      </div>

      {/* Body */}
      <div className="gs-body">
        {/* Left column */}
        <div>
          <div className="gs-section-title">Live Disruption Monitor</div>

          {/* Rain alert - active */}
          <div className="gs-alert-card" onClick={() => navigate('/trigger')} style={{ cursor: 'pointer' }}>
            <div className="gs-alert-header">
              <div className="gs-alert-icon rain" style={{ fontSize: '18px' }}>🌧</div>
              <div>
                <div className="gs-alert-title">Heavy Rainfall — IMD Red Alert</div>
                <div className="gs-alert-zone">CH-04 · {rider?.zone || 'Velachery'}</div>
              </div>
              <div className="gs-alert-status active">● Triggered</div>
            </div>
            <div className="gs-alert-body">
              <div className="gs-alert-stat">
                <div className="gs-alert-stat-label">Rainfall/hr</div>
                <div className="gs-alert-stat-val">28mm</div>
              </div>
              <div className="gs-alert-stat">
                <div className="gs-alert-stat-label">Duration</div>
                <div className="gs-alert-stat-val">1h 40m</div>
              </div>
              <div className="gs-alert-stat">
                <div className="gs-alert-stat-label">Payout due</div>
                <div className="gs-alert-stat-val" style={{ color: '#3B6D11' }}>₹140</div>
              </div>
            </div>
            <div className="gs-progress-wrap">
              <div className="gs-progress-label">
                <span>Threshold crossed: 28mm &gt; 20mm</span>
                <span>140%</span>
              </div>
              <div className="gs-progress-bar">
                <div className="gs-progress-fill gs-fill-blue" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* AQI - monitor */}
          <div className="gs-alert-card">
            <div className="gs-alert-header">
              <div className="gs-alert-icon aqi" style={{ fontSize: '18px' }}>🌫</div>
              <div>
                <div className="gs-alert-title">AQI Level — CPCB</div>
                <div className="gs-alert-zone">CH-04 · Chennai South</div>
              </div>
              <div className="gs-alert-status monitor">◐ Monitoring</div>
            </div>
            <div className="gs-alert-body">
              <div className="gs-alert-stat">
                <div className="gs-alert-stat-label">Current AQI</div>
                <div className="gs-alert-stat-val">218</div>
              </div>
              <div className="gs-alert-stat">
                <div className="gs-alert-stat-label">Category</div>
                <div className="gs-alert-stat-val">Poor</div>
              </div>
              <div className="gs-alert-stat">
                <div className="gs-alert-stat-label">Trigger at</div>
                <div className="gs-alert-stat-val">AQI 350</div>
              </div>
            </div>
            <div className="gs-progress-wrap">
              <div className="gs-progress-label">
                <span>AQI 218 of 350 trigger threshold</span>
                <span>62%</span>
              </div>
              <div className="gs-progress-bar">
                <div className="gs-progress-fill gs-fill-amber" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>

          {/* Recent Claims */}
          <div className="gs-section-title" style={{ marginTop: '6px' }}>Recent Claims</div>
          <div className="gs-card">
            <div className="gs-claim-row">
              <div className="gs-claim-icon" style={{ background: '#E6F1FB', fontSize: '14px' }}>🌧</div>
              <div className="gs-claim-info">
                <div className="gs-claim-type">Heavy Rainfall · 3h</div>
                <div className="gs-claim-date">Tue 1 Apr · Velachery</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="gs-claim-amount" style={{ color: '#3B6D11' }}>+₹210</div>
                <div className="gs-claim-badge gs-badge-paid">Paid</div>
              </div>
            </div>
            <div className="gs-claim-row">
              <div className="gs-claim-icon" style={{ background: '#FAEEDA', fontSize: '14px' }}>🌫</div>
              <div className="gs-claim-info">
                <div className="gs-claim-type">AQI Severe · 6h</div>
                <div className="gs-claim-date">Sat 29 Mar · Chennai</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="gs-claim-amount" style={{ color: '#3B6D11' }}>+₹420</div>
                <div className="gs-claim-badge gs-badge-paid">Paid</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Zone map placeholder */}
          <div className="gs-section-title">Zone Risk Map</div>
          <div className="gs-map-placeholder">
            <svg className="gs-map-grid" viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border-tertiary)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="340" height="130" fill="url(#grid)"/>
              <rect x="60" y="20" width="80" height="60" rx="4" fill="#E6F1FB" opacity="0.7"/>
              <rect x="150" y="30" width="90" height="55" rx="4" fill="#FAEEDA" opacity="0.7"/>
              <rect x="250" y="15" width="70" height="70" rx="4" fill="#EAF3DE" opacity="0.7"/>
              <circle cx="100" cy="50" r="5" fill="#185FA5"/>
              <circle cx="195" cy="57" r="5" fill="#BA7517"/>
              <circle cx="285" cy="50" r="5" fill="#3B6D11"/>
              <text x="100" y="80" fontSize="8" textAnchor="middle" fill="#185FA5" fontFamily="monospace">Velachery</text>
              <text x="195" y="96" fontSize="8" textAnchor="middle" fill="#BA7517" fontFamily="monospace">Pallikaranai</text>
              <text x="285" y="96" fontSize="8" textAnchor="middle" fill="#3B6D11" fontFamily="monospace">Adyar</text>
              <circle cx="100" cy="50" r="16" fill="none" stroke="#185FA5" strokeWidth="0.5" strokeDasharray="3,2"/>
            </svg>
            <div className="gs-map-label" style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '10px', color: 'var(--color-text-tertiary)' }}>CH-04 · Real-time overlay</div>
          </div>

          {/* Trigger thresholds */}
          <div className="gs-section-title">Trigger Thresholds</div>
          <div className="gs-card" style={{ marginBottom: '14px' }}>
            <div className="gs-trigger-row">
              <div className="gs-trigger-dot" style={{ background: '#185FA5' }}></div>
              <div className="gs-trigger-name">Rainfall</div>
              <div>
                <div className="gs-trigger-val">28mm/hr</div>
                <div className="gs-trigger-threshold">Trigger: &gt;20mm</div>
              </div>
            </div>
            <div className="gs-trigger-row">
              <div className="gs-trigger-dot" style={{ background: '#BA7517' }}></div>
              <div className="gs-trigger-name">AQI</div>
              <div>
                <div className="gs-trigger-val">218</div>
                <div className="gs-trigger-threshold">Trigger: &gt;350</div>
              </div>
            </div>
          </div>

          {/* Policy tier picker */}
          <div className="gs-section-title">Renewal — Next Monday</div>
          <div className="gs-tier-row">
            <div className={`gs-tier-card ${selectedTier === 'basic' ? 'selected' : ''}`} onClick={() => setSelectedTier('basic')}>
              <div className="gs-tier-name">Basic</div>
              <div className="gs-tier-price">₹29</div>
              <div className="gs-tier-week">/week</div>
              <div className="gs-tier-payout">Max ₹500</div>
              <div className="gs-tier-hrs">4 hrs/day</div>
            </div>
            <div className={`gs-tier-card ${selectedTier === 'standard' ? 'selected' : ''}`} onClick={() => setSelectedTier('standard')}>
              <div className="gs-tier-name">Standard</div>
              <div className="gs-tier-price">₹61</div>
              <div className="gs-tier-week">/week (zone adj.)</div>
              <div className="gs-tier-payout">Max ₹900</div>
              <div className="gs-tier-hrs">6 hrs/day</div>
            </div>
            <div className={`gs-tier-card ${selectedTier === 'pro' ? 'selected' : ''}`} onClick={() => setSelectedTier('pro')}>
              <div className="gs-tier-name">Pro</div>
              <div className="gs-tier-price">₹79</div>
              <div className="gs-tier-week">/week</div>
              <div className="gs-tier-payout">Max ₹1,500</div>
              <div className="gs-tier-hrs">10 hrs/day</div>
            </div>
          </div>

          <button className="gs-action-btn primary" onClick={() => navigate('/policy')}>Renew Option · ₹{selectedTier === 'basic' ? 29 : selectedTier === 'standard' ? 61 : 79} via UPI auto-debit ↗</button>
          <button className="gs-action-btn" onClick={() => navigate('/policy')}>View full policy document</button>

          <div className="gs-divider"></div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', lineHeight: 1.6 }}>Premium adjusted every Monday based on zone flood risk, IMD 7-day forecast, and your fraud score. No human adjudication. Payouts via UPI within minutes of trigger fire.</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
