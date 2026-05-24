import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="relative w-full min-h-screen">
            {/* Background effects - theme aware */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50">
              <div className="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br from-cyan-500/8 to-blue-500/2 rounded-full blur-3xl" />
              <div className="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-tr from-purple-500/8 to-pink-500/2 rounded-full blur-3xl" />
            </div>

            {/* Ultra subtle grid overlay - theme aware */}
            <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.005)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.005)_1px,transparent_1px)] bg-[size:150px_150px] pointer-events-none -z-40 opacity-30" />

            {/* Content */}
            <div className="relative z-10">
              <Navbar />
              {children}
              
              {/* Footer - Theme aware */}
              <footer className="relative w-full border-t py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20"
                style={{ 
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--footer-bg)'
                }}
              >
                {/* Subtle top gradient */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                
                <div className="max-w-7xl mx-auto">
                  {/* Main footer content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-16">
                    {/* Left: Brand & Description */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-black">
                          <span className="gradient-text">Parth</span>
                          <span style={{ color: 'var(--text-primary)' }}> Manocha</span>
                        </h3>
                        <p className="text-sm font-light mt-2" style={{ color: 'var(--text-secondary)' }}>
                          Full Stack Developer
                        </p>
                      </div>
                      <p className="font-light text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                        Crafting exceptional digital experiences through cutting-edge web technologies and clean code.
                      </p>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
                        Quick Links
                      </h4>
                      <nav className="space-y-3">
                        <a href="#home" className="block text-sm transition-colors font-light" style={{ color: 'var(--text-secondary)' }}>
                          Home
                        </a>
                        <a href="#about" className="block text-sm transition-colors font-light" style={{ color: 'var(--text-secondary)' }}>
                          About Me
                        </a>
                        <a href="#projects" className="block text-sm transition-colors font-light" style={{ color: 'var(--text-secondary)' }}>
                          Projects
                        </a>
                        <a href="#contact" className="block text-sm transition-colors font-light" style={{ color: 'var(--text-secondary)' }}>
                          Contact
                        </a>
                      </nav>
                    </div>

                    {/* Right: Social & Legal */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
                        Connect
                      </h4>
                      <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all"
                          style={{ 
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          🔗
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all"
                          style={{ 
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          💼
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all"
                          style={{ 
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          𝕏
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all"
                          style={{ 
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          ✉
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="pt-12 space-y-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                    {/* Legal Links */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <a href="#" className="text-xs transition-colors font-light uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                        Privacy Policy
                      </a>
                      <div className="hidden sm:block w-px" style={{ backgroundColor: 'var(--border-color)' }} />
                      <a href="#" className="text-xs transition-colors font-light uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                        Terms of Service
                      </a>
                      <div className="hidden sm:block w-px" style={{ backgroundColor: 'var(--border-color)' }} />
                      <a href="#" className="text-xs transition-colors font-light uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                        Contact
                      </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center space-y-3">
                      <p className="text-sm font-light" style={{ color: 'var(--text-secondary)' }}>
                        © 2024 <span className="gradient-text font-semibold">Parth Manocha</span>. All rights reserved.
                      </p>
                      <p className="text-xs font-light" style={{ color: 'var(--text-secondary)' }}>
                        Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}