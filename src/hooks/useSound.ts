import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((type: 'hover' | 'click' | 'glitch' | 'success') => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    switch (type) {
      case 'hover':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
        break;
      case 'click':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
        break;
      case 'glitch':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(Math.random() * 1000 + 100, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
        break;
      case 'success':
         oscillator.type = 'sine';
         oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
         oscillator.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.2);
         gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
         gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
         oscillator.start();
         oscillator.stop(audioCtx.currentTime + 0.2);
         break;
    }
  }, []);

  return { playSound };
};
