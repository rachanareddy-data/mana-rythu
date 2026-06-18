export default function SlideWhyWins() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-[6vw] pr-[4vw]" style={{ width: "52vw" }}>
        <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.2vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why We Win</p>
        <h2 className="font-display font-extrabold mb-[4.5vh]" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1 }}>
          Four moats.<br />Hard to replicate.
        </h2>

        <div className="flex flex-col gap-[2.8vh]">

          <div className="flex items-start gap-[2vw]">
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4.5vw", height: "4.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.8vw", height: "2.8vw" }}>
                <circle cx="20" cy="20" r="12" stroke="#4ade80" strokeWidth="2" fill="none" />
                <path d="M20 8 C14 12 14 28 20 32" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M20 8 C26 12 26 28 20 32" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                <line x1="8" y1="20" x2="32" y2="20" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16", lineHeight: 1 }}>Language moat</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.35 }}>Telugu-first AI. Competitors are English-only — unreachable for most farmers.</p>
            </div>
          </div>

          <div className="flex items-start gap-[2vw]">
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4.5vw", height: "4.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.8vw", height: "2.8vw" }}>
                <path d="M10 28 L16 18 L22 22 L28 12 L34 8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="16" cy="18" r="2.5" fill="#4ade80" />
                <circle cx="22" cy="22" r="2.5" fill="#4ade80" />
                <circle cx="28" cy="12" r="2.5" fill="#4ade80" />
              </svg>
            </div>
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16", lineHeight: 1 }}>Data flywheel</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.35 }}>Every transaction refines pricing models. The platform gets smarter — and harder to compete with — as it grows.</p>
            </div>
          </div>

          <div className="flex items-start gap-[2vw]">
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4.5vw", height: "4.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.8vw", height: "2.8vw" }}>
                <circle cx="12" cy="14" r="4" stroke="#4ade80" strokeWidth="2" fill="none" />
                <circle cx="28" cy="14" r="4" stroke="#4ade80" strokeWidth="2" fill="none" />
                <circle cx="20" cy="26" r="4" stroke="#4ade80" strokeWidth="2" fill="none" />
                <line x1="14" y1="16" x2="26" y2="16" stroke="#4ade80" strokeWidth="1.5" />
                <line x1="13" y1="17" x2="19" y2="24" stroke="#4ade80" strokeWidth="1.5" />
                <line x1="27" y1="17" x2="21" y2="24" stroke="#4ade80" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16", lineHeight: 1 }}>Network effect</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.35 }}>More farmers attract more buyers; more buyers attract more farmers. Bilateral marketplace lock-in.</p>
            </div>
          </div>

          <div className="flex items-start gap-[2vw]">
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4.5vw", height: "4.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.8vw", height: "2.8vw" }}>
                <path d="M20 6 L8 13 L8 27 L20 34 L32 27 L32 13 Z" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <path d="M8 13 L20 20 L32 13" stroke="#4ade80" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <line x1="20" y1="20" x2="20" y2="34" stroke="#4ade80" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16", lineHeight: 1 }}>Integration depth</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.35 }}>APMC data + UPI escrow + AI chat in one platform. Not a single feature — a system.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-[6vw] pl-[3vw]" style={{ width: "48vw" }}>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
          <div className="px-[2vw] py-[1.5vh]" style={{ background: "#052e16" }}>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.5vw" }}>Competitive Landscape</p>
          </div>
          <div>
            <div className="flex px-[2vw] py-[1.2vh]" style={{ borderBottom: "1px solid #e5e7eb", background: "#f0fdf4" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.3vw", color: "#052e16", flex: 2 }}>Platform</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.3vw", color: "#052e16", flex: 1 }}>Telugu AI</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.3vw", color: "#052e16", flex: 1 }}>Direct P2P</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.3vw", color: "#052e16", flex: 1 }}>Live Prices</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.3vw", color: "#052e16", flex: 1 }}>UPI Escrow</p>
            </div>
            <div className="flex px-[2vw] py-[1.8vh]" style={{ borderBottom: "1px solid #e5e7eb", background: "#dcfce7" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.3vw", color: "#15803d", flex: 2 }}>Mana Rythu</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#16a34a", flex: 1 }}>✓</p>
            </div>
            <div className="flex px-[2vw] py-[1.8vh]" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#374151", flex: 2 }}>eNAM</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
            </div>
            <div className="flex px-[2vw] py-[1.8vh]" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#374151", flex: 2 }}>DeHaat</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
            </div>
            <div className="flex px-[2vw] py-[1.8vh]">
              <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#374151", flex: 2 }}>Agri10x</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.8vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.8vw", color: "#d1d5db", flex: 1 }}>—</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl px-[2vw] py-[1.5vh] mt-[2.5vh]" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
          <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#15803d", lineHeight: 1.4 }}>
            No competitor combines all four. Mana Rythu is the only full-stack solution built for this market.
          </p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>10</span>
      </div>
    </div>
  );
}
