import { motion } from 'framer-motion';

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
                src="https://images.unsplash.com/photo-1548171915-e7afefa08744?q=80&w=1000&auto=format&fit=crop" 
                alt="Watchmaking Craftsmanship" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent hidden md:flex items-center justify-center p-6 border border-white/5">
              <p className="font-serif text-2xl italic text-primary text-center">
                Since<br/>1884
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
              Our Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
              Uncompromising <span className="italic text-primary">Craftsmanship</span>
            </h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                Every CHRONOS timepiece is the result of hundreds of hours of meticulous labor by master artisans. We blend centuries-old Swiss watchmaking traditions with cutting-edge materials and engineering.
              </p>
              <p>
                From the hand-polished bevels of the movement to the perfect sweep of the seconds hand, no detail is too small. Our dedication to perfection is not just a philosophy—it is the very essence of our brand.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-12">
                <div>
                  <h4 className="text-3xl font-serif text-foreground">300+</h4>
                  <p className="text-xs uppercase tracking-widest text-muted mt-2">Components</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-foreground">45</h4>
                  <p className="text-xs uppercase tracking-widest text-muted mt-2">Days of Testing</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-foreground">10</h4>
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
