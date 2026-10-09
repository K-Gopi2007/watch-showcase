import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import frontImg from '../../assets/watch/front.webp';
import sideImg from '../../assets/watch/side.webp';
import dialImg from '../../assets/watch/dial.webp';
import braceletImg from '../../assets/watch/bracelet.webp';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Cerachrom Bezel',
    subtitle: 'Enduring Brilliance',
    description: 'Crafted from extremely hard ceramic, virtually scratchproof and resistant to ultraviolet rays. Numerical graduations are coated with a subtle gold deposition.',
    image: frontImg,
    align: 'right',
  },
  {
    title: 'Triplock Crown',
    subtitle: 'Impenetrable Seal',
    description: 'A patented waterproof system featuring 10 precision-engineered components, sealing the case as securely as a deep-sea submersible hatch.',
    image: sideImg,
    align: 'left',
  },
  {
    title: 'Maxi Dial',
    subtitle: 'Legibility in the Dark',
    description: 'Distinctive luminescent hour markers emitting a long-lasting blue Chromalight glow provide immediate, effortless readability at any depth.',
    image: dialImg,
    align: 'right',
  },
  {
    title: 'Oyster Bracelet',
    subtitle: 'Form and Function',
    description: 'Robust three-piece solid links forged from Oystersteel, offering supreme ergonomics, durability, and the secure Oysterlock safety clasp.',
    image: braceletImg,
    align: 'left',
  },
];

export function LuxuryFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const sections = gsap.utils.toArray<HTMLElement>('.feature-item');

    sections.forEach((section) => {
      const text = section.querySelector('.feature-text-block');
      const img = section.querySelector('.feature-image-block');

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (img) {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      id="story" 
      ref={containerRef} 
      className="bg-background text-foreground py-24 md:py-32 relative overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <p className="text-primary tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4">
            Watchmaking Heritage
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Anatomy of <span className="italic text-primary">Mastery</span>
          </h2>
          <div className="h-px w-20 bg-primary/50 mx-auto mb-6"></div>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
            Every curve, component, and surface is engineered to withstand extreme depths while exemplifying uncompromising luxury.
          </p>
        </div>

        {/* Compact Alternating Features */}
        <div className="space-y-16 md:space-y-24">
          {features.map((feature, i) => {
            const isRight = feature.align === 'right';
            return (
              <div 
                key={feature.title} 
                className="feature-item grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Image */}
                <div 
                  className={`feature-image-block lg:col-span-6 ${
                    isRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 aspect-[4/3] md:aspect-[16/10] group">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
                  </div>
                </div>

                {/* Text */}
                <div 
                  className={`feature-text-block lg:col-span-6 ${
                    isRight ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                      0{i + 1}
                    </span>
                    <span className="w-8 h-px bg-primary/40"></span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                      {feature.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-5 leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-muted text-base md:text-lg font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
