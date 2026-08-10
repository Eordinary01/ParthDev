import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parth Manocha — Full Stack Developer",
  description: "Portfolio of Parth Manocha — Full Stack Developer specializing in MERN stack, Next.js, and modern web technologies",
  keywords: "Full Stack Developer, MERN Stack, Next.js, React, Node.js, Portfolio",
  authors: [{ name: "Parth Manocha" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="relative w-full min-h-screen">
          <Navbar />
          {children}

          <footer className="border-t border-border bg-canvas">
            <div className="container-main py-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gh-secondary font-mono">
                  &copy; 2026 Parth Manocha
                </p>
                <div className="flex items-center gap-6 text-sm text-gh-secondary">
                  <a href="https://github.com/Eordinary01" target="_blank" rel="noopener noreferrer" className="hover:text-gh-text transition-colors">GitHub</a>
                  <a href="https://linkedin.com/in/parthmanocha01" target="_blank" rel="noopener noreferrer" className="hover:text-gh-text transition-colors">LinkedIn</a>
                  <a href="mailto:parthmanocha66@gmail.com" className="hover:text-gh-text transition-colors">Email</a>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border-muted text-center">
                <p className="text-xs text-gh-muted font-mono">
                  Built with Next.js, TypeScript &amp; Tailwind CSS
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
