"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null!);
  
  useFrame((state) => {
    if (!gridRef.current) return;
    const time = state.clock.getElapsedTime();
    gridRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    gridRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, 0x58a6ff, 0x1f2937]}
      rotation={[Math.PI / 4, 0, 0]}
    />
  );
}

function FloatingCubes() {
  const count = 20;
  const meshes = useRef<THREE.Mesh[]>([]);
  
  const cubes = Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10,
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ] as [number, number, number],
    scale: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.5 + 0.5,
  }));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const cube = cubes[i];
      mesh.rotation.x = cube.rotation[0] + time * 0.2 * cube.speed;
      mesh.rotation.y = cube.rotation[1] + time * 0.3 * cube.speed;
      mesh.position.y = cube.position[1] + Math.sin(time * cube.speed) * 0.5;
    });
  });

  return (
    <>
      {cubes.map((cube, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          position={cube.position}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#58a6ff" : i % 3 === 1 ? "#3fb950" : "#bc8cff"}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Grid />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}
