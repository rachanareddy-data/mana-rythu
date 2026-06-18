export default function SlideWhyWins() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.8vh]" style={{ background: "linear-gradient(90deg, #15803d 0%, #22c55e 100%)" }} />

      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-[7vw] pr-[5vw]" style={{ width: "50vw" }}>
        <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Why Mana Rythu Wins</p>
        <h2 className="font-display font-extrabold" style={{ fontSize: "4.5vw", color: "#052e16", lineHeight: 1.05 }}>
          Built from the inside out
        </h2>
        <p className="font-display font-normal mt-[2.5vh]" style={{ fontSize: "1.6vw", color: "#6b7280", lineHeight: 1.5 }}>
          This platform was designed knowing Telangana's farmers — their language, their pain, their phone. That focus is the moat.
        </p>

        <div className="mt-[4vh] flex flex-col gap-[2vh]">
          <div className="flex items-center gap-[1.5vw]">
            <div className="rounded-full flex-shrink-0" style={{ width: "2.2vw", height: "2.2vw", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: "1.3vw", height: "1.3vw" }}>
                <polyline points="4,10 8,14 16,6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>Telugu-first AI experience</p>
          </div>
          <div className="flex items-center gap-[1.5vw]">
            <div className="rounded-full flex-shrink-0" style={{ width: "2.2vw", height: "2.2vw", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: "1.3vw", height: "1.3vw" }}>
                <polyline points="4,10 8,14 16,6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>Farmer-first product design</p>
          </div>
          <div className="flex items-center gap-[1.5vw]">
            <div className="rounded-full flex-shrink-0" style={{ width: "2.2vw", height: "2.2vw", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: "1.3vw", height: "1.3vw" }}>
                <polyline points="4,10 8,14 16,6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>Live market price transparency</p>
          </div>
          <div className="flex items-center gap-[1.5vw]">
            <div className="rounded-full flex-shrink-0" style={{ width: "2.2vw", height: "2.2vw", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 20 20" fill="none" style={{ width: "1.3vw", height: "1.3vw" }}>
                <polyline points="4,10 8,14 16,6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>Full-stack: marketplace + chat + AI</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-[7vw] pl-[4vw]" style={{ width: "50vw" }}>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
          <div className="px-[2vw] py-[1.5vh]" style={{ background: "#052e16" }}>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.5vw" }}>Competitive Landscape</p>
          </div>
          <div style={{ background: "#f9fafb" }}>
            <div className="flex px-[2vw] py-[1.2vh]" style={{ borderBottom: "1px solid #e5e7eb", background: "#f0fdf4" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.35vw", color: "#052e16", flex: 2 }}>Platform</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.35vw", color: "#052e16", flex: 1 }}>Telugu AI</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.35vw", color: "#052e16", flex: 1 }}>Direct P2P</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.35vw", color: "#052e16", flex: 1 }}>Live Prices</p>
            </div>
            <div className="flex px-[2vw] py-[1.5vh]" style={{ borderBottom: "1px solid #e5e7eb", background: "#dcfce7" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.35vw", color: "#15803d", flex: 2 }}>Mana Rythu</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.6vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.6vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.6vw", color: "#16a34a", flex: 1 }}>✓</p>
            </div>
            <div className="flex px-[2vw] py-[1.5vh]" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#374151", flex: 2 }}>eNAM</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.6vw", color: "#16a34a", flex: 1 }}>✓</p>
            </div>
            <div className="flex px-[2vw] py-[1.5vh]" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#374151", flex: 2 }}>DeHaat</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
            </div>
            <div className="flex px-[2vw] py-[1.5vh]">
              <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#374151", flex: 2 }}>Agri10x</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
              <p className="font-display font-bold text-center" style={{ fontSize: "1.6vw", color: "#16a34a", flex: 1 }}>✓</p>
              <p className="font-display font-normal text-center" style={{ fontSize: "1.6vw", color: "#d1d5db", flex: 1 }}>—</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>10</span>
      </div>
    </div>
  );
}
