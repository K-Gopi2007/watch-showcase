import { motion } from 'framer-motion';

const stats = [
  {
    value: "41 mm",
    label: "Case Diameter"
  },
  {
    value: "300 m",
    label: "Water Resistance"
  },
  {
    value: "Calibre 3230",
    label: "Movement"
  },
  {
    value: "70 Hours",
    label: "Power Reserve"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8
    }
  }
};

export function Statistics() {
  return (
    <section className="py-12 bg-background relative border-b border-white/5 z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-accent/40 backdrop-blur-md border border-white/10 p-8 flex flex-col items-center justify-center text-center group hover:bg-accent/60 transition-colors duration-500"
            >
              <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-muted group-hover:text-foreground/80 transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
