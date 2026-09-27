import { motion } from 'framer-motion';
import { Shield, Settings, Circle, Link, Droplets, Clock } from 'lucide-react';

const specs = [
  {
    title: "Case",
    value: "41mm Oystersteel",
    icon: <Shield className="w-5 h-5 text-primary" />
  },
  {
    title: "Movement",
    value: "Calibre 3230",
    icon: <Settings className="w-5 h-5 text-primary" />
  },
  {
    title: "Bezel",
    value: "Black Cerachrom",
    icon: <Circle className="w-5 h-5 text-primary" />
  },
  {
    title: "Bracelet",
    value: "Oystersteel Bracelet",
    icon: <Link className="w-5 h-5 text-primary" />
  },
  {
    title: "Water Resistance",
    value: "300m / 1000ft",
    icon: <Droplets className="w-5 h-5 text-primary" />
  },
  {
    title: "Power Reserve",
    value: "Approximately 70 Hours",
    icon: <Clock className="w-5 h-5 text-primary" />
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7
    }
  }
};

export function Specifications() {
  return (
    <section id="specifications" className="py-24 bg-background relative border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
            Details
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6">
            Technical <span className="italic text-primary">Specifications</span>
          </h2>
          <p className="text-muted text-lg">
            Engineered for performance, precision and reliability.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {specs.map((spec, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="p-8 bg-accent/20 backdrop-blur-sm border border-white/5 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 group flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-background/80 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {spec.icon}
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-2 group-hover:text-primary transition-colors duration-300">
                  {spec.title}
                </h3>
                <p className="text-xl font-serif text-foreground">
                  {spec.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
