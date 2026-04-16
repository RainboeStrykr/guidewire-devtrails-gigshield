import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--surface)',
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <img src="/logo.png" alt="GigShield Logo" style={{ height: '60px', width: 'auto', marginBottom: '1rem' }} />
                    <h1 className="text-display" style={{ fontSize: '1.75rem' }}>GigShield</h1>
                    <p className="text-subtext">Join the Guardian Network</p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: { width: '100%', maxWidth: '400px' },
                            card: { boxShadow: '0 4px 60px rgba(0,0,0,0.05)', borderRadius: '1.25rem' },
                        },
                    }}
                />
            </div>
        </div>
    );
}
