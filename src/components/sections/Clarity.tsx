import { motion } from 'framer-motion';
import dialImg from '../../assets/watch/dial.jpg';

export function Clarity() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-accent/20 via-background to-background -z-10" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image - Left on Desktop, Top on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-1 lg:order-1"
          >
            {/* Elegant Image Framing */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none p-4 border border-white/5 bg-accent/10">
              <div className="absolute inset-0 border border-primary/20 m-6 -z-10 -translate-x-4 translate-y-4" />
              <img 
                src={dialImg} 
                alt="Watch Dial" 
                className="w-full h-full object-cover shadow-2xl brightness-90 hover:brightness-100 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Text - Right on Desktop, Bottom on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-8 order-2 lg:order-2"
          >
            <div>
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
                The Dial
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight">
                Crafted For <span className="italic text-primary">Clarity</span>
              </h2>
            </div>
            
            <p className="text-muted text-lg md:text-xl leading-relaxed max-w-lg">
              High-contrast display designed for visibility in every environment.
            </p>
            
            <div className="w-12 h-px bg-primary/50 mt-4" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
