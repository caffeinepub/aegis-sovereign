import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ position, geometry, color }: { position: [number, number, number]; geometry: THREE.BufferGeometry; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow continuous rotation for live effect
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow continuous rotation for live effect (different axes for variety)
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.z += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={torusGeometry}>
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function Scene() {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <FloatingShape position={[-3, 2, -5]} geometry={cubeGeometry} color="#4F46E5" />
      <FloatingTorus position={[3, -1, -6]} color="#7C3AED" />
      <FloatingShape position={[0, 3, -7]} geometry={sphereGeometry} color="#6366F1" />
      <FloatingShape position={[-2, -2, -5]} geometry={sphereGeometry} color="#8B5CF6" />
      <FloatingShape position={[2, 1, -8]} geometry={cubeGeometry} color="#5B21B6" />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900 via-indigo-900 to-violet-900" />
      
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ filter: 'blur(4px)' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
