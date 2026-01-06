// src/app/layout.tsx
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Inter, Fraunces } from 'next/font/google';

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300','400','500', '600', '700', '800'],
  display: 'swap'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

/* const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], 
  variable: '--font-raleway',
  display: 'swap',
}); */

export const metadata: Metadata = {
  title: 'SparqUp',
  description: 'Développement web & automatisation pour TPE/PME',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-body antialiased">
        <Header />
          {children}
        <Footer />
        {/* ✅ Toaster global */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#171717',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}