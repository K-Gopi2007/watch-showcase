import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import frontImg from '../../assets/watch/front.webp';
import sideImg from '../../assets/watch/side.webp';
import dialImg from '../../assets/watch/dial.webp';
import braceletImg from '../../assets/watch/bracelet.webp';
import backImg from '../../assets/watch/back.webp';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Cerachrom Bezel',
    subtitle: 'Enduring Brilliance',
    description: 'Crafted from an extremely hard ceramic material, it is virtually scratchproof, and its color is unaffected by ultraviolet rays. The engraved numerals and graduations are coated with a thin layer of gold or platinum.',
    image: frontImg,
    align: 'right',
  },
  {
    title: 'Triplock Crown',
    subtitle: 'Impenetrable Seal',
    description: 'A patented waterproofness system designed specifically for divers’ watches. It consists of 10 different components crafted from the most reliable materials, sealing the case as tightly as a submarine hatch.',
    image: sideImg,
    align: 'left',
  },
  {
    title: 'Maxi Dial',
    subtitle: 'Legibility in the Dark',
    description: 'Characterized by its large hour markers and hands, the dial features a long-lasting luminescent display emitting a distinctive blue glow, offering exceptional legibility in any environment.',
    image: dialImg,
    align: 'right',
  },
  {
    title: 'Oyster Bracelet',
    subtitle: 'Form and Function',
    description: 'A perfect alchemy of form and function, aesthetics and technology. First introduced in the late 1930s, this particularly robust and comfortable metal bracelet with its broad, flat three-piece links remains a staple.',
    image: braceletImg,
    align: 'left',
  },
];

export function LuxuryFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll Progress Indicator
    gsap.fromTo('.scroll-progress-bar', 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    // Intro section animations
    gsap.to('.intro-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.intro-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.fromTo('.intro-text-content',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.intro-section',
          start: 'top 60%',
        }
      }
    );

    // Features animations
    const sections = gsap.utils.toArray<HTMLElement>('.feature-section');
    
    sections.forEach((section) => {
      const textElements = section.querySelectorAll('.reveal-text');
      const imageContainer = section.querySelector('.feature-image-container');
      const imageWrapper = section.querySelector('.parallax-wrapper');
      const image = section.querySelector('.feature-image');
      const bgAccent = section.querySelector('.bg-accent-blur');
      
      // Image Parallax (Wrapper)
      gsap.to(imageWrapper, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Image Zoom Effect (Img itself)
      gsap.fromTo(image,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Image Container Reveal
      gsap.fromTo(imageContainer,
        { clipPath: 'inset(10% 10% 10% 10% round 2rem)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          opacity: 1,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );

      // Staggered Text Reveal
      gsap.fromTo(textElements, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );

      // Number reveal
      const sectionNumber = section.querySelector('.section-number');
      gsap.fromTo(sectionNumber,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );

      // Background gold glow pulsing and parallax
      if (bgAccent) {
        // Continuous pulse
        gsap.to(bgAccent, {
          opacity: 0.4,
          scale: 1.2,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        
        // Parallax scroll
        gsap.to(bgAccent, {
          yPercent: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden relative">
      
      {/* Fixed Scroll Progress Indicator */}
      <div className="fixed right-6 top-1/4 bottom-1/4 w-[2px] bg-white/10 z-[100] hidden md:block rounded-full">
        <div className="scroll-progress-bar w-full bg-primary origin-top h-full rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
      </div>

      {/* Intro Section */}
      <section className="intro-section relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background/50 z-10"></div>
        <img 
          src={backImg} 
          alt="Exhibition Case Back" 
          className="intro-image absolute w-full h-[120%] object-cover opacity-60 -top-[10%] left-0" 
        />
        <div className="intro-text-content relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary tracking-[0.3em] uppercase text-sm md:text-base font-medium mb-4">Precision Engineered</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
            Mastery in <br />
            <span className="italic text-primary/90">Every Detail</span>
          </h2>
          <div className="h-[1px] w-24 bg-primary/50 mx-auto"></div>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="py-24">
        {features.map((feature, i) => (
          <section 
            key={i} 
            className="feature-section min-h-[100vh] flex items-center justify-center relative px-6 md:px-12 py-20"
          >
            {/* Pulsing Gold Glow */}
            <div className={`bg-accent-blur absolute top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] rounded-full blur-[140px] bg-primary/20 opacity-10 z-0 pointer-events-none ${feature.align === 'left' ? 'right-[5%]' : 'left-[5%]'}`} />
            
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-center relative z-10">
              
              {/* Image Container */}
              <div className={`feature-image-container relative h-[60vh] lg:h-[85vh] w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl ${feature.align === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-40 mix-blend-overlay z-10 pointer-events-none"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl z-20 pointer-events-none"></div>
                
                <div className="parallax-wrapper absolute inset-0 w-full h-[120%] -top-[10%] left-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="feature-image w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className={`feature-text flex flex-col justify-center w-full lg:w-1/2 relative ${feature.align === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
                
                {/* Section Number (Background) */}
                <div className={`section-number absolute -top-10 md:-top-20 ${feature.align === 'left' ? '-left-4 md:-left-10' : '-right-4 md:-right-10'} text-[8rem] md:text-[12rem] font-serif text-white/[0.03] font-bold leading-none pointer-events-none select-none z-0`}>
                  0{i + 1}
                </div>

                <div className="p-8 md:p-12 lg:p-16 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative z-10 overflow-hidden group hover:bg-white/[0.04] transition-colors duration-700 shadow-2xl">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <h3 className="reveal-text text-primary font-semibold tracking-[0.25em] text-xs md:text-sm uppercase mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    {feature.subtitle}
                  </h3>
                  
                  <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-white leading-[1.1]">
                    {feature.title}
                  </h2>
                  
                  <p className="reveal-text text-muted text-lg md:text-xl font-light leading-relaxed">
                    {feature.description}
                  </p>
                  
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
