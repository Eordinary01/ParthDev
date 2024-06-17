"use client";
import React, { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold hover:text-aqua-500 transition duration-300 text-white">
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
            <span className="text-aqua-500">P</span>
            O
            <span className="text-aqua-500">R</span>
            T
            <span className="text-aqua-500">F</span>
            O
            <span className="text-aqua-500">L</span>
            I
            <span className="text-aqua-500">O</span>
          </ScrollLink>
        </div>
        <div className="space-x-5 text-lg md:hidden">
          <button
            className="text-aqua-500 hover:text-white focus:outline-none transition duration-300"
            onClick={toggleMenu}
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
          </button>
        </div>
        <div className="hidden md:flex space-x-5 text-lg">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="hover:text-aqua-500 transition duration-300 cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="hover:text-aqua-500 transition duration-300 cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            className="hover:text-aqua-500 transition duration-300 cursor-pointer"
          >
            Projects
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="hover:text-aqua-500 transition duration-300 cursor-pointer"
          >
            Contact
          </ScrollLink>
        </div>
      </nav>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-900 text-white p-4 transition duration-300 transform origin-top`}
        style={{
          maxHeight: isMenuOpen ? "200px" : "0",
          opacity: isMenuOpen ? "1" : "0",
        }}
      >
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="block py-2 hover:text-aqua-500 transition duration-300 cursor-pointer"
        >
          Home
        </ScrollLink>
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="block py-2 hover:text-aqua-500 transition duration-300 cursor-pointer"
        >
          About
        </ScrollLink>
        <ScrollLink
          to="projects"
          smooth={true}
          duration={500}
          className="block py-2 hover:text-aqua-500 transition duration-300 cursor-pointer"
        >
          Projects
        </ScrollLink>
        <ScrollLink
          to="contact"
          smooth={true}
          duration={500}
          className="block py-2 hover:text-aqua-500 transition duration-300 cursor-pointer"
        >
          Contact
        </ScrollLink>
      </div>
    </header>
  );
};

export default Navbar;
