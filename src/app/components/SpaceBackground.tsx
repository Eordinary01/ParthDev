"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);
  const shootingStarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create stars
    const createStars = () => {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        
        container.appendChild(star);
        starsRef.current.push(star);

        // Animate star twinkling
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    };

    // Create shooting stars
    const createShootingStars = () => {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'absolute w-1 h-1 bg-white rounded-full';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 100}%`;
        shootingStar.style.boxShadow = '0 0 10px #fff, 0 0 20px #4fd1c5, 0 0 30px #4fd1c5';
        
        container.appendChild(shootingStar);
        shootingStarsRef.current.push(shootingStar);

        // Animate shooting star
        const animateShootingStar = () => {
          gsap.set(shootingStar, {
            x: -100,
            y: -100,
            opacity: 0
          });

          gsap.to(shootingStar, {
            x: window.innerWidth + 100,
            y: window.innerHeight + 100,
            opacity: 1,
            duration: Math.random() * 2 + 1,
            ease: "none",
            onComplete: () => {
              setTimeout(animateShootingStar, Math.random() * 10000 + 5000);
            }
          });
        };

        setTimeout(animateShootingStar, Math.random() * 5000);
      }
    };

    // Create cosmic dust
    const createCosmicDust = () => {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const dust = document.createElement('div');
        dust.className = 'cosmic-dust';
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.animationDelay = `${Math.random() * 15}s`;
        dust.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        container.appendChild(dust);
      }
    };

    // Create matrix rain effect
    const createMatrixRain = () => {
      const container = containerRef.current;
      if (!container) return;

      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      
      for (let i = 0; i < 30; i++) {
        const column = document.createElement('div');
        column.className = 'absolute top-0';
        column.style.left = `${Math.random() * 100}%`;
        
        for (let j = 0; j < 20; j++) {
          const char = document.createElement('div');
          char.className = 'matrix-char';
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          char.style.animationDelay = `${Math.random() * 10}s`;
          char.style.animationDuration = `${Math.random() * 5 + 10}s`;
          char.style.top = `${j * 20}px`;
          
          column.appendChild(char);
        }
        
        container.appendChild(column);
      }
    };

    createStars();
    createShootingStars();
    createCosmicDust();
    createMatrixRain();

    // Cleanup function
    return () => {
      starsRef.current = [];
      shootingStarsRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 space-background pointer-events-none z-0"
    >
      {/* Nebula effects */}
      <div className="nebula-1" style={{ top: '10%', left: '20%' }} />
      <div className="nebula-2" style={{ top: '60%', right: '10%' }} />
      <div className="nebula-3" style={{ bottom: '20%', left: '60%' }} />
      
      {/* Energy field */}
      <div className="energy-field" />
    </div>
  );
};

export default SpaceBackground;