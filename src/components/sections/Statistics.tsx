import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  { value: 41, prefix: "", suffix: " mm", label: "Case Diameter" },
  { value: 300, prefix: "", suffix: " m", label: "Water Resistance" },
  { value: 3230, prefix: "Calibre ", suffix: "", label: "Movement" },
  { value: 70, prefix: "", suffix: " Hours", label: "Power Reserve" }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
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

function AnimatedCounter({ value, prefix, suffix }: { value: number, prefix: string, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration: 2.5, 
        ease: "easeOut",
        delay: 0.2
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="relative inline-block">
      {prefix}
      <motion.span className="text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
        {rounded}
      </motion.span>
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-16 md:py-24 bg-black relative border-b border-white/5 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/[0.02] backdrop-blur-md border border-white/10 p-10 flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-all duration-700 hover:border-primary/30 relative overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4 transition-colors duration-500 relative z-10">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </h3>
              <div className="w-8 h-[1px] bg-primary/40 group-hover:bg-primary transition-colors duration-500 mb-4" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 group-hover:text-white/90 transition-colors duration-500 relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
