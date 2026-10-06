import { motion } from 'framer-motion';

import frontImg from '../../assets/watch/front.webp';
import sideImg from '../../assets/watch/side.webp';
import dialImg from '../../assets/watch/dial.webp';
import braceletImg from '../../assets/watch/bracelet.webp';
import backImg from '../../assets/watch/back.webp';

const collection = [
  {
    id: 1,
    name: 'Oyster Perpetual Submariner',
    reference: 'Oystersteel and yellow gold',
    description: 'The reference among divers’ watches, featuring a Cerachrom bezel and solid-link Oyster bracelet.',
    image: frontImg,
    size: 'lg:col-span-2 lg:row-span-2 md:col-span-2', 
  },
  {
    id: 2,
    name: 'Profile Elegance',
    reference: 'Triplock winding crown',
    description: 'A seamless blend of robust capability and refined case architecture.',
    image: sideImg,
    size: 'lg:col-span-1 md:col-span-1',
  },
  {
    id: 3,
    name: 'Maxi Dial Precision',
    reference: 'Chromalight display',
    description: 'Unparalleled legibility in the darkest depths with long-lasting blue luminescence.',
    image: dialImg,
    size: 'lg:col-span-1 md:col-span-1',
  },
  {
    id: 4,
    name: 'Oyster Architecture',
    reference: 'Robust engineering',
    description: 'A perfect alchemy of form and function, designed for maximum comfort and durability.',
    image: braceletImg,
    size: 'lg:col-span-1 md:col-span-1',
  },
  {
    id: 5,
    name: 'Exhibition Back',
    reference: 'Perpetual movement',
    description: 'A glimpse into the mechanical mastery that powers the legend.',
    image: backImg,
    size: 'lg:col-span-2 lg:row-span-1 md:col-span-1',
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
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 40, damping: 15 } }
};

export function CollectionGallery() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] max-h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-semibold mb-4">
            Curated Selection
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            The Collection
          </h2>
          <div className="h-[1px] w-24 bg-primary/50 mx-auto"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]"
        >
          {collection.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group relative rounded-3xl overflow-hidden glass-card cursor-pointer border border-white/5 bg-white/[0.01] transition-colors duration-700 hover:shadow-2xl hover:shadow-primary/10 ${item.size}`}
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover origin-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black"></div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 mix-blend-overlay pointer-events-none"></div>
              </div>

              {/* Content Box (Glassmorphism effect in layout) */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-10">
                <div className="transform translate-y-16 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <p className="text-primary tracking-[0.2em] text-xs uppercase mb-3 font-medium">
                    {item.reference}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                    {item.name}
                  </h3>
                  
                  {/* Hidden by default, smoothly animated height & opacity on hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <div className="overflow-hidden">
                      <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        <p className="text-gray-300 text-sm md:text-base font-light mb-8 line-clamp-2 md:line-clamp-none">
                          {item.description}
                        </p>
                        
                        <button className="flex items-center gap-4 text-white text-sm uppercase tracking-widest hover:text-primary transition-colors duration-300">
                          <span className="w-12 h-[1px] bg-primary"></span>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gold Border Highlight on Hover */}
              <div className="absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/40 transition-colors duration-700 z-20 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
