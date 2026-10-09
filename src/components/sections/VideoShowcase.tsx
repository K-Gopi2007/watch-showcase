import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export function VideoShowcase() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "0px 0px 200px 0px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <section 
      id="film" 
      ref={containerRef}
      className="bg-black text-foreground py-24 md:py-32 relative overflow-hidden border-t border-white/5"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 blur-[160px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4">
            Cinematic Film
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Motion &amp; Mastery
          </h2>
          <div className="h-px w-20 bg-primary/50 mx-auto mb-6"></div>
          <p className="text-white/70 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Witness the relentless precision and artistry that define the Submariner in its aquatic element.
          </p>
        </motion.div>

        {/* Single Impactful Film Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 aspect-[16/9] max-h-[640px] w-full mx-auto group"
        >
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/og-image.webp"
              className="w-full h-full object-cover"
              onError={() => {
                console.warn("Video failed to play, switching to poster image");
                setVideoError(true);
              }}
            >
              <source src="/videos/watch-video.mp4" type="video/mp4" />
            </video>
          ) : (
            <img 
              src="/og-image.webp" 
              alt="Rolex Submariner Film Poster"
              className="w-full h-full object-cover" 
            />
          )}

          {/* Luxury vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Film caption bar */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-none">
            <div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-primary font-semibold block mb-1">
                Official Chronometer Film
              </span>
              <h3 className="text-xl md:text-3xl font-serif text-white">
                The Depths of Excellence
              </h3>
            </div>
            <div className="text-white/60 text-xs tracking-widest uppercase font-mono bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              300M / 1,000 FT CERTIFIED
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
