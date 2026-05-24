"use client";
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from ".././context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "contact", label: "Contact", icon: "📧" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop - window.innerHeight / 2 && 
              scrollPosition < sectionTop + sectionHeight - window.innerHeight / 2) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full p-4 shadow-2xl z-50 border-b transition-all duration-500 ${
        isScrolled ? 'glass-dark backdrop-blur-xl' : 'bg-transparent'
      } ${
        isDarkMode 
          ? 'border-white border-opacity-10' 
          : 'border-gray-200 bg-white/90'
      }`}>
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="text-3xl font-black transition duration-300 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ScrollLink to="home" smooth={true} duration={300} className="cursor-pointer">
            <motion.div className="flex items-center">
              {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map((letter, index) => (
                <motion.span
                  key={index}
                  className={index % 2 === 0 ? "gradient-text" : isDarkMode ? "text-white" : "text-gray-800"}
                  whileHover={{ 
                    y: -5,
                    rotate: [0, -10, 10, 0],
                    scale: 1.2
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    duration: 0.3
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.div
                className="ml-2 w-2 h-2 rounded-full"
                style={{ backgroundColor: isDarkMode ? "#00ffff" : "#0066cc" }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </ScrollLink>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            className="focus:outline-none transition duration-300 relative"
            style={{ color: isDarkMode ? "#00ffff" : "#0066cc" }}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              smooth={true}
              duration={300}
              className="relative cursor-pointer group"
            >
              <motion.div
                className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span
                  className={`font-semibold transition-all duration-300 ${
                    activeSection === item.id 
                      ? isDarkMode ? "text-cyan-400" : "text-blue-600"
                      : isDarkMode ? "text-gray-300 group-hover:text-cyan-400" : "text-gray-600 group-hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>

              {activeSection === item.id && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: isDarkMode ? "#00ffff" : "#0066cc" }}
                  layoutId="activeIndicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </ScrollLink>
          ))}

          {/* Theme toggle button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ 
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: isDarkMode ? "#00ffff" : "#0066cc"
            }}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden mt-4 rounded-2xl overflow-hidden ${
              isDarkMode 
                ? 'glass-dark border-white border-opacity-10' 
                : 'bg-white/95 border-gray-200 shadow-lg'
            } border`}
          >
            <div className="p-6 space-y-4">
              {navItems.map((item, index) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={300}
                  className="block cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.div
                    className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        activeSection === item.id 
                          ? isDarkMode ? "text-cyan-400" : "text-blue-600"
                          : isDarkMode ? "text-gray-300 group-hover:text-cyan-400" : "text-gray-600 group-hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <motion.div
                        className="w-2 h-2 rounded-full ml-auto"
                        style={{ backgroundColor: isDarkMode ? "#00ffff" : "#0066cc" }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </motion.div>
                </ScrollLink>
              ))}

              {/* Mobile theme toggle */}
              <motion.div
                className="pt-4 border-t"
                style={{ 
                  borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </p>
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ 
                      backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                    }}
                  >
                    {isDarkMode ? "☀️" : "🌙"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;