export default function SlideWhyWins() {
  const points = [
    {
      title: "Direct Farmer-to-Buyer System",
      detail: "Zero intermediaries. Farmers list, buyers discover, both negotiate and close — in real time.",
      color: "#16a34a",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <circle cx="12" cy="16" r="8" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <circle cx="36" cy="16" r="8" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <path d="M2 42c0-8 4-10 10-10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M46 42c0-8-4-10-10-10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="20" y1="28" x2="28" y2="28" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="24,24 28,28 24,32" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      title: "AI-First Agriculture Platform",
      detail: "GPT-4o for pest detection from photos, fair price advice, and a 24/7 farming assistant.",
      color: "#7c3aed",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <rect x="4" y="12" width="26" height="20" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="22" r="3" fill="#4ade80" />
          <circle cx="20" cy="22" r="3" fill="#4ade80" />
          <path d="M28 16 C33 12 42 16 42 24 C42 30 39 32 36 33 L37 39 L30 34" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      title: "Regional Language Support",
      detail: "Telugu, Hindi, and English — built in from day one. The AI responds in the farmer's own language.",
      color: "#0891b2",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <circle cx="24" cy="24" r="18" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <path d="M12 24 C14 14 34 14 36 24 C34 34 14 34 12 24" stroke="#4ade80" strokeWidth="2" fill="none" />
          <line x1="24" y1="6" x2="24" y2="42" stroke="#4ade80" strokeWidth="2" />
          <line x1="6" y1="24" x2="42" y2="24" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      ),
    },
    {
      title: "Real-Time Negotiation Engine",
      detail: "Live WebSocket chat for farmers and buyers to negotiate directly — no phone calls, no brokers.",
      color: "#d97706",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <path d="M6 34 L6 12 C6 10 8 8 10 8 L38 8 C40 8 42 10 42 12 L42 28 C42 30 40 32 38 32 L18 32 Z" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <line x1="14" y1="18" x2="34" y2="18" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="24" x2="26" y2="24" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why Mana Rythu</p>
        <h2 className="font-display font-extrabold text-white text-center mb-[5vh]" style={{ fontSize: "4.2vw", lineHeight: 1 }}>
          No one else does all four
        </h2>

        <div className="grid grid-cols-2 gap-[2vw] w-full">
          {points.map(({ title, detail, color, icon }) => (
            <div
              key={title}
              className="rounded-2xl flex items-start gap-[2vw] px-[2.5vw] py-[2.8vh]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(74,222,128,0.18)" }}
            >
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ width: "5.5vw", height: "5.5vw", background: color }}
              >
                {icon}
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1.2 }}>{title}</p>
                <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>10</span>
      </div>
    </div>
  );
}
