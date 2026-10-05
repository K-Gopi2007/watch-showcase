import React, { useState } from 'react';
import clsx from 'clsx';
import { luxurySounds } from '../audio/LuxurySounds';
import { Check } from 'lucide-react';
import watchFront from '../../assets/watch/front.webp';

const CONFIG_OPTIONS = {
  dial: [
    { id: 'black', label: 'Black', color: '#111111' },
    { id: 'blue', label: 'Blue', color: '#1b365d' },
    { id: 'green', label: 'Green', color: '#0f5132' }
  ],
  case: [
    { id: 'steel', label: 'Oystersteel', metalness: 0.8, roughness: 0.2, color: '#f0f0f0' },
    { id: 'gold', label: 'Yellow Gold', metalness: 1.0, roughness: 0.15, color: '#d4af37' }
  ],
  bracelet: [
    { id: 'oyster', label: 'Oyster' },
    { id: 'jubilee', label: 'Jubilee' }
  ]
};

const WATCH_SPECS = {
  steel: { material: 'Oystersteel', weight: '155g', depth: '300m (1,000 ft)', reserve: '70 Hours' },
  gold: { material: '18 ct Yellow Gold', weight: '228g', depth: '300m (1,000 ft)', reserve: '70 Hours' }
};

function ComparePanel({ 
  config, 
  setConfig, 
  title 
}: { 
  config: { dial: string, case: string }, 
  setConfig: React.Dispatch<React.SetStateAction<{ dial: string, case: string }>>,
  title: string
}) {
  const specs = WATCH_SPECS[config.case as keyof typeof WATCH_SPECS];

  return (
    <div className="w-full h-full md:w-1/2 flex flex-col border-white/10 md:border-r last:border-r-0">
      <div className="text-center py-4 border-b border-white/10 bg-black/40">
        <h3 className="text-white text-sm tracking-[0.2em] uppercase font-light">{title}</h3>
      </div>
      
      <div className="flex-1 relative min-h-[40vh] md:min-h-0 bg-neutral-950 flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50" />
        <img 
          src={watchFront} 
          alt="Luxury Watch Model"
          className="relative z-10 w-auto h-full max-h-[500px] object-contain object-center drop-shadow-2xl transition-all duration-1000 ease-out scale-105 hover:scale-110"
          style={{
            filter: config.case === 'gold' ? 'sepia(0.3) saturate(1.5) hue-rotate(-10deg) brightness(1.1)' : 'grayscale(0.2) contrast(1.1)'
          }}
        />
      </div>

      <div className="p-6 md:p-8 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between">
          <div className="space-y-6">
            <div>
              <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Case Finish</h4>
              <div className="flex gap-2">
                {CONFIG_OPTIONS.case.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { luxurySounds.playCrown(); setConfig(prev => ({ ...prev, case: opt.id })); }}
                    onMouseEnter={luxurySounds.playHover}
                    className={clsx(
                      "py-2 px-4 rounded border text-[10px] uppercase tracking-widest transition-all duration-300",
                      config.case === opt.id 
                        ? "bg-white/10 border-primary text-primary shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                        : "bg-black/40 border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Dial Color</h4>
              <div className="flex gap-3">
                {CONFIG_OPTIONS.dial.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { luxurySounds.playCrown(); setConfig(prev => ({ ...prev, dial: opt.id })); }}
                    onMouseEnter={luxurySounds.playHover}
                    className={clsx(
                      "w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center relative",
                      config.dial === opt.id ? "border-primary scale-110 shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "border-white/20 hover:border-white/50"
                    )}
                    style={{ backgroundColor: opt.color }}
                    title={opt.label}
                  >
                     {config.dial === opt.id && <Check size={12} className="text-white mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Specifications</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-white/60">Material</span>
                <span className="text-white font-light">{specs.material}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-white/60">Weight</span>
                <span className="text-white font-light">{specs.weight}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-white/60">Water Resistance</span>
                <span className="text-white font-light">{specs.depth}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-white/60">Power Reserve</span>
                <span className="text-white font-light">{specs.reserve}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Comparison() {
  const [config1, setConfig1] = useState({ dial: 'black', case: 'steel' });
  const [config2, setConfig2] = useState({ dial: 'green', case: 'gold' });

  return (
    <section className="relative w-full min-h-screen bg-black border-t border-b border-white/10 flex flex-col">
      <div className="py-12 md:py-16 text-center shrink-0">
        <h2 className="text-2xl md:text-4xl font-light text-white tracking-widest uppercase mb-4">
          Compare Models
        </h2>
        <div className="w-12 h-[1px] bg-primary mx-auto mb-6" />
        <p className="text-white/60 text-sm tracking-wide font-light max-w-xl mx-auto px-4">
          Explore two distinct configurations side by side to find your perfect timepiece.
        </p>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row w-full border-t border-white/10">
        <ComparePanel config={config1} setConfig={setConfig1} title="Configuration 1" />
        <ComparePanel config={config2} setConfig={setConfig2} title="Configuration 2" />
      </div>
    </section>
  );
}
