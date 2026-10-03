import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';
import clsx from 'clsx';

const HOTSPOTS = [
  { id: 'bezel', title: 'Cerachrom Bezel', description: 'Virtually scratchproof ceramic bezel with platinum-coated numerals.', position: new THREE.Vector3(0, 1.3, 0.5), offset: new THREE.Vector3(0, 2, 3) },
  { id: 'crown', title: 'Triplock Crown', description: 'Triple waterproofness system ensuring the case remains completely watertight.', position: new THREE.Vector3(1.3, 0, 0), offset: new THREE.Vector3(3, 0, 2) },
  { id: 'dial', title: 'Maxi Dial', description: 'Large luminescent hour markers for exceptional legibility in deep water.', position: new THREE.Vector3(0, 0, 0.6), offset: new THREE.Vector3(0, 0, 3) },
  { id: 'bracelet', title: 'Oyster Bracelet', description: 'Robust and comfortable metal bracelet with Oysterlock safety clasp.', position: new THREE.Vector3(0, -1.8, 0), offset: new THREE.Vector3(0, -2, 4) },
];

function Hotspot({ 
  data, 
  isActive, 
  isAnyActive,
  onClick 
}: { 
  data: typeof HOTSPOTS[0]; 
  isActive: boolean; 
  isAnyActive: boolean;
  onClick: (ref: React.RefObject<THREE.Group | null>) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef} position={data.position}>
      <Html center zIndexRange={[100, 0]}>
        <div 
          className={clsx(
            "relative group cursor-pointer transition-opacity duration-500",
            isAnyActive && !isActive ? "opacity-0 pointer-events-none" : "opacity-100"
          )} 
          onClick={(e) => { e.stopPropagation(); onClick(groupRef); }}
        >
          {/* Marker Dot */}
          <div className={clsx(
            "w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
            isActive ? "bg-primary border-primary scale-125 shadow-[0_0_15px_rgba(212,175,55,0.6)]" : "bg-black/60 border-white/80 hover:scale-110 hover:border-primary backdrop-blur-sm"
          )}>
            <div className={clsx("w-1.5 h-1.5 bg-white rounded-full transition-opacity", isActive ? "opacity-0" : "opacity-100")} />
          </div>
        </div>
      </Html>
    </group>
  );
}

