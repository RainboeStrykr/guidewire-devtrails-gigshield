import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="page-container" style={{ justifyContent: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          backgroundColor: 'var(--primary-container)', 
          color: 'var(--on-primary)', 
          padding: '1.25rem', 
          borderRadius: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <ShieldCheck size={48} />
        </div>
        <h1 className="text-display">GigShield</h1>
        <p className="text-subtext">The Guardian for Gig Professionals</p>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>Phone Number</label>
          <input 
            type="tel" 
            placeholder="+91 98765 43210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--outline-variant)',
              backgroundColor: 'var(--surface-container-low)',
              marginTop: '0.5rem',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button type="submit" className="btn-primary">
          SECURE LOGIN
        </button>
      </form>

      <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
        Don't have an account? <span style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }} onClick={() => navigate('/onboarding')}>Register</span>
      </p>
    </div>
  );
};

export default LoginScreen;
