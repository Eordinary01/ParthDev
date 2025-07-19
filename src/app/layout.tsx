import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SpaceBackground from "./components/SpaceBackground";

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
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen relative">
          <SpaceBackground />
          <Navbar />
          {children}
          
          {/* Footer */}
          <footer className="bg-black bg-opacity-80 border-t border-aqua-500 border-opacity-30 text-white py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-aqua-500/10 to-purple-500/10 holographic" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-200">
                    © 2024 <span className="gradient-text font-semibold">Parth Manocha</span>. 
                    All rights reserved.
                  </p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-300 hover:text-aqua-400 transition-colors duration-300">
                    Terms of Service
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-aqua-500 border-opacity-30">
                <p className="text-sm text-gray-300">
                  Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}