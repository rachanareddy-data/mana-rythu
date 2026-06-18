export default function Slide04Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute left-0 top-0 bottom-0" style={{ width: "42vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full" style={{ width: "20vw", height: "20vw", background: "rgba(74,222,128,0.1)", top: "5vh", left: "5vw" }} />
        <div className="absolute rounded-full" style={{ width: "12vw", height: "12vw", background: "rgba(74,222,128,0.08)", bottom: "8vh", right: "3vw" }} />
        <div className="absolute inset-0 flex flex-col justify-center pl-[5vw] pr-[4vw]">
          <p className="font-display font-semibold" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.18em" }}>The Solution</p>
          <p className="font-display font-extrabold text-white mt-[1.5vh]" style={{ fontSize: "5vw", lineHeight: 0.9 }}>Mana</p>
          <p className="font-display font-extrabold" style={{ fontSize: "5vw", lineHeight: 0.9, color: "#4ade80" }}>Rythu</p>
          <p className="font-display font-semibold text-white mt-[3vh]" style={{ fontSize: "1.5vw", lineHeight: 1.5, opacity: 0.85 }}>
            An AI-powered operating system for farmers — marketplace, intelligence, communication, and payments in one platform.
          </p>
          <div className="mt-[4vh] rounded-2xl px-[2vw] py-[2.5vh]" style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(74,222,128,0.4)" }}>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "3.8vw", lineHeight: 1 }}>
              <span style={{ color: "#4ade80" }}>50%</span> more
            </p>
            <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.6)" }}>average income gain for farmers</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[4vw] pr-[5vw]" style={{ width: "58vw" }}>
        <p className="font-display font-bold mb-[2.5vh]" style={{ fontSize: "1.4vw", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em" }}>Five pillars</p>

        {[
          {
            title: "Direct Marketplace",
            desc: "Verified listings, direct purchase, zero broker in the chain.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="8" y="12" width="32" height="26" rx="4" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <line x1="8" y1="20" x2="40" y2="20" stroke="#15803d" strokeWidth="2" />
                <circle cx="18" cy="30" r="4" stroke="#15803d" strokeWidth="2" fill="none" />
                <line x1="26" y1="28" x2="36" y2="28" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <line x1="26" y1="33" x2="32" y2="33" stroke="#15803d" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            ),
          },
          {
            title: "AI Crop Intelligence",
            desc: "Pest detection, crop health analysis, and smart farming recommendations.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <circle cx="24" cy="24" r="14" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <path d="M24 10 C18 16 18 32 24 38" stroke="#15803d" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M24 10 C30 16 30 32 24 38" stroke="#15803d" strokeWidth="2" strokeLinecap="round" fill="none" />
                <line x1="10" y1="24" x2="38" y2="24" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <circle cx="24" cy="24" r="3" fill="#22c55e" />
              </svg>
            ),
          },
          {
            title: "AI Price Intelligence",
            desc: "Live APMC mandi benchmarks — farmers negotiate with data, not instinct.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <path d="M8 34 L16 20 L24 26 L32 12 L40 6" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="16" cy="20" r="3" fill="#22c55e" />
                <circle cx="24" cy="26" r="3" fill="#22c55e" />
                <circle cx="32" cy="12" r="3" fill="#22c55e" />
              </svg>
            ),
          },
          {
            title: "Real-Time Chat + GPT-4o",
            desc: "Farmer-to-buyer negotiations in Telugu and English, AI-assisted.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="6" y="10" width="22" height="16" rx="3" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <circle cx="10" cy="18" r="2" fill="#15803d" />
                <circle cx="17" cy="18" r="2" fill="#15803d" />
                <path d="M22 16 C28 11 40 15 40 22 C40 26 37 28 34 30 L35 36 L28 31" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            ),
          },
          {
            title: "Logistics Estimator + UPI Escrow",
            desc: "Distance-based transport pricing across TS & AP routes. Funds held in escrow until delivery.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="4" y="20" width="28" height="18" rx="3" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <path d="M32 26 L40 26 L44 32 L44 38 L32 38 Z" stroke="#15803d" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                <circle cx="12" cy="40" r="4" stroke="#15803d" strokeWidth="2" fill="none" />
                <circle cx="36" cy="40" r="4" stroke="#15803d" strokeWidth="2" fill="none" />
              </svg>
            ),
          },
        ].map(({ title, desc, icon }) => (
          <div key={title} className="flex items-start gap-[1.5vw] mb-[2.5vh]">
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
              {icon}
            </div>
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>{title}</p>
              <p className="font-display font-normal mt-[0.3vh]" style={{ fontSize: "1.35vw", color: "#6b7280" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>05</span>
      </div>
    </div>
  );
}
