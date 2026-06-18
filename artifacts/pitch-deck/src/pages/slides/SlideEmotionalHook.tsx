export default function SlideEmotionalHook() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">
        <div className="w-[3px] mb-[4vh]" style={{ height: "6vh", background: "linear-gradient(to bottom, transparent, #22c55e)" }} />

        <h2 className="font-display font-extrabold text-white text-center" style={{ fontSize: "4.6vw", lineHeight: 1.15, maxWidth: "72vw" }}>
          "A farmer's income depends on{" "}
          <span style={{ color: "#4ade80" }}>people he never meets."</span>
        </h2>

        <div className="w-[3px] mt-[4vh] mb-[7vh]" style={{ height: "6vh", background: "linear-gradient(to bottom, #22c55e, transparent)" }} />

        <div className="flex items-center w-full" style={{ maxWidth: "76vw" }}>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center justify-center py-[3.5vh] px-[2vw]" style={{ background: "rgba(34,197,94,0.15)", border: "2px solid #22c55e", width: "100%" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
                <circle cx="30" cy="18" r="10" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <path d="M10 52 C10 38 50 38 50 52" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <line x1="18" y1="14" x2="42" y2="14" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p className="font-display font-bold text-white mt-[1.5vh]" style={{ fontSize: "1.9vw" }}>Farmer</p>
              <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "3vw", color: "#4ade80" }}>₹20</p>
              <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.45)" }}>receives</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ width: "6vw", flexShrink: 0 }}>
            <svg viewBox="0 0 40 20" fill="none" style={{ width: "5vw" }}>
              <line x1="2" y1="10" x2="35" y2="10" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
              <polyline points="28,4 36,10 28,16" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1.4 }}>
            <div className="rounded-2xl flex flex-col items-center justify-center py-[3.5vh] px-[2vw]" style={{ background: "rgba(220,38,38,0.15)", border: "2px solid #dc2626", width: "100%" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
                <circle cx="20" cy="18" r="8" stroke="#dc2626" strokeWidth="2.5" fill="none" />
                <circle cx="40" cy="18" r="8" stroke="#dc2626" strokeWidth="2.5" fill="none" />
                <path d="M4 52 C4 42 36 42 36 52" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M24 52 C24 42 56 42 56 52" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <p className="font-display font-bold mt-[1.5vh]" style={{ fontSize: "1.9vw", color: "#f87171" }}>2–3 Middlemen</p>
              <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "3vw", color: "#dc2626" }}>+₹20</p>
              <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.45)" }}>extracted</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ width: "6vw", flexShrink: 0 }}>
            <svg viewBox="0 0 40 20" fill="none" style={{ width: "5vw" }}>
              <line x1="2" y1="10" x2="35" y2="10" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
              <polyline points="28,4 36,10 28,16" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center justify-center py-[3.5vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.2)", width: "100%" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
                <circle cx="30" cy="18" r="10" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M10 52 C10 38 50 38 50 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <rect x="20" y="36" width="20" height="14" rx="2" stroke="white" strokeWidth="2" fill="none" />
                <path d="M24 36 L24 33 C24 32 26 31 30 31 C34 31 36 32 36 33 L36 36" stroke="white" strokeWidth="2" fill="none" />
              </svg>
              <p className="font-display font-bold text-white mt-[1.5vh]" style={{ fontSize: "1.9vw" }}>Buyer</p>
              <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "3vw", color: "white" }}>₹40</p>
              <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.45)" }}>pays</p>
            </div>
          </div>

        </div>

        <p className="font-display font-semibold mt-[4.5vh]" style={{ fontSize: "1.7vw", color: "rgba(255,255,255,0.45)" }}>
          The farmer grows the food. The middlemen take the profit.{" "}
          <span style={{ color: "#4ade80" }}>Mana Rythu fixes this.</span>
        </p>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>02</span>
      </div>
    </div>
  );
}
