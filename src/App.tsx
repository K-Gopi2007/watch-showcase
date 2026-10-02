import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { Hero } from './components/sections/Hero';
import { Statistics } from './components/sections/Statistics';
import { About } from './components/sections/About';
import { Story } from './components/sections/Story';
import { Clarity } from './components/sections/Clarity';
import { Specifications } from './components/sections/Specifications';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';

const InteractiveWatch = lazy(() => import('./components/sections/InteractiveWatch').then(m => ({ default: m.InteractiveWatch })));

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <a 
        href="#main-content" 
        className="absolute -top-96 left-0 z-[999] bg-primary text-black px-4 py-2 focus:top-0 transition-all focus:outline-none"
      >
        Skip to main content
      </a>
      <LoadingScreen />
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <InteractiveWatch />
        </Suspense>
        <Statistics />
        <About />
        <Story />
        <Clarity />
        <Specifications />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
