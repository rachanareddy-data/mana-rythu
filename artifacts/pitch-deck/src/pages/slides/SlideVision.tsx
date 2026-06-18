export default function SlideVision() {
  const pillars = [
    {
      title: "AI-Driven Farming",
      body: "Every farmer gets GPT-level expertise in their own language — pest detection, price advice, crop guidance.",
      icon: (
        <svg viewBox="0 0 52 52" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <rect x="6" y="14" width="26" height="20" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <circle cx="14" cy="24" r="3" fill="#4ade80" />
          <circle cx="22" cy="24" r="3" fill="#4ade80" />
          <path d="M30 12 C36 8 46 12 46 20 C46 26 43 28 40 29 L41 35 L33 30" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      title: "Fair, Transparent Markets",
      body: "Open price data, direct negotiation, zero-middleman deals — making agriculture honest again.",
      icon: (
        <svg viewBox="0 0 52 52" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <path d="M8 38 L16 24 L24 30 L32 18 L44 26" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="8" cy="38" r="3" fill="#4ade80" />
          <circle cx="44" cy="26" r="3" fill="#4ade80" />
          <text x="26" y="48" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4ade80">₹</text>
        </svg>
      ),
    },
    {
      title: "Inclusive Digital Access",
      body: "Multilingual UI in Telugu, Hindi, and English. Designed for farmers who are new to smartphones.",
      icon: (
        <svg viewBox="0 0 52 52" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <circle cx="26" cy="26" r="18" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <path d="M14 26 C16 16 36 16 38 26 C36 36 16 36 14 26" stroke="#4ade80" strokeWidth="2" fill="none" />
          <line x1="26" y1="8" x2="26" y2="44" stroke="#4ade80" strokeWidth="2" />
          <line x1="8" y1="26" x2="44" y2="26" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.14) 0%, transparent 60%)" }} />

      {/* Decorative circles */}
      <div className="absolute rounded-full" style={{ width: "35vw", height: "35vw", border: "1px solid rgba(74,222,128,0.1)", top: "-10vw", right: "-8vw" }} />
      <div className="absolute rounded-full" style={{ width: "22vw", height: "22vw", border: "1px solid rgba(74,222,128,0.08)", bottom: "-6vw", left: "-5vw" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Vision</p>

        <h2 className="font-display font-extrabold text-white text-center mb-[1.5vh]" style={{ fontSize: "4.8vw", lineHeight: 1.05 }}>
          Build India's digital<br />
          agriculture backbone
        </h2>

        <p className="font-display font-normal text-center mb-[5vh]" style={{ fontSize: "1.7vw", color: "rgba(255,255,255,0.55)", maxWidth: "54vw", lineHeight: 1.4 }}>
          A smart, fair, and transparent marketplace where every farmer has the tools of a Fortune 500 company — in their pocket.
        </p>

        <div className="flex gap-[2.5vw] w-full">
          {pillars.map(({ title, body, icon }) => (
            <div
              key={title}
              className="flex-1 rounded-2xl flex flex-col items-center text-center px-[2.5vw] py-[3.5vh]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(74,222,128,0.2)" }}
            >
              <div
                className="rounded-2xl flex items-center justify-center mb-[2.5vh]"
                style={{ width: "7vw", height: "7vw", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
              >
                {icon}
              </div>
              <p className="font-display font-bold text-white mb-[1.2vh]" style={{ fontSize: "1.9vw" }}>{title}</p>
              <p className="font-display font-normal" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-[4vh] flex items-center gap-[1.5vw]">
          <div style={{ flex: 1, height: "1px", background: "rgba(74,222,128,0.25)" }} />
          <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#4ade80", whiteSpace: "nowrap" }}>
            Starting in Telangana &amp; AP — scaling across India
          </p>
          <div style={{ flex: 1, height: "1px", background: "rgba(74,222,128,0.25)" }} />
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>11</span>
      </div>
    </div>
  );
}