function CameraLight({ active }: { active: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame(({ camera }) => {
    if (lightRef.current && active) {
      lightRef.current.position.copy(camera.position);
      // Move slightly to the right to avoid flat lighting
      lightRef.current.position.x += 1;
      lightRef.current.position.y += 1;
    }
  });
  
  if (!active) return null;
  return <pointLight ref={lightRef} intensity={25} distance={15} color="#ffffff" decay={1.5} />;
}

function WatchModel({ 
  gsapRef, 
  onLoaded,
  controlsRef,
  activeHotspot,
  onHotspotClick
}: { 
  gsapRef: React.RefObject<THREE.Group | null>;
  onLoaded: () => void;
  controlsRef: React.RefObject<any>;
  activeHotspot: string | null;
  onHotspotClick: (id: string, groupRef: React.RefObject<THREE.Group | null>, data: typeof HOTSPOTS[0]) => void;
}) {
  const { scene } = useGLTF('/models/watch.glb/model.glb');
  const autoRotateRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [originalCamera, setOriginalCamera] = useState<{position: THREE.Vector3, target: THREE.Vector3} | null>(null);

  useEffect(() => {
    if (scene) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  useFrame((_state, delta) => {
    if (autoRotateRef.current && !activeHotspot) {
      autoRotateRef.current.rotation.y += delta * 0.2;
    }
  });

  // Restore camera when activeHotspot is cleared
  useEffect(() => {
    if (activeHotspot === null && originalCamera && controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: originalCamera.target.x, 
        y: originalCamera.target.y, 
        z: originalCamera.target.z, 
        duration: 1.5, 
        ease: 'power3.inOut'
      });
      gsap.to(camera.position, {
        x: originalCamera.position.x, 
        y: originalCamera.position.y, 
        z: originalCamera.position.z, 
        duration: 1.5, 
        ease: 'power3.inOut'
      });
      setOriginalCamera(null);
    }
  }, [activeHotspot, originalCamera, camera, controlsRef]);

  const handleHotspotClick = (id: string, groupRef: React.RefObject<THREE.Group | null>, data: typeof HOTSPOTS[0]) => {
    if (activeHotspot === id) return; // Do nothing if clicking already active
    
    if (!activeHotspot && controlsRef.current) {
      setOriginalCamera({
        position: camera.position.clone(),
        target: controlsRef.current.target.clone()
      });
    }
    
    onHotspotClick(id, groupRef, data);
    
    if (groupRef.current && controlsRef.current) {
      const targetPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(targetPosition);
      
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(targetPosition).add(data.offset);

      gsap.to(controlsRef.current.target, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: 'power3.inOut'
      });

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
        
        {HOTSPOTS.map((hotspot) => (
          <Hotspot 
            key={hotspot.id} 
            data={hotspot} 
            isActive={activeHotspot === hotspot.id} 
            isAnyActive={activeHotspot !== null}
            onClick={(ref) => handleHotspotClick(hotspot.id, ref, hotspot)} 
          />
        ))}
      </group>
      
      <CameraLight active={activeHotspot !== null} />
    </group>
  );
}

useGLTF.preload('/models/watch.glb/model.glb');

export function InteractiveWatch() {
  const containerRef = useRef<HTMLElement>(null);
  const gsapRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const [modelReady, setModelReady] = useState(false);
  const handleLoaded = useCallback(() => setModelReady(true), []);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  
  const activeData = HOTSPOTS.find(h => h.id === activeHotspot);

  useGSAP(() => {
    if (!modelReady || !containerRef.current || !gsapRef.current) return;

    const tl = gsap.timeline();

    // Initial entrance setup
    gsap.set(gsapRef.current.position, { y: -2, z: 2 });
    gsap.set(gsapRef.current.rotation, { x: 0.2, y: -Math.PI / 4 });
    gsap.set('.text-1', { opacity: 0, y: 20 });
    gsap.set('.line-1', { width: 0 });

    tl.to(gsapRef.current.position, {
      y: 0,
      z: 0,
      duration: 2,
      ease: "power3.out"
    }, 0);

    tl.to(gsapRef.current.rotation, {
      x: 0,
      y: 0,
      duration: 2,
      ease: "power3.out"
    }, 0);

    tl.to('.text-1', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0.5);

    tl.to('.line-1', {
      width: "6rem",
      duration: 1,
      ease: "power2.out"
    }, 1);

    // Subtle floating animation after entrance
    gsap.to(gsapRef.current.position, {
      y: 0.15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2
    });

  }, { scope: containerRef, dependencies: [modelReady] });

  // Prevent scrolling when hotspot is active
  useEffect(() => {
    if (activeHotspot) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeHotspot]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      {/* Background text overlays, blurred when hotspot is active */}
      <div className={clsx(
        "absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-start pt-32 md:pt-40 transition-all duration-700",
        activeHotspot ? "opacity-10 blur-xl scale-95" : "opacity-100 blur-0 scale-100"
      )}>
        <div className="relative w-full text-center h-20 flex justify-center">
          <h2 className="text-1 absolute text-3xl md:text-5xl font-light text-white tracking-widest uppercase opacity-0">
            Explore Every Detail
          </h2>
        </div>
        <div className="line-1 w-0 h-px bg-white/30 mx-auto mt-8" />
      </div>

      {/* Premium Info Panel Overlay */}
      <div className={clsx(
        "absolute inset-0 z-30 pointer-events-none flex items-end md:items-center justify-end p-6 pb-12 md:p-16 transition-all duration-1000",
        activeHotspot ? "opacity-100" : "opacity-0"
      )}>
        {activeData && (
          <div className={clsx(
            "w-full md:w-96 bg-black/60 backdrop-blur-xl border border-white/20 p-8 rounded-2xl pointer-events-auto transform transition-all duration-700 shadow-2xl relative overflow-hidden",
            activeHotspot ? "translate-y-0 md:translate-x-0 opacity-100" : "translate-y-12 md:translate-y-0 md:translate-x-12 opacity-0"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
            <div className="relative">
              <button 
                onClick={() => setActiveHotspot(null)}
                className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
              >
                <X size={16} />
              </button>
              <div className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                <div className="w-6 h-[1px] bg-primary"></div>
                Feature Focus
              </div>
              <h3 className="text-white text-3xl font-light tracking-wide mb-4">{activeData.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed font-light">{activeData.description}</p>
              <button 
                onClick={() => setActiveHotspot(null)}
                className="mt-8 w-full py-3 border border-white/30 text-white/90 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Resume Exploration
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }} className="touch-pan-y">
          <Environment files="/city_small.hdr" environmentIntensity={activeHotspot ? 0.05 : 1.5} />
          <ambientLight intensity={activeHotspot ? 0.05 : 0.4} />
          
          <spotLight 
            position={[5, 8, 5]} 
            angle={0.25} 
            penumbra={0.5} 
            intensity={activeHotspot ? 0.2 : 4} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          
          <spotLight 
            position={[-5, 5, 5]} 
            angle={0.3} 
            penumbra={1} 
            intensity={activeHotspot ? 0.1 : 1.5} 
            color="#f0f6ff"
          />
          
          <spotLight 
            position={[0, 5, -8]} 
            angle={0.5} 
            penumbra={0.8} 
            intensity={activeHotspot ? 0.2 : 5} 
            color="#ffebd6" 
          />
          
          <WatchModel 
            gsapRef={gsapRef} 
            onLoaded={handleLoaded} 
            controlsRef={controlsRef}
            activeHotspot={activeHotspot}
            onHotspotClick={(id) => setActiveHotspot(id)}
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
            enableZoom={false} 
            minDistance={2} 
            maxDistance={15}
            makeDefault 
            enabled={!activeHotspot}
          />
        </Canvas>
      </div>
    </section>
  );
}
