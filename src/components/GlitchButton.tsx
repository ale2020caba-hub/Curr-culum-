import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GlitchButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}

const GlitchButton: React.FC<GlitchButtonProps> = ({ 
  children, 
  href, 
  className = "", 
  target, 
  rel 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150 + Math.random() * 150);
      setTimeout(trigger, 4000 + Math.random() * 6000);
    };

    const initialTimeout = setTimeout(trigger, 3000);
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <a 
      href={href}
      target={target}
      rel={rel}
      className={`relative group overflow-hidden ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <motion.div
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
          filter: [
            "hue-rotate(0deg)",
            "hue-rotate(90deg)",
            "hue-rotate(-90deg)",
            "hue-rotate(0deg)"
          ]
        } : {}}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center gap-3 w-full h-full"
      >
        {children}
      </motion.div>

      {/* Glitch layers */}
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0.5, 0.8, 0], x: [-5, 5, -2] }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-500/30 mix-blend-screen pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0.5, 0.8, 0], x: [5, -5, 2] }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-blue-500/30 mix-blend-screen pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Hover line scan effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none h-1/2 -top-full group-hover:top-full duration-1000 ease-in-out" />
    </a>
  );
};

export default GlitchButton;
