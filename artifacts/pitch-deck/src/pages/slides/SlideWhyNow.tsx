export default function SlideWhyNow() {
  const reasons = [
    {
      label: "Rural India Is Now Digital",
      detail: "350M+ rural internet users. India's villages are online — and ready for digital agriculture.",
      color: "#16a34a",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <rect x="16" y="4" width="24" height="40" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
          <line x1="23" y1="38" x2="33" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="12" x2="32" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      ),
    },
    {
      label: "AI Enables Real-Time Pricing",
      detail: "GPT-4o now supports Telugu, Hindi, and English. AI guidance is no longer just for English speakers.",
      color: "#7c3aed",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <rect x="6" y="12" width="28" height="20" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
          <circle cx="14" cy="22" r="2.5" fill="white" />
          <circle cx="22" cy="22" r="2.5" fill="white" />
          <path d="M28 18 C34 14 46 18 46 26 C46 31 43 33 40 34 L41 40 L34 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
    {
      label: "Digital Payments Are Mainstream",
      detail: "UPI processes billions of transactions monthly — even in rural Telangana & AP.",
      color: "#0891b2",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <rect x="6" y="14" width="44" height="28" rx="5" stroke="white" strokeWidth="2.5" fill="none" />
          <line x1="6" y1="22" x2="50" y2="22" stroke="white" strokeWidth="2" />
          <rect x="12" y="28" width="12" height="4" rx="1" fill="white" opacity="0.7" />
          <rect x="30" y="28" width="8" height="4" rx="1" fill="white" opacity="0.5" />
        </svg>
      ),
    },
    {
      label: "Govt. Pushing Agri Digitisation",
      detail: "Digital India, PM e-Marketplace, and state agri schemes are actively digitising farm supply chains.",
      color: "#d97706",
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4vw", height: "4vw" }}>
          <path d="M28 6 L8 20 L8 48 L48 48 L48 20 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
          <rect x="20" y="32" width="16" height="16" rx="1" stroke="white" strokeWidth="2" fill="none" />
          <path d="M16 20 L28 12 L40 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.1) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why Now?</p>
        <h2 className="font-display font-extrabold text-white text-center mb-[5vh]" style={{ fontSize: "4.5vw", lineHeight: 1 }}>
          The timing is perfect
        </h2>

        <div className="grid grid-cols-2 gap-[2vw] w-full">
          {reasons.map(({ label, detail, color, icon }) => (
            <div
              key={label}
              className="rounded-2xl flex items-start gap-[2vw] px-[2.5vw] py-[2.5vh]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)" }}
            >
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ width: "5.5vw", height: "5.5vw", background: color }}
              >
                {icon}
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1.2 }}>{label}</p>
                <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>04</span>
      </div>
    </div>
  );
}
