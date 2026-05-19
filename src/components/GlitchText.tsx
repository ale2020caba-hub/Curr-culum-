import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";

  useEffect(() => {
    let interval: any;
    
    if (isGlitching) {
      interval = setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((char, index) => {
            if (char === " " || Math.random() > 0.1) return char;
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );
      }, 50);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isGlitching, text]);

  // Periodic random glitches
  useEffect(() => {
    const trigger = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150 + Math.random() * 150); // Shorter glitch duration
      setTimeout(trigger, 5000 + Math.random() * 8000); // Longer pause between glitches
    };

    const initialTimeout = setTimeout(trigger, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;
