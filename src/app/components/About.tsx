"use client";
import React, { useState } from "react";

const About = () => {
  const [showFrontend, setShowFrontend] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const frontendSkills = ["JavaScript", "MERN", "NEXTJs", "TailwindCss", "Web Dev"];
  const backendSkills = ["Node.js", "MongoDB", "TypeScript", "Express"];

  const handleNavigation = (direction: "left" | "right") => {
    setShowFrontend((prevState) => (direction === "right" ? !prevState : !prevState));
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
    <section id="about" >
    
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-12">
        <h2 
          className="text-6xl font-bold mb-4 text-aqua-500 cursor-pointer" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={openGitHub}
        >
          About Me
        </h2>
        {showTooltip && (
          <div className="absolute bg-gray-800 text-white p-2 rounded-md">
            Visit GitHub
          </div>
        )}
        <p className="text-2xl text-white text-center">
          My name is Parth Manocha and I am from Jaipur. As a child, I&apos;ve always had an interest in tech stuff and the IT industry. Since then, I started thinking about how things work here and finally decided to start programming and have a look around this world...
        </p>
      </div>
      <div className="flex justify-center mb-8 relative">
        <div
          className={`transition-all duration-500 ${
            showFrontend ? "opacity-100" : "opacity-0 -translate-x-full"
          } w-3/4 mx-auto`}
          >
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold mb-4 text-aqua-500">Frontend Skills</h3>
            <div className="flex flex-wrap justify-center">
              {frontendSkills.map((skill, index) => (
                <div
                key={index}
                className="bg-aqua-500 p-4 rounded-lg text-white text-center shadow-md transition duration-300 ease-in-out hover:scale-105 mb-4 mx-2"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-500 ${
            showFrontend ? "opacity-0 translate-x-full" : "opacity-100"
          } w-3/4 mx-auto`}
          >
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold mb-4 text-aqua-500">Backend Skills</h3>
            <div className="flex flex-wrap justify-center">
              {backendSkills.map((skill, index) => (
                <div
                key={index}
                  className="bg-aqua-500 p-4 rounded-lg text-white text-center shadow-md transition duration-300 ease-in-out hover:scale-105 mb-4 mx-2"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
        {!showFrontend && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0">
            <button
              className="bg-aqua-500 text-white py-2 px-4 rounded-md"
              onClick={() => handleNavigation("left")}
              >
              &larr;
            </button>
          </div>
        )}
        {showFrontend && (
          <div className="absolute top-1/2 -translate-y-1/2 right-0">
            <button
              className="bg-aqua-500 text-white py-2 px-4 rounded-md"
              onClick={() => handleNavigation("right")}
              >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
        </section>
  );
};

export default About;
