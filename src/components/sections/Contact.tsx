import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary/50 mb-8" />
          
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
            Next Steps
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight text-balance mb-8">
            Ready To Experience <span className="italic text-primary block mt-2">Excellence?</span>
          </h2>
          
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Discover the craftsmanship behind every detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <a 
              href="#contact-us" 
              className="px-10 py-5 bg-primary text-black font-semibold text-sm uppercase tracking-widest hover:bg-white hover:-translate-y-1 transition-all duration-300 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Contact Us
            </a>
            <a 
              href="#request-info" 
              className="px-10 py-5 border border-white/20 text-foreground font-semibold text-sm uppercase tracking-widest hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Request Information
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
