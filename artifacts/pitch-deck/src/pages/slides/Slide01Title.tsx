export default function Slide01Title() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      {/* Full-height green left panel */}
      <div className="absolute left-0 top-0 bottom-0" style={{ width: "48vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full opacity-10" style={{ width: "28vw", height: "28vw", background: "#4ade80", top: "-6vw", left: "-8vw" }} />
        <div className="absolute rounded-full opacity-10" style={{ width: "18vw", height: "18vw", background: "#4ade80", bottom: "-4vw", right: "-4vw" }} />

        {/* Sprout icon centred on left */}
        <div className="absolute inset-0 flex flex-col justify-center pl-[6vw]">
          <svg viewBox="0 0 100 100" fill="none" style={{ width: "5.5vw", height: "5.5vw", marginBottom: "2.5vh" }}>
            <path d="M50 90 L50 38" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 54 C36 54 22 44 22 28 C36 24 53 36 50 54" fill="#4ade80" opacity="0.95" />
            <path d="M50 72 C64 72 78 62 78 46 C64 42 47 54 50 72" fill="#22c55e" opacity="0.85" />
            <line x1="26" y1="94" x2="74" y2="94" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p className="font-display font-extrabold text-white" style={{ fontSize: "7.5vw", lineHeight: 0.9 }}>Mana</p>
          <p className="font-display font-extrabold" style={{ fontSize: "7.5vw", lineHeight: 0.9, color: "#4ade80" }}>Rythu</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[5vw]" style={{ width: "52vw" }}>

        {/* Tagline */}
        <p className="font-display font-extrabold leading-tight" style={{ fontSize: "3.6vw", color: "#052e16", lineHeight: 1.15 }}>
          Cut Middlemen.<br />
          <span style={{ color: "#16a34a" }}>Empower Farmers.</span>
        </p>

        {/* Subtitle */}
        <div className="flex items-center gap-[1vw] mt-[2.5vh]">
          <div style={{ width: "3px", height: "3.5vh", background: "#22c55e", borderRadius: "2px", flexShrink: 0 }} />
          <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#374151", lineHeight: 1.3 }}>
            AI-powered Farmer-to-Buyer Platform
          </p>
        </div>

        <p className="font-display font-normal mt-[2vh]" style={{ fontSize: "1.55vw", color: "#9ca3af" }}>
          Telangana &amp; Andhra Pradesh
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-[1vw] mt-[3.5vh]">
          {["Marketplace", "Real-time Chat", "AI Assistant", "Price Intelligence"].map((f) => (
            <span
              key={f}
              className="font-display font-semibold px-[1.2vw] py-[0.6vh] rounded-full"
              style={{ fontSize: "1.2vw", background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-[4.5vh] pt-[3vh]" style={{ borderTop: "1px solid #e5e7eb" }}>
          <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#15803d" }}>Rachana Baddam</p>
          <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.5vw", color: "#9ca3af" }}>M.S. Data Science · Saint Peter's University</p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>01</span>
      </div>
    </div>
  );
}
