export default function Slide04Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 38%, rgba(34,197,94,0.13) 0%, transparent 65%)" }} />
      {/* Top label */}
      <div className="absolute top-[5vh] left-0 right-0 flex flex-col items-center">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.22em" }}>Solution</p>
      </div>
      {/* Headline */}
      <div className="absolute left-0 right-0 flex flex-col items-center" style={{ top: "11vh" }}>
        <h2 className="font-display font-extrabold text-white text-center" style={{ fontSize: "5.2vw", lineHeight: 1, letterSpacing: "-0.02em" }}>
          Cut the middleman.
        </h2>
        <h2 className="font-display font-extrabold text-center" style={{ fontSize: "5.2vw", lineHeight: 1, letterSpacing: "-0.02em", color: "#4ade80" }}>
          Connect directly.
        </h2>
      </div>
      {/* Flow: Farmer → Mana Rythu → Buyer */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{ top: "38vh", gap: 0 }}
      >

        {/* Farmer node */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-2xl flex flex-col items-center justify-center"
            style={{ width: "14vw", height: "14vw", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(74,222,128,0.25)" }}
          >
            <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
              <circle cx="32" cy="18" r="12" fill="#4ade80" />
              <path d="M10 58c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#4ade80" />
              {/* hat */}
              <ellipse cx="32" cy="9" rx="16" ry="5" fill="#15803d" />
              <rect x="20" y="4" width="24" height="6" rx="2" fill="#15803d" />
            </svg>
            <p className="font-display font-bold text-white mt-[1.2vh]" style={{ fontSize: "1.8vw" }}>Farmer</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.2vw", color: "#4ade80" }}>Lists crop</p>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center" style={{ width: "8vw" }}>
          <svg viewBox="0 0 80 20" fill="none" style={{ width: "7vw", height: "2.5vw" }}>
            <line x1="2" y1="10" x2="62" y2="10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 3" />
            <polyline points="54,4 68,10 54,16" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Mana Rythu platform — centre node */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-2xl flex flex-col items-center justify-center"
            style={{
              width: "18vw",
              height: "14vw",
              background: "linear-gradient(140deg, #15803d 0%, #052e16 100%)",
              border: "2px solid #22c55e",
              boxShadow: "0 0 40px rgba(34,197,94,0.25)",
            }}
          >
            <svg viewBox="0 0 64 64" fill="none" style={{ width: "5vw", height: "5vw" }}>
              {/* Sprout */}
              <line x1="32" y1="56" x2="32" y2="28" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M32 40 C22 40 12 32 12 20 C22 16 34 26 32 40" fill="#4ade80" />
              <path d="M32 50 C42 50 52 42 52 30 C42 26 30 36 32 50" fill="#22c55e" opacity="0.9" />
            </svg>
            <p className="font-display font-extrabold text-white mt-[1vh]" style={{ fontSize: "2.2vw", lineHeight: 1 }}>Mana Rythu</p>
            <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.2vw", color: "#4ade80" }}>The Platform</p>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex flex-col items-center" style={{ width: "8vw" }}>
          <svg viewBox="0 0 80 20" fill="none" style={{ width: "7vw", height: "2.5vw" }}>
            <line x1="2" y1="10" x2="62" y2="10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 3" />
            <polyline points="54,4 68,10 54,16" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Buyer node */}
        <div className="flex flex-col items-center">
          <div
            className="rounded-2xl flex flex-col items-center justify-center"
            style={{ width: "14vw", height: "14vw", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(74,222,128,0.25)" }}
          >
            <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
              <circle cx="32" cy="18" r="12" fill="#4ade80" />
              <path d="M10 58c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#4ade80" />
              {/* briefcase */}
              <rect x="20" y="36" width="24" height="14" rx="2" fill="#15803d" />
              <path d="M26 36 v-4 a6 6 0 0 1 12 0 v4" stroke="#4ade80" strokeWidth="2" fill="none" />
            </svg>
            <p className="font-display font-bold text-white mt-[1.2vh]" style={{ fontSize: "1.8vw" }}>Buyer</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.2vw", color: "#4ade80" }}>Gets fresh crop</p>
          </div>
        </div>

      </div>
      {/* Three feature cards */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: "5vh", gap: "2.5vw", paddingLeft: "7vw", paddingRight: "7vw" }}
      >

        {/* Marketplace */}
        <div className="flex-1 flex items-center gap-[1.2vw] px-[2vw] py-[1.8vh] rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4vw", height: "4vw", background: "#15803d" }}>
            <svg viewBox="0 0 36 36" fill="none" style={{ width: "2.4vw", height: "2.4vw" }}>
              <rect x="4" y="4" width="12" height="12" rx="2" fill="#4ade80" />
              <rect x="20" y="4" width="12" height="12" rx="2" fill="#4ade80" opacity="0.6" />
              <rect x="4" y="20" width="12" height="12" rx="2" fill="#4ade80" opacity="0.6" />
              <rect x="20" y="20" width="12" height="12" rx="2" fill="#4ade80" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.6vw", lineHeight: 1 }}>Marketplace</p>
            <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "#4ade80", marginTop: "0.3vh" }}>Live listings · smart filters</p>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="flex-1 flex items-center gap-[1.2vw] px-[2vw] py-[1.8vh] rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4vw", height: "4vw", background: "#15803d" }}>
            <svg viewBox="0 0 36 36" fill="none" style={{ width: "2.4vw", height: "2.4vw" }}>
              <rect x="4" y="10" width="22" height="16" rx="4" stroke="#4ade80" strokeWidth="2" fill="none" />
              <circle cx="10" cy="18" r="2" fill="#4ade80" />
              <circle cx="18" cy="18" r="2" fill="#4ade80" />
              <path d="M22 8 C26 5 32 8 32 14 C32 18 30 20 27 21 L28 26 L22 22" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.6vw", lineHeight: 1 }}>AI Assistant</p>
            <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "#4ade80", marginTop: "0.3vh" }}>24/7 Farming Guidance</p>
          </div>
        </div>

        {/* Real-Time Chat */}
        <div className="flex-1 flex items-center gap-[1.2vw] px-[2vw] py-[1.8vh] rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4vw", height: "4vw", background: "#15803d" }}>
            <svg viewBox="0 0 36 36" fill="none" style={{ width: "2.4vw", height: "2.4vw" }}>
              <path d="M4 26 L4 10 C4 8 6 6 8 6 L28 6 C30 6 32 8 32 10 L32 20 C32 22 30 24 28 24 L12 24 Z" fill="#4ade80" />
              <circle cx="12" cy="15" r="2" fill="#052e16" />
              <circle cx="18" cy="15" r="2" fill="#052e16" />
              <circle cx="24" cy="15" r="2" fill="#052e16" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.6vw", lineHeight: 1 }}>Real-Time Chat</p>
            <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "#4ade80", marginTop: "0.3vh" }}>Negotiate · close directly</p>
          </div>
        </div>

      </div>
      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>04</span>
      </div>
    </div>
  );
}
