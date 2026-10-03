import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { IntroSequence } from './components/layout/IntroSequence';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
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

const InteractiveWatch = lazy(() => import('./components/sections/InteractiveWatch').then(m => ({ default: m.InteractiveWatch })));

const InteractiveWatchFallback = () => (
  <section className="relative w-full h-[100vh] bg-black flex flex-col items-center justify-center border-b border-white/10">
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-primary animate-spin opacity-50" />
      <p className="text-primary mt-6 font-mono text-xs tracking-[0.2em] animate-pulse">LOADING 3D EXPERIENCE</p>
    </div>
  </section>
);

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
        <Hero />
        <Suspense fallback={<InteractiveWatchFallback />}>
          <InteractiveWatch />
        </Suspense>
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
