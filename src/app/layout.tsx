// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/dist/client/script';


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
          {children}
          {/* Umami Analytics - Production only */}
          {process.env.NODE_ENV === 'production' && (
            <Script
              src="https://cloud.umami.is/script.js"
              data-website-id="d40ce924-8416-4320-bf60-9c8c3af02963"
              strategy="afterInteractive"
            />
          )}
      </body>
    </html>
  );
}