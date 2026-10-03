import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { X, Settings2, Check, Smartphone } from 'lucide-react';
import clsx from 'clsx';
import { luxurySounds } from '../audio/LuxurySounds';

const HOTSPOTS = [
  { id: 'bezel', title: 'Cerachrom Bezel', description: 'Virtually scratchproof ceramic bezel with platinum-coated numerals.', position: new THREE.Vector3(0, 1.3, 0.5), offset: new THREE.Vector3(0, 2, 3), specs: ['High-tech Ceramic', 'Platinum PVD', 'UV Resistant'] },
  { id: 'crown', title: 'Triplock Crown', description: 'Triple waterproofness system ensuring the case remains completely watertight.', position: new THREE.Vector3(1.3, 0, 0), offset: new THREE.Vector3(3, 0, 2), specs: ['100m Water Resistance', 'O-Ring Seal', 'Screw-down'] },
  { id: 'dial', title: 'Maxi Dial', description: 'Large luminescent hour markers for exceptional legibility in deep water.', position: new THREE.Vector3(0, 0, 0.6), offset: new THREE.Vector3(0, 0, 3), specs: ['Chromalight Display', '18ct Gold Markers', 'Anti-reflective'] },
  { id: 'bracelet', title: 'Oyster Bracelet', description: 'Robust and comfortable metal bracelet with Oysterlock safety clasp.', position: new THREE.Vector3(0, -1.8, 0), offset: new THREE.Vector3(0, -2, 4), specs: ['Oystersteel', 'Glidelock Extension', 'Folding Clasp'] },
];

const CONFIG_OPTIONS = {
  dial: [
    { id: 'black', label: 'Black', color: '#111111' },
    { id: 'blue', label: 'Blue', color: '#0033aa' },
    { id: 'green', label: 'Green', color: '#005522' }
  ],
  case: [
    { id: 'steel', label: 'Steel', color: '#ffffff', metalness: 1, roughness: 0.2 },
    { id: 'gold', label: 'Gold', color: '#d4af37', metalness: 1, roughness: 0.1 }
  ],
  bracelet: [
    { id: 'oyster', label: 'Oyster' },
    { id: 'jubilee', label: 'Jubilee' }
  ]
};

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
          onClick={(e) => { e.stopPropagation(); luxurySounds.playTick(); onClick(groupRef); }}
          onMouseEnter={luxurySounds.playHover}
        >
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

function CameraLight({ active, hotspotPosition }: { active: boolean, hotspotPosition?: THREE.Vector3 }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame(({ camera }) => {
    if (lightRef.current && active) {
      if (hotspotPosition) {
        const target = new THREE.Vector3().copy(camera.position).lerp(hotspotPosition, 0.3);
        lightRef.current.position.lerp(target, 0.05);
      } else {
        lightRef.current.position.copy(camera.position);
        lightRef.current.position.x += 1;
        lightRef.current.position.y += 1;
      }
    }
  });
  
  if (!active) return null;
  return <pointLight ref={lightRef} intensity={hotspotPosition ? 50 : 25} distance={15} color="#ffffff" decay={1.5} />;
}

