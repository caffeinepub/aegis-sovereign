import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface Node {
  name: string;
  lat: number;
  lon: number;
  latency: number;
}

const NODES: Node[] = [
  { name: 'New York', lat: 40.7128, lon: -74.0060, latency: 0 },
  { name: 'London', lat: 51.5074, lon: -0.1278, latency: 0 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, latency: 0 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, latency: 0 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, latency: 0 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333, latency: 0 },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [nodes, setNodes] = useState(NODES);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        latency: Math.random() * 200,
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return '#10b981'; // green
    if (latency < 150) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <group>
      {/* Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#0f172a"
          emissiveIntensity={0.2}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Connection Nodes */}
      {nodes.map((node, idx) => {
        const pos = latLonToVector3(node.lat, node.lon, 2.05);
        return (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={getLatencyColor(node.latency)} />
          </mesh>
        );
      })}

      {/* Connection Arcs using Line from drei */}
      {nodes.map((node, idx) => {
        if (idx === 0) return null;
        const start = latLonToVector3(nodes[0].lat, nodes[0].lon, 2.05);
        const end = latLonToVector3(node.lat, node.lon, 2.05);
        const mid = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(2.5);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);

        return (
          <Line
            key={`arc-${idx}`}
            points={points}
            color={getLatencyColor(node.latency)}
            lineWidth={2}
          />
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}

export default function NetworkLatencyGlobe() {
  return (
    <div className="relative h-full">
      <div className="absolute left-4 top-4 z-10">
        <h3 className="text-lg font-semibold">Network Latency Globe</h3>
        <p className="text-sm text-gray-400">Global connection monitoring</p>
      </div>
      <div className="absolute right-4 top-4 z-10">
        <ActiveStatusIndicator />
      </div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Globe />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
