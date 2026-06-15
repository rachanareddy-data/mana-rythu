export default function Slide12Close() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      {/* Full green left block */}
      <div className="absolute left-0 top-0 bottom-0" style={{ width: "48vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full opacity-10" style={{ width: "28vw", height: "28vw", background: "#4ade80", top: "-5vw", left: "-5vw" }} />
        <div className="absolute rounded-full opacity-10" style={{ width: "18vw", height: "18vw", background: "#4ade80", bottom: "-3vw", right: "-3vw" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[4vw]">
          {/* Sprout icon */}
          <svg viewBox="0 0 120 120" fill="none" style={{ width: "14vw", height: "14vw" }}>
            <path d="M60 100 L60 44" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M60 62 C44 62 28 52 28 36 C44 32 63 44 60 62" fill="#4ade80" opacity="0.95" />
            <path d="M60 78 C76 78 92 68 92 52 C76 48 57 60 60 78" fill="#22c55e" opacity="0.85" />
            <line x1="32" y1="104" x2="88" y2="104" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
          </svg>

          <p className="font-display font-extrabold text-white text-center mt-[2.5vh]" style={{ fontSize: "5.5vw", lineHeight: 1 }}>Mana Rythu</p>
          <p className="font-display font-bold text-center mt-[1.5vh]" style={{ fontSize: "1.9vw", color: "#4ade80", letterSpacing: "0.05em" }}>Empowering Farmers Through Technology</p>
          <div className="mt-[2.5vh] w-[6vw] h-[0.4vh]" style={{ background: "rgba(74,222,128,0.4)" }} />
        </div>
      </div>
      {/* Right panel */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[5vw]" style={{ width: "52vw" }}>

        <h2 className="font-display font-extrabold" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1.1 }}>
          Built. Live. Ready.
        </h2>

        <div className="mt-[4vh] space-y-[2vh]">

          {/* Live app */}
          <div className="rounded-xl flex items-center gap-[1.5vw] px-[2.5vw] py-[1.8vh]" style={{ background: "#052e16" }}>
            <svg viewBox="0 0 28 28" fill="none" style={{ width: "2.2vw", height: "2.2vw", flexShrink: 0 }}>
              <circle cx="14" cy="14" r="12" stroke="#4ade80" strokeWidth="2.5" fill="none" />
              <path d="M7 14 C9 8 19 8 21 14 C19 20 9 20 7 14" stroke="#4ade80" strokeWidth="2" fill="none" />
              <line x1="14" y1="2" x2="14" y2="26" stroke="#4ade80" strokeWidth="2" />
            </svg>
            <div>
              <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em" }}>Live App</p>
              <a href="https://mana-rythu.replit.app" target="_blank" rel="noopener noreferrer" className="font-display font-bold text-white" style={{ fontSize: "1.9vw", textDecoration: "underline" }}>mana-rythu.replit.app</a>
            </div>
          </div>

          {/* GitHub */}
          <div className="rounded-xl flex items-center gap-[1.5vw] px-[2.5vw] py-[1.8vh]" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
            <svg viewBox="0 0 28 28" fill="none" style={{ width: "2.2vw", height: "2.2vw", flexShrink: 0 }}>
              <path d="M14 2C7.373 2 2 7.373 2 14c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604C7.945 18.945 5.222 17.95 5.222 13.4c0-1.302.465-2.368 1.235-3.203-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0114 7.594c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.835 1.235 1.9 1.235 3.203 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 23.797 24 19.3 24 14c0-6.627-5.373-12-10-12z" fill="#15803d" />
            </svg>
            <div>
              <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.1em" }}>Source Code</p>
              <a href="https://github.com/rachanareddy-data/mana-rythu" target="_blank" rel="noopener noreferrer" className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#052e16", textDecoration: "underline" }}>github.com/rachanareddy-data</a>
            </div>
          </div>

        </div>

        {/* Author */}
        <div className="mt-[4vh] pt-[3vh]" style={{ borderTop: "1px solid #e5e7eb" }}>
          <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16" }}>Rachana Baddam</p>
          <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.6vw", color: "#15803d" }}>M.S. Data Science</p>
          <p className="font-display font-normal mt-[0.3vh]" style={{ fontSize: "1.5vw", color: "#9ca3af" }}>Saint Peter's University</p>
        </div>

      </div>
      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>12</span>
      </div>
    </div>
  );
}
