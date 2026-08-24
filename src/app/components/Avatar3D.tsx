"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AvatarModel({ accent, secondary }: { accent: string; secondary: string }) {
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  // Parse hex to three color
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);
  const secondaryColor = useMemo(() => new THREE.Color(secondary), [secondary]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.35) * 0.28;
      headRef.current.rotation.x = Math.sin(t * 0.22) * 0.08;
      headRef.current.position.y = Math.sin(t * 0.6) * 0.06;
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25;
      ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.18;
      ring2Ref.current.rotation.y = Math.sin(t * 0.25) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.08, 0.08]}>
      {/* Decorative rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]} scale={1.55}>
        <torusGeometry args={[1.22, 0.018, 16, 100]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.55} transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.6, 0, 0]} scale={1.38}>
        <torusGeometry args={[1.08, 0.012, 16, 100]} />
        <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={0.45} transparent opacity={0.38} />
      </mesh>

      {/* Head group */}
      <group ref={headRef} position={[0, 0.62, 0]}>
        {/* Head sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color="#e6edf3" roughness={0.35} metalness={0.08} />
        </mesh>
        {/* Hair cap */}
        <mesh position={[0, 0.22, -0.05]} rotation={[0.15, 0, 0]}>
          <sphereGeometry args={[0.57, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          <meshStandardMaterial color="#0d1117" roughness={0.9} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.17, 0.06, 0.46]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#010409" />
        </mesh>
        <mesh position={[0.17, 0.06, 0.46]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#010409" />
        </mesh>
        {/* Eye shine */}
        <mesh position={[-0.15, 0.09, 0.52]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.19, 0.09, 0.52]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.8} />
        </mesh>
        {/* Glasses frames */}
        <mesh position={[-0.17, 0.06, 0.49]}>
          <torusGeometry args={[0.11, 0.014, 8, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0.17, 0.06, 0.49]}>
          <torusGeometry args={[0.11, 0.014, 8, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[0, 0.06, 0.49]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.014, 0.01]} />
          <meshStandardMaterial color={accentColor} />
        </mesh>
        {/* Smile */}
        <mesh position={[0, -0.18, 0.48]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.13, 0.015, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#30363d" />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.52, 0, 0.02]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#e6edf3" />
        </mesh>
        <mesh position={[0.52, 0, 0.02]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#e6edf3" />
        </mesh>
      </group>

      {/* Body / hoodie */}
      <group ref={bodyRef} position={[0, -0.48, 0]}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.42, 0.55, 8, 24]} />
          <meshStandardMaterial color="#161b22" roughness={0.85} />
        </mesh>
        {/* Hoodie accent stripe */}
        <mesh position={[0, 0.22, 0.31]}>
          <boxGeometry args={[0.42, 0.14, 0.04]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
        </mesh>
        {/* Laptop */}
        <group position={[0, -0.08, 0.48]} rotation={[-0.18, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.74, 0.46, 0.018]} />
            <meshStandardMaterial color="#0d1117" roughness={0.4} metalness={0.2} />
          </mesh>
          {/* Screen glow */}
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.68, 0.4]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.55} transparent opacity={0.95} />
          </mesh>
          {/* Code lines on screen */}
          <mesh position={[-0.14, 0.08, 0.015]}>
            <planeGeometry args={[0.28, 0.03]} />
            <meshBasicMaterial color="#fff" transparent opacity={0.85} />
          </mesh>
          <mesh position={[-0.08, 0.02, 0.015]}>
            <planeGeometry args={[0.42, 0.03]} />
            <meshBasicMaterial color="#fff" transparent opacity={0.55} />
          </mesh>
          <mesh position={[-0.12, -0.04, 0.015]}>
            <planeGeometry args={[0.32, 0.03]} />
            <meshBasicMaterial color="#fff" transparent opacity={0.4} />
          </mesh>
          <mesh position={[-0.18, -0.1, 0.015]}>
            <planeGeometry args={[0.18, 0.03]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.9} />
          </mesh>
        </group>
        {/* Arms */}
        <mesh position={[-0.52, 0.08, 0.1]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.11, 0.42, 6, 12]} />
          <meshStandardMaterial color="#161b22" />
        </mesh>
        <mesh position={[0.52, 0.08, 0.1]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.11, 0.42, 6, 12]} />
          <meshStandardMaterial color="#161b22" />
        </mesh>
      </group>

      {/* Floating code particles */}
      <mesh position={[0.9, 0.7, -0.3]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.85, 0.55, 0.2]}>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.75, -0.65, 0.25]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color={accentColor} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

export default function Avatar3D({ accent = "#bc8cff", secondary = "#d2a8ff" }: { accent?: string; secondary?: string }) {
  return (
    <div className="w-full h-[260px] sm:h-[300px] lg:h-[360px] lg:w-[320px] relative flex-shrink-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 3.6]} fov={36} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[2.5, 3, 2]} intensity={1.05} color="#fff" />
        <directionalLight position={[-2, 1, -1]} intensity={0.4} color={accent} />
        <pointLight position={[0, 1.2, 1.2]} intensity={0.7} color={accent} distance={5} />
        <AvatarModel accent={accent} secondary={secondary} />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.22} scale={2.4} blur={2} far={1.6} color="#000" />
      </Canvas>
    </div>
  );
}
