import { useState } from 'react';
import { motion } from 'framer-motion';
import frontImg from '../../assets/watch/front.webp';

export function CinematicHero() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!videoFailed ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/luxury-watch.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src={frontImg}
            alt="Rolex Submariner Fallback"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      ></div>

      {/* Center Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-6">
            Rolex Submariner
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-2 md:mb-4 leading-tight">
            Built For Depth.
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white/90 italic mb-10 md:mb-14 leading-tight">
            Crafted For Life.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto"
        >
          <button className="px-8 py-4 bg-primary text-black font-medium tracking-[0.15em] uppercase text-xs md:text-sm hover:bg-white hover:text-black transition-colors duration-500 w-full sm:w-auto">
            Explore Collection
          </button>
          <button className="px-8 py-4 bg-transparent border border-white text-white font-medium tracking-[0.15em] uppercase text-xs md:text-sm hover:bg-white hover:text-black transition-colors duration-500 w-full sm:w-auto backdrop-blur-sm">
            Request Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
