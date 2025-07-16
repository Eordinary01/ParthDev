"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typed from "typed.js";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const typed = new Typed("#typed-text", {
      strings: [
        "Full Stack Developer",
        "MERN Stack Expert",
        "UI/UX Enthusiast",
        "Problem Solver",
        "Tech Innovator"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          animationDelay: `${Math.random() * 20}s`,
          animationDuration: `${Math.random() * 10 + 15}s`,
        }}
      />
    ));
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden animated-gradient">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {createParticles()}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-aqua-500 opacity-10 morphing-shape float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-aqua-400 opacity-15 rounded-full float-reverse" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-aqua-300 opacity-8 morphing-shape float" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-aqua-600 opacity-12 rounded-full float-reverse" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10"
      >
        <div className="text-center max-w-4xl">
          {/* Main heading with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <motion.span
                className="inline-block gradient-text"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Hi, I'm
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-white text-reveal"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Parth Manocha
              </motion.span>
            </h1>
          </motion.div>

          {/* Typed text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-12"
          >
            <div className="glass-dark rounded-2xl p-6 inline-block">
              <span
                id="typed-text"
                className="text-2xl md:text-3xl font-semibold text-aqua-400"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Passionate about creating exceptional digital experiences through
            innovative web technologies and clean, efficient code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-aqua-500 text-white rounded-full font-semibold text-lg overflow-hidden hover-lift pulse-glow"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-aqua-600 to-aqua-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 glass border-2 border-aqua-500 text-aqua-400 rounded-full font-semibold text-lg hover:bg-aqua-500 hover:text-white transition-all duration-300"
            >
              Download CV
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="mt-16 flex justify-center space-x-6"
          >
            {[
              { name: "GitHub", icon: "🔗" },
              { name: "LinkedIn", icon: "💼" },
              { name: "Twitter", icon: "🐦" },
              { name: "Email", icon: "📧" },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-aqua-400 hover:bg-aqua-500 hover:text-white transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + index * 0.1 }}
              >
                <span className="text-xl">{social.icon}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-aqua-500 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-aqua-500 rounded-full mt-2"
          />
        </motion.div>
        <p className="text-aqua-400 text-sm mt-2">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;