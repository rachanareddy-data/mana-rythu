export default function Slide04Solution() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative font-display"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(34,197,94,0.18) 0%, transparent 62%)" }}
      />

      {/* Top label */}
      <div className="absolute top-[4.5vh] left-0 right-0 flex flex-col items-center">
        <p
          className="font-display font-semibold"
          style={{ fontSize: "1.3vw", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.22em" }}
        >
          Solution
        </p>
      </div>

      {/* Headline */}
      <div className="absolute left-0 right-0 flex flex-col items-center" style={{ top: "10vh" }}>
        <h2
          className="font-display font-extrabold text-center"
          style={{ fontSize: "5vw", lineHeight: 1, letterSpacing: "-0.02em", color: "#14532d" }}
        >
          Cut the middleman.
        </h2>
        <h2
          className="font-display font-extrabold text-center"
          style={{ fontSize: "5vw", lineHeight: 1, letterSpacing: "-0.02em", color: "#16a34a" }}
        >
          Connect directly.
        </h2>
        <p
          className="font-display font-semibold text-center mt-[1.5vh]"
          style={{ fontSize: "1.9vw", color: "#4b5563" }}
        >
          Farmers earn more. Buyers pay less.
        </p>
      </div>

      {/* Flow: Farmer → Mana Rythu → Buyer */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{ top: "39vh" }}
      >

        {/* Farmer card */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl"
          style={{
            width: "13.5vw",
            height: "13.5vw",
            background: "#ffffff",
            border: "1px solid #dcfce7",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
            <circle cx="32" cy="18" r="12" fill="#22c55e" />
            <path d="M10 58c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#22c55e" />
            <ellipse cx="32" cy="9" rx="16" ry="5" fill="#16a34a" />
            <rect x="20" y="4" width="24" height="6" rx="2" fill="#16a34a" />
          </svg>
          <p className="font-display font-bold mt-[1.2vh]" style={{ fontSize: "1.8vw", color: "#14532d" }}>
            Farmer
          </p>
          <p className="font-display font-normal mt-[0.3vh]" style={{ fontSize: "1.2vw", color: "#16a34a" }}>
            Lists crop
          </p>
        </div>

        {/* Arrow 1 */}
        <div style={{ width: "7vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 80 20" fill="none" style={{ width: "6.5vw", height: "2.5vw" }}>
            <line x1="2" y1="10" x2="60" y2="10" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
            <polyline
              points="52,3 68,10 52,17"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Mana Rythu centre card */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl transition-all duration-300"
          style={{
            width: "17.5vw",
            height: "13.5vw",
            background:
              "linear-gradient(135deg, rgba(22,163,74,0.95) 0%, rgba(34,197,94,0.95) 100%)",
            border: "2px solid rgba(255,255,255,0.25)",
            boxShadow: "0 20px 60px rgba(34,197,94,0.45)",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg viewBox="0 0 64 64" fill="none" style={{ width: "5vw", height: "5vw" }}>
            <line x1="32" y1="56" x2="32" y2="28" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M32 40 C22 40 12 32 12 20 C22 16 34 26 32 40" fill="white" />
            <path d="M32 50 C42 50 52 42 52 30 C42 26 30 36 32 50" fill="white" opacity="0.75" />
          </svg>
          <p
            className="font-display font-extrabold text-white mt-[1vh]"
            style={{ fontSize: "2.2vw", lineHeight: 1 }}
          >
            Mana Rythu
          </p>
          <p className="font-display font-semibold text-white mt-[0.5vh]" style={{ fontSize: "1.3vw", opacity: 0.85 }}>
            The Platform
          </p>
        </div>

        {/* Arrow 2 */}
        <div style={{ width: "7vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 80 20" fill="none" style={{ width: "6.5vw", height: "2.5vw" }}>
            <line x1="2" y1="10" x2="60" y2="10" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
            <polyline
              points="52,3 68,10 52,17"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Buyer card */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl"
          style={{
            width: "13.5vw",
            height: "13.5vw",
            background: "#ffffff",
            border: "1px solid #dcfce7",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
            <circle cx="32" cy="18" r="12" fill="#22c55e" />
            <path d="M10 58c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#22c55e" />
            <rect x="20" y="36" width="24" height="14" rx="2" fill="#16a34a" />
            <path d="M26 36 v-4 a6 6 0 0 1 12 0 v4" stroke="#22c55e" strokeWidth="2" fill="none" />
          </svg>
          <p className="font-display font-bold mt-[1.2vh]" style={{ fontSize: "1.8vw", color: "#14532d" }}>
            Buyer
          </p>
          <p className="font-display font-normal mt-[0.3vh]" style={{ fontSize: "1.2vw", color: "#16a34a" }}>
            Gets fresh crop
          </p>
        </div>

      </div>

      {/* Three feature cards */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: "4.5vh", gap: "2.5vw", paddingLeft: "7vw", paddingRight: "7vw" }}
      >

        {/* Marketplace */}
        <div
          className="flex-1 flex items-center gap-[1.3vw] px-[2vw] py-[1.8vh] rounded-2xl"
          style={{
            background: "#ffffff",
            border: "1px solid #dcfce7",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: "4vw", height: "4vw", background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
          >
            <svg viewBox="0 0 36 36" fill="none" style={{ width: "2.4vw", height: "2.4vw" }}>
              <rect x="4" y="4" width="12" height="12" rx="2" fill="#16a34a" />
              <rect x="20" y="4" width="12" height="12" rx="2" fill="#16a34a" opacity="0.5" />
              <rect x="4" y="20" width="12" height="12" rx="2" fill="#16a34a" opacity="0.5" />
              <rect x="20" y="20" width="12" height="12" rx="2" fill="#16a34a" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "1.6vw", color: "#14532d", lineHeight: 1 }}>
              Marketplace
            </p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.2vw", color: "#16a34a" }}>
              Live listings &amp; smart filters
            </p>
          </div>
        </div>

        {/* AI Assistant */}
        <div
          className="flex-1 flex items-center gap-[1.3vw] px-[2vw] py-[1.8vh] rounded-2xl"
          style={{
            background: "#ffffff",
            border: "1px solid #dcfce7",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: "4vw", height: "4vw", background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
          >
            <svg viewBox="0 0 36 36" fill="none" style={{ width: "2.4vw", height: "2.4vw" }}>
              <rect x="4" y="10" width="22" height="16" rx="4" stroke="#16a34a" strokeWidth="2" fill="none" />
              <circle cx="10" cy="18" r="2" fill="#16a34a" />
              <circle cx="18" cy="18" r="2" fill="#16a34a" />
              <path
                d="M22 8 C26 5 32 8 32 14 C32 18 30 20 27 21 L28 26 L22 22"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "1.6vw", color: "#14532d", lineHeight: 1 }}>
              AI Assistant
            </p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.2vw", color: "#16a34a" }}>
              GPT-4o Powered Advice
            </p>
          </div>
        </div>

        {/* Real-Time Chat */}
        <div
          className="flex-1 flex items-center gap-[1.3vw] px-[2vw] py-[1.8vh] rounded-2xl"
          style={{
            background: "#ffffff",
            border: "1px solid #dcfce7",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: "4vw", height: "4vw", background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
          >
            <svg viewBox="0 0 36 36" fill="none" style={{ width: "2.4vw", height: "2.4vw" }}>
              <path
                d="M4 26 L4 10 C4 8 6 6 8 6 L28 6 C30 6 32 8 32 10 L32 20 C32 22 30 24 28 24 L12 24 Z"
                fill="#16a34a"
              />
              <circle cx="12" cy="15" r="2" fill="white" />
              <circle cx="18" cy="15" r="2" fill="white" />
              <circle cx="24" cy="15" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "1.6vw", color: "#14532d", lineHeight: 1 }}>
              Real-Time Chat
            </p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.2vw", color: "#16a34a" }}>
              Negotiate &amp; close directly
            </p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#86efac" }}>04</span>
      </div>
    </div>
  );
}
