import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react';
import { onboardRider, issuePolicy } from '../services/api';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zone: 'Velachery',
    platform: 'Zepto'
  });

  const steps = [
    {
      title: "Protect Your Daily Income",
      description: "Parametric insurance covers you automatically when conditions (like heavy rain) affect your ability to deliver.",
      icon: <img src="/logo.png" alt="GigShield Logo" style={{ height: '60px', width: 'auto' }} />
    },
    {
      title: "Real-time Thresholds",
      description: "We monitor local weather stations. If rainfall exceeds 20mm/hr in your active zone, you get paid instantly.",
      icon: <CheckCircle2 size={48} />
    },
    {
      title: "Your Details",
      description: "Let's set up your profile.",
      icon: <CheckCircle2 size={48} />,
      isForm: true
    }
  ];

  const handleNext = async () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      try {
        setLoading(true);
        const riderRes = await onboardRider(formData);
        const policyRes = await issuePolicy({
          riderId: riderRes.rider.id,
          tier: 'Pro'
        });
        // Save to local storage for demo purposes
        localStorage.setItem('rider', JSON.stringify(riderRes.rider));
        localStorage.setItem('policy', JSON.stringify(policyRes.policy));
        navigate('/dashboard');
      } catch (error) {
        console.error("Failed to onboard:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '1.5rem', boxShadow: '0 4px 60px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80vh' }}>
      <div style={{ marginTop: '0' }}>
        <ChevronLeft size={24} onClick={() => navigate('/login')} style={{ cursor: 'pointer', marginBottom: '2rem' }} />
        
        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
          {steps[step-1].icon}
        </div>
        
        <h1 className="text-display" style={{ marginBottom: '1.5rem', lineHeight: '1.2' }}>
          {steps[step-1].title}
        </h1>
        
        <p className="text-subtext" style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
          {steps[step-1].description}
        </p>

        {steps[step-1].isForm && (
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
              style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={handleInputChange}
              style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}
            />
            <select 
              name="zone"
              value={formData.zone}
              onChange={handleInputChange}
              style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'white' }}
            >
              <option value="Velachery">Velachery</option>
              <option value="Adyar">Adyar</option>
              <option value="Anna Nagar">Anna Nagar</option>
            </select>
            <select 
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', backgroundColor: 'white' }}
            >
              <option value="Zepto">Zepto</option>
              <option value="Blinkit">Blinkit</option>
              <option value="Instamart">Swiggy Instamart</option>
            </select>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {steps.map((_, i) => (
            <div 
              key={i} 
              style={{ 
                width: i + 1 === step ? '2rem' : '0.5rem', 
                height: '0.5rem', 
                backgroundColor: i + 1 === step ? 'var(--primary)' : 'var(--outline-variant)', 
                borderRadius: '9999px',
                transition: 'width 0.3s ease'
              }} 
            />
          ))}
        </div>

        <button 
          className="btn-primary" 
          onClick={handleNext}
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {loading ? (
             <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              {step === steps.length ? 'GET STARTED' : 'CONTINUE'}
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
