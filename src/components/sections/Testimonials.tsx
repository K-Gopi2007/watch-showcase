import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alexander Sterling',
    role: 'Horology Enthusiast',
    text: 'A masterpiece of engineering and design. The attention to detail in every component is simply breathtaking. It is more than a watch; it is a legacy on the wrist.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Eleanor Vance',
    role: 'Luxury Collector',
    text: 'The seamless blend of tradition and modern innovation makes this piece unparalleled. The cerachrom bezel gleams with an unmistakable prestige.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Julian Hayes',
    role: 'Aviation Executive',
    text: 'Uncompromising precision in every environment. From the boardroom to the sky, it delivers flawless performance and undeniable elegance.',
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black pointer-events-none" />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <div className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-primary"></div>
            Testimonials
            <div className="w-8 h-[1px] bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase">
            A Legacy of Excellence
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl flex flex-col relative group hover:border-primary/50 transition-colors duration-500 shadow-2xl"
            >
              {/* Top gradient highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-white/80 font-light leading-relaxed mb-8 flex-grow">
                "{testimonial.text}"
              </p>
              
              <div>
                <h4 className="text-white tracking-wider uppercase text-sm mb-1">{testimonial.name}</h4>
                <p className="text-primary/70 text-xs tracking-widest uppercase">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
