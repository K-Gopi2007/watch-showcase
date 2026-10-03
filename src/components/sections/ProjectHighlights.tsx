import { motion } from 'framer-motion';
import { 
  Code2, 
  Hexagon, 
  Layers, 
  Wand2, 
  Zap, 
  MonitorSmartphone, 
  Gauge, 
  Search 
} from 'lucide-react';

const HIGHLIGHTS = [
  {
    title: 'React + TypeScript',
    description: 'Type-safe architecture ensuring robust application state and zero runtime errors.',
    icon: Code2
  },
  {
    title: 'Three.js',
    description: 'Native WebGL rendering for unparalleled 3D fidelity and material realism.',
    icon: Hexagon
  },
  {
    title: 'React Three Fiber',
    description: 'Declarative 3D scene graph seamlessly integrated with the React ecosystem.',
    icon: Layers
  },
  {
    title: 'GSAP',
    description: 'Industry-leading animation engine for scroll-linked and timeline sequences.',
    icon: Wand2
  },
  {
    title: 'Framer Motion',
    description: 'Fluid spring physics handling complex UI state transitions and component reveals.',
    icon: Zap
  },
  {
    title: 'Responsive Design',
    description: 'Flawless execution across all breakpoints from mobile to ultra-wide desktop.',
    icon: MonitorSmartphone
  },
  {
    title: 'Performance Optimized',
    description: 'Aggressive asset compression, lazy loading, and WebGL memory management.',
    icon: Gauge
  },
  {
    title: 'SEO Optimized',
    description: 'Semantic HTML structure and metadata for optimal search engine visibility.',
    icon: Search
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
    }
  }
};

export function ProjectHighlights() {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase mb-6">
            Project <span className="text-primary font-serif italic">Highlights</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-base">
            A showcase of modern web technologies, meticulously engineered to deliver a world-class digital experience.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative p-8 bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-primary/50 transition-colors duration-500 rounded-2xl overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500 shadow-xl">
                    <Icon className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-3 group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
