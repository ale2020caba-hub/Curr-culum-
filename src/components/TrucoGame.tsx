import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, MessageSquare } from 'lucide-react';

type Card = {
  suit: 'espada' | 'basto' | 'oro' | 'copa';
  value: number;
  id: string;
  rank: number; // For trick comparisons
};

const SUITS = ['espada', 'basto', 'oro', 'copa'] as const;
const VALUES = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

const getRank = (value: number, suit: string): number => {
  if (value === 1 && suit === 'espada') return 100;
  if (value === 1 && suit === 'basto') return 90;
  if (value === 7 && suit === 'espada') return 80;
  if (value === 7 && suit === 'oro') return 70;
  if (value === 3) return 60;
  if (value === 2) return 50;
  if (value === 1) return 40; // Copa/Oro
  if (value === 12) return 30;
  if (value === 11) return 20;
  if (value === 10) return 10;
  if (value === 7) return 5; // Copa/Basto
  if (value === 6) return 4;
  if (value === 5) return 3;
  if (value === 4) return 2;
  return 0;
};

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      deck.push({
        suit,
        value,
        id: `${value}-${suit}`,
        rank: getRank(value, suit)
      });
    });
  });
  return deck;
};

const TrucoGame: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [cpuHand, setCpuHand] = useState<Card[]>([]);
  const [playerPlayed, setPlayerPlayed] = useState<(Card | null)[]>([null, null, null]);
  const [cpuPlayed, setCpuPlayed] = useState<(Card | null)[]>([null, null, null]);
  const [round, setRound] = useState(0); // 0, 1, 2
  const [msg, setMsg] = useState("¿Echamos un truco?");
  const [score, setScore] = useState({ player: 0, cpu: 0 });
  const [roundWinner, setRoundWinner] = useState<( 'player' | 'cpu' | 'draw' | null)[]>([null, null, null]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      startNewHand();
    };
    window.addEventListener('open-truco', handleOpen);
    return () => window.removeEventListener('open-truco', handleOpen);
  }, []);

  const startNewHand = () => {
    const deck = createDeck().sort(() => Math.random() - 0.5);
    setPlayerHand(deck.slice(0, 3));
    setCpuHand(deck.slice(3, 6));
    setPlayerPlayed([null, null, null]);
    setCpuPlayed([null, null, null]);
    setRound(0);
    setRoundWinner([null, null, null]);
    setMsg("Tu turno, vení al pie.");
  };

  const playCard = (cardIndex: number) => {
    if (round >= 3 || playerPlayed[round]) return;
    
    const card = playerHand[cardIndex];
    if (!card) return;

    const newPlayerPlayed = [...playerPlayed];
    newPlayerPlayed[round] = card;
    setPlayerPlayed(newPlayerPlayed);

    // CPU response
    setTimeout(() => {
      const cpuCardIndex = cpuHand.findIndex(c => !cpuPlayed.includes(c));
      const cpuCard = cpuHand[cpuCardIndex];
      const newCpuPlayed = [...cpuPlayed];
      newCpuPlayed[round] = cpuCard;
      setCpuPlayed(newCpuPlayed);

      // Determine winner of round
      let result: 'player' | 'cpu' | 'draw';
      if (card.rank > cpuCard.rank) result = 'player';
      else if (cpuCard.rank > card.rank) result = 'cpu';
      else result = 'draw';

      const newWinners = [...roundWinner];
      newWinners[round] = result;
      setRoundWinner(newWinners);

      if (round < 2) {
        setRound(round + 1);
        setMsg(result === 'player' ? "Mano ganada. ¡Truco carajo!" : "Te la gané, pibe.");
      } else {
        // End of hand
        finishHand(newWinners);
      }
    }, 800);
  };

  const finishHand = (winners: any[]) => {
    const pWins = winners.filter(w => w === 'player').length;
    const cWins = winners.filter(w => w === 'cpu').length;
    
    if (pWins > cWins) {
      setScore(s => ({ ...s, player: s.player + 1 }));
      setMsg("¡Ganaste la mano! Pura suerte...");
    } else if (cWins > pWins) {
      setScore(s => ({ ...s, cpu: s.cpu + 1 }));
      setMsg("¡Te gané! El que sabe, sabe.");
    } else {
      setMsg("Empate técnico. Vamos de nuevo.");
    }

    setTimeout(startNewHand, 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 font-sans"
    >
      <div className="w-full max-w-4xl h-full max-h-[600px] bg-green-900/20 border-4 border-green-800/30 rounded-[3rem] relative overflow-hidden flex flex-col items-center justify-between p-8">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <X size={32} />
        </button>

        {/* Score */}
        <div className="absolute top-8 left-12 flex gap-8">
           <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Ustedes</p>
             <p className="text-3xl font-display font-black text-white">{score.player}</p>
           </div>
           <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Nosotros</p>
             <p className="text-3xl font-display font-black text-brand-green">{score.cpu}</p>
           </div>
        </div>

        {/* CPU Area */}
        <div className="flex gap-4">
           {cpuHand.map((c, i) => (
             <div key={i} className="w-20 h-32 bg-brand-green/10 border-2 border-brand-green/20 rounded-xl flex items-center justify-center">
                <span className="text-brand-green/20 text-4xl">?</span>
             </div>
           ))}
        </div>

        {/* Table / Played cards */}
        <div className="flex flex-col items-center gap-4 py-8">
           <div className="flex gap-12">
              <div className="flex flex-col gap-2">
                 <p className="text-[9px] font-bold text-center opacity-40">CARGA DIGITAL</p>
                 <div className="flex gap-2">
                   {cpuPlayed.map((c, i) => (
                     <div key={i} className="w-16 h-24 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-[10px]">
                       {c ? `${c.value} de ${c.suit}` : ""}
                     </div>
                   ))}
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <p className="text-[9px] font-bold text-center opacity-40">TU REPARTO</p>
                 <div className="flex gap-2">
                   {playerPlayed.map((c, i) => (
                     <div key={i} className="w-16 h-24 bg-brand-green/5 rounded-lg border border-brand-green/20 flex items-center justify-center text-[10px] text-brand-green font-bold">
                       {c ? `${c.value} de ${c.suit}` : ""}
                     </div>
                   ))}
                 </div>
              </div>
           </div>
           <div className="mt-4 px-6 py-2 bg-white/10 rounded-full">
              <p className="text-sm font-bold italic tracking-wide">{msg}</p>
           </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-6">
           <div className="flex gap-6">
              {playerHand.map((card, i) => {
                const isPlayed = playerPlayed.includes(card);
                return (
                  <motion.button
                    key={card.id}
                    whileHover={!isPlayed ? { y: -20, scale: 1.05 } : {}}
                    whileTap={!isPlayed ? { scale: 0.95 } : {}}
                    disabled={isPlayed}
                    onClick={() => playCard(i)}
                    className={`w-28 h-44 bg-white rounded-2xl p-4 flex flex-col justify-between items-center shadow-2xl transition-opacity ${isPlayed ? 'opacity-20 translate-y-8 pointer-events-none' : 'opacity-100'}`}
                  >
                     <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-neutral-900 leading-none">{card.value}</span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{card.suit}</span>
                     </div>
                     <div className="w-10 h-10 flex items-center justify-center">
                        {card.suit === 'espada' && <span className="text-4xl">⚔️</span>}
                        {card.suit === 'basto' && <span className="text-4xl">🎋</span>}
                        {card.suit === 'oro' && <span className="text-4xl">🟡</span>}
                        {card.suit === 'copa' && <span className="text-4xl">🏆</span>}
                     </div>
                     <div className="flex flex-col items-center rotate-180">
                        <span className="text-2xl font-black text-neutral-900 leading-none">{card.value}</span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">{card.suit}</span>
                     </div>
                  </motion.button>
                );
              })}
           </div>
           
           <div className="flex gap-4">
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-green hover:text-black transition-all">Envido</button>
              <button 
                onClick={() => setMsg("¡Truco carajo!")}
                className="px-8 py-3 bg-brand-green text-black rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105 transition-all"
              >
                Truco
              </button>
           </div>
        </div>

        {/* Matrix Decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <div className="w-full h-full bg-[linear-gradient(rgba(34,197,94,.1)_1px,_transparent_1px),_linear-gradient(90deg,rgba(34,197,94,.1)_1px,_transparent_1px)] bg-[size:20px_20px]" />
        </div>
      </div>
    </motion.div>
  );
};

export default TrucoGame;
