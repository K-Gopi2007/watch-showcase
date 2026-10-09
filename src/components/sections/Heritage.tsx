import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Shield, Settings, Circle, Link, Droplets, Clock } from 'lucide-react';

const stats = [
  { value: 1953, suffix: "", label: "Inception Year", subtext: "Pioneering the benchmark for underwater timepieces" },
  { value: 300, suffix: "m", label: "Water Resistance", subtext: "1,000 feet of certified waterproofness" },
  { value: 70, suffix: "h", label: "Power Reserve", subtext: "Calibre 3230 self-winding perpetual movement" },
  { value: 5, suffix: "yr", label: "Global Warranty", subtext: "Green seal superlative chronometer guarantee" }
];

const technicalSpecs = [
  {
    title: "Model Case",
    value: "41mm Oystersteel",
    icon: <Shield className="w-5 h-5 text-primary" />,
    detail: "Corrosion-resistant monobloc middle case with screw-down back"
  },
  {
    title: "Movement",
    value: "Calibre 3230 Rolex",
    icon: <Settings className="w-5 h-5 text-primary" />,
    detail: "Perpetual, mechanical, bidirectional self-winding via Perpetual rotor"
  },
  {
    title: "Bezel",
    value: "Cerachrom Ceramic",
    icon: <Circle className="w-5 h-5 text-primary" />,
    detail: "Unidirectional 60-minute rotatable with platinum/gold coated numerals"
  },
  {
    title: "Bracelet & Clasp",
    value: "Oyster 3-Piece Links",
    icon: <Link className="w-5 h-5 text-primary" />,
    detail: "Equipped with folding Oysterlock safety clasp & Glidelock extension"
  },
  {
    title: "Winding Crown",
    value: "Triplock System",
    icon: <Droplets className="w-5 h-5 text-primary" />,
    detail: "Screw-down, triple waterproofness system with 10 internal seals"
  },
  {
    title: "Precision",
    value: "-2/+2 sec/day",
    icon: <Clock className="w-5 h-5 text-primary" />,
    detail: "Superlative Chronometer certification (COSC + Rolex testing)"
  }
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 60 });
  
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
    <section id="specifications" className="py-24 md:py-32 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-neutral-950 to-black pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20 md:mb-24"
        >
          <div className="text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-px bg-primary/60"></span>
            Heritage &amp; Performance
            <span className="w-6 h-px bg-primary/60"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Pinnacle of <span className="italic text-primary">Precision</span>
          </h2>
          <div className="h-px w-20 bg-primary/50 mx-auto mb-6"></div>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
            Seven decades of unbroken technical evolution, calibrated to the highest standards of Swiss horology.
          </p>
        </motion.div>

        {/* Primary Milestone Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 md:mb-28">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-500 shadow-xl"
            >
              <div className="text-4xl md:text-5xl font-serif text-primary mb-3 tracking-wide drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-2">
                {stat.label}
              </h3>
              <p className="text-muted text-xs font-light leading-relaxed">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Specification Matrix */}
        <div className="mt-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
              Technical Specifications
            </h3>
            <p className="text-muted text-xs uppercase tracking-[0.25em] mt-2">
              Official Superlative Chronometer Parameters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-white/10 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {spec.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted block mb-1">
                    {spec.title}
                  </span>
                  <h4 className="text-xl font-serif text-white mb-3">
                    {spec.value}
                  </h4>
                </div>
                <p className="text-white/60 text-xs font-light leading-relaxed pt-4 border-t border-white/5">
                  {spec.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
