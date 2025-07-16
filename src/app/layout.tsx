import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parth Manocha - Full Stack Developer",
  description: "Portfolio of Parth Manocha - Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies",
  keywords: "Full Stack Developer, MERN Stack, Next.js, React, Node.js, Portfolio",
  authors: [{ name: "Parth Manocha" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <div className="min-h-screen relative">
          <Navbar />
          
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-blue-400 text-white p-4 text-center">
            © 2024 My Portfolio
          </footer>
        </div>
      </body>
    </html>
  );
}