import { motion } from 'framer-motion';
import frontImg from '../../assets/watch/front.jpg';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/50 via-background to-background -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-primary uppercase tracking-[0.3em] text-xs font-semibold"
          >
            ROLEX SUBMARINER
          </motion.span>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-balance">
            Built For <span className="italic text-primary">Depth.</span><br />
            Crafted For <span className="italic text-primary">Life.</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-muted text-lg max-w-md text-balance leading-relaxed"
          >
            The reference among divers' watches. A masterpiece of durability and precision, engineered to conquer the deep and command the surface.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <a 
              href="#collection" 
              className="px-8 py-4 bg-primary text-black font-semibold text-sm uppercase tracking-widest hover:bg-white transition-colors text-center"
            >
              Explore Collection
            </a>
            <a 
              href="#specifications" 
              className="px-8 py-4 border border-white/20 text-foreground font-semibold text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors text-center"
            >
              View Specifications
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative h-[50vh] lg:h-[80vh] flex items-center justify-center order-first lg:order-last"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <motion.img 
            src={frontImg} 
            alt="Rolex Submariner" 
            animate={{ y: [0, -20, 0] }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="object-contain h-full w-full drop-shadow-2xl brightness-90 hover:brightness-110 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
