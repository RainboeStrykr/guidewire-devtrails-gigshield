'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (phoneNumber.length >= 10) {
            router.push('/dashboard');
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '1.5rem', boxShadow: '0 4px 60px rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        backgroundColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        <img src="/logo.png" alt="GigShield Logo" style={{ height: '80px', width: 'auto' }} />
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
                    Don&apos;t have an account? <span style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }} onClick={() => router.push('/onboarding')}>Register</span>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
