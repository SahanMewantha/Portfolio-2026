import { Fira_Code, Inter } from "next/font/google";
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
  title: "Sahan Mewantha",
  description: "Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${firaCode.variable} ${inter.variable}`}>
      <body
        className={`antialiased bg-background text-text font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
