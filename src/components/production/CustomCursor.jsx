'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isExpanded, setIsExpanded] = useState(false);

  const springX = useSpring(cursorX, { damping: 28, stiffness: 500 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 500 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e) => {
      if (e.target.closest('[data-cursor]')) setIsExpanded(true);
    };
    const handleOut = (e) => {
      if (e.target.closest('[data-cursor]')) setIsExpanded(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.body.setAttribute('data-cursor-active', '');

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.body.removeAttribute('data-cursor-active');
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <style>{`[data-cursor-active] * { cursor: none !important; }`}</style>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isExpanded ? 64 : 36,
          height: isExpanded ? 64 : 36,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className={`w-full h-full rounded-full border-2 border-white flex items-center justify-center transition-colors duration-200 ${isExpanded ? 'bg-white/10' : ''}`}>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[8px] font-black uppercase tracking-widest text-white select-none"
              >
                VIEW
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
