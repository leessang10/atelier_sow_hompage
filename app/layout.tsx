import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ateliersow.com'),
  title: {
    template: '%s | Atelier SOW',
    default: 'Atelier SOW | Sound Of Wise',
  },
  description: "아틀리에 소우(Atelier SOW)는 자연과 삶의 간극을 메우며, 건축의 본질에 집중하는 공간을 만듭니다.",
  keywords: ['건축', '인테리어', '공간디자인', '아틀리에소우', 'Atelier SOW', '건축사무소', '서울 건축가', '단독주택', '상가주택'],
  authors: [{ name: 'Atelier SOW', url: 'https://www.ateliersow.com' }],
  creator: 'Atelier SOW',
  publisher: 'Atelier SOW',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Atelier SOW | Sound Of Wise',
    description: "아틀리에 소우(Atelier SOW)는 자연과 삶의 간극을 메우며, 건축의 본질에 집중하는 공간을 만듭니다.",
    url: 'https://www.ateliersow.com',
    siteName: 'Atelier SOW',
    images: [
      {
        url: '/og-image.jpg', // public 폴더에 og-image.jpg를 추가해야 합니다.
        width: 1200,
        height: 630,
        alt: 'Atelier SOW Main Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atelier SOW | Sound Of Wise',
    description: "아틀리에 소우(Atelier SOW)는 자연과 삶의 간극을 메우며, 건축의 본질에 집중하는 공간을 만듭니다.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google-site-verification-code', // 실제 코드로 교체 필요
    other: {
      'naver-site-verification': 'naver-site-verification-code', // 실제 코드로 교체 필요
    },
  },
};

const pretendard = localFont({
    src: "../public/fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DM6HR43M24"/>
            <Script id="gtag-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DM6HR43M24');`}
            </Script>
        </head>
        <body className={`${pretendard.className} transition-colors`}>
        <ThemeProvider>
            <Navigation/>
            {children}
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
