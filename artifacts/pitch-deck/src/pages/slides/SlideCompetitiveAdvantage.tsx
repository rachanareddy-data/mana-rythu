export default function SlideCompetitiveAdvantage() {
  const features = [
    "Direct Marketplace",
    "AI Pest Detection",
    "AI Fair Pricing",
    "Multilingual AI (TE/HI/EN)",
    "Real-Time Chat",
  ];

  const competitors = [
    { name: "Middlemen", sub: "Traditional", checks: [false, false, false, false, false], color: "#dc2626", bg: "#fef2f2" },
    { name: "Generic\nMarketplaces", sub: "OLX / IndiaMART", checks: [true, false, false, false, false], color: "#d97706", bg: "#fffbeb" },
    { name: "Agri Platforms", sub: "DeHaat / AgriBazaar", checks: [true, false, true, false, false], color: "#0891b2", bg: "#eff6ff" },
    { name: "Mana Rythu", sub: "Our platform ✓", checks: [true, true, true, true, true], color: "#16a34a", bg: "#f0fdf4", highlight: true },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[5vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.2em" }}>Competitive Advantage</p>
        <h2 className="font-display font-extrabold text-center mb-[4vh]" style={{ fontSize: "4vw", color: "#14532d", lineHeight: 1 }}>
          No one does all five
        </h2>

        <div className="w-full flex gap-[1.5vw]">

          {/* Feature labels column */}
          <div className="flex flex-col justify-end" style={{ width: "18vw", paddingBottom: "0" }}>
            <div style={{ height: "10vh" }} />
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center px-[1.2vw]"
                style={{ height: "7.2vh", borderBottom: "1px solid #f3f4f6" }}
              >
                <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#374151", lineHeight: 1.3 }}>{f}</p>
              </div>
            ))}
          </div>

          {/* Competitor columns */}
          {competitors.map(({ name, sub, checks, color, bg, highlight }) => (
            <div
              key={name}
              className="flex-1 rounded-2xl overflow-hidden flex flex-col"
              style={{
                border: highlight ? `2px solid ${color}` : "1.5px solid #f3f4f6",
                boxShadow: highlight ? "0 12px 32px rgba(22,163,74,0.18)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Header */}
              <div
                className="flex flex-col items-center justify-center py-[2vh] px-[1vw]"
                style={{ background: highlight ? color : bg, height: "10vh" }}
              >
                <p
                  className="font-display font-extrabold text-center"
                  style={{ fontSize: "1.6vw", color: highlight ? "white" : color, lineHeight: 1.2, whiteSpace: "pre-line" }}
                >
                  {name}
                </p>
                <p
                  className="font-display font-normal text-center mt-[0.3vh]"
                  style={{ fontSize: "1.1vw", color: highlight ? "rgba(255,255,255,0.8)" : "#9ca3af" }}
                >
                  {sub}
                </p>
              </div>

              {/* Check rows */}
              {checks.map((has, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{ height: "7.2vh", borderBottom: "1px solid #f3f4f6", background: has && highlight ? "rgba(22,163,74,0.04)" : "white" }}
                >
                  {has ? (
                    <div className="rounded-full flex items-center justify-center" style={{ width: "2.2vw", height: "2.2vw", background: color }}>
                      <svg viewBox="0 0 20 20" fill="none" style={{ width: "1.3vw", height: "1.3vw" }}>
                        <polyline points="4,10 8,14 16,6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                  ) : (
                    <div className="rounded-full flex items-center justify-center" style={{ width: "2.2vw", height: "2.2vw", background: "#f3f4f6" }}>
                      <svg viewBox="0 0 20 20" fill="none" style={{ width: "1.1vw", height: "1.1vw" }}>
                        <line x1="5" y1="5" x2="15" y2="15" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="15" y1="5" x2="5" y2="15" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>11</span>
      </div>
    </div>
  );
}
