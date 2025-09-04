import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collins - Frontend Developer Portfolio",
  description:
    "Frontend Developer specializing in React, Next.js, and modern web technologies. Building exceptional user experiences with cutting-edge tools.",
  keywords:
    "frontend developer, react, nextjs, typescript, portfolio, web development",
  authors: [{ name: "Collins" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-16.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Collins - Frontend Developer Portfolio",
    description:
      "Frontend Developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
    images: [
      {
        url: "/icon-192.svg",
        width: 192,
        height: 192,
        alt: "Collins - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Collins - Frontend Developer Portfolio",
    description:
      "Frontend Developer specializing in React, Next.js, and modern web technologies.",
    images: ["/icon-192.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = savedTheme || systemTheme;
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <ToastProvider>
            {children}
            <MobileBottomNav />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
