import type { Metadata } from 'next';
import '../globals.css';
import { Inter, Fraunces } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'SparqUp',
  description: 'Développement web & automatisation pour TPE/PME',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // ✅ Await params avant de l'utiliser
  const { locale } = await params;

  // Valide que la locale est supportée
  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        
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