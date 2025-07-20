"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Typed from "typed.js";
import { gsap } from "gsap";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero entrance animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, scale: 0.8, rotationY: -45 },
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: 0,
          duration: 2, 
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Advanced title animation with 3D transforms
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          { 
            opacity: 0, 
            y: 150, 
            rotationX: -90,
            transformOrigin: "center bottom",
            scale: 0.5
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            scale: 1,
            duration: 1.5, 
            stagger: 0.15,
            ease: "back.out(2)",
            delay: 1
          }
        );
      }

      // Enhanced floating particles with physics
      particlesRef.current.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-50, 50)",
          rotation: "random(-360, 360)",
          scale: "random(0.5, 1.5)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.05
        });
      });
    });

    // Enhanced typed.js configuration
    const typed = new Typed("#typed-text", {
      strings: [
        "Full Stack Developer",
        "MERN Stack Expert", 
        "Three.js Enthusiast",
        "UI/UX Designer",
        "Problem Solver",
        "Tech Innovator",
        "Creative Coder"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
    });

    // Advanced mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({ x: clientX, y: clientY });
      
      const xPos = (clientX - innerWidth / 2) / innerWidth;
      const yPos = (clientY - innerHeight / 2) / innerHeight;
      
      x.set(xPos * 20);
      rotateX.set(yPos * 10);
      rotateY.set(xPos * 10);
      
      // Enhanced parallax for floating elements
      gsap.to(".float-element", {
        x: xPos * 30,
        y: yPos * 30,
        rotationY: xPos * 15,
        rotationX: yPos * 15,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      typed.destroy();
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, rotateX, rotateY]);

  const createAdvancedParticles = () => {
    return Array.from({ length: 120 }, (_, i) => (
      <motion.div
        key={i}
        ref={el => {
          if (el) particlesRef.current[i] = el;
        }}
        className="particle absolute pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          background: `radial-gradient(circle, ${
            ['#4fd1c5', '#7c3aed', '#00d4ff', '#ff0080', '#26de81'][Math.floor(Math.random() * 5)]
          }, transparent)`,
          borderRadius: '50%',
          filter: 'blur(1px)',
          boxShadow: `0 0 ${Math.random() * 30 + 15}px currentColor`
        }}
      />
    ));
  };

  return (
    <section id="home" className="h-screen relative overflow-hidden flex items-center justify-center">
      {/* Enhanced background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-aqua-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-aqua-500/10 to-transparent" />
      </div>

      {/* Advanced particles system */}
      <div className="absolute inset-0 overflow-hidden">
        {createAdvancedParticles()}
      </div>

      {/* Enhanced floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-48 h-48 morphing-shape float-element holographic"
          style={{ x, rotateY }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-36 h-36 bg-gradient-to-r from-aqua-400 to-purple-500 opacity-20 rounded-full float-element"
          style={{ x: useTransform(x, v => v * -0.5), rotateX }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-56 h-56 morphing-shape float-element holographic"
          style={{ y: useTransform(rotateX, v => v * 2) }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-40 h-40 bg-gradient-to-r from-blue-400 to-aqua-500 opacity-15 rounded-full float-element"
          style={{ x: useTransform(rotateY, v => v * 1.5) }}
        />
      </div>

      <motion.div
        ref={heroRef}
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 text-center relative z-10 max-w-6xl"
      >
        {/* Enhanced main heading */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <h1 ref={titleRef} className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-none">
            <motion.span
              className="inline-block gradient-text holographic"
              initial={{ opacity: 0, rotateX: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              Hi, I'm
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-white text-reveal holographic"
              initial={{ opacity: 0, scale: 0.3, rotateY: -45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              Parth
            </motion.span>
          </h1>
        </motion.div>

        {/* Enhanced typed text with better styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mb-16"
        >
          <div className="glass-dark rounded-3xl p-8 inline-block holographic backdrop-blur-xl">
            <span
              id="typed-text"
              className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"
            />
          </div>
        </motion.div>

        {/* Enhanced description */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-16 leading-relaxed max-w-4xl mx-auto font-light"
        >
          Crafting exceptional digital experiences through innovative web technologies, 
          immersive 3D graphics, and clean, efficient code that brings ideas to life.
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              boxShadow: "0 20px 40px rgba(79, 209, 197, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-aqua-500 via-blue-500 to-purple-500 text-white rounded-full font-bold text-xl overflow-hidden hover-lift pulse-glow holographic"
          >
            <span className="relative z-10 flex items-center">
              Explore My Work
              <motion.span
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.08, 
              y: -5,
              backgroundColor: "rgba(79, 209, 197, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 glass-dark border-2 border-aqua-500 text-aqua-400 rounded-full font-bold text-xl hover:bg-aqua-500 hover:text-white transition-all duration-500 holographic"
          >
            <span className="flex items-center">
              Download Resume
              <motion.span
                className="ml-3"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ↓
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced social links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="flex justify-center space-x-8"
        >
          {[
            { name: "GitHub", icon: "🔗", color: "#333" },
            { name: "LinkedIn", icon: "💼", color: "#0077B5" },
            { name: "Twitter", icon: "🐦", color: "#1DA1F2" },
            { name: "Email", icon: "📧", color: "#EA4335" },
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href="#"
              whileHover={{ 
                scale: 1.3, 
                rotate: 10,
                y: -5,
                boxShadow: `0 10px 30px ${social.color}40`
              }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 glass-dark rounded-full flex items-center justify-center text-aqua-400 hover:bg-aqua-500 hover:text-white transition-all duration-300 holographic pulse-glow"
              initial={{ opacity: 0, y: 30, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 3.2 + index * 0.1, type: "spring", stiffness: 200 }}
            >
              <span className="text-2xl">{social.icon}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, type: "spring" }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-8 h-14 border-3 border-aqua-500 rounded-full flex justify-center holographic pulse-glow"
        >
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-2 h-6 bg-gradient-to-b from-aqua-500 to-blue-500 rounded-full mt-3"
          />
        </motion.div>
        <motion.p 
          className="gradient-text text-lg mt-4 font-bold tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          SCROLL DOWN
        </motion.p>
      </motion.div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aqua-500 opacity-5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 opacity-5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-3 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default Hero;