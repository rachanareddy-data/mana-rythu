import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),  // Split screen appears
      setTimeout(() => setPhase(2), 4000),  // Farmer msg 1
      setTimeout(() => setPhase(3), 8000),  // Buyer msg 1
      setTimeout(() => setPhase(4), 12000), // Farmer msg 2
      setTimeout(() => setPhase(5), 16000), // Buyer msg 2
      setTimeout(() => setPhase(6), 20000), // AI Alert
      setTimeout(() => setPhase(7), 24000), // Farmer msg 3
      setTimeout(() => setPhase(8), 27000), // Buyer accept
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex z-10 bg-bg-dark"
      {...sceneTransitions.clipPolygon}
    >
      {/* LEFT: Farmer View */}
      <div className="w-1/2 h-full bg-[#052e16] border-r border-primary/20 relative p-16 flex flex-col justify-center">
        <motion.div 
          className="absolute top-12 left-12 flex gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">👨🏽‍🌾</div>
          <div>
            <h3 className="text-white text-xl font-bold">Raju (Farmer)</h3>
            <span className="text-primary text-sm font-bold bg-primary/10 px-3 py-1 rounded-full">ఇప్పుడే చాట్ చేయండి</span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
          <ChatMessage 
            text="Fresh tomatoes available. 500kg. Grade A. Ready to ship." 
            isSelf={true} 
            show={phase >= 2} 
          />
          <ChatMessage 
            text="What's your best price for bulk?" 
            isSelf={false} 
            show={phase >= 3} 
          />
          <ChatMessage 
            text="₹24/kg. Market rate today." 
            isSelf={true} 
            show={phase >= 4} 
          />
          <ChatMessage 
            text="Can you do ₹22?" 
            isSelf={false} 
            show={phase >= 5} 
          />
          
          {phase >= 6 && (
            <motion.div 
              className="w-full bg-highlight/10 border border-highlight/30 p-6 rounded-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="text-highlight font-bold flex items-center gap-2 mb-2">
                <span className="text-2xl">🤖</span> Fair Price Alert
              </p>
              <p className="text-white/80 text-lg">APMC benchmark: <span className="text-white font-bold">₹22–₹26</span></p>
              <p className="text-white/80 text-lg">Suggested: <span className="text-highlight font-bold">₹24</span></p>
            </motion.div>
          )}

          <ChatMessage 
            text="₹24 final. Deal?" 
            isSelf={true} 
            show={phase >= 7} 
          />
          <ChatMessage 
            text="✓ Accepted" 
            isSelf={false} 
            show={phase >= 8} 
            accent={true}
          />
        </div>
      </div>

      {/* RIGHT: Buyer View */}
      <div className="w-1/2 h-full bg-[#111] relative p-16 flex flex-col justify-center">
        <motion.div 
          className="absolute top-12 left-12 flex gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">🛒</div>
          <div>
            <h3 className="text-white text-xl font-bold">Hyderabad Retail (Buyer)</h3>
            <span className="text-gray-400 text-sm font-bold bg-white/5 px-3 py-1 rounded-full">Online</span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">
          <ChatMessage 
            text="Fresh tomatoes available. 500kg. Grade A. Ready to ship." 
            isSelf={false} 
            show={phase >= 2} 
            dark={true}
          />
          <ChatMessage 
            text="What's your best price for bulk?" 
            isSelf={true} 
            show={phase >= 3} 
            dark={true}
          />
          <ChatMessage 
            text="₹24/kg. Market rate today." 
            isSelf={false} 
            show={phase >= 4} 
            dark={true}
          />
          <ChatMessage 
            text="Can you do ₹22?" 
            isSelf={true} 
            show={phase >= 5} 
            dark={true}
          />
          <ChatMessage 
            text="₹24 final. Deal?" 
            isSelf={false} 
            show={phase >= 7} 
            dark={true}
          />
          <ChatMessage 
            text="✓ Accepted" 
            isSelf={true} 
            show={phase >= 8} 
            accent={true}
          />
        </div>
      </div>

    </motion.div>
  );
}

function ChatMessage({ text, isSelf, show, dark = false, accent = false }: { text: string, isSelf: boolean, show: boolean, dark?: boolean, accent?: boolean }) {
  if (!show) return <div className="opacity-0 h-16" />; // placeholder
  
  const selfClass = dark 
    ? "bg-gray-800 text-white self-end rounded-br-sm" 
    : accent ? "bg-highlight text-bg-dark font-bold self-end rounded-br-sm" : "bg-primary text-white self-end rounded-br-sm";
  const otherClass = dark 
    ? "bg-gray-900 text-gray-300 self-start rounded-bl-sm border border-gray-800" 
    : "bg-[#0a1f12] text-white/80 self-start rounded-bl-sm border border-primary/20";
    
  return (
    <motion.div 
      className={`px-6 py-4 rounded-3xl text-xl max-w-[85%] shadow-md ${isSelf ? selfClass : otherClass}`}
      initial={{ opacity: 0, scale: 0.9, y: 20, originX: isSelf ? 1 : 0, originY: 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {text}
    </motion.div>
  );
}
