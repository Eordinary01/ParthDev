"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 300; // Increased particle count
  const mesh = useRef<THREE.Points>(null!);
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = velocities.current;
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      // Random velocities for organic movement
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
      
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        col[i * 3] = 0.345; col[i * 3 + 1] = 0.651; col[i * 3 + 2] = 1.0; // Blue
      } else if (colorChoice < 0.6) {
        col[i * 3] = 0.247; col[i * 3 + 1] = 0.725; col[i * 3 + 2] = 0.314; // Green
      } else if (colorChoice < 0.8) {
        col[i * 3] = 0.737; col[i * 3 + 1] = 0.549; col[i * 3 + 2] = 1.0; // Purple
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.4; col[i * 3 + 2] = 0.6; // Pink
      }
    }
    return [pos, col];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth rotation
    mesh.current.rotation.y = time * 0.03;
    mesh.current.rotation.x = Math.sin(time * 0.2) * 0.05;

    const posAttr = mesh.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const vel = velocities.current;
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Apply velocities with wave motion
      arr[idx] += vel[idx] + Math.sin(time * 0.5 + i * 0.1) * 0.002;
      arr[idx + 1] += vel[idx + 1] + Math.cos(time * 0.3 + i * 0.15) * 0.002;
      arr[idx + 2] += vel[idx + 2];
      
      // Boundary wrapping for continuous effect
      if (arr[idx] > 12.5) arr[idx] = -12.5;
      if (arr[idx] < -12.5) arr[idx] = 12.5;
      if (arr[idx + 1] > 12.5) arr[idx + 1] = -12.5;
      if (arr[idx + 1] < -12.5) arr[idx + 1] = 12.5;
      if (arr[idx + 2] > 7.5) arr[idx + 2] = -7.5;
      if (arr[idx + 2] < -7.5) arr[idx + 2] = 7.5;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Add connecting lines between nearby particles
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null!);
  const particleCount = 300;
  const maxDistance = 3;
  
  const positions = useMemo(() => {
    return new Float32Array(particleCount * particleCount * 6);
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Pulse opacity
    const material = linesRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.1 + Math.sin(time * 0.5) * 0.05;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color={0x58a6ff}
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      <Particles />
      <ConnectionLines />
    </>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
