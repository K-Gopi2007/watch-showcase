import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { IntroSequence } from './components/layout/IntroSequence';
import { Footer } from './components/layout/Footer';
import { CursorGlow } from './components/effects/CursorGlow';

// 6 Core Sections
import { HeroVideo } from './components/sections/HeroVideo';
import { LuxuryFeatures } from './components/sections/LuxuryFeatures';
import { CollectionGallery } from './components/sections/CollectionGallery';
import { VideoShowcase } from './components/sections/VideoShowcase';
import { Heritage } from './components/sections/Heritage';
import { Contact } from './components/sections/Contact';

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
          {/* 1. Cinematic Hero */}
          <HeroVideo />

          {/* 2. Watchmaking Story (Bezel, Crown, Dial, Bracelet) */}
          <LuxuryFeatures />

          {/* 3. Collection (Curated 3 watches) */}
          <CollectionGallery />

          {/* 4. Cinematic Film (Single focused video showcase) */}
          <VideoShowcase />

          {/* 5. Heritage and Specifications (Merged history & specs) */}
          <Heritage />

          {/* 6. Contact & Consultation */}
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
