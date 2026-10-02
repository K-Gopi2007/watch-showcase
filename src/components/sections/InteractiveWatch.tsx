import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
  { id: 'bezel', title: 'Cerachrom Bezel', description: 'Virtually scratchproof ceramic bezel with platinum-coated numerals.', position: new THREE.Vector3(0, 1.3, 0.5), offset: new THREE.Vector3(0, 2, 3) },
  { id: 'crown', title: 'Triplock Crown', description: 'Triple waterproofness system ensuring the case remains completely watertight.', position: new THREE.Vector3(1.3, 0, 0), offset: new THREE.Vector3(3, 0, 2) },
  { id: 'dial', title: 'Maxi Dial', description: 'Large luminescent hour markers for exceptional legibility in deep water.', position: new THREE.Vector3(0, 0, 0.6), offset: new THREE.Vector3(0, 0, 3) },
  { id: 'bracelet', title: 'Oyster Bracelet', description: 'Robust and comfortable metal bracelet with Oysterlock safety clasp.', position: new THREE.Vector3(0, -1.8, 0), offset: new THREE.Vector3(0, -2, 4) },
];

function Hotspot({ 
  data, 
  isActive, 
  onClick 
}: { 
  data: typeof HOTSPOTS[0]; 
  isActive: boolean; 
  onClick: (ref: React.RefObject<THREE.Group | null>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef} position={data.position}>
      <Html center zIndexRange={[100, 0]}>
        <div className="relative group cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick(groupRef); }}>
          {/* Marker Dot */}
          <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center
            ${isActive ? 'bg-primary border-primary scale-125' : 'bg-black/50 border-white/80 hover:scale-110 hover:border-primary'}`}>
            <div className={`w-1 h-1 bg-white rounded-full transition-opacity ${isActive ? 'opacity-0' : 'opacity-100'}`} />
          </div>
          
          {/* Info Card */}
          <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-48 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg transition-all duration-500
            ${isActive ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
            <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">{data.title}</h3>
            <p className="text-white/80 text-xs leading-relaxed">{data.description}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function WatchModel({ 
  gsapRef, 
  onLoaded,
  controlsRef
}: { 
  gsapRef: React.RefObject<THREE.Group | null>;
  onLoaded: () => void;
  controlsRef: React.RefObject<any>;
}) {
  const { scene } = useGLTF('/models/watch.glb/model.glb');
  const autoRotateRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    if (scene) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  useFrame((_state, delta) => {
    // Only auto-rotate if no hotspot is actively being viewed
    if (autoRotateRef.current && !activeHotspot) {
      autoRotateRef.current.rotation.y += delta * 0.2;
    }
  });

  const handleHotspotClick = (id: string, groupRef: React.RefObject<THREE.Group | null>, data: typeof HOTSPOTS[0]) => {
    if (activeHotspot === id) {
      // Click again to deselect
      setActiveHotspot(null);
      return;
    }
    
    setActiveHotspot(id);
    
    if (groupRef.current && controlsRef.current) {
      // Get exact world position of the clicked hotspot, considering all nested rotations
      const targetPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(targetPosition);
      
      // Calculate camera position offset relative to the target in world space
      // We use the data.offset for the camera's local position, but apply it to world
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(targetPosition).add(data.offset);

      // Smoothly animate OrbitControls target
      gsap.to(controlsRef.current.target, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: 'power3.inOut'
      });

      // Smoothly animate Camera position
      gsap.to(camera.position, {
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z,
        duration: 1.5,
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <group ref={gsapRef}>
      <group ref={autoRotateRef}>
        <primitive object={scene} />
        
        {/* Render Hotspots */}
        {HOTSPOTS.map((hotspot) => (
          <Hotspot 
            key={hotspot.id} 
            data={hotspot} 
            isActive={activeHotspot === hotspot.id} 
            onClick={(ref) => handleHotspotClick(hotspot.id, ref, hotspot)} 
          />
        ))}
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/watch.glb/model.glb');

export function InteractiveWatch() {
  const containerRef = useRef<HTMLElement>(null);
  const gsapRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const [modelReady, setModelReady] = useState(false);
  const handleLoaded = useCallback(() => setModelReady(true), []);

  useGSAP(() => {
    if (!modelReady || !containerRef.current || !gsapRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // 0 -> 2 (Watch animation 1)
    tl.to(gsapRef.current.rotation, { x: 0.3, y: -Math.PI / 2, duration: 2 }, 0);
    tl.to(gsapRef.current.position, { z: 2, y: -0.5, duration: 2 }, 0);
    
    // 0.5 -> 1.5 (Text 1 -> 2)
    tl.to('.text-1', { opacity: 0, y: -20, duration: 1 }, 0.5);
    tl.fromTo('.text-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0.5);

    // 2 -> 4 (Watch animation 2)
    tl.to(gsapRef.current.rotation, { x: -0.2, y: Math.PI / 2, duration: 2 }, 2);
    tl.to(gsapRef.current.position, { z: 4, y: 0.5, duration: 2 }, 2);

    // 2.5 -> 3.5 (Text 2 -> 3)
    tl.to('.text-2', { opacity: 0, y: -20, duration: 1 }, 2.5);
    tl.fromTo('.text-3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 2.5);

  }, { scope: containerRef, dependencies: [modelReady] });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">
        {/* Luxury dark background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
        
        {/* Texts */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-start pt-32 md:pt-40">
          <div className="relative w-full text-center h-20 flex justify-center">
            <h2 className="text-1 absolute text-3xl md:text-5xl font-light text-white tracking-widest uppercase">
              Explore Every Detail
            </h2>
            <h2 className="text-2 absolute text-3xl md:text-5xl font-light text-white tracking-widest uppercase opacity-0">
              Precision Engineering
            </h2>
            <h2 className="text-3 absolute text-3xl md:text-5xl font-light text-white tracking-widest uppercase opacity-0">
              Built For Depth
            </h2>
          </div>
          <div className="w-24 h-px bg-white/30 mx-auto mt-8" />
        </div>

        <div className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
            {/* Environment reflections for strong metallic look - using local compressed HDR to avoid GitHub fetching */}
            <Environment files="/city_small.hdr" environmentIntensity={1.5} />
            
            {/* Cinematic studio lighting setup */}
            <ambientLight intensity={0.4} />
            
            {/* Key Light - Main illumination and shadows */}
            <spotLight 
              position={[5, 8, 5]} 
              angle={0.25} 
              penumbra={0.5} 
              intensity={4} 
              castShadow 
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0001}
            />
            
            {/* Fill Light - Softens shadows on the opposite side */}
            <spotLight 
              position={[-5, 5, 5]} 
              angle={0.3} 
              penumbra={1} 
              intensity={1.5} 
              color="#f0f6ff"
            />
            
            {/* Rim Light - Creates a cinematic highlight on the metal edges */}
            <spotLight 
              position={[0, 5, -8]} 
              angle={0.5} 
              penumbra={0.8} 
              intensity={5} 
              color="#ffebd6" 
            />
            
            <WatchModel 
              gsapRef={gsapRef} 
              onLoaded={handleLoaded} 
              controlsRef={controlsRef}
            />
            
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.65} 
              scale={15} 
              blur={2.5} 
              far={4}
              resolution={2048}
              color="#000000"
            />
            
            <OrbitControls 
              ref={controlsRef}
              enablePan={false} 
              enableZoom={true} 
              minDistance={2} 
              maxDistance={15}
              makeDefault 
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
