
import { motion } from 'framer-motion';
import watchFront from '../../assets/watch/front.webp';

export function CinematicWatch() {
  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-7xl pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-50 blur-3xl" />
          <img 
            src={watchFront} 
            alt="Cinematic Luxury Watch" 
            className="relative z-10 h-full w-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide uppercase mb-4">
            Uncompromising <span className="italic text-primary">Brilliance</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed tracking-wide">
            A testament to peerless craftsmanship and timeless design. Discover the seamless fusion of heritage and innovation, perfectly forged for the modern era.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
