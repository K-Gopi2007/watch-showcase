import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { IntroSequence } from './components/layout/IntroSequence';
import { Footer } from './components/layout/Footer';
import { Statistics } from './components/sections/Statistics';
import { About } from './components/sections/About';
import { Story } from './components/sections/Story';
import { Heritage } from './components/sections/Heritage';
import { Clarity } from './components/sections/Clarity';
import { Specifications } from './components/sections/Specifications';
import { Gallery } from './components/sections/Gallery';
import { ProjectHighlights } from './components/sections/ProjectHighlights';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { CursorGlow } from './components/effects/CursorGlow';

import { LuxuryReveal } from './components/sections/LuxuryReveal';
import { CinematicHero } from './components/sections/CinematicHero';
import { HeroVideo } from './components/sections/HeroVideo';
import { CollectionGallery } from './components/sections/CollectionGallery';
import { VideoShowcase } from './components/sections/VideoShowcase';

import { Comparison } from './components/sections/Comparison';
import { VirtualWrist } from './components/sections/VirtualWrist';
import { CinematicWatch } from './components/sections/CinematicWatch';
import { LuxuryFeatures } from './components/sections/LuxuryFeatures';

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground font-sans">
      <CursorGlow />
      <a 
        href="#main-content" 
        className="absolute -top-96 left-0 z-[999] bg-primary text-black px-4 py-2 focus:top-0 transition-all focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      
      <main id="main-content">
        <LuxuryReveal />
        <CinematicHero />
        <HeroVideo />
        <CinematicWatch />
        <LuxuryFeatures />
        <CollectionGallery />
        <VideoShowcase />
        <Comparison />
        <VirtualWrist />
        <Statistics />
        <About />
        <Story />
        <Heritage />
        <Clarity />
        <Specifications />
        <Gallery />
        <ProjectHighlights />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
    </>
  );
}

export default App;
