import './globals.css';
import './gs-styles.css';

export const metadata = {
    title: 'GigShield | The Guardian for Gig Professionals',
    description: 'Parametric insurance for gig workers. Automatic payouts for weather-related income loss, powered by real-time Guidewire data.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/logo.png" />
            </head>
            <body style={{ backgroundColor: '#f7f9fc' }}>
                {children}
            </body>
        </html>
    );
}
