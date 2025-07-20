"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#4fd1c5"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

const About = () => {
  const [showFrontend, setShowFrontend] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const containerRef = useRef(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate skill cards with 3D effect
        gsap.fromTo(skillsRef.current,
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -45,
            transformOrigin: "center bottom"
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }
        );

        // Floating animation for skill cards
        skillsRef.current.forEach((skill, index) => {
          gsap.to(skill, {
            y: "random(-10, 10)",
            rotation: "random(-2, 2)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        });
      });

      return () => ctx.revert();
    }
  }, [isInView, showFrontend]);
  const frontendSkills = [
    { name: "JavaScript", level: 95, icon: "🟨" },
    { name: "React/Next.js", level: 90, icon: "⚛️" },
    { name: "TypeScript", level: 85, icon: "🔷" },
    { name: "Tailwind CSS", level: 92, icon: "🎨" },
    { name: "Web Development", level: 88, icon: "🌐" },
  ];

  const backendSkills = [
    { name: "Node.js", level: 87, icon: "🟢" },
    { name: "MongoDB", level: 83, icon: "🍃" },
    { name: "Express.js", level: 85, icon: "🚀" },
    { name: "API Development", level: 89, icon: "🔗" },
  ];

  const currentSkills = showFrontend ? frontendSkills : backendSkills;

  const handleFlip = () => {
    setShowFrontend((prev) => !prev);
  };

  const openGitHub = () => {
    window.open("https://github.com/Eordinary01", "_blank");
  };

  return (
    <section id="about" className="min-h-screen relative overflow-hidden py-20">
      {/* Enhanced background with Three.js */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
          </Canvas>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, scale }}
          className="absolute top-20 left-10 w-72 h-72 morphing-shape holographic"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-r from-purple-500 to-aqua-400 opacity-20 rounded-full holographic"
        />
        <motion.div 
          className="energy-field"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
      </div>

      <motion.div
        ref={containerRef}
        style={{ opacity }}
        className="container mx-auto px-4 py-20 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-12 cursor-pointer relative inline-block holographic"
            onClick={openGitHub}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <span className="gradient-text">About Me</span>
            <motion.div
              className="absolute -inset-6 bg-gradient-to-r from-aqua-500 to-purple-500 opacity-20 rounded-3xl -z-10 holographic"
              whileHover={{ scale: 1.15, opacity: 0.4 }}
              transition={{ duration: 0.3 }}
            />
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "150px" } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-2 bg-gradient-to-r from-aqua-500 to-purple-500 mx-auto mb-12 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light"
          >
            My name is <span className="text-aqua-400 font-semibold">Parth Manocha</span> and I am from Jaipur. 
            As a child, I&apos;sve always had an interest in tech stuff and the IT industry. 
            Since then, I started thinking about how things work here and finally 
            decided to start programming and have a look around this world...
          </motion.p>
        </motion.div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, type: "spring" }}
            className="glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden holographic"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-r from-aqua-500 to-purple-500 opacity-20 rounded-full transform translate-x-20 -translate-y-20 holographic" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500 to-aqua-400 opacity-20 rounded-full transform -translate-x-16 translate-y-16 holographic" />

            {/* Skills Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <motion.h3
                className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
              >
                {showFrontend ? "Frontend" : "Backend"} Skills
              </motion.h3>

              <motion.button
                onClick={handleFlip}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-aqua-500 to-purple-500 text-white rounded-full font-bold text-lg overflow-hidden holographic pulse-glow"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <span className="relative z-10 flex items-center">
                  Switch to {showFrontend ? "Backend" : "Frontend"}
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: showFrontend ? 0 : 180, scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    ↻
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.button>
            </div>

            {/* Skills Grid */}
            <motion.div
              key={showFrontend ? "frontend" : "backend"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  ref={el => {
                    if (el) skillsRef.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 + index * 0.15, type: "spring" }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative"
                >
                  <motion.div 
                    className="glass-dark rounded-3xl p-8 hover-lift relative overflow-hidden holographic"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Skill icon and name */}
                    <div className="flex items-center mb-6">
                      <motion.span 
                        className="text-4xl mr-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {skill.icon}
                      </motion.span>
                      <h4 className="text-2xl font-bold text-white group-hover:text-aqua-400 transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>

                    {/* Progress bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-800 rounded-full h-4 mb-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-aqua-500 to-purple-500 h-4 rounded-full relative overflow-hidden"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 2, delay: 2 + index * 0.15, ease: "easeOut" }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-white opacity-40 holographic"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                      <motion.span
                        className="gradient-text font-bold text-lg"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 2.2 + index * 0.15 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-aqua-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"
                      animate={hoveredSkill === index ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 2.5 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-300 text-xl md:text-2xl mb-8 font-light">
                Constantly learning and evolving with the latest technologies
              </p>
              <div className="flex justify-center space-x-6">
                {["🚀", "💡", "⚡", "🎯"].map((emoji, index) => (
                  <motion.span
                    key={index}
                    className="text-4xl"
                    animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.5, rotate: 10 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;