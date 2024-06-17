"use client";
import React from 'react';

const Project = () => {
  const projects = [
    {
      title: "BMS",
      description: "This is an BLOG MANAGEMENT APPLICATION.",
      link: "https://blog-management-system-4bd0.onrender.com/",
    },
    {
      title: "AttendEase",
      description: "Attendance tracker and management application..",
      link: "https://attend-ease-f.vercel.app/",
    },
    {
      title: "Expense Tracker",
      description: "This is a description of Project Three.",
      link: "https://expense-trackerf.vercel.app/register",
    },
    {
      title: "NextJs-Frontend",
      description: "This is a description of Project Four.",
      link: "https://nextjs-frontend-3bvh.vercel.app/",
    },
    {
      title: "Recipe App",
      description: "This is an Application to make your favourite Recipes...",
      link: "https://recipe-app-oqfn.onrender.com/",
    },
    {
      title: "Shopping Application",
      description: "This is a Application to shop, your favouirte things..",
      link: "https://shopping-app-low0.onrender.com/",
    },
  ];

  const handleCardClick = (link:any) => {
    window.open(link, "_blank");
  };

  return (
    <section id="projects">
    <div className="container mx-auto p-4 mt-24">
      <hr className="my-8 border-t-2 border-gray-300" />
      <h2 className="text-7xl font-bold mb-8 text-aqua-500 text-center">Projects</h2>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(project.link)}
              className="bg-gray-900 w-64 h-64 p-6 rounded-lg text-aqua-500 text-center shadow-md transition duration-300 ease-in-out hover:scale-105 cursor-pointer flex flex-col justify-center"
              >
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-lg">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
          </section>
  );
};

export default Project;
