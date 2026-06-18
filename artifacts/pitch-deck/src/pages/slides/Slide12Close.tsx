export default function Slide12Close() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.18) 0%, transparent 60%)" }} />
      <div className="absolute left-0 bottom-0" style={{ width: "28vw", height: "28vw" }}>
        <div className="absolute rounded-full" style={{ width: "100%", height: "100%", background: "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />
      </div>
      <div className="absolute right-0 top-0" style={{ width: "22vw", height: "22vw" }}>
        <div className="absolute rounded-full" style={{ width: "100%", height: "100%", background: "radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">

        <svg viewBox="0 0 100 100" fill="none" style={{ width: "6vw", height: "6vw", marginBottom: "3vh" }}>
          <path d="M50 90 L50 38" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 54 C36 54 22 44 22 28 C36 24 53 36 50 54" fill="#4ade80" opacity="0.95" />
          <path d="M50 72 C64 72 78 62 78 46 C64 42 47 54 50 72" fill="#22c55e" opacity="0.85" />
          <line x1="26" y1="94" x2="74" y2="94" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <h2 className="font-display font-extrabold text-white text-center" style={{ fontSize: "5.5vw", lineHeight: 1.05 }}>
          Let's give farmers<br />what they've always earned.
        </h2>

        <p className="font-display font-semibold text-center mt-[3vh]" style={{ fontSize: "2vw", color: "#4ade80" }}>
          A fair price. A direct deal. A better life.
        </p>

        <div className="w-[8vw] h-[0.3vh] rounded-full mt-[4vh] mb-[4vh]" style={{ background: "rgba(74,222,128,0.3)" }} />

        <div className="text-center">
          <p className="font-display font-bold text-white" style={{ fontSize: "2.2vw" }}>Rachana Baddam</p>
          <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.55)" }}>M.S. Data Science · Saint Peter's University</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-[2.5vw] mt-[5vh]">
          <div className="flex items-center gap-[0.8vw]">
            <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.8vw", height: "1.8vw" }}>
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#4ade80" strokeWidth="1.8" fill="none" />
              <circle cx="12" cy="12" r="4" stroke="#4ade80" strokeWidth="1.8" fill="none" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="#4ade80" />
            </svg>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.65)" }}>@mana.rythu</p>
          </div>
          <div className="flex items-center gap-[0.8vw]">
            <svg viewBox="0 0 24 24" fill="none" style={{ width: "1.8vw", height: "1.8vw" }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#4ade80" strokeWidth="1.8" fill="none" />
            </svg>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.65)" }}>mana-rythu.replit.app</p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>12</span>
      </div>
    </div>
  );
}
