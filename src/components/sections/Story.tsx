import { motion } from 'framer-motion';
import sideImg from '../../assets/watch/side.jpg';

export function Story() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-8 order-2 lg:order-1"
          >
            <div>
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
                The Anatomy
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight">
                Precision <span className="italic text-primary">Engineering</span>
              </h2>
            </div>
            
            <p className="text-muted text-lg md:text-xl leading-relaxed max-w-lg">
              Every curve, crown and contour is engineered for durability, performance and timeless design.
            </p>
            
            <div className="w-12 h-px bg-primary/50 mt-4" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            {/* Elegant Image Framing */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none p-4 border border-white/5 bg-accent/10">
              <div className="absolute inset-0 border border-primary/20 m-6 -z-10 translate-x-4 translate-y-4" />
              <img 
                src={sideImg} 
                alt="Watch Profile" 
                className="w-full h-full object-cover shadow-2xl brightness-90 hover:brightness-100 transition-all duration-700"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
