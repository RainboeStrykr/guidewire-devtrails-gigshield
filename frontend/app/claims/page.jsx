'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Filter, CheckCircle2, CloudRain } from 'lucide-react';
import Header from '../components/Header';

const ClaimsHistoryScreen = () => {
    const router = useRouter();
    const [rider, setRider] = useState(null);

    useEffect(() => {
        const savedRider = localStorage.getItem('rider');
        if (savedRider) setRider(JSON.parse(savedRider));
    }, []);

    const history = [
        { date: 'Today, 14:45', amount: 210, zone: 'Velanchery', intensity: '25mm/hr', status: 'Credited' },
        { date: 'Mar 28, 2026', amount: 350, zone: 'Saidapet', intensity: '42mm/hr', status: 'Credited' },
        { date: 'Mar 24, 2026', amount: 140, zone: 'Guindy', intensity: '22mm/hr', status: 'Credited' },
        { date: 'Mar 15, 2026', amount: 550, zone: 'Tambaram', intensity: '60mm/hr', status: 'Credited' },
    ];

    const handleDownload = (label) => {
        alert(`Generating ${label}... Success! Check your downloads.`);
    };

    return (
        <div className="gs-root">
            <Header />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ChevronLeft size={24} onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer', marginRight: '12px' }} />
                        <div className="gs-rider-name" style={{ fontSize: '22px', marginBottom: 0 }}>Claims History</div>
                    </div>
                    <div style={{ padding: '8px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer' }} onClick={() => alert('Filter options: Rain, AQI, Heat.')}>
                        <Filter size={18} color="var(--color-text-secondary)" />
                    </div>
                </div>

                <div className="gs-card" style={{ padding: '30px', textAlign: 'center', marginBottom: '30px', background: 'var(--color-background-primary)' }}>
                    <div className="gs-section-title" style={{ marginBottom: '8px' }}>Total Payouts to Date</div>
                    <div className="gs-mono" style={{ fontSize: '42px', fontWeight: 500, color: 'var(--color-text-primary)' }}>Rs.{history.reduce((acc, c) => acc + c.amount, 0).toLocaleString()}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: '#3B6D11', fontSize: '13px', fontWeight: 600 }}>
                        <CheckCircle2 size={16} />
                        <span style={{ letterSpacing: '0.05em' }}>ALL FUNDS SETTLED TO UPI</span>
                    </div>
                </div>

                <div className="gs-section-title">Settlement Log</div>
                <div className="gs-card">
                    {history.map((claim, idx) => (
                        <div
                            key={idx}
                            className="gs-claim-row"
                            style={{ padding: '16px 20px' }}
                        >
                            <div className="gs-claim-icon" style={{ background: '#E6F1FB', width: '40px', height: '40px', fontSize: '18px' }}>
                                <CloudRain size={20} color="#185FA5" />
                            </div>
                            <div className="gs-claim-info" style={{ marginLeft: '14px' }}>
                                <div className="gs-claim-type" style={{ fontSize: '15px' }}>Heavy Rainfall - {claim.intensity}</div>
                                <div className="gs-claim-date">{claim.date} - {claim.zone}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="gs-mono" style={{ fontSize: '16px', fontWeight: 500, color: '#3B6D11' }}>+Rs.{claim.amount}</div>
                                <div className="gs-badge-paid gs-claim-badge" style={{ marginTop: '4px' }}>CREDITED</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <button className="gs-action-btn" style={{ width: 'auto', padding: '10px 24px', fontSize: '12px' }} onClick={() => handleDownload('Historical Payout Statement')}>Download Statement (Last 30 Days)</button>
                </div>
            </div>
        </div>
    );
};

export default ClaimsHistoryScreen;
