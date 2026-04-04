import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudRain, CheckCircle2, ChevronLeft, MapPin, Zap } from 'lucide-react';

const TriggerAlertScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Simulate progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) setStep(step + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="page-container" style={{ backgroundColor: 'var(--surface-container-low)' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <ChevronLeft 
          size={24} 
          onClick={() => navigate('/dashboard')} 
          style={{ cursor: 'pointer', marginRight: '1rem' }} 
        />
        <h2 style={{ fontSize: '1.25rem' }}>Live Alert</h2>
      </header>

      {/* Alert Card */}
      <div className="card-lowest status-shield" style={{ marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(131, 85, 0, 0.1)', borderRadius: '1rem', color: 'var(--secondary)' }}>
            <Zap size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--secondary)', fontSize: '1rem', fontWeight: '800' }}>TRIGGER DETECTED</h3>
            <p className="text-subtext">Heavy Rainfall in your zone</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-container-low)', padding: '1rem', borderRadius: '1rem' }}>
          <div>
            <p className="text-subtext">Current intensity</p>
            <h4 style={{ fontSize: '1.5rem' }}>25 <span style={{ fontSize: '0.875rem' }}>mm/hr</span></h4>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="text-subtext">Zone</p>
            <h4 style={{ fontSize: '1rem' }}>Velachery, Zone 4</h4>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="card-lowest ghost-border" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 className="text-headline" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Payout Progress</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: step >= 1 ? 1 : 0.4 }}>
            <CheckCircle2 size={24} color={step >= 1 ? 'var(--primary)' : 'var(--outline)'} />
            <div>
              <p style={{ fontWeight: '600' }}>Trigger Verified</p>
              <p className="text-subtext">Data confirmed from station 402</p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: step >= 2 ? 1 : 0.4 }}>
            <CheckCircle2 size={24} color={step >= 2 ? 'var(--primary)' : 'var(--outline)'} />
            <div>
              <p style={{ fontWeight: '600' }}>Claim Approved</p>
              <p className="text-subtext">Earnings impact calculated</p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: step >= 3 ? 1 : 0.4 }}>
            <CheckCircle2 size={24} color={step == 3 ? '#43a047' : 'var(--outline)'} />
            <div>
              <p style={{ fontWeight: '600' }}>Payout Initiated</p>
              <p className="text-subtext">Transferring ₹210 to GPay ID</p>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div style={{ marginTop: '2rem' }}>
          <div className="payout-progress">
            <div 
              className="payout-progress-fill" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Live Feed Section */}
      <div className="card-lowest ghost-border" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#ba1a1a', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
          <p style={{ fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live weather feed</p>
        </div>
        <div style={{ backgroundColor: 'var(--primary)', width: '100%', height: '180px', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
          {/* Placeholder for GenAI generated image */}
          <img src="https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?q=80&w=390&h=180&fit=crop" alt="Rainy Chennai Station" style={{ opacity: 0.6, width: '100%', height: '100%', objectFit: 'crop' }} />
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: 'white' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: '700' }}>VELACHERY STATION ZONE 4</p>
            <p style={{ fontSize: '0.65rem', opacity: 0.8 }}>Recorded: Todayat 14:45</p>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={() => navigate('/dashboard')}>
        BACK TO DASHBOARD
      </button>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TriggerAlertScreen;
