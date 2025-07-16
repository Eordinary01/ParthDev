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
          {children}
          
          {/* Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 text-white py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-aqua-500/5 to-transparent" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-300">
                    © 2024 <span className="text-aqua-400 font-semibold">Parth Manocha</span>. 
                    All rights reserved.
                  </p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-aqua-400 transition-colors duration-500">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-aqua-400 transition-colors duration-500">
                    Terms of Service
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
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