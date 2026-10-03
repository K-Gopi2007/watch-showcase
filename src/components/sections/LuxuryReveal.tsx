import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function LuxuryReveal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "0px 0px 200px 0px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.log('Video play failed:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  const handleExplore = () => {
    // Scroll smoothly to the next section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Video */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          src="/videos/luxury-reveal.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
        />
      </motion.div>

      {/* Overlay Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80 pointer-events-none" />
      
      {/* Subtle Gold Light Sweep */}
      <motion.div 
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '100%', opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-primary/20 to-transparent w-[200%] -skew-x-12"
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 mt-20 md:mt-0">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-primary text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-4"
        >
          Precision. Heritage. Excellence.
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wider uppercase mb-12"
        >
          Crafted for <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">Legends</span>
        </motion.h1>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          onClick={handleExplore}
          className="group relative px-8 py-4 bg-transparent overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full border border-primary/50 group-hover:border-primary transition-colors duration-500" />
          <div className="absolute inset-0 w-0 h-full bg-primary/10 group-hover:w-full transition-all duration-700 ease-out" />
          <span className="relative z-10 text-white text-xs uppercase tracking-[0.2em] group-hover:text-primary transition-colors duration-500">
            Explore Collection
          </span>
        </motion.button>
      </div>
    </section>
  );
}
