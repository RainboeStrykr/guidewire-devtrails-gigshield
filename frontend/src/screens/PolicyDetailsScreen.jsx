import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Info, Shield, CheckCircle2 } from 'lucide-react';

const PolicyDetailsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ backgroundColor: 'var(--surface-container-low)' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <ChevronLeft 
          size={24} 
          onClick={() => navigate('/dashboard')} 
          style={{ cursor: 'pointer', marginRight: '1rem' }} 
        />
        <h2 style={{ fontSize: '1.25rem' }}>Policy Strategy</h2>
      </header>

      {/* Main Policy Card */}
      <div className="card-lowest status-shield" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 className="text-headline">Guardian Pro</h3>
            <p className="text-subtext">Policy #GS-8829-X</p>
          </div>
          <div style={{ backgroundColor: 'var(--primary-container)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700' }}>
            ACTIVE
          </div>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: 'var(--surface-container-low)', borderRadius: '1rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="text-subtext">Monthly Premium</span>
            <span style={{ fontWeight: '700' }}>₹299</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-subtext">Max Coverage</span>
            <span style={{ fontWeight: '700' }}>₹4,500</span>
          </div>
        </div>
      </div>

      {/* Coverage Logic Section */}
      <h3 className="text-headline" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Coverage Logic</h3>
      <div className="card-lowest ghost-border" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
        <p className="text-subtext" style={{ marginBottom: '1.5rem' }}>
          Your earnings are protected based on real-time atmospheric data from verified Guidewire stations.
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><CheckCircle2 size={18} /></div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Rainfall Trigger</p>
              <p className="text-subtext">Payout starts at intensity &gt; 20mm/hr in your active delivery zone.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><CheckCircle2 size={18} /></div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Payout Scale</p>
              <p className="text-subtext">₹70 for every 30 minutes of intensity above threshold.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><CheckCircle2 size={18} /></div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Automatic Settlement</p>
              <p className="text-subtext">No claim forms required. Funds transferred to UPI instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Links */}
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <div className="card-lowest" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderRadius: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={20} color="var(--primary)" />
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Policy Terms & Conditions</span>
          </div>
          <ChevronLeft size={18} style={{ transform: 'rotate(180deg)', opacity: 0.3 }} />
        </div>
        <div className="card-lowest" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderRadius: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Info size={20} color="var(--primary)" />
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Help Center & FAQs</span>
          </div>
          <ChevronLeft size={18} style={{ transform: 'rotate(180deg)', opacity: 0.3 }} />
        </div>
      </div>

      <div className="spacer-lg" />
    </div>
  );
};

export default PolicyDetailsScreen;
