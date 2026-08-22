import { Fira_Code, Inter } from "next/font/google";
import Script from "next/script";
import SmoothScrolling from "./components/SmoothScrolling";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-firacode",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Sahan Mewantha | Software Engineer & Web Developer",
  description: "Portfolio of Sahan Mewantha, a software engineer specializing in web developing and mobile app development.",
  keywords: ["Sahan mewantha", "web developing", "software engineer", "mobile app development"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${firaCode.variable} ${inter.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MSE1Z3WZX9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MSE1Z3WZX9');
          `}
        </Script>
      </head>
      <body
        className={`antialiased bg-background text-text font-inter`}
      >
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
