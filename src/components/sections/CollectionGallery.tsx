import { motion } from 'framer-motion';
import frontImg from '../../assets/watch/front.webp';
import sideImg from '../../assets/watch/side.webp';
import dialImg from '../../assets/watch/dial.webp';
import { luxurySounds } from '../audio/LuxurySounds';

const watches = [
  {
    id: 1,
    name: 'Submariner Date',
    reference: 'Ref. 126610LN',
    material: 'Oystersteel & Black Cerachrom',
    description: 'The archetype of the modern diver watch. Crafted from corrosion-resistant Oystersteel with a high-definition unidirectional Cerachrom bezel.',
    image: frontImg,
    badge: 'Flagship Edition'
  },
  {
    id: 2,
    name: 'Submariner Heritage',
    reference: 'Ref. 124060',
    material: 'Oystersteel with Triplock Seal',
    description: 'Pure, timeless symmetry without date magnification. Featuring the indestructible 3-component Triplock winding crown rated to 300 meters.',
    image: sideImg,
    badge: 'Iconic Profile'
  },
  {
    id: 3,
    name: 'Submariner Luminescence',
    reference: 'Ref. 126613LB',
    material: 'Maxi Dial & Chromalight',
    description: 'Uncompromising legibility in the abyss. High-contrast Chromalight display emitting a distinctive blue luminescence across 8 hours.',
    image: dialImg,
    badge: 'Deep Blue Glow'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

export function CollectionGallery() {
  return (
    <section id="collection" className="bg-background text-foreground py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4">
            Curated Showcase
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            The Collection
          </h2>
          <div className="h-px w-20 bg-primary/50 mx-auto mb-6"></div>
          <p className="text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Three distinct expressions of our crowning aquatic instrument, unified by peerless chronometric precision.
          </p>
        </motion.div>

        {/* 3 Watch Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {watches.map((watch) => (
            <motion.div
              key={watch.id}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                <span className="absolute top-5 left-5 z-20 text-[10px] uppercase tracking-[0.25em] bg-black/70 backdrop-blur-md text-primary border border-primary/30 px-3 py-1.5 rounded-full">
                  {watch.badge}
                </span>

                <img 
                  src={watch.image} 
                  alt={watch.name} 
                  loading="lazy"
                  className="w-full h-full object-cover origin-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Details */}
              <div className="p-8 flex flex-col flex-grow justify-between bg-black/20">
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-primary mb-2 font-medium">
                    <span>{watch.reference}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-3">
                    {watch.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-4 font-mono">
                    {watch.material}
                  </p>
                  <p className="text-muted text-sm font-light leading-relaxed mb-6">
                    {watch.description}
                  </p>
                </div>

                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white hover:text-primary transition-colors duration-300 pt-4 border-t border-white/5"
                  onMouseEnter={luxurySounds.playHover}
                  onClick={luxurySounds.playTap}
                >
                  <span className="w-6 h-px bg-primary"></span>
                  Inquire Allocation
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
