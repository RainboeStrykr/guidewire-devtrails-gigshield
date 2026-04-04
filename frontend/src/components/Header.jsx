import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Shield } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rider, setRider] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedRider = localStorage.getItem('rider');
    if (savedRider) setRider(JSON.parse(savedRider));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rider');
    localStorage.removeItem('policy');
    navigate('/login');
  };

  const currentPath = location.pathname;

  return (
    <div className="gs-nav" style={{ position: 'relative' }}>
      <div className="gs-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="GigShield Logo" style={{ height: '28px', width: 'auto', marginRight: '4px' }} />
        GigShield
      </div>
      <div className="gs-nav-pills">
        <div className={`gs-pill ${currentPath === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>Dashboard</div>
        <div className={`gs-pill ${currentPath === '/policy' ? 'active' : ''}`} onClick={() => navigate('/policy')}>Policy</div>
        <div className={`gs-pill ${currentPath === '/claims' ? 'active' : ''}`} onClick={() => navigate('/claims')}>Claims</div>
      </div>
      
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <div 
          className="gs-avatar" 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {rider?.name ? rider.name.slice(0, 2).toUpperCase() : 'RK'}
        </div>

        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '40px',
            right: '0',
            width: '180px',
            backgroundColor: 'var(--color-background-primary)',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{rider?.name || 'Rajan Kumar'}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{rider?.platform || 'Delivery Partner'}</div>
            </div>
            
            <div 
              style={{ 
                padding: '10px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                fontSize: '13px', 
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-background-secondary)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              onClick={() => navigate('/policy')}
            >
              <Shield size={16} /> My Coverage
            </div>

            <div 
              style={{ 
                padding: '10px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                fontSize: '13px', 
                color: '#A32D2D',
                cursor: 'pointer',
                borderTop: '0.5px solid var(--color-border-tertiary)',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#FFF5F5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout System
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Header;
