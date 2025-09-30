// src/app/layout.tsx
import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/shared/Header"

const geistSans = localFont({
  src: [
    { path: "./fonts/geist/Geist-Regular.woff2",   weight: "400", style: "normal" },
    { path: "./fonts/geist/Geist-SemiBold.woff2",  weight: "600", style: "normal" },
    // { path: "./fonts/geist/Geist-Bold.woff2",   weight: "700", style: "normal" }, // si tu l’ajoutes
  ],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = localFont({
  src: [{ path: "./fonts/geist/GeistMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var stored = localStorage.getItem('theme'); // 'dark' ou 'light'
    if (stored === 'dark') document.documentElement.classList.add('dark');
    // sinon on reste en clair, point.
  } catch (e) {}
})();
`,
          }}
        />
      </head>
  <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}
