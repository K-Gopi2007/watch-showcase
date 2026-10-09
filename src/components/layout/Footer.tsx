import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 text-center md:text-left mb-24"
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl tracking-[0.15em] text-primary font-semibold mb-6">
              ROLEX SUBMARINER
            </h2>
            <p className="text-muted text-sm tracking-wide max-w-xs mx-auto md:mx-0 leading-relaxed uppercase">
              Built For Depth. Crafted For Life.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-foreground mb-6 font-semibold">Navigation</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#home" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Home</a></li>
              <li><a href="#story" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Story</a></li>
              <li><a href="#collection" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Collection</a></li>
              <li><a href="#film" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Film</a></li>
              <li><a href="#specifications" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Specifications</a></li>
              <li><a href="#contact" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Inquire</a></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground mb-6 font-semibold">Social</h3>
              <ul className="flex flex-col gap-4">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Rolex on Instagram" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Rolex on Facebook" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Facebook</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Rolex on YouTube" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">YouTube</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-foreground mb-6 font-semibold">Legal</h3>
              <ul className="flex flex-col gap-4">
                <li><a href="#contact" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Privacy Policy</a></li>
                <li><a href="#contact" className="text-muted hover:text-primary transition-colors duration-300 text-sm tracking-wider">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} ROLEX SUBMARINER. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-muted/50 tracking-widest uppercase">
            Not affiliated with Rolex SA
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
