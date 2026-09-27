import { motion } from 'framer-motion';

// Import local images
import frontImg from '../../assets/watch/front.jpg';
import dialImg from '../../assets/watch/dial.jpg';
import sideImg from '../../assets/watch/side.jpg';
import backImg from '../../assets/watch/back.jpg';
import braceletImg from '../../assets/watch/bracelet.jpg';

const galleryItems = [
  {
    src: frontImg,
    alt: "Watch Front View",
    title: "The Facade",
    className: "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto"
  },
  {
    src: dialImg,
    alt: "Watch Dial Detail",
    title: "Dial Precision",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto"
  },
  {
    src: sideImg,
    alt: "Watch Profile",
    title: "Profile",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto"
  },
  {
    src: backImg,
    alt: "Watch Exhibition Back",
    title: "Movement",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto"
  },
  {
    src: braceletImg,
    alt: "Watch Bracelet",
    title: "Bracelet",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto"
  }
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              The Collection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4">
              Visual <span className="italic text-primary">Symphony</span>
            </h2>
          </div>
          <a href="#" className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors border-b border-muted pb-1 hover:border-primary">
            View Full Lookbook
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[700px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden group bg-accent/20 ${
                index === 0 ? 'col-span-2' : 'col-span-1'
              } ${item.className}`}
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-primary uppercase tracking-widest text-xs font-semibold mb-2">
                  Detail 0{index + 1}
                </span>
                <h3 className="text-white font-serif text-xl">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
