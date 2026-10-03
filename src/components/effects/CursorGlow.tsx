import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device has a fine pointer (mouse/stylus)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  
  // Smooth out the mouse movement for a premium luxury feel
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height to center the glow on the cursor
      // Size of glow is 600px, so offset is 300px
      cursorX.set(e.clientX - 300);
      cursorY.set(e.clientY - 300);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.03) 30%, rgba(212, 175, 55, 0) 65%)',
      }}
    />
  );
}
