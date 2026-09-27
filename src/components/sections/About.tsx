import { motion } from 'framer-motion';
import backImg from '../../assets/watch/back.jpg';

export function About() {
  return (
    <section id="about" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src={backImg} 
                alt="Rolex Submariner Movement" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                style={{ transform: "translateZ(0)" }}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent hidden md:flex items-center justify-center p-6 border border-white/5">
              <p className="font-serif text-2xl italic text-primary text-center">
                Since<br/>1953
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              The Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
              The Diver's <span className="italic text-primary">Benchmark</span>
            </h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                The Rolex Submariner is the undisputed reference among divers' watches. Its robust Oyster case, guaranteed waterproof to a depth of 300 metres, provides the high-precision movement with optimal protection from water, dust, and pressure.
              </p>
              <p>
                Equipped with a unidirectional rotatable bezel with Cerachrom insert and a solid-link Oyster bracelet, it is engineered for absolute reliability. Our dedication to perfection is the very essence of the crown.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-12">
                <div>
                  <h4 className="text-3xl font-serif text-foreground">300m</h4>
                  <p className="text-xs uppercase tracking-widest text-muted mt-2">Waterproof</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-foreground">70h</h4>
                  <p className="text-xs uppercase tracking-widest text-muted mt-2">Power Reserve</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-foreground">5</h4>
                  <p className="text-xs uppercase tracking-widest text-muted mt-2">Years Warranty</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
