// src/app/layout.tsx
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/header/Header";

const geistSans = localFont({
  src: [
    {
      path: "./fonts/geist/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/geist/Geist-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "./fonts/geist/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  (function () {
                    try {
                      var stored = localStorage.getItem('theme');
                      if (stored === 'dark') document.documentElement.classList.add('dark');
                    } catch (e) {}
                  })();
                  `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-clip">
        {/* Header en position: fixed (dans ton composant) */}
        <Header />

        {/* Spacer pour fixed: utilise --header-h (définie via ResizeObserver dans Header) */}
        <main id="main" style={{ paddingTop: "var(--header-h, 56px)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
