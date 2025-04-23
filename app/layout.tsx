import type {Metadata} from "next";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
    title: "Atelier Sow | Sound Of Wise",
    description: "아틀리에 소우(Atelier SOW)",
};

const pretendard = localFont({
    src: "../public/fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
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
