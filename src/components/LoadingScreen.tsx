import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const targetName = "LUCAS BARRERA";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState(0); // 0: Decrypting, 1: Fully revealed
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration >= targetName.length) {
        clearInterval(interval);
        setDisplayText(targetName);
        setTimeout(() => {
          setPhase(1);
          setTimeout(onFinished, 1000);
        }, 500);
        return;
      }

      setDisplayText(prev => {
        return targetName
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < Math.floor(iteration)) {
              return targetName[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");
      });

      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-app-bg flex items-center justify-center p-6"
    >
      <div className="relative">
        <motion.div
          translate="no"
          animate={{ 
            scale: phase === 1 ? 1.1 : 1,
            opacity: phase === 1 ? [1, 0.8, 1] : 1
          }}
          transition={{ duration: 1, repeat: phase === 1 ? Infinity : 0 }}
          className="text-4xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-glow text-matrix-green text-center select-none notranslate"
        >
          {displayText}
        </motion.div>
        
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="h-1 bg-brand-green mt-8 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
        />
        
        <div className="mt-4 text-center font-mono text-[10px] text-matrix-green/40 uppercase tracking-widest">
          <span>Gracias por tomarse el tiempo de ver mi currículum</span>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
         <div className="absolute top-0 left-0 w-full h-full scanline-overlay" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
