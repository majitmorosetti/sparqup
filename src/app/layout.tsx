// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
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
          {children}
      </body>
    </html>
  );
}