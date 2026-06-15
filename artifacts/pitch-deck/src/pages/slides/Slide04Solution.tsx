export default function Slide04Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute right-0 top-0 bottom-0" style={{ width: "38vw", background: "linear-gradient(160deg, #15803d 0%, #052e16 100%)" }}>
        <div className="absolute rounded-full opacity-10" style={{ width: "30vw", height: "30vw", background: "#4ade80", bottom: "-8vw", right: "-8vw" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 120 120" fill="none" style={{ width: "20vw", height: "20vw" }}>
            <circle cx="28" cy="60" r="18" fill="#4ade80" />
            <circle cx="92" cy="60" r="18" fill="#4ade80" />
            <line x1="48" y1="60" x2="72" y2="60" stroke="white" strokeWidth="5" strokeLinecap="round" />
            <polyline points="65,52 76,60 65,68" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="28" cy="54" r="7" fill="white" />
            <path d="M16 75c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" />
            <circle cx="92" cy="54" r="7" fill="white" />
            <path d="M80 75c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" />
          </svg>
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-[7vw] pr-[5vw]" style={{ width: "62vw" }}>
        <p className="font-display font-semibold mb-[2vh]" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Solution</p>
        <div className="w-[4vw] h-[0.4vh] mb-[3vh]" style={{ background: "#22c55e" }} />
        <h2 className="font-display font-extrabold" style={{ fontSize: "5.5vw", color: "#052e16", lineHeight: 1 }}>Mana Rythu</h2>
        <p className="font-display font-extrabold mt-[1vh]" style={{ fontSize: "3vw", color: "#15803d", lineHeight: 1.2 }}>Direct. Fair. Digital.</p>
        <p className="font-display font-normal mt-[3.5vh]" style={{ fontSize: "2.1vw", color: "#6b7280", lineHeight: 1.5, maxWidth: "44vw" }}>
          Farmers sell directly to buyers — no traders, no price cuts.
        </p>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>04</span>
      </div>
    </div>
  );
}
