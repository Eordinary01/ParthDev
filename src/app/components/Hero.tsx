"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";

const Hero = () => {
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
      backDelay: 2500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  return (
    <section id="home" className="relative w-full bg-transparent overflow-hidden">
      {/* Background effects - subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 100, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-96 -right-96 w-96 h-96 bg-gradient-to-br from-cyan-500/8 to-blue-500/2 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -100, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute -bottom-96 -left-96 w-96 h-96 bg-gradient-to-tr from-purple-500/8 to-pink-500/2 rounded-full blur-3xl"
        />
      </div>

      {/* Barely visible grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.005)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.005)_1px,transparent_1px)] bg-[size:150px_150px] pointer-events-none" />

      {/* MAIN CONTENT - TAKES FULL VIEWPORT HEIGHT + MORE */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between py-20 lg:py-32">
        {/* TOP SECTION - Welcome & Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20"
        >
          {/* Welcome label */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-16 lg:mb-24"
          >
            <span className="text-xs sm:text-sm font-light text-cyan-400/40 tracking-[0.15em] uppercase">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* MASSIVE HEADING - CLEAN WHITE NO GRADIENT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mb-24 lg:mb-32"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-black leading-[1.05] text-white max-w-5xl lg:max-w-6xl">
              Hi, I'm <br className="hidden sm:block" />
              <span className="text-cyan-400">Parth</span> Manocha
            </h1>
          </motion.div>

          {/* Typed role - BIG AND READABLE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-16 lg:mb-20"
          >
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
              <span id="typed-text" />
            </p>
          </motion.div>

          {/* Short description - READABLE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl mb-24 lg:mb-32"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
              Crafting exceptional digital experiences through cutting-edge web technologies. Full-stack developer passionate about clean code and intuitive design.
            </p>
          </motion.div>

          {/* CTA Buttons - LARGE AND SPACED */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 max-w-lg mb-24"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 rounded-lg font-semibold text-lg text-white overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 -z-10" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                View My Work
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-lg font-semibold text-lg text-cyan-300 border border-white/10 transition-all hover:border-cyan-500/50 hover:bg-white/5"
            >
              <span className="flex items-center justify-center gap-3">
                Download CV
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-6"
          >
            <span className="text-sm text-slate-500 font-light">Connect</span>
            <div className="flex gap-4 ">
              {[
                { name: "GitHub", icon: "🔗" },
                { name: "LinkedIn", icon: "💼" },
                { name: "Twitter", icon: "𝕏" },
                { name: "Email", icon: "✉" },
              ].map((social, idx) => (
                <motion.a
                  key={social.name}
                  href="#"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.2, y: -6 }}
                  className="w-14 h-14 rounded-lg border border-white/10 flex items-center justify-center text-2xl hover:border-cyan-500/50 hover:bg-white/5 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

     
       

      </div>
    </section>
  );
};

export default Hero;