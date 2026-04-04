import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Protect Your Daily Income",
      description: "Parametric insurance covers you automatically when conditions (like heavy rain) affect your ability to deliver.",
      icon: <ShieldCheck size={48} />
    },
    {
      title: "Real-time Thresholds",
      description: "We monitor local weather stations. If rainfall exceeds 20mm/hr in your active zone, you get paid instantly.",
      icon: <CheckCircle2 size={48} />
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="page-container" style={{ justifyContent: 'space-between' }}>
      <div style={{ marginTop: '2rem' }}>
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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {step === steps.length ? 'GET STARTED' : 'CONTINUE'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
