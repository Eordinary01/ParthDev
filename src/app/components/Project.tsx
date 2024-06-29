"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Project = () => {
  const projects = [
    {
      title: "BMS",
      description: "BLOG MANAGEMENT APPLICATION",
      link: "https://blog-management-system-4bd0.onrender.com/",
      color: "#FF6B6B",
    },
    {
      title: "AttendEase",
      description: "Attendance tracker and management application",
      link: "https://attend-ease-f.vercel.app/",
      color: "#4ECDC4",
    },
    {
      title: "Expense Tracker",
      description: "Personal finance management tool",
      link: "https://expense-trackerf.vercel.app/register",
      color: "#45B7D1",
    },
    {
      title: "NextJs-Frontend",
      description: "Showcase of Next.js capabilities",
      link: "https://nextjs-frontend-3bvh.vercel.app/",
      color: "#F7B731",
    },
    {
      title: "Recipe App",
      description: "Application to make your favourite Recipes",
      link: "https://recipe-app-oqfn.onrender.com/",
      color: "#26DE81",
    },
    {
      title: "Shopping Application",
      description: "E-commerce platform for your favorite items",
      link: "https://shopping-app-low0.onrender.com/",
      color: "#A55EEA",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const handleCardClick = (link:any, index:any) => {
    setSelectedProject(index);
    setTimeout(() => {
      window.open(link, "_blank");
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      <motion.div 
        className="container mx-auto px-4"
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-7xl font-bold mb-16 text-aqua-500 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              onClick={() => handleCardClick(project.link, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out ${selectedProject === index ? 'ring-4 ring-aqua-500' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br opacity-80"
                style={{ backgroundImage: `linear-gradient(135deg, ${project.color}, #2C3E50)` }}
              ></div>
              <div className="relative p-8 h-64 flex flex-col justify-center items-center text-center z-10">
                <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
                <p className="text-lg text-gray-200 mb-6">{project.description}</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.5 }}
                  className="absolute bottom-4 right-4"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-6 text-aqua-500">Ready to Collaborate?</h3>
          <p className="text-xl text-gray-300 mb-8">Let's turn your next big idea into reality!</p>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="inline-block bg-aqua-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-aqua-600 transition-colors duration-300 cursor-pointer"
          >
            Get in Touch
          </ScrollLink>
        </motion.div>
      </motion.div>

      {/* Background animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-aqua-500 rounded-full opacity-10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Project;