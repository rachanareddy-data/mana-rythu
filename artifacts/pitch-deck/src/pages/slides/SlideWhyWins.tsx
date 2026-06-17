export default function SlideWhyWins() {
  const points = [
    {
      num: "01",
      title: "Real Working Product",
      detail: "Not a prototype. Not a mockup. Fully deployed — marketplace, chat, orders, and AI — all live.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <rect x="4" y="8" width="40" height="28" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <line x1="4" y1="16" x2="44" y2="16" stroke="#4ade80" strokeWidth="2" />
          <polyline points="14,26 20,32 34,20" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="18" y1="36" x2="30" y2="36" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="36" x2="24" y2="40" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "AI-Powered Agriculture Tools",
      detail: "GPT-4o for pest detection from photos, AI fair price advisor, and a 24/7 farming assistant.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <rect x="6" y="14" width="26" height="20" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <circle cx="14" cy="24" r="3" fill="#4ade80" />
          <circle cx="22" cy="24" r="3" fill="#4ade80" />
          <path d="M26 12 C31 8 40 12 40 20 C40 26 37 28 34 29 L35 35 L27 30" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Multilingual Support",
      detail: "Telugu, English, and Hindi — built in from day one. AI responses and UI in the farmer's own language.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <circle cx="24" cy="24" r="18" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <path d="M14 24 C16 14 32 14 34 24 C32 34 16 34 14 24" stroke="#4ade80" strokeWidth="2" fill="none" />
          <line x1="24" y1="6" x2="24" y2="42" stroke="#4ade80" strokeWidth="2" />
          <line x1="6" y1="24" x2="42" y2="24" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Direct Farmer-Buyer Connection",
      detail: "Zero intermediaries. Farmers list, buyers discover, both negotiate and close in real time.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <circle cx="14" cy="16" r="8" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <circle cx="34" cy="16" r="8" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <path d="M4 42c0-8.284 4.477-10 10-10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M44 42c0-8.284-4.477-10-10-10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="22" y1="28" x2="26" y2="28" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="22,24 28,28 22,32" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "Built for Telangana & Andhra Pradesh",
      detail: "Local crops, local cities, local prices, local language — not a generic platform repurposed for agriculture.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
          <path d="M24 4 C16 4 10 10 10 18 C10 30 24 44 24 44 C24 44 38 30 38 18 C38 10 32 4 24 4 Z" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <circle cx="24" cy="18" r="5" fill="#4ade80" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why We Win</p>
        <h2 className="font-display font-extrabold text-white text-center mb-[4vh]" style={{ fontSize: "4.2vw", lineHeight: 1 }}>
          5 reasons Mana Rythu stands out
        </h2>

        <div className="flex flex-col w-full gap-[1.4vh]">
          {points.map(({ num, title, detail, icon }) => (
            <div
              key={num}
              className="flex items-center gap-[2vw] px-[2.5vw] py-[1.6vh] rounded-2xl"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(74,222,128,0.18)" }}
            >
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ width: "5vw", height: "5vw", background: "#15803d" }}
              >
                {icon}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-[1vw]">
                  <span className="font-display font-semibold" style={{ fontSize: "1.2vw", color: "#4ade80" }}>{num}</span>
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1 }}>{title}</p>
                </div>
                <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.3vw", color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>{detail}</p>
              </div>
              <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "2vw", height: "2vw", background: "#22c55e" }}>
                <svg viewBox="0 0 16 16" fill="none" style={{ width: "1.1vw", height: "1.1vw" }}>
                  <polyline points="3,8 6,11 13,4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>15</span>
      </div>
    </div>
  );
}
