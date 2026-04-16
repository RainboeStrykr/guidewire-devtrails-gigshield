'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import { Shield } from 'lucide-react';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <div className="gs-nav" style={{ position: 'relative' }}>
            <div className="gs-logo" onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="GigShield Logo" style={{ height: '28px', width: 'auto', marginRight: '4px' }} />
                GigShield
            </div>
            <div className="gs-nav-pills">
                <div className={`gs-pill ${pathname === '/dashboard' ? 'active' : ''}`} onClick={() => router.push('/dashboard')}>Dashboard</div>
                <div className={`gs-pill ${pathname === '/policy' ? 'active' : ''}`} onClick={() => router.push('/policy')}>Policy</div>
                <div className={`gs-pill ${pathname === '/claims' ? 'active' : ''}`} onClick={() => router.push('/claims')}>Claims</div>
                <div className={`gs-pill ${pathname === '/mycoverage' ? 'active' : ''}`} onClick={() => router.push('/mycoverage')}>
                    <Shield size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    Coverage
                </div>
            </div>

            <UserButton
                afterSignOutUrl="/sign-in"
                appearance={{
                    elements: {
                        avatarBox: { width: '32px', height: '32px' },
                    },
                }}
            />
        </div>
    );
};

export default Header;
