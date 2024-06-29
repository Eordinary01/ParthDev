"use client";
import React, { useState, useEffect } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const navItems = ["home", "about", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = navItems.map(item => document.getElementById(item));
      
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop - windowHeight / 2 && 
              scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-sm text-white p-4 shadow-lg z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="text-3xl font-bold transition duration-300 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
            {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map((letter, index) => (
              <motion.span
                key={index}
                className={index % 2 === 0 ? "text-aqua-500" : ""}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {letter}
              </motion.span>
            ))}
          </ScrollLink>
        </motion.div>
        <div className="space-x-5 text-lg md:hidden">
          <motion.button
            className="text-aqua-500 hover:text-white focus:outline-none transition duration-300"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </motion.button>
        </div>
        <div className="hidden md:flex space-x-5 text-lg">
          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth={true}
              duration={500}
              className="relative cursor-pointer"
            >
              <motion.span
                className={`hover:text-aqua-500 transition duration-300 ${
                  activeSection === item ? "text-aqua-500" : ""
                }`}
                whileHover={{ y: -2 }}
                animate={activeSection === item ? { y: -2 } : { y: 0 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.span>
              {activeSection === item && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-aqua-500"
                  layoutId="underline"
                />
              )}
            </ScrollLink>
          ))}
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 text-white p-4"
          >
            {navItems.map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth={true}
                duration={500}
                className="block py-2 hover:text-aqua-500 transition duration-300 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.span>
              </ScrollLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;