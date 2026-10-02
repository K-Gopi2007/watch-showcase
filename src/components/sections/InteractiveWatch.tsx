import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function WatchModel() {
  const { scene } = useGLTF('/models/watch.glb/model.glb');
  const watchRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (watchRef.current) {
      watchRef.current.rotation.y += delta * 0.2; // Slow automatic rotation
    }
  });

  return (
    <group ref={watchRef}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/watch.glb/model.glb');

export function InteractiveWatch() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden">
      {/* Luxury dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase mb-4">
          Explore Every Detail
        </h2>
        <div className="w-24 h-px bg-white/30 mx-auto" />
      </div>

      <div className="relative z-10 w-full h-[60vh] md:h-[75vh] max-w-7xl mx-auto cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
          {/* Environment reflections */}
          <Environment preset="studio" />
          
          {/* Studio lighting */}
          <ambientLight intensity={1.2} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={2} 
            castShadow 
          />
          <spotLight 
            position={[-10, 10, -10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1} 
          />
          
          <WatchModel />
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={2} 
            maxDistance={15}
            makeDefault 
          />
        </Canvas>
      </div>
    </section>
  );
}
