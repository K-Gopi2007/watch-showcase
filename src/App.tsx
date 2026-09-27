import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { InteractiveWatch } from './components/sections/InteractiveWatch';
import { Statistics } from './components/sections/Statistics';
import { About } from './components/sections/About';
import { Story } from './components/sections/Story';
import { Clarity } from './components/sections/Clarity';
import { Specifications } from './components/sections/Specifications';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <main>
        <Hero />
        <InteractiveWatch />
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
