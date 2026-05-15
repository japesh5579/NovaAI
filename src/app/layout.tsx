import "./globals.css";
import SplashScreen from "@/components/splash-screen";
import ChatWidget from "@/components/ui/chat-widget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Nova AICode Studio — Rajat Gupta</title>
        <meta name="description" content="Full-Stack Development · AI Integration · Creative Digital Services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1E3A73" />
        <meta name="color-scheme" content="light dark" />

        {/* Favicons */}
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <link rel="shortcut icon" href="/logo.png" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* OG / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nova AICode Studio — Rajat Gupta" />
        <meta property="og:description" content="Full-Stack Development · AI Integration · Creative Digital Services" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Nova AICode Studio — Rajat Gupta" />
        <meta name="twitter:description" content="Full-Stack Development · AI Integration · Creative Digital Services" />
        <meta name="twitter:image" content="/logo.png" />
      </head>
      <body>
        <SplashScreen />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