function WatchModel({ 
  gsapRef, 
  onLoaded,
  controlsRef,
  activeHotspot,
  onHotspotClick,
  config,
  isExploded,
  gyroData
}: { 
  gsapRef: React.RefObject<THREE.Group | null>;
  onLoaded: () => void;
  controlsRef: React.RefObject<any>;
  activeHotspot: string | null;
  onHotspotClick: (id: string, groupRef: React.RefObject<THREE.Group | null>, data: typeof HOTSPOTS[0]) => void;
  config: { dial: string, case: string, bracelet: string };
  isExploded: boolean;
  gyroData?: React.MutableRefObject<{x: number, y: number}>;
}) {
  const { scene, materials } = useGLTF('/models/watch.glb/model.glb') as any;
  const autoRotateRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [originalCamera, setOriginalCamera] = useState<{position: THREE.Vector3, target: THREE.Vector3} | null>(null);

  const mainGroupRef = useRef<THREE.Group>(null);
  const hotspotsGroupRef = useRef<THREE.Group>(null);
  const explodedRefs = useRef<(THREE.Group | null)[]>([]);

  const explodedClones = React.useMemo(() => {
    if (!scene) return [];
    const styles = [
      { label: "Crystal", zOffset: 6, opacity: 0.15, wireframe: false, color: "#ffffff" },
      { label: "Bezel", zOffset: 3.5, opacity: 0.5, wireframe: false, color: "#111111" },
      { label: "Dial", zOffset: 1, opacity: 0.8, wireframe: false, color: "#0033aa" },
      { label: "Movement", zOffset: -1.5, opacity: 0.9, wireframe: true, color: "#d4af37" },
      { label: "Case", zOffset: -4, opacity: 0.7, wireframe: false, color: "#ffffff" },
      { label: "Bracelet", zOffset: -6.5, opacity: 0.9, wireframe: false, color: "#aaaaaa" },
    ];
    return styles.map((style) => {
      const c = scene.clone();
      const mats: any[] = [];
      c.traverse((node: any) => {
        if (node.isMesh) {
          node.material = node.material.clone();
          node.material.transparent = true;
          node.material.opacity = 0; // Start hidden
          node.material.wireframe = style.wireframe;
          node.material.color = new THREE.Color(style.color);
          mats.push(node.material);
        }
      });
      return { mesh: c, materials: mats, ...style };
    });
  }, [scene]);

  useEffect(() => {
    if (scene) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  useEffect(() => {
    if (!materials || !materials.Material_01) return;
    const material = materials.Material_01;

    const caseOpt = CONFIG_OPTIONS.case.find(c => c.id === config.case);
    const dialOpt = CONFIG_OPTIONS.dial.find(d => d.id === config.dial);

    if (caseOpt && dialOpt) {
      const targetColor = new THREE.Color(caseOpt.color);
      
      if (config.case === 'steel') {
        targetColor.lerp(new THREE.Color(dialOpt.color), 0.15);
      } else {
        targetColor.lerp(new THREE.Color(dialOpt.color), 0.05);
      }

      gsap.to(material.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(material, {
        metalness: caseOpt.metalness,
        roughness: caseOpt.roughness,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, [config, materials]);

  useEffect(() => {
    if (!materials || !materials.Material_01) return;
    
    if (isExploded) {
      gsap.to(materials.Material_01, { opacity: 0, duration: 1, ease: "power2.inOut" });
      materials.Material_01.transparent = true;

      if (hotspotsGroupRef.current) {
        gsap.to(hotspotsGroupRef.current.position, { y: 10, duration: 0.5 });
      }

      if (controlsRef.current) {
        if (!originalCamera) {
          setOriginalCamera({
            position: camera.position.clone(),
            target: controlsRef.current.target.clone()
          });
        }
        gsap.to(camera.position, { x: 12, y: 6, z: 8, duration: 2, ease: "power3.inOut" });
        gsap.to(controlsRef.current.target, { x: 0, y: 0, z: 0, duration: 2, ease: "power3.inOut" });
      }

      explodedRefs.current.forEach((ref, idx) => {
        if (ref) {
          ref.visible = true;
          const cloneData = explodedClones[idx];
          gsap.to(ref.position, { z: cloneData.zOffset, duration: 2, ease: "power3.inOut" });
          cloneData.materials.forEach((mat) => {
            gsap.to(mat, { opacity: cloneData.opacity, duration: 2, ease: "power3.inOut" });
          });
        }
      });

    } else {
      gsap.to(materials.Material_01, { opacity: 1, duration: 1.5, ease: "power3.inOut", delay: 0.5 });
      
      if (hotspotsGroupRef.current) {
        gsap.to(hotspotsGroupRef.current.position, { y: 0, duration: 1, delay: 0.5 });
      }

      if (originalCamera && controlsRef.current && !activeHotspot) {
        gsap.to(camera.position, { x: originalCamera.position.x, y: originalCamera.position.y, z: originalCamera.position.z, duration: 2, ease: "power3.inOut" });
        gsap.to(controlsRef.current.target, { x: originalCamera.target.x, y: originalCamera.target.y, z: originalCamera.target.z, duration: 2, ease: "power3.inOut" });
      }

      explodedRefs.current.forEach((ref, idx) => {
        if (ref) {
          gsap.to(ref.position, { z: 0, duration: 1.5, ease: "power3.inOut" });
          const cloneData = explodedClones[idx];
          cloneData.materials.forEach((mat) => {
            gsap.to(mat, { opacity: 0, duration: 1.5, ease: "power3.inOut", onComplete: () => { ref.visible = false; } });
          });
        }
      });
    }
  }, [isExploded, materials, camera, controlsRef, explodedClones, activeHotspot, originalCamera]);

  useFrame((_state, delta) => {
    if (autoRotateRef.current && !activeHotspot && !isExploded) {
      autoRotateRef.current.rotation.y += delta * 0.2;
    }
    
    if (mainGroupRef.current) {
      if (gyroData?.current && !activeHotspot && !isExploded) {
        mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(mainGroupRef.current.rotation.x, gyroData.current.x, 0.05);
        mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, gyroData.current.y, 0.05);
      } else {
        mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(mainGroupRef.current.rotation.x, 0, 0.05);
        mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, 0, 0.05);
      }
    }
  });

  useEffect(() => {
    if (activeHotspot === null && originalCamera && controlsRef.current && !isExploded) {
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
  }, [activeHotspot, originalCamera, camera, controlsRef, isExploded]);

  const handleHotspotClick = (id: string, groupRef: React.RefObject<THREE.Group | null>, data: typeof HOTSPOTS[0]) => {
    if (activeHotspot === id) return;
    
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
        <group ref={mainGroupRef}>
          <primitive object={scene} />
        </group>
        
        {explodedClones.map((clone, idx) => (
          <group 
            key={idx} 
            ref={(el) => { if(el) explodedRefs.current[idx] = el; }}
            visible={false}
          >
            <primitive object={clone.mesh} />
            <Html position={[0, 2.5, 0]} center zIndexRange={[100, 0]}>
              <div className={clsx(
                "text-white text-[10px] md:text-xs tracking-[0.2em] uppercase whitespace-nowrap bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-opacity duration-1000",
                isExploded ? "opacity-100" : "opacity-0"
              )}>
                {clone.label}
              </div>
            </Html>
          </group>
        ))}

        <group ref={hotspotsGroupRef}>
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
      </group>
      
      <CameraLight active={activeHotspot !== null} hotspotPosition={HOTSPOTS.find(h => h.id === activeHotspot)?.position} />
    </group>
  );
}

useGLTF.preload('/models/watch.glb/model.glb');

export function InteractiveWatch() {
  const [showGyroButton, setShowGyroButton] = useState(false);
  const gyroData = useRef({ x: 0, y: 0 });

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const beta = event.beta || 0;
    const gamma = event.gamma || 0;
    const normalizedBeta = beta - 45;
    const clampedX = THREE.MathUtils.clamp(normalizedBeta, -30, 30) * (Math.PI / 180);
    const clampedY = THREE.MathUtils.clamp(gamma, -30, 30) * (Math.PI / 180);
    gyroData.current = { x: clampedX * 0.4, y: clampedY * 0.4 };
  }, []);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (!isCoarse) return;

    if (typeof window.DeviceOrientationEvent !== 'undefined' && typeof (window.DeviceOrientationEvent as any).requestPermission === 'function') {
      setShowGyroButton(true);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation]);

  const requestGyroPermission = async () => {
    if (typeof window.DeviceOrientationEvent !== 'undefined' && typeof (window.DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (window.DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setShowGyroButton(false);
        }
      } catch (err) {
        console.error('Gyroscope permission denied', err);
      }
    }
  };
  const containerRef = useRef<HTMLElement>(null);
  const gsapRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const [modelReady, setModelReady] = useState(false);
  const handleLoaded = useCallback(() => setModelReady(true), []);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  
  const [config, setConfig] = useState({
    dial: 'green',
    case: 'gold',
    bracelet: 'jubilee'
  });
  const [showConfig, setShowConfig] = useState(true);

  const [displayData, setDisplayData] = useState<typeof HOTSPOTS[0] | null>(null);

  const activeDial = CONFIG_OPTIONS.dial.find(d => d.id === config.dial);
  const activeCase = CONFIG_OPTIONS.case.find(c => c.id === config.case);
  const activeBracelet = CONFIG_OPTIONS.bracelet.find(b => b.id === config.bracelet);

  useEffect(() => {
    if (activeHotspot) {
      setDisplayData(HOTSPOTS.find(h => h.id === activeHotspot) || null);
    } else {
      const t = setTimeout(() => setDisplayData(null), 700);
      return () => clearTimeout(t);
    }
  }, [activeHotspot]);
  
  useEffect(() => {
    if (activeHotspot) {
      setShowConfig(false);
    }
  }, [activeHotspot]);

  useGSAP(() => {
    if (!modelReady || !containerRef.current || !gsapRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1200',
        scrub: 1,
      }
    });

    gsap.set(gsapRef.current.position, { y: -2, z: 2 });
    gsap.set(gsapRef.current.rotation, { x: 0.2, y: -Math.PI / 4 });
    gsap.set(".text-1", { opacity: 0, y: 20 });
    gsap.set(".line-1", { width: 0 });

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

    tl.to(".text-1", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0.5);

    tl.to(".line-1", {
      width: "6rem",
      duration: 1,
      ease: "power2.out"
    }, 1);

    gsap.to(gsapRef.current.position, {
      y: 0.15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2
    });

  }, { scope: containerRef, dependencies: [modelReady] });

  useEffect(() => {
    if (activeHotspot || isExploded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeHotspot, isExploded]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      <div className={clsx(
        "absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-start pt-32 md:pt-40 transition-all duration-700",
        activeHotspot || isExploded ? "opacity-10 blur-xl scale-95" : "opacity-100 blur-0 scale-100"
      )}>
        <div className="relative w-full text-center h-20 flex justify-center">
          <h2 className="text-1 absolute text-3xl md:text-5xl font-light text-white tracking-widest uppercase opacity-0">
            Explore Every Detail
          </h2>
        </div>
        <div className="line-1 w-0 h-px bg-white/30 mx-auto mt-8" />
      </div>

      <button 
        onClick={() => { luxurySounds.playTap(); setShowConfig(!showConfig); }}
        onMouseEnter={luxurySounds.playHover}
        className={clsx(
          "absolute top-32 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-primary hover:text-primary",
          showConfig ? "bg-primary text-black border-primary hover:bg-primary/90 hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "",
          isExploded || activeHotspot ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-label="Toggle Configurator"
      >
        <Settings2 size={20} />
      </button>

      <div className={clsx(
        "absolute top-48 left-6 md:left-12 z-40 w-[calc(100%-3rem)] md:w-80 bg-black/60 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl transform transition-all duration-700 shadow-2xl overflow-hidden",
        showConfig && !isExploded && !activeHotspot ? "translate-x-0 opacity-100 pointer-events-auto" : "-translate-x-12 md:-translate-x-24 opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <div className="w-6 h-[1px] bg-primary"></div>
            Configurator
          </div>

          <div className="mb-6">
            <h4 className="text-white/70 text-xs uppercase tracking-widest mb-3">Dial Color</h4>
            <div className="flex gap-3">
              {CONFIG_OPTIONS.dial.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { luxurySounds.playCrown(); setConfig(prev => ({ ...prev, dial: opt.id })); }}
                  onMouseEnter={luxurySounds.playHover}
                  className={clsx(
                    "w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center relative group shadow-lg",
                    config.dial === opt.id ? "border-primary scale-110 shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "border-white/20 hover:border-white/50 hover:scale-105"
                  )}
                  style={{ backgroundColor: opt.color }}
                  title={opt.label}
                >
                   {config.dial === opt.id && <Check size={14} className="text-white mix-blend-difference" />}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white/70 text-xs uppercase tracking-widest mb-3">Case Finish</h4>
            <div className="grid grid-cols-2 gap-3">
              {CONFIG_OPTIONS.case.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { luxurySounds.playCrown(); setConfig(prev => ({ ...prev, case: opt.id })); }}
                  onMouseEnter={luxurySounds.playHover}
                  className={clsx(
                    "py-3 px-4 rounded-lg border text-xs uppercase tracking-wider transition-all duration-300",
                    config.case === opt.id 
                      ? "bg-white/10 border-primary text-primary shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                      : "bg-black/40 border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-white/70 text-xs uppercase tracking-widest mb-3">Bracelet</h4>
            <div className="grid grid-cols-2 gap-3">
              {CONFIG_OPTIONS.bracelet.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { luxurySounds.playCrown(); setConfig(prev => ({ ...prev, bracelet: opt.id })); }}
                  onMouseEnter={luxurySounds.playHover}
                  className={clsx(
                    "py-3 px-4 rounded-lg border text-xs uppercase tracking-wider transition-all duration-300",
                    config.bracelet === opt.id 
                      ? "bg-white/10 border-primary text-primary shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                      : "bg-black/40 border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 relative">
            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Selected Configuration</h4>
            <div className="text-white text-sm font-light leading-relaxed tracking-wide">
              Submariner<br/>
              <span className="text-primary">{activeDial?.label}</span> Dial<br/>
              <span className="text-primary">{activeCase?.label}</span> Case<br/>
              <span className="text-primary">{activeBracelet?.label}</span> Bracelet
            </div>
          </div>

        </div>
      </div>

      
      <AnimatePresence>
        {showGyroButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={requestGyroPermission}
            className="absolute bottom-12 right-6 md:hidden z-50 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-primary hover:border-primary/50 transition-colors"
          >
            <Smartphone size={20} />
          </motion.button>
        )}
      </AnimatePresence>
<div className={clsx("absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4 transition-all duration-500", activeHotspot ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0")}>
        {isExploded ? (
          <button 
            onClick={() => { luxurySounds.playTap(); setIsExploded(false); }}
            onMouseEnter={luxurySounds.playHover}
            className="px-8 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] rounded-full"
          >
            Reset View
          </button>
        ) : (
          <button 
            onClick={() => { luxurySounds.playTap(); setIsExploded(true); setShowConfig(false); }}
            onMouseEnter={luxurySounds.playHover}
            className="px-8 py-3 border border-white/30 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all backdrop-blur-md rounded-full"
          >
            Explore Movement
          </button>
        )}
      </div>

      <div className={clsx(
        "absolute inset-0 z-30 pointer-events-none flex items-end md:items-center justify-end p-6 pb-12 md:p-16 transition-all duration-1000",
        activeHotspot ? "opacity-100" : "opacity-0"
      )}>
        {displayData && (
          <div className={clsx(
            "w-full md:w-96 bg-black/60 backdrop-blur-xl border border-white/20 p-8 rounded-2xl pointer-events-auto transform transition-all duration-700 shadow-2xl relative overflow-hidden",
            activeHotspot ? "translate-y-0 md:translate-x-0 opacity-100" : "translate-y-12 md:translate-y-0 md:translate-x-12 opacity-0"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
            <div className="relative">
              <button 
                onClick={() => { luxurySounds.playTap(); setActiveHotspot(null); }}
                onMouseEnter={luxurySounds.playHover}
                className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
              >
                <X size={16} />
              </button>
              <div className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                <div className="w-6 h-[1px] bg-primary"></div>
                Feature Focus
              </div>
              <h3 className="text-white text-3xl font-light tracking-wide mb-4">{displayData.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed font-light mb-6">{displayData.description}</p>
              
              {displayData.specs && (
                <div className="space-y-3 mb-8">
                  {displayData.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-white/80 uppercase tracking-widest">
                      <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
                      {spec}
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={() => { luxurySounds.playTap(); setActiveHotspot(null); }}
                onMouseEnter={luxurySounds.playHover}
                className="mt-4 w-full py-3 border border-white/30 text-white/90 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Resume Exploration
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }} className="touch-pan-y">
          <Environment files="/city_small.hdr" environmentIntensity={activeHotspot || isExploded ? 0.05 : 1.5} />
          <ambientLight intensity={activeHotspot || isExploded ? 0.05 : 0.4} />
          
          <spotLight 
            position={[5, 8, 5]} 
            angle={0.25} 
            penumbra={0.5} 
            intensity={activeHotspot || isExploded ? 0.2 : 4} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          
          <spotLight 
            position={[-5, 5, 5]} 
            angle={0.3} 
            penumbra={1} 
            intensity={activeHotspot || isExploded ? 0.1 : 1.5} 
            color="#f0f6ff"
          />
          
          <spotLight 
            position={[0, 5, -8]} 
            angle={0.5} 
            penumbra={0.8} 
            intensity={activeHotspot || isExploded ? 0.2 : 5} 
            color="#ffebd6" 
          />
          
          <WatchModel 
            gsapRef={gsapRef} 
            onLoaded={handleLoaded} 
            controlsRef={controlsRef}
            activeHotspot={activeHotspot}
            onHotspotClick={(id) => setActiveHotspot(id)}
            config={config}
            isExploded={isExploded}
            gyroData={gyroData}
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
            enabled={!activeHotspot && !isExploded}
          />
        </Canvas>
      </div>
    </div>
    </section>
  );
}
