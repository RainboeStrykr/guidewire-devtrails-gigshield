'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Shield, Calendar, Clock, DollarSign, CloudRain } from 'lucide-react';
import Header from '../components/Header';

const MyCoverageScreen = () => {
    const router = useRouter();
    const [rider, setRider] = useState(null);
    const [policy, setPolicy] = useState(null);

    useEffect(() => {
        const savedRider = localStorage.getItem('rider');
        const savedPolicy = localStorage.getItem('policy');
        if (savedRider) setRider(JSON.parse(savedRider));
        if (savedPolicy) setPolicy(JSON.parse(savedPolicy));
    }, []);

    return (
        <div className="gs-root">
            <Header />

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <ChevronLeft size={24} onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer', marginRight: '12px' }} />
                    <div>
                        <div className="gs-rider-name" style={{ fontSize: '24px', marginBottom: 2 }}>Detailed Coverage</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>ID: {policy?.id || 'GS-8829-X'} - Verified Protection</div>
                    </div>
                </div>

                <div className="gs-body" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div className="gs-card" style={{ padding: '24px', borderLeft: '4px solid #3B6D11' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ background: '#EAF3DE', color: '#27500A', padding: '8px', borderRadius: '10px' }}>
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '18px' }}>Guardian {policy?.tier || 'Pro'}</div>
                                        <div style={{ fontSize: '12px', color: '#3B6D11', fontWeight: 600 }}>ACTIVE - NO RECOVERY NEEDED</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="gs-mono" style={{ fontSize: '20px', fontWeight: 500 }}>Rs.{policy?.premium || '29'}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Weekly via UPI Auto</div>
                                </div>
                            </div>

                            <div className="gs-divider"></div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <div className="gs-section-title" style={{ fontSize: '11px' }}>Maximum Benefit</div>
                                    <div className="gs-mono" style={{ fontSize: '22px', color: 'var(--color-text-primary)' }}>Rs.{policy?.maxCoverage || '4,500'}</div>
                                </div>
                                <div>
                                    <div className="gs-section-title" style={{ fontSize: '11px' }}>Protection Zone</div>
                                    <div style={{ fontSize: '14px', fontWeight: 600 }}>CH-04 - {rider?.zone || 'Velachery'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="gs-section-title">Enforcement Logic</div>
                        <div className="gs-card" style={{ padding: '24px' }}>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '14px' }}>
                                    <div style={{ color: '#BA7517' }}><Calendar size={18} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>Weekly Cycle</div>
                                        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>Starts Monday 00:00 - Ends Sunday 23:59</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '14px' }}>
                                    <div style={{ color: '#185FA5' }}><Clock size={18} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>Active Peak Monitoring</div>
                                        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>60 hrs/week - Priority detection during surge hours</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '14px' }}>
                                    <div style={{ color: '#3B6D11' }}><DollarSign size={18} /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>Settlement VPA</div>
                                        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>{rider?.phone ? `${rider.phone}@axl` : '8927x-upi@googlepay'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="gs-section-title">Trigger Thresholds</div>
                        <div className="gs-card">
                            <div className="gs-trigger-row" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#E6F1FB', padding: '10px', borderRadius: '8px' }}><CloudRain size={20} color="#185FA5" /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>Rainfall</div>
                                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Trigger: &gt;20mm/hr</div>
                                    </div>
                                </div>
                            </div>
                            <div className="gs-trigger-row" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#FAEEDA', padding: '10px', borderRadius: '8px' }}>AQI</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>AQI Extreme</div>
                                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Trigger: &gt;350 Level</div>
                                    </div>
                                </div>
                            </div>
                            <div className="gs-trigger-row" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#FAECE7', padding: '10px', borderRadius: '8px' }}>HW</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>Heatwave</div>
                                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Trigger: &gt;42 C</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="gs-section-title" style={{ marginTop: '24px' }}>Contract Compliance</div>
                        <div className="gs-card" style={{ padding: '20px', background: '#f9f9f9', borderStyle: 'dashed' }}>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                Your payout is calculated using an <strong>XGBoost Model</strong> for premium adjustments and a <strong>Smart Contract</strong> for verification.
                                Your fraud score (current: 12/100) is within the safe range for automated payouts.
                            </div>
                        </div>

                        <button
                            className="gs-action-btn"
                            style={{ marginTop: '20px', background: 'var(--color-background-primary)' }}
                            onClick={() => alert("Verification code: " + Math.random().toString(36).substring(7).toUpperCase())}
                        >
                            Verify Station Proximity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCoverageScreen;
