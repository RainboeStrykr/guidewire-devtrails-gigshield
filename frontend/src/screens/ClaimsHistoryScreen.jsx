import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, History, CheckCircle2, CloudRain } from 'lucide-react';

const ClaimsHistoryScreen = () => {
  const navigate = useNavigate();

  const history = [
    { date: 'Today, 14:45', amount: 210, zone: 'Velanchery', intensity: '25mm/hr', status: 'Credited' },
    { date: 'Mar 28, 2026', amount: 350, zone: 'Saidapet', intensity: '42mm/hr', status: 'Credited' },
    { date: 'Mar 24, 2026', amount: 140, zone: 'Guindy', intensity: '22mm/hr', status: 'Credited' },
    { date: 'Mar 15, 2026', amount: 550, zone: 'Tambaram', intensity: '60mm/hr', status: 'Credited' },
  ];

  return (
    <div className="page-container" style={{ backgroundColor: 'var(--surface-container-low)' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft 
            size={24} 
            onClick={() => navigate('/dashboard')} 
            style={{ cursor: 'pointer', marginRight: '1rem' }} 
          />
          <h2 style={{ fontSize: '1.25rem' }}>Claims History</h2>
        </div>
        <div style={{ padding: '0.5rem', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '0.75rem' }}>
          <Filter size={20} color="var(--primary)" />
        </div>
      </header>

      {/* Aggregate Stats */}
      <div className="card-lowest ghost-border" style={{ padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <p className="text-subtext">Total Payouts to Date</p>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>₹1,250</h2>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#43a047', fontSize: '0.875rem', fontWeight: '700' }}>
          <CheckCircle2 size={16} />
          <span>ALL FUNDS SETTLED</span>
        </div>
      </div>

      {/* Claims List (No Borders, Tonal Shift) */}
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {history.map((claim, idx) => (
          <div 
            key={idx} 
            className="card-lowest" 
            style={{ 
              padding: '1.25rem', 
              borderRadius: '1.25rem', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface-container-low)', borderRadius: '1rem', color: 'var(--primary)' }}>
                <CloudRain size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>₹{claim.amount}</h4>
                <p className="text-subtext">{claim.date}</p>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{claim.zone}</p>
              <p style={{ fontSize: '0.75rem', color: '#43a047', fontWeight: '700' }}>{claim.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="spacer-lg" />
    </div>
  );
};

export default ClaimsHistoryScreen;
