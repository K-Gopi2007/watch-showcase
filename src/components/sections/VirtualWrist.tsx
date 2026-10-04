import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, RotateCw, X, Maximize2, Move } from 'lucide-react';
import clsx from 'clsx';
import watchFront from '../../assets/watch/front.webp';

export function VirtualWrist() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
    }
  };

  const resetAll = () => {
    setBgImage(null);
    setScale(1);
    setRotation(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="py-16 md:py-24 bg-black relative border-b border-white/10 z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-12 relative z-10 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-light text-white tracking-widest uppercase mb-4">
            Virtual Try-On
          </h2>
          <div className="w-12 h-[1px] bg-primary mx-auto mb-6" />
          <p className="text-white/60 text-sm tracking-wide font-light max-w-xl mx-auto">
            Upload a photo of your wrist to preview how the timepiece will look on you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-2/3">
            <div 
              ref={containerRef}
              className={clsx(
                "relative w-full aspect-[3/4] sm:aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border transition-colors duration-500",
                bgImage ? "border-white/20 bg-neutral-900" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              )}
            >
              {!bgImage ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-white font-light text-lg tracking-wide mb-2">Upload Wrist Photo</h3>
                  <p className="text-white/40 text-xs tracking-wider uppercase mb-8">JPG or PNG format</p>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all rounded-full"
                  >
                    Select Image
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              ) : (
                <>
                  <img 
                    src={bgImage} 
                    alt="User Wrist" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <button 
                    onClick={resetAll}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all border border-white/20 z-50"
                  >
                    <X size={18} />
                  </button>

                  <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    className="absolute top-1/2 left-1/2 cursor-grab active:cursor-grabbing touch-none flex flex-col items-center justify-center"
                    style={{ x: "-50%", y: "-50%" }}
                  >
                    <motion.img 
                      src={watchFront} 
                      alt="Virtual Watch Preview" 
                      className="w-48 md:w-64 drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
                      style={{ 
                        scale: scale,
                        rotate: rotation 
                      }}
                      draggable="false"
                    />
                  </motion.div>
                </>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className={clsx(
              "bg-white/[0.02] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl transition-opacity duration-500",
              !bgImage ? "opacity-30 pointer-events-none" : "opacity-100"
            )}>
              <div className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <div className="w-6 h-[1px] bg-primary"></div>
                Adjustments
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white/70 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Maximize2 size={14} className="text-primary" />
                      Scale
                    </label>
                    <span className="text-white/40 text-xs font-mono">{Math.round(scale * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.05"
                    value={scale} 
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white/70 text-xs uppercase tracking-widest flex items-center gap-2">
                      <RotateCw size={14} className="text-primary" />
                      Rotation
                    </label>
                    <span className="text-white/40 text-xs font-mono">{rotation}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="-180" 
                    max="180" 
                    step="1"
                    value={rotation} 
                    onChange={(e) => setRotation(parseFloat(e.target.value))}
                    className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-10 p-4 bg-black/40 rounded-lg border border-white/5 flex items-start gap-3">
                <Move className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-white/50 text-xs leading-relaxed font-light">
                  Drag the watch to position it precisely on your wrist. Use the sliders above to perfectly match the scale and angle of your photo.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
