import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Info, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import '../gs-styles.css';

const PolicyDetailsScreen = () => {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [rider, setRider] = useState(null);

  useEffect(() => {
    const savedPolicy = localStorage.getItem('policy');
    const savedRider = localStorage.getItem('rider');
    if (savedPolicy) setPolicy(JSON.parse(savedPolicy));
    if (savedRider) setRider(JSON.parse(savedRider));
  }, []);

  const handleDownload = (label) => {
    alert(`Generating ${label}... Success! Check your downloads.`);
  };

  return (
    <div className="gs-root">
      <Header />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <ChevronLeft 
            size={24} 
            onClick={() => navigate('/dashboard')} 
            style={{ cursor: 'pointer', marginRight: '12px' }} 
          />
          <div className="gs-rider-name" style={{ fontSize: '22px', marginBottom: 0 }}>Policy Strategy</div>
        </div>

        <div className="gs-body" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          {/* Main Content */}
          <div>
            <div className="gs-section-title">Coverage Logic</div>
            <div className="gs-card" style={{ padding: '24px' }}>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                Your earnings are protected based on real-time atmospheric data from verified Guidewire stations. 
                Our parametric triggers ensure instant payouts without manual claims.
              </p>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ color: '#BA7517', marginTop: '2px' }}><CheckCircle2 size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Rainfall Trigger</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Payout starts at intensity &gt; 20mm/hr in your active delivery zone.</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ color: '#BA7517', marginTop: '2px' }}><CheckCircle2 size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Payout Scale</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>₹70 for every 30 minutes of intensity above threshold.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ color: '#BA7517', marginTop: '2px' }}><CheckCircle2 size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Automatic Settlement</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>No claim forms required. Funds transferred to UPI instantly.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gs-section-title" style={{ marginTop: '30px' }}>Documents & Support</div>
            <div className="gs-card">
              <div className="gs-claim-row" style={{ cursor: 'pointer' }} onClick={() => handleDownload('Policy T&C')}>
                <div className="gs-claim-icon" style={{ background: 'var(--color-background-secondary)' }}><FileText size={14} /></div>
                <div className="gs-claim-info">
                  <div className="gs-claim-type">Policy Terms & Conditions</div>
                  <div className="gs-claim-date">PDF Document · 1.2MB</div>
                </div>
                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)', opacity: 0.4 }} />
              </div>
              <div className="gs-claim-row" style={{ cursor: 'pointer' }} onClick={() => navigate('/faq')}>
                <div className="gs-claim-icon" style={{ background: 'var(--color-background-secondary)' }}><Info size={14} /></div>
                <div className="gs-claim-info">
                  <div className="gs-claim-type">Help Center & FAQs</div>
                  <div className="gs-claim-date">Knowledge Base</div>
                </div>
                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)', opacity: 0.4 }} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="gs-section-title">Active Schedule</div>
            <div className="gs-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="gs-policy-tier" style={{ fontSize: '20px' }}>Guardian {policy?.tier || 'Pro'}</div>
                <div className="gs-badge-paid gs-claim-badge" style={{ padding: '4px 8px', fontSize: '10px' }}>ACTIVE</div>
              </div>
              
              <div className="gs-mono" style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                ID: {policy?.id || 'GS-8829-X'}
              </div>

              <div className="gs-divider"></div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Weekly Premium</span>
                  <span className="gs-mono" style={{ fontSize: '13px', fontWeight: 500 }}>₹{policy?.premium || '29'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Max Coverage</span>
                  <span className="gs-mono" style={{ fontSize: '13px', fontWeight: 500 }}>₹{policy?.maxCoverage || '4,500'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Renew Date</span>
                  <span className="gs-mono" style={{ fontSize: '13px', fontWeight: 500 }}>Apr 07, 2026</span>
                </div>
              </div>

              <button className="gs-action-btn primary" style={{ marginTop: '24px', marginBottom: 0 }} onClick={() => handleDownload('Insurance Certificate')}>Download Certificate</button>
            </div>

            <div className="gs-card" style={{ padding: '16px', background: '#FFFBF2', borderColor: '#F2E2C2' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#633806', marginBottom: '4px' }}>Parametric Guarantee</div>
              <div style={{ fontSize: '11px', color: '#835500', lineHeight: 1.5 }}>
                Your payout is mathematically guaranteed by smart contracts when atmospheric conditions are met. 
                No manual approval needed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsScreen;
