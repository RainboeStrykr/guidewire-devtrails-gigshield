'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ChevronLeft, Zap } from 'lucide-react';
import Header from '../components/Header';

const TriggerAlertScreen = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [rider, setRider] = useState(null);

    useEffect(() => {
        const savedRider = localStorage.getItem('rider');
        if (savedRider) setRider(JSON.parse(savedRider));

        const timer = setInterval(() => {
            setStep(prev => (prev < 4 ? prev + 1 : 4));
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="gs-root">
            <Header />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                    <ChevronLeft size={24} onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer', marginRight: '12px' }} />
                    <div className="gs-rider-name" style={{ fontSize: '22px', marginBottom: 0 }}>System Trigger - Active Monitor</div>
                </div>

                <div className="gs-body" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
                    <div>
                        <div className="gs-alert-card" style={{ border: '1px solid #BA7517', background: '#FFFBF2' }}>
                            <div className="gs-alert-header" style={{ background: 'transparent' }}>
                                <div className="gs-alert-icon heat" style={{ background: '#FCEBEB', color: '#791F1F' }}>
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <div className="gs-alert-title" style={{ color: '#BA7517', fontWeight: 800 }}>HAZARD TRIGGER DETECTED</div>
                                    <div className="gs-alert-zone">Station CH-04 - {rider?.zone || 'Velachery'}</div>
                                </div>
                                <div className="gs-alert-status active" style={{ animation: 'pulse-bg 2s infinite' }}>EMERGENCY</div>
                            </div>
                            <div className="gs-alert-body" style={{ padding: '24px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                <div className="gs-alert-stat">
                                    <div className="gs-alert-stat-label">Intensity Recorded</div>
                                    <div className="gs-mono" style={{ fontSize: '32px', fontWeight: 500 }}>28<span style={{ fontSize: '14px' }}>mm/h</span></div>
                                </div>
                                <div className="gs-alert-stat" style={{ textAlign: 'right' }}>
                                    <div className="gs-alert-stat-label">Threshold Delta</div>
                                    <div className="gs-mono" style={{ fontSize: '32px', fontWeight: 500, color: '#3B6D11' }}>+8<span style={{ fontSize: '14px' }}>mm</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="gs-section-title" style={{ marginTop: '20px' }}>Parametric Payout Pipeline</div>
                        <div className="gs-card" style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: step >= 1 ? 1 : 0.3 }}>
                                    <div style={{ color: step >= 1 ? '#3B6D11' : 'var(--color-text-tertiary)' }}><CheckCircle2 size={24} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '15px' }}>Atmospheric Verification</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Confirmed via IMD Satellite and Ground Station 402</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: step >= 2 ? 1 : 0.3 }}>
                                    <div style={{ color: step >= 2 ? '#3B6D11' : 'var(--color-text-tertiary)' }}><CheckCircle2 size={24} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '15px' }}>Smart Contract Execution</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Policy logic applied: Standard Tier - Rs.70/30min</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: step >= 3 ? 1 : 0.3 }}>
                                    <div style={{ color: step >= 3 ? '#3B6D11' : 'var(--color-text-tertiary)' }}><CheckCircle2 size={24} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '15px' }}>Fraud &amp; Integrity Check</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Location proof verified via Blinkit Partner GPS</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: step >= 4 ? 1 : 0.3 }}>
                                    <div style={{ color: step >= 4 ? '#3B6D11' : 'var(--color-text-tertiary)' }}><CheckCircle2 size={24} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '15px' }}>Instant UPI Settlement</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Transferring Rs.210 to registered VPA</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <div className="gs-progress-label">
                                    <span>Settlement Progress</span>
                                    <span>{Math.round((step / 4) * 100)}%</span>
                                </div>
                                <div className="gs-progress-bar" style={{ height: '8px' }}>
                                    <div className="gs-progress-fill gs-fill-blue" style={{ width: `${(step / 4) * 100}%`, height: '100%', transition: 'width 1s ease' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="gs-section-title">Live Weather Feed</div>
                        <div className="gs-card" style={{ height: '200px', background: '#000', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src="https://images.unsplash.com/photo-1534204293159-aa8c5f2cdd73?q=80&w=320&h=200&fit=crop"
                                alt="Rain feed"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                            />
                            <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '6px', height: '6px', background: '#FF0000', borderRadius: '50%', animation: 'pulse-dot 1s infinite' }}></div>
                                <div className="gs-mono" style={{ fontSize: '10px', color: '#fff', fontWeight: 700 }}>REC CH-04</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#fff', textAlign: 'right' }}>
                                <div className="gs-mono" style={{ fontSize: '9px', opacity: 0.8 }}>LAT: 12.9815</div>
                                <div className="gs-mono" style={{ fontSize: '9px', opacity: 0.8 }}>LNG: 80.2185</div>
                            </div>
                        </div>

                        <div className="gs-section-title" style={{ marginTop: '20px' }}>Coverage Stats</div>
                        <div className="gs-card" style={{ padding: '16px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>Active Session</div>
                            <div className="gs-mono" style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>1h 40m</div>

                            <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>Payout Earned</div>
                            <div className="gs-mono" style={{ fontSize: '18px', fontWeight: 500, color: '#3B6D11' }}>Rs.140.00</div>

                            <div className="gs-divider"></div>

                            <button
                                className="gs-action-btn primary"
                                onClick={() => router.push('/dashboard')}
                                style={{ marginBottom: 0 }}
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse-bg {
          0% { background: #EAF3DE; }
          50% { background: #FFDADA; }
          100% { background: #EAF3DE; }
        }
      `}</style>
        </div>
    );
};

export default TriggerAlertScreen;
