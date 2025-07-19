"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

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
    <section id="about" className="min-h-screen relative overflow-hidden space-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-20 left-10 w-64 h-64 morphing-shape holographic"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-500 to-aqua-400 opacity-15 rounded-full holographic"
        />
        <div className="energy-field" />
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
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-black mb-8 cursor-pointer relative inline-block holographic"
            onClick={openGitHub}
            whileHover={{ scale: 1.05 }}
          >
            <span className="gradient-text">About Me</span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-aqua-500 to-purple-500 opacity-20 rounded-2xl -z-10 holographic"
              whileHover={{ scale: 1.1, opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-aqua-500 to-purple-500 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
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
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden holographic"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-aqua-500 to-purple-500 opacity-15 rounded-full transform translate-x-16 -translate-y-16 holographic" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-500 to-aqua-400 opacity-15 rounded-full transform -translate-x-12 translate-y-12 holographic" />

            {/* Skills Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <motion.h3
                className="text-4xl md:text-5xl font-bold gradient-text mb-4 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {showFrontend ? "Frontend" : "Backend"} Skills
              </motion.h3>

              <motion.button
                onClick={handleFlip}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gradient-to-r from-aqua-500 to-purple-500 text-white rounded-full font-semibold overflow-hidden holographic pulse-glow"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="relative z-10 flex items-center">
                  Switch to {showFrontend ? "Backend" : "Frontend"}
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: showFrontend ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↻
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.button>
            </div>

            {/* Skills Grid */}
            <motion.div
              key={showFrontend ? "frontend" : "backend"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  ref={el => el && (skillsRef.current[index] = el)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative"
                >
                  <div className="glass-dark rounded-2xl p-6 hover-lift relative overflow-hidden holographic">
                    {/* Skill icon and name */}
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{skill.icon}</span>
                      <h4 className="text-xl font-semibold text-white group-hover:text-aqua-400 transition-colors">
                        {skill.name}
                      </h4>
                    </div>

                    {/* Progress bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                        <motion.div
                          className="bg-gradient-to-r from-aqua-500 to-purple-500 h-3 rounded-full relative overflow-hidden"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.5, delay: 1.2 + index * 0.1 }}
                        >
                          <div className="absolute inset-0 bg-white opacity-40 holographic" />
                        </motion.div>
                      </div>
                      <motion.span
                        className="gradient-text font-semibold text-sm"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.5 + index * 0.1 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-aqua-500 to-purple-500 opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-2xl"
                      animate={hoveredSkill === index ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-300 text-lg mb-6">
                Constantly learning and evolving with the latest technologies
              </p>
              <div className="flex justify-center space-x-4">
                {["🚀", "💡", "⚡", "🎯"].map((emoji, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.2,
                    }}
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