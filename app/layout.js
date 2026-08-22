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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.sahanmewantha.live/#person",
        "name": "Sahan Mewantha",
        "url": "https://www.sahanmewantha.live",
        "image": "https://www.sahanmewantha.live/me.png",
        "jobTitle": "Software Engineer & Web Developer",
        "description": "Portfolio of Sahan Mewantha, a software engineer specializing in web development and mobile app development.",
        "sameAs": [
          "https://github.com/SahanMewantha",
          "https://www.linkedin.com/in/sahan-mewantha-012ab4248/",
          "https://web.facebook.com/SahanM2000",
          "https://www.instagram.com/sahan__mewantha",
          "https://reddit.com/u/sahanmewantha"
        ],
        "knowsAbout": [
          "Web Development",
          "Mobile App Development",
          "React",
          "Next.js",
          "Flutter",
          "TypeScript",
          "Node.js",
          "JavaScript"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.sahanmewantha.live/#website",
        "url": "https://www.sahanmewantha.live",
        "name": "Sahan Mewantha | Software Engineer & Web Developer",
        "description": "Portfolio of Sahan Mewantha, a software engineer specializing in web developing and mobile app development.",
        "publisher": {
          "@id": "https://www.sahanmewantha.live/#person"
        },
        "inLanguage": "en"
      }
    ]
  };

  return (
    <html lang="en" className={`${firaCode.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
