export default function Slide12Close() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(34,197,94,0.2) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">

        <svg viewBox="0 0 100 100" fill="none" style={{ width: "5vw", height: "5vw", marginBottom: "3vh" }}>
          <path d="M50 92 L50 38" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 54 C36 54 20 44 20 26 C36 22 55 36 50 54" fill="#4ade80" opacity="0.95" />
          <path d="M50 74 C64 74 80 64 80 46 C64 42 45 56 50 74" fill="#22c55e" opacity="0.85" />
          <line x1="24" y1="96" x2="76" y2="96" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <h1 className="font-display font-extrabold text-white text-center" style={{ fontSize: "5.8vw", lineHeight: 1.08, maxWidth: "80vw" }}>
          140 Million Farmers.
          <br />
          One AI Operating System.
          <br />
          One Fair Market.
          <br />
          <span style={{ color: "#4ade80" }}>Built and running today.</span>
        </h1>

        <div style={{ width: "7vw", height: "2px", background: "rgba(34,197,94,0.3)", margin: "3.5vh 0" }} />

        <p className="font-display font-semibold text-center" style={{ fontSize: "1.7vw", color: "rgba(255,255,255,0.5)", maxWidth: "58vw", lineHeight: 1.5 }}>
          Mana Rythu is building the operating system for Indian agriculture.
        </p>

        <div className="text-center mt-[3.5vh]">
          <p className="font-display font-bold text-white" style={{ fontSize: "2vw" }}>Rachana Baddam</p>
          <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.45vw", color: "rgba(255,255,255,0.38)" }}>M.S. Data Science · Saint Peter's University</p>
        </div>

        <div className="flex items-center gap-[4vw] mt-[3vh]">
          <div className="flex items-center gap-[0.8vw]">
            <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.7vw", height: "1.7vw" }}>
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#4ade80" strokeWidth="1.8" fill="none" />
              <circle cx="12" cy="12" r="4" stroke="#4ade80" strokeWidth="1.8" fill="none" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="#4ade80" />
            </svg>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.4)" }}>@mana.rythu</p>
          </div>
          <div style={{ width: "1px", height: "2vh", background: "rgba(255,255,255,0.15)" }} />
          <div className="flex items-center gap-[0.8vw]">
            <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.7vw", height: "1.7vw" }}>
              <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="1.8" fill="none" />
              <path d="M12 2 C8 6 8 18 12 22" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M12 2 C16 6 16 18 12 22" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.4)" }}>https://mana-rythu-ai.replit.app/</p>
          </div>
        </div>

      </div>
      <div className="absolute bottom-[3vh] left-[3vw] right-[3vw] flex items-center justify-between">
        <div className="flex gap-[0.5vw]">
          <div style={{ width: "1.5vw", height: "0.3vh", background: "#22c55e", borderRadius: "2px" }} />
          <div style={{ width: "1.5vw", height: "0.3vh", background: "rgba(34,197,94,0.3)", borderRadius: "2px" }} />
          <div style={{ width: "1.5vw", height: "0.3vh", background: "rgba(34,197,94,0.15)", borderRadius: "2px" }} />
        </div>
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.12)" }}>13</span>
      </div>
    </div>
  );
}
