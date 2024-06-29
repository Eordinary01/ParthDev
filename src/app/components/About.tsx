"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";

const About = () => {
  const [showFrontend, setShowFrontend] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const frontendSkills = [
    "JavaScript",
    "MERN",
    "NEXTJs",
    "TailwindCss",
    "Web Dev",
  ];
  const backendSkills = ["Node.js", "MongoDB", "TypeScript", "Express"];

  const handleFlip = () => {
    setShowFrontend((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const openGitHub = () => {
    window.open("https://github.com/Eordinary01", "_blank");
  };

  return (
    <section id="about" className="min-h-screen relative overflow-hidden">
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "white",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <div className="container mx-auto p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <h2
            className="text-6xl font-bold mb-4 text-aqua-500 cursor-pointer relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={openGitHub}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {Array.from("About Me").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bg-gray-800 text-white p-2 rounded-md"
                >
                  Visit GitHub
                </motion.div>
              )}
            </AnimatePresence>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl text-white text-center"
          >
            My name is Parth Manocha and I am from Jaipur. As a child, I've
            always had an interest in tech stuff and the IT industry. Since
            then, I started thinking about how things work here and finally
            decided to start programming and have a look around this world...
          </motion.p>
        </motion.div>
        <div className="flex justify-center mb-8 relative">
          <div className="w-3/4 mx-auto perspective-1000">
            <motion.div
              className="w-full h-full relative"
              animate={{ rotateY: showFrontend ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="w-full h-full absolute backface-hidden"
                initial={false}
                animate={{ opacity: showFrontend ? 1 : 0 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-3xl font-bold mb-4 text-aqua-500">
                    Frontend Skills
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {frontendSkills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-aqua-500 bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg text-white text-center shadow-md transition duration-300 ease-in-out hover:scale-105 mb-4 mx-2"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full h-full absolute backface-hidden"
                initial={false}
                animate={{ opacity: showFrontend ? 0 : 1 }}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="flex flex-col items-center">
                  <h3 className="text-3xl font-bold mb-4 text-aqua-500">
                    Backend Skills
                  </h3>
                  <div className="flex flex-wrap justify-center">
                    {backendSkills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-aqua-500 bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg text-white text-center shadow-md transition duration-300 ease-in-out hover:scale-105 mb-4 mx-2"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.button
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-aqua-500 text-white py-2 px-4 rounded-md"
            onClick={handleFlip}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Flip
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default About;
