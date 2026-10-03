import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0); // Ensure at top when starting

    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 1800);
    const t3 = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      <AnimatePresence mode="wait">
        {stage === 1 && (
          <motion.div
            key="logo"
            className="relative overflow-hidden flex items-center justify-center py-6 px-12"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.4 } }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-[0.3em] uppercase drop-shadow-2xl">
              Rolex
            </h1>
            
            {/* Light Sweep Effect */}
            <motion.div
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-30deg]"
              initial={{ left: '-100%' }}
              animate={{ left: '200%' }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        )}
        
        {stage === 2 && (
          <motion.div
            key="watch"
            className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-primary/20 blur-[100px]" />
             <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 2.5, opacity: 0.5 }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="w-32 h-32 md:w-48 md:h-48 border-[1px] border-primary/40 rounded-full" 
               />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.button
        className="absolute bottom-12 text-white/40 hover:text-white text-xs uppercase tracking-[0.4em] transition-colors z-50 focus:outline-none"
        onClick={() => {
          document.body.style.overflow = '';
          onComplete();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
}
