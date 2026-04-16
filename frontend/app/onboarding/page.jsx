'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, Loader2 } from 'lucide-react';
import { onboardRider, issuePolicy } from '@/lib/api';
import Header from '../components/Header';

const OnboardingScreen = () => {
    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        zone: 'Velachery',
        platform: 'Zepto'
    });

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const riderData = {
                name: user?.fullName || user?.firstName || 'Rider',
                phone: user?.primaryPhoneNumber?.phoneNumber || '',
                zone: formData.zone,
                platform: formData.platform,
            };

            const riderRes = await onboardRider(riderData);
            const policyRes = await issuePolicy({
                riderId: riderRes.rider.id,
                tier: 'Pro'
            });
            localStorage.setItem('rider', JSON.stringify(riderRes.rider));
            localStorage.setItem('policy', JSON.stringify(policyRes.policy));
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to onboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="gs-root">
            <Header />
            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
                <h1 className="gs-heading" style={{ fontFamily: 'Barlow Condensed', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
                    Complete Your Profile
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
                    Welcome, {user?.firstName || 'Rider'}. Select your delivery zone and platform to activate coverage.
                </p>

                <div className="gs-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: '6px', display: 'block' }}>Delivery Zone</label>
                            <select
                                name="zone"
                                value={formData.zone}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', backgroundColor: 'white', fontFamily: 'inherit', fontSize: '14px' }}
                            >
                                <option value="Velachery">Velachery</option>
                                <option value="Adyar">Adyar</option>
                                <option value="Anna Nagar">Anna Nagar</option>
                                <option value="Tambaram">Tambaram</option>
                                <option value="Guindy">Guindy</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: '6px', display: 'block' }}>Platform</label>
                            <select
                                name="platform"
                                value={formData.platform}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)', backgroundColor: 'white', fontFamily: 'inherit', fontSize: '14px' }}
                            >
                                <option value="Zepto">Zepto</option>
                                <option value="Blinkit">Blinkit</option>
                                <option value="Instamart">Swiggy Instamart</option>
                                <option value="BigBasket">BigBasket</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className="gs-action-btn primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                Activate Coverage <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;
