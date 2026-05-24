"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const Project = () => {
  const { isDarkMode } = useTheme();
  
  const projects = [
    {
      title: "Vehicle Rental System",
      description: "A comprehensive vehicle rental management system",
      link: "https://vehicle-rental-frontend-1hw5.vercel.app/",
      color: "#FF6B6B",
      tech: ["NextJS", "Node.js", "MongoDB"],
      category: "Full Stack"
    },
    {
      title: "Qnect",
      description: "An AI powered gamification platform",
      link: "https://ask-streamfrontend.vercel.app/",
      color: "#FF6B6B",
      tech: ["NextJS", "Node.js", "MongoDB"],
      category: "Full Stack"
    },
    {
      title: "TrainerSync",
      description: "An Web/Android based Trainer Management Platform",
      link: "https://trainer-sync-tau.vercel.app/login",
      color: "#4ECDC4",
      tech: ["NextJS", "Node.js", "MongoDB", "React Native"],
      category: "Web App"
    },
    {
      title: "Collaborative Coding Platform",
      description: "A platform for real-time collaborative coding",
      link: "",
      color: "#FF6B6B",
      tech: ["NextJs", "Node.js", "MongoDB"],
      category: "Full Stack"
    },
    {
      title: "Assignment Manager",
      description: "Ultimate Assignment Management Solution",
      link: "https://viewassignmentfrontend.vercel.app/",
      color: "#FF9FF3",
      tech: ["React", "Node.js", "MongoDB"],
      category: "Education"
    },
    {
      title: "BMS",
      description: "BLOG MANAGEMENT APPLICATION",
      link: "https://blog-management-system-4bd0.onrender.com/",
      color: "#FF6B6B",
      tech: ["React", "Node.js", "MongoDB"],
      category: "Full Stack"
    },
    {
      title: "AttendEase",
      description: "Attendance tracker and management application",
      link: "https://attend-ease-f.vercel.app/",
      color: "#4ECDC4",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      category: "Web App"
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  const handleCardClick = (link: string, index: number) => {
    if (!link) return;
    setSelectedProject(index);
    setTimeout(() => {
      window.open(link, "_blank");
      setSelectedProject(null);
    }, 800);
  };

  return (
    <section id="projects" className="py-20 bg-inherit relative overflow-hidden">
      {/* Background elements - Theme aware */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-40 left-20 w-72 h-72 opacity-5 morphing-shape"
          // style={{ backgroundColor: 'var(--accent)' }}
        />
       
      </div>

      <motion.div 
        className="container mx-auto px-4"
        ref={containerRef}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-black mb-8 gradient-text">
            My Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 mx-auto mb-8"
          />
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            A collection of projects that showcase my skills and passion for creating innovative solutions
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === category
                  ? "text-white shadow-lg"
                  : "hover:text-white"
              }`}
              style={{
                backgroundColor: filter === category ? 'var(--accent)' : 'var(--glass-bg)',
                color: filter === category ? 'white' : 'var(--accent)',
                border: filter === category ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleCardClick(project.link, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative glass-dark rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover-lift ${
                selectedProject === index ? 'ring-4 scale-105' : ''
              }`}
              style={{
                ringColor: selectedProject === index ? 'var(--accent)' : undefined
              }}
            >
              {/* Project Image/Background */}
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` 
                }}
              />

              {/* Content */}
              <div className="relative p-8 h-80 flex flex-col justify-between z-10">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color 
                      }}
                    >
                      {project.category}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0, 
                        scale: hoveredIndex === index ? 1 : 0 
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.div>
                  </div>

                  <h3 
                    className="text-2xl font-bold mb-3 transition-colors group-hover:gradient-text"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="mb-6 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + techIndex * 0.1 }}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb',
                          color: 'var(--accent)'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Progress indicator for selected project */}
                  {selectedProject === index && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                      className="h-1 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(to top, ${project.color}30, transparent)` 
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="glass-dark rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-6 gradient-text">Ready to Collaborate?</h3>
            <p 
              className="text-xl mb-8 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Let's turn your next big idea into reality! I'm always excited to work on innovative projects 
              and bring creative solutions to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-white rounded-full text-lg font-semibold transition-colors duration-300 pulse-glow"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Get in Touch
                </motion.button>
              </ScrollLink>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--glass-bg)',
                  border: `2px solid var(--accent)`,
                  color: 'var(--accent)'
                }}
              >
                View All Projects
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Project;