"use client";
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { id: "home", label: "~/home" },
  { id: "about", label: "~/about" },
  { id: "skills", label: "~/skills" },
  { id: "projects", label: "~/projects" },
  { id: "contact", label: "~/contact" },
];

export default function Navbar() {
  const { config } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => document.getElementById(item.id));
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (
            window.scrollY >= sectionTop - window.innerHeight / 2 &&
            window.scrollY < sectionTop + sectionHeight - window.innerHeight / 2
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 border-b transition-all duration-200 ${
        isScrolled ? "bg-default/95 backdrop-blur-sm" : "bg-transparent"
      }`}
      style={{ borderColor: activeSection !== "home" ? `${config.accent}22` : "var(--border)" }}
    >
      <nav className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <ScrollLink to="home" smooth duration={300} className="cursor-pointer">
          <div className="flex items-center gap-2 group">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gh-text"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-gh-text font-mono font-bold text-lg hidden sm:block group-hover:text-gh-blue transition-colors">
              parth.dev
            </span>
          </div>
        </ScrollLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              smooth
              duration={300}
              className={`px-3 py-1.5 text-sm font-mono rounded-md cursor-pointer transition-colors ${
                activeSection === item.id ? "text-gh-text bg-subtle" : "text-gh-secondary hover:text-gh-text"
              }`}
              style={activeSection === item.id ? { boxShadow: `inset 0 -2px 0 ${config.accent}`, borderRadius: 6 } : undefined}
            >
              {item.label}
            </ScrollLink>
          ))}
          <a
            href="https://github.com/Eordinary01"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 btn-outline text-xs font-mono flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gh-secondary hover:text-gh-text transition-colors p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-default border-b border-border">
          <div className="container-main py-4 space-y-1">
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                smooth
                duration={300}
                className={`block px-3 py-2 text-sm font-mono rounded-md cursor-pointer transition-colors ${
                  activeSection === item.id
                    ? "text-gh-text bg-subtle"
                    : "text-gh-secondary hover:text-gh-text hover:bg-subtle"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </ScrollLink>
            ))}
            <a
              href="https://github.com/Eordinary01"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm font-mono text-gh-secondary hover:text-gh-text hover:bg-subtle rounded-md transition-colors"
            >
              ↗ GitHub Profile
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
