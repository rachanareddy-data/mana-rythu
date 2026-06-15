export default function Slide12Close() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      {/* Full green left block */}
      <div className="absolute left-0 top-0 bottom-0" style={{ width: "50vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full opacity-10" style={{ width: "30vw", height: "30vw", background: "#4ade80", top: "-6vw", left: "-6vw" }} />
        <div className="absolute rounded-full opacity-10" style={{ width: "20vw", height: "20vw", background: "#4ade80", bottom: "-4vw", right: "-4vw" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Large leaf/sprout icon */}
          <svg viewBox="0 0 120 120" fill="none" style={{ width: "18vw", height: "18vw" }}>
            <path d="M60 100 L60 44" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 60 C44 60 28 50 28 34 C44 30 62 42 60 60" fill="#4ade80" opacity="0.9" />
            <path d="M60 76 C76 76 92 66 92 50 C76 46 58 58 60 76" fill="#22c55e" opacity="0.8" />
            <path d="M34 104 L86 104" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p className="font-display font-extrabold text-white mt-[2vh]" style={{ fontSize: "5vw" }}>Mana Rythu</p>
          <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.6)" }}>Farm. Direct. Digital.</p>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[6vw]" style={{ width: "50vw" }}>
        <h2 className="font-display font-extrabold" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1.1 }}>
          Built. Live. Ready.
        </h2>
        <p className="font-display font-normal mt-[2.5vh]" style={{ fontSize: "2vw", color: "#6b7280", lineHeight: 1.5 }}>
          Try the live platform today.
        </p>

        <div className="mt-[5vh] space-y-[2vh]">
          <div className="rounded-xl px-[2.5vw] py-[1.8vh]" style={{ background: "#052e16" }}>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em" }}>Live App</p>
            <a href="https://mana-rythu.replit.app" target="_blank" rel="noopener noreferrer" className="font-display font-bold text-white" style={{ fontSize: "1.9vw", textDecoration: "underline" }}>mana-rythu.replit.app</a>
          </div>
          <div className="rounded-xl px-[2.5vw] py-[1.8vh]" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.1em" }}>Source Code</p>
            <a href="https://github.com/rachanareddy-data/mana-rythu" target="_blank" rel="noopener noreferrer" className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#052e16", textDecoration: "underline" }}>github.com/rachanareddy-data</a>
          </div>
        </div>

        <div className="mt-[4vh] pt-[3vh]" style={{ borderTop: "1px solid #e5e7eb" }}>
          <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>Rachana Reddy</p>
          <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.5vw", color: "#9ca3af" }}>M.S. Data Science · Saint Peter's University</p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>12</span>
      </div>
    </div>
  );
}
