import { motion } from 'framer-motion';

const videos = [
  {
    id: 1,
    title: 'The Art of Craftsmanship',
    subtitle: 'Behind the movement',
    src: '/videos/watch-video.mp4',
  },
  {
    id: 2,
    title: 'Precision in Motion',
    subtitle: 'Master chronometer',
    src: '/videos/watch-video.mp4',
  },
  {
    id: 3,
    title: 'Enduring Legacy',
    subtitle: 'A timeless pursuit',
    src: '/videos/watch-video.mp4',
  }
];

export function VideoShowcase() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-semibold mb-4">
            Cinematic Experience
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Motion & Mastery
          </h2>
          <div className="h-[1px] w-16 bg-primary/50 mx-auto"></div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: index * 0.15, ease: 'easeOut' }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-white/[0.02] border border-white/5 cursor-pointer shadow-xl"
            >
              {/* Video Background */}
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover origin-center transform transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                
                {/* Gradient Overlay for Caption Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black"></div>
              </div>

              {/* Glassmorphism Caption */}
              <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 z-10 p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transform translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out shadow-2xl">
                <p className="text-primary tracking-widest text-[10px] md:text-xs uppercase mb-2 font-medium">
                  {video.subtitle}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-white">
                  {video.title}
                </h3>
                
                {/* Expanding section on hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out mt-0 group-hover:mt-4">
                  <div className="overflow-hidden">
                    <button className="flex items-center gap-3 text-white/70 text-xs uppercase tracking-widest hover:text-white transition-colors duration-300">
                      <span className="w-8 h-[1px] bg-primary"></span>
                      Watch Film
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Subtle hover glow ring */}
              <div className="absolute inset-0 rounded-[2rem] border border-primary/0 group-hover:border-primary/40 transition-colors duration-700 z-20 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
