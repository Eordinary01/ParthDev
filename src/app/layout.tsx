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
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <div className="relative w-full">
          {/* Background effects - subtle gradients */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50">
            <div className="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br from-cyan-500/8 to-blue-500/2 rounded-full blur-3xl" />
            <div className="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-tr from-purple-500/8 to-pink-500/2 rounded-full blur-3xl" />
          </div>

          {/* Ultra subtle grid overlay */}
          <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.005)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.005)_1px,transparent_1px)] bg-[size:150px_150px] pointer-events-none -z-40 opacity-30" />

          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            {children}
            
            {/* Footer - Clean and spacious */}
            <footer className="relative w-full border-t border-white/5 py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20">
              {/* Subtle top gradient */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              
              <div className="max-w-7xl mx-auto">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-16">
                  {/* Left: Brand & Description */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-white">
                        <span className="text-cyan-400">Parth</span> Manocha
                      </h3>
                      <p className="text-sm text-slate-500 font-light mt-2">Full Stack Developer</p>
                    </div>
                    <p className="text-slate-400 font-light text-sm leading-relaxed max-w-xs">
                      Crafting exceptional digital experiences through cutting-edge web technologies and clean code.
                    </p>
                  </div>

                  {/* Center: Quick Links */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Quick Links</h4>
                    <nav className="space-y-3">
                      <a href="#home" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors font-light">
                        Home
                      </a>
                      <a href="#about" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors font-light">
                        About Me
                      </a>
                      <a href="#projects" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors font-light">
                        Projects
                      </a>
                      <a href="#" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors font-light">
                        Contact
                      </a>
                    </nav>
                  </div>

                  {/* Right: Social & Legal */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Connect</h4>
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-lg hover:border-cyan-500/50 hover:bg-white/5 transition-all">
                        🔗
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-lg hover:border-cyan-500/50 hover:bg-white/5 transition-all">
                        💼
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-lg hover:border-cyan-500/50 hover:bg-white/5 transition-all">
                        𝕏
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-lg hover:border-cyan-500/50 hover:bg-white/5 transition-all">
                        ✉
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 pt-12 space-y-6">
                  {/* Legal Links */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-light uppercase tracking-wide">
                      Privacy Policy
                    </a>
                    <div className="hidden sm:block w-px bg-white/10" />
                    <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-light uppercase tracking-wide">
                      Terms of Service
                    </a>
                    <div className="hidden sm:block w-px bg-white/10" />
                    <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-light uppercase tracking-wide">
                      Contact
                    </a>
                  </div>

                  {/* Copyright */}
                  <div className="text-center space-y-3">
                    <p className="text-sm text-slate-400 font-light">
                      © 2024 <span className="text-cyan-400 font-semibold">Parth Manocha</span>. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-500 font-light">
                      Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}