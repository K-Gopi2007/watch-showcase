import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const timelineData = [
  { value: 1953, suffix: "", label: "First Submariner", description: "The launch of the first divers' watch waterproof to a depth of 100 metres." },
  { value: 300, suffix: "m", label: "Water Resistance", description: "Engineered to withstand extreme underwater pressure." },
  { value: 70, suffix: " Hours", label: "Power Reserve", description: "Equipped with the new-generation calibre 3230 for unparalleled performance." },
  { value: 5, suffix: " Years", label: "International Warranty", description: "A testament to outstanding reliability and enduring quality." }
];

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 50 });
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export function Heritage() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black pointer-events-none" />
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-32"
        >
          <div className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-primary"></div>
            Heritage & Achievements
            <div className="w-8 h-[1px] bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase">
            A Legacy of Innovation
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[1.375rem] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-20 md:space-y-32">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center md:justify-between group">
                  
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-black border-2 border-primary rounded-full md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_10px_rgba(212,175,55,0.5)] group-hover:scale-150 group-hover:bg-primary transition-all duration-500" />
                  
                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16 md:ml-auto'}`}
                  >
                    <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-primary mb-4 font-serif tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <AnimatedNumber value={item.value} suffix={item.suffix} />
                      </h3>
                      <h4 className="text-white text-xl md:text-2xl tracking-widest uppercase mb-3">{item.label}</h4>
                      <p className="text-white/60 font-light leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
