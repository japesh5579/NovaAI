"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#0ea5e9"
        wireframe
        emissive="#0ea5e9"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function OrbitText({ text, radius, speed, offset }: {
  text: string; radius: number; speed: number; offset: number;
}) {
  const ref = useRef<THREE.Object3D>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = radius * Math.cos(t);
    ref.current.position.z = radius * Math.sin(t);
  });

  return (
    <Text ref={ref} fontSize={0.3} color="white">
      {text}
    </Text>
  );
}

const tech = ["C++", "JavaScript", "React", "Node", "Python", "SQL"];

export default function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Globe />

      {tech.map((t, i) => (
        <OrbitText key={t} text={t} radius={3} speed={0.5} offset={i * 1} />
      ))}

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
