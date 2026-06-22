import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { CinematicBg } from '../CinematicBg';
import { IconFarmer, IconPerson, IconCart } from '../VideoIcons';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 5500),
      setTimeout(() => setPhase(4), 8500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const pains = [
    { text: "No price transparency — farmers accept any price", hl: "transparency" },
    { text: "No accountability — no receipts, no contracts", hl: "accountability" },
    { text: "No direct access — always through agents", hl: "access" },
  ];

  const nodes = [
    { IconComp: IconFarmer,  label: "Farmer",  value: "₹20", isGreen: true,  delay: 0 },
    { IconComp: IconPerson,  label: "Broker",  isGreen: false, delay: 0.3 },
    { IconComp: IconPerson,  label: "Trader",  isGreen: false, delay: 0.6 },
    { IconComp: IconCart,    label: "Buyer",   value: "₹80", isGreen: true,  delay: 0.9 },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#052e16] overflow-hidden"
      {...sceneTransitions.fadeBlur}
    >
      <CinematicBg overlay="rgba(25,5,5,0.72)" />

      <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-8 lg:px-16">
        <motion.h2
          className="font-black text-white mb-8 sm:mb-16 drop-shadow-lg text-center"
          style={{ fontSize: 'clamp(1.4rem, 5vw, 3rem)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          The Broken System
        </motion.h2>

        {/* Desktop: horizontal chain */}
        <div className="hidden sm:flex items-center justify-center gap-3 lg:gap-4 mb-10 sm:mb-16 w-full max-w-6xl">
          <ChainNode Icon={IconFarmer} label="Farmer" value="₹20" isGreen={true} show={phase >= 2} delay={0} />
          <ChainArrow show={phase >= 2} delay={0.3} />
          <ChainNode Icon={IconPerson} label="Broker" isGreen={false} show={phase >= 2} delay={0.6} />
          <ChainArrow show={phase >= 2} delay={0.9} />
          <ChainNode Icon={IconPerson} label="Trader" isGreen={false} show={phase >= 2} delay={1.2} />
          <ChainArrow show={phase >= 2} delay={1.5} />
          <ChainNode Icon={IconCart}   label="Buyer"  value="₹80" isGreen={true} show={phase >= 2} delay={1.8} />
        </div>

        {/* Mobile: 2×2 grid */}
        <div className="flex sm:hidden flex-wrap justify-center gap-3 mb-6 w-full max-w-xs">
          {nodes.map((n) => (
            <MobileChainNode
              key={n.label}
              Icon={n.IconComp}
              label={n.label}
              value={n.value}
              isGreen={n.isGreen}
              show={phase >= 2}
              delay={n.delay}
            />
          ))}
        </div>

        <motion.div
          className="bg-red-500/20 border-2 border-red-500 px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow-[0_0_40px_rgba(239,68,68,0.4)] mb-8 sm:mb-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <p className="font-bold text-white" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.9rem)' }}>
            <span className="text-red-400">₹60 stolen</span> by middlemen per ₹80 sale
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 sm:gap-6 w-full max-w-4xl text-left">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              className="flex items-start sm:items-center gap-3 sm:gap-4 font-medium text-white/90"
              style={{ fontSize: 'clamp(0.8rem, 2vw, 1.5rem)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={phase >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: phase >= 4 ? i * 0.2 : 0 }}
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shrink-0 mt-1 sm:mt-0" />
              <p>
                {pain.text.split(pain.hl).map((part, index, arr) => (
                  <span key={index}>
                    {part}
                    {index < arr.length - 1 && <span className="text-red-400">{pain.hl}</span>}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

type IconComponent = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

function ChainNode({ Icon, label, value, isGreen, show, delay }: { Icon: IconComponent, label: string, value?: string, isGreen: boolean, show: boolean, delay: number }) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center p-3 lg:p-6 rounded-2xl border-2 backdrop-blur-sm ${
        isGreen ? 'bg-[#22c55e]/20 border-[#22c55e] shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-red-500/20 border-red-500'
      }`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: show ? delay : 0 }}
    >
      <Icon size={40} color={isGreen ? "#4ade80" : "#f87171"} strokeWidth={1.6} />
      <p className="text-sm lg:text-xl font-bold text-white mt-1 lg:mt-2">{label}</p>
      {value && <p className={`text-base lg:text-2xl font-black ${isGreen ? 'text-[#4ade80]' : 'text-red-400'}`}>{value}</p>}
    </motion.div>
  );
}

function MobileChainNode({ Icon, label, value, isGreen, show, delay }: { Icon: IconComponent, label: string, value?: string, isGreen: boolean, show: boolean, delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3 rounded-xl border-2 backdrop-blur-sm w-[calc(50%-6px)]"
      style={isGreen
        ? { background: 'rgba(34,197,94,0.2)', borderColor: '#22c55e', boxShadow: '0 0 20px rgba(34,197,94,0.25)' }
        : { background: 'rgba(239,68,68,0.2)', borderColor: 'rgb(239,68,68)' }
      }
      initial={{ opacity: 0, scale: 0.5 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: show ? delay : 0 }}
    >
      <Icon size={28} color={isGreen ? "#4ade80" : "#f87171"} strokeWidth={1.6} />
      <p className="text-xs font-bold text-white mt-1">{label}</p>
      {value && <p className={`text-sm font-black ${isGreen ? 'text-[#4ade80]' : 'text-red-400'}`}>{value}</p>}
    </motion.div>
  );
}

function ChainArrow({ show, delay }: { show: boolean, delay: number }) {
  return (
    <motion.div
      className="flex-1 h-2 bg-red-500 relative rounded-full"
      initial={{ scaleX: 0 }}
      animate={show ? { scaleX: 1 } : { scaleX: 0 }}
      style={{ originX: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: show ? delay : 0 }}
    >
      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-4 h-4 border-t-4 border-r-4 border-red-500 rotate-45" />
    </motion.div>
  );
}
