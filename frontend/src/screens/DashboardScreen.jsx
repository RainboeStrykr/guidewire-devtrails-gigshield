import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, TrendingUp, History, User, MapPin, CloudRain } from 'lucide-react';

const DashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ paddingBottom: '5rem' }}>
      {/* Header */}
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="text-subtext">Welcome back, Rajesh</p>
          <h2 style={{ fontSize: '1.75rem' }}>The Guardian</h2>
        </div>
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface-container-low)', borderRadius: '1rem', color: 'var(--primary)' }}>
          <User size={24} />
        </div>
      </header>

      {/* Primary Stat Card */}
      <div className="primary-gradient" style={{ padding: '2rem', borderRadius: '1.5rem', color: 'var(--on-primary)', marginBottom: '1.5rem' }}>
        <p style={{ opacity: 0.8, fontSize: '0.875rem', fontWeight: '500' }}>Active Earnings Protection</p>
        <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>₹4,500 <span style={{ fontSize: '1rem', opacity: 0.8 }}>max payout</span></h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: '9999px', alignSelf: 'flex-start', display: 'inline-flex' }}>
          <Shield size={16} />
          <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>COVERAGE ACTIVE</span>
        </div>
      </div>

      {/* Info Grid (No Borders, Tonal Shift) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card-low" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
          <p className="text-subtext">Todays Rainfall</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <CloudRain size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>12.5 <span style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>mm</span></h3>
          </div>
        </div>
        <div className="card-low" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
          <p className="text-subtext">Payouts History</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <History size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>₹1,250</h3>
          </div>
        </div>
      </div>

      {/* Live Monitoring Section */}
      <div className="card-lowest ghost-border" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="text-headline">Live Zone Status</h3>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', backgroundColor: 'var(--surface-container-low)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
            VELACHERY
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '4rem', height: '4rem', backgroundColor: 'var(--surface-container-low)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <MapPin size={24} />
          </div>
          <div>
            <p style={{ fontWeight: '600' }}>Zone 4 Station</p>
            <p className="text-subtext">Status: <strong>Moderate Rain</strong></p>
            <p className="text-subtext" style={{ fontSize: '0.7rem' }}>Trigger Threshold: <strong>20mm/hr</strong></p>
          </div>
        </div>
        <button 
          className="btn-action" 
          style={{ marginTop: '1.5rem' }}
          onClick={() => navigate('/trigger')}
        >
          VIEW REAL-TIME ALERT
        </button>
      </div>

      {/* Navigation Footer */}
      <nav className="glassmorphism" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', maxWidth: '390px', margin: '0 auto', borderTop: '1px solid var(--outline-variant)' }}>
        <div style={{ color: 'var(--primary)' }} onClick={() => navigate('/dashboard')}><Shield size={24} /></div>
        <div style={{ opacity: 0.4 }} onClick={() => navigate('/policy')}><TrendingUp size={24} /></div>
        <div style={{ opacity: 0.4 }} onClick={() => navigate('/claims')}><History size={24} /></div>
        <div style={{ opacity: 0.4 }} onClick={() => navigate('/login')}><User size={24} /></div>
      </nav>
    </div>
  );
};

export default DashboardScreen;
