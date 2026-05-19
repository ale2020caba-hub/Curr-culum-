import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';

const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "System v2.0.26 initialized.",
    "Connecting to Lucas Barrera Digital Asset...",
    "Connection established. Type 'help' for available commands."
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push("Available commands: about, skills, contact, clear, truco, exit");
        break;
      case 'about':
        newHistory.push("Lucas Barrera: A dedicated professional with expertise in customer service and digital solutions.");
        newHistory.push("Location: Pinamar, Argentina.");
        break;
      case 'skills':
        newHistory.push("Technical: Software Dev, AI Tools, Digital PM.");
        newHistory.push("Soft: Leadership, Teamwork, High-pressure management.");
        break;
      case 'contact':
        newHistory.push("Email: Ale.2020.caba@gmail.com");
        newHistory.push("Phone: +54 9 2254 53-5810");
        break;
      case 'clear':
        setHistory(["Console cleared."]);
        setInput("");
        return;
      case 'truco':
        newHistory.push("Opening Truco module... [Attempting handshake]");
        setTimeout(() => setIsOpen(false), 500);
        // Note: We'll trigger a separate event or state to open Truco
        window.dispatchEvent(new CustomEvent('open-truco'));
        break;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        newHistory.push(`Command not found: ${cmd}. Type 'help' for info.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 w-14 h-14 bg-black border border-brand-green/30 text-brand-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all"
      >
        <TerminalIcon size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:left-8 md:w-[500px] md:h-[400px] z-[60] bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono"
          >
            {/* Header */}
            <div className="bg-neutral-900 px-4 py-2 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-brand-green" />
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">System_Console_v2.0</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="hover:text-brand-green"><Minus size={14} /></button>
                <button onClick={() => setIsOpen(false)} className="hover:text-brand-green"><Square size={10} /></button>
                <button onClick={() => setIsOpen(false)} className="hover:text-red-500"><X size={14} /></button>
              </div>
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto text-xs space-y-1 scrollbar-hide"
            >
              {history.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? 'text-brand-green' : 'text-neutral-400'}>
                  {line}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
                <span className="text-brand-green font-bold">&gt;</span>
                <input 
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-grow text-white"
                  spellCheck={false}
                />
              </form>
            </div>

            {/* Footer */}
            <div className="bg-neutral-900/50 px-4 py-1 border-t border-white/5 flex justify-between text-[8px] text-neutral-600 uppercase font-black">
              <span>Ready</span>
              <span>UTF-8: Lucas-Asset</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
