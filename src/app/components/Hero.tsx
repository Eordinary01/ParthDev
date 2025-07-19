"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typed from "typed.js";
import { gsap } from "gsap";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // GSAP animations
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );

      // Title animation with 3D effect
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -90,
            transformOrigin: "center bottom"
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1.2, 
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.5
          }
        );
      }

      // Floating particles animation
      particlesRef.current.forEach((particle, index) => {
        gsap.to(particle, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          rotation: "random(-180, 180)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      });
    });

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

    // Mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Parallax effect for floating elements
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      gsap.to(".float", {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      typed.destroy();
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createEnhancedParticles = () => {
    return Array.from({ length: 80 }, (_, i) => (
      <div
        key={i}
        ref={el => el && (particlesRef.current[i] = el)}
        className="particle absolute pointer-events-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 3}px`,
          height: `${Math.random() * 6 + 3}px`,
          background: `radial-gradient(circle, ${
            ['#4fd1c5', '#7c3aed', '#00d4ff', '#ff0080'][Math.floor(Math.random() * 4)]
          }, transparent)`,
          borderRadius: '50%',
          filter: 'blur(1px)',
          boxShadow: `0 0 ${Math.random() * 20 + 10}px currentColor`
        }}
      />
    ));
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden space-background">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {createEnhancedParticles()}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 morphing-shape float holographic" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-aqua-400 to-purple-500 opacity-20 rounded-full float-reverse" />
        <div className="absolute bottom-32 left-1/4 w-48 h-48 morphing-shape float holographic" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-blue-400 to-aqua-500 opacity-15 rounded-full float-reverse" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 morphing-shape float transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div
        ref={heroRef}
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
            <h1 ref={titleRef} className="text-6xl md:text-8xl font-black mb-4">
              <motion.span
                className="inline-block gradient-text holographic"
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Hi, I&apos;sm
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-white text-reveal holographic"
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
            <div className="glass-dark rounded-2xl p-6 inline-block holographic">
              <span
                id="typed-text"
                className="text-2xl md:text-3xl font-semibold gradient-text"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto"
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
              className="group relative px-8 py-4 bg-gradient-to-r from-aqua-500 to-blue-500 text-white rounded-full font-semibold text-lg overflow-hidden hover-lift pulse-glow holographic"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 glass-dark border-2 border-aqua-500 text-aqua-400 rounded-full font-semibold text-lg hover:bg-aqua-500 hover:text-white transition-all duration-300 holographic"
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
                className="w-12 h-12 glass-dark rounded-full flex items-center justify-center text-aqua-400 hover:bg-aqua-500 hover:text-white transition-all duration-300 holographic pulse-glow"
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
          className="w-6 h-10 border-2 border-aqua-500 rounded-full flex justify-center holographic"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-gradient-to-b from-aqua-500 to-blue-500 rounded-full mt-2"
          />
        </motion.div>
        <p className="gradient-text text-sm mt-2 font-semibold">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;