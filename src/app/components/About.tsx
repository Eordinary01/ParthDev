"use client";
import React from "react";

export default function About() {
  return (
    <section id="about" className="section-spacing bg-canvas">
      <div className="container-main">
        <div className="flex items-center gap-3 mb-8 hero-slide-up">
          <span className="text-gh-green font-mono text-sm">$</span>
          <h2 className="text-3xl font-bold text-gh-text font-mono">cat about.md</h2>
        </div>
        <div className="h-px bg-border mb-12 hero-slide-up" style={{ animationDelay: "0.1s" }} />

        <div className="max-w-4xl">
          <div className="bg-default border border-border rounded-md overflow-hidden hero-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-subtle border-b border-border">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gh-secondary" fill="currentColor">
                <path d="M14.25 15.75l-4.5-4.5 4.5-4.5 1.5 1.5L12.75 12l3 3.75-1.5 1.5z" />
              </svg>
              <span className="text-sm text-gh-secondary font-mono">About.md</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <h1 className="text-4xl font-bold text-gh-text border-b border-border pb-4 hero-slide-up" style={{ animationDelay: "0.3s" }}>
                Hey there!
              </h1>

              <div className="space-y-4 text-gh-secondary leading-relaxed hero-slide-up" style={{ animationDelay: "0.4s" }}>
                <p>
                  I&apos;m <strong className="text-gh-text">Parth Manocha</strong>, a Full Stack Developer
                  based in <strong className="text-gh-text">Jaipur, India</strong>. I&apos;m passionate about
                  building web applications that make a difference.
                </p>
                <p>
                  My journey into tech started with curiosity about how things work.
                  That curiosity led me to programming, and I haven&apos;t looked back since.
                  I specialize in the <span className="text-gh-blue">MERN stack</span> and{" "}
                  <span className="text-gh-blue">Next.js</span>, with a strong focus on
                  both frontend experiences and backend architecture.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                  contributing to open-source projects, and constantly pushing myself
                  to learn something new.
                </p>
              </div>

              <div className="pt-4 border-t border-border hero-slide-up" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-2xl font-bold text-gh-text mb-4">What I Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Frontend", desc: "Building responsive, performant UIs with React, Next.js, and modern CSS", color: "text-gh-blue" },
                    { title: "Backend", desc: "Designing scalable APIs and services with Node.js, Express, and MongoDB", color: "text-gh-green" },
                    { title: "Full Stack", desc: "End-to-end application development from database design to deployment", color: "text-gh-purple" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 border border-border rounded-md hover:border-gh-muted transition-all duration-200 cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                    >
                      <h3 className={`font-mono font-bold ${item.color} mb-2`}>{item.title}</h3>
                      <p className="text-sm text-gh-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border hero-slide-up" style={{ animationDelay: "0.6s" }}>
                <h2 className="text-2xl font-bold text-gh-text mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
                    "Express.js", "MongoDB", "Tailwind CSS", "Git", "REST APIs",
                    "React Native", "PostgreSQL", "Docker", "Vercel",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-subtle border border-border rounded-full text-gh-secondary hover:text-gh-text hover:border-gh-muted hover:bg-gh-blue/10 transition-all duration-200 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
