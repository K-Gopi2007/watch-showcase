import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { luxurySounds } from '../audio/LuxurySounds';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "0px 0px 200px 0px" });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => console.warn('Autoplay blocked'));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isVideoLoaded]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black"
    >
      {/* Background Video with Poster Fallback */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          src="/videos/watch-video.mp4"
          poster="/og-image.webp"
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          onError={() => console.warn("Video unavailable, poster displayed")}
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      </motion.div>

      {/* Dark Luxury Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />

      {/* Subtle Gold Light Sweep */}
      <motion.div 
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '100%', opacity: [0, 0.4, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-primary/15 to-transparent w-[200%] -skew-x-12"
      />

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-6 max-w-4xl"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-primary uppercase tracking-[0.35em] text-xs md:text-sm font-semibold"
          >
            Rolex Submariner
          </motion.span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-white drop-shadow-2xl">
            Built For <span className="italic text-primary">Depth.</span><br />
            Crafted For <span className="italic text-primary">Life.</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/80 text-base md:text-xl max-w-2xl leading-relaxed drop-shadow-md font-light"
          >
            The reference among divers&apos; watches. A masterpiece of durability and precision, engineered to conquer the deep and command the surface.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
          >
            <a 
              href="#collection" 
              className="px-8 py-4 bg-primary text-black font-semibold text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all text-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              onMouseEnter={luxurySounds.playHover}
              onClick={luxurySounds.playTap}
            >
              Explore Collection
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-white/40 text-white font-semibold text-xs md:text-sm uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-black/30 backdrop-blur-sm transition-all text-center"
              onMouseEnter={luxurySounds.playHover}
              onClick={luxurySounds.playTap}
            >
              Request Consultation
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
