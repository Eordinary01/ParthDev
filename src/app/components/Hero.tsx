"use client";
import React from "react";
import dynamic from "next/dynamic";
import InteractiveTerminal from "./InteractiveTerminal";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const handleDownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Parth Resume.pdf";
  link.download = "Parth_Manocha_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-canvas pt-16 overflow-hidden">
      <ParticleField />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gh-blue opacity-20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gh-purple opacity-20 rounded-full blur-3xl animate-float-slow-reverse" />

      <div className="container-main w-full py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Interactive Terminal */}
          <div className="order-2 lg:order-1 hero-slide-up" style={{ animationDelay: "0.3s" }}>
            <InteractiveTerminal />
          </div>

          {/* Right - Info */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="hero-slide-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-gh-secondary font-mono text-sm mb-4">
                $ echo &quot;Welcome to my terminal&quot;
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gh-text leading-tight">
                Hi, I&apos;m{" "}
                <span className="text-gh-blue animate-glow">Parth</span>{" "}
                Manocha
              </h1>
              <p className="mt-4 text-xl text-gh-secondary">
                Full Stack Developer
              </p>
            </div>

            <p className="text-gh-secondary leading-relaxed max-w-lg hero-slide-up" style={{ animationDelay: "0.2s" }}>
              I build full-stack web applications with modern technologies.
              Passionate about clean code, intuitive interfaces, and solving complex problems.
            </p>

            {/* Social stats */}
            <div className="flex items-center gap-6 text-sm font-mono hero-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gh-secondary" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <a href="https://github.com/Eordinary01" target="_blank" rel="noopener noreferrer" className="text-gh-secondary hover:text-gh-blue transition-colors">
                  Eordinary01
                </a>
              </div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gh-secondary" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <a href="https://linkedin.com/in/parthmanocha01" target="_blank" rel="noopener noreferrer" className="text-gh-secondary hover:text-gh-blue transition-colors">
                  parthmanocha01
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 hero-slide-up" style={{ animationDelay: "0.4s" }}>
              <a
                href="https://github.com/Eordinary01"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hover:scale-105 hover:shadow-[0_10px_30px_rgba(88,166,255,0.3)] active:scale-95 transition-all duration-200"
              >
                View GitHub
              </a>
              <button
                onClick={handleDownloadResume}
                className="btn-outline hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Download Resume
              </button>
              <a
                href="mailto:parthmanocha66@gmail.com"
                className="btn-outline hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
