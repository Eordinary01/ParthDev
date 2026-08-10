"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WavePlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const gridSize = 50;
  const amplitude = 0.5;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, gridSize, gridSize);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;
    const array = positions.array as Float32Array;

    for (let i = 0; i < positions.count; i++) {
      const x = array[i * 3];
      const y = array[i * 3 + 1];
      
      const wave1 = Math.sin(x * 0.5 + time) * amplitude;
      const wave2 = Math.sin(y * 0.5 + time * 0.7) * amplitude;
      const wave3 = Math.sin((x + y) * 0.3 + time * 0.5) * amplitude * 0.5;
      
      array[i * 3 + 2] = wave1 + wave2 + wave3;
    }
    
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.rotation.x = -Math.PI / 3;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#58a6ff"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function Wave3D() {
  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 60 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <WavePlane />
      </Canvas>
    </div>
  );
}
