import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#0084ff"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Sphere args={[1.3, 64, 64]}>
        <MeshWobbleMaterial
          color="#001a33"
          attach="material"
          factor={0.6}
          speed={2}
          transparent
          opacity={0.4}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const ThreeHero = ({ lowPower }: { lowPower?: boolean }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: !lowPower, powerPreference: lowPower ? 'low-power' : 'high-performance' }}
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#0084ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#001a33" />
        
        {!lowPower ? (
          <AnimatedShape />
        ) : (
          <Sphere args={[1, 16, 16]}>
            <meshStandardMaterial color="#0084ff" roughness={0.5} metalness={0.5} />
          </Sphere>
        )}
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={lowPower ? 0.5 : 1} />
      </Canvas>
    </div>
  );
};

export default ThreeHero;
