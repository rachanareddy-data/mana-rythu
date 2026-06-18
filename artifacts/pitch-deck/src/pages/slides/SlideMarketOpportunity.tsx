export default function SlideMarketOpportunity() {
  const stats = [
    {
      figure: "140M+",
      label: "Farm Holdings",
      context: "India's agricultural land holdings — the world's second largest farming population.",
      source: "NSSO Agricultural Census",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
    },
    {
      figure: "₹30T+",
      label: "Agri Supply Chain",
      context: "India's agricultural GDP — yet most value is lost to intermediaries before reaching farmers.",
      source: "Ministry of Agriculture",
      color: "#0891b2",
      bg: "#eff6ff",
      border: "#bfdbfe",
    },
    {
      figure: "350M+",
      label: "Rural Internet Users",
      context: "India's rural population is now online. The infrastructure for digital agri marketplaces is ready.",
      source: "TRAI 2024",
      color: "#7c3aed",
      bg: "#f5f3ff",
      border: "#ddd6fe",
    },
  ];

  return (
    <div
      className="w-screen h-screen overflow-hidden relative font-display"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #eff6ff 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(22,163,74,0.08) 0%, transparent 55%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.2em" }}>Market Opportunity</p>
        <h2 className="font-display font-extrabold text-center mb-[1.5vh]" style={{ fontSize: "4.2vw", color: "#052e16", lineHeight: 1 }}>
          The problem is massive.<br />
          <span style={{ color: "#16a34a" }}>So is the opportunity.</span>
        </h2>
        <p className="font-display font-normal text-center mb-[5vh]" style={{ fontSize: "1.6vw", color: "#6b7280", maxWidth: "55vw" }}>
          Indian agriculture is the world's second-largest employer — yet it remains largely undigitised.
        </p>

        <div className="flex gap-[2.5vw] w-full">
          {stats.map(({ figure, label, context, source, color, bg, border }) => (
            <div
              key={label}
              className="flex-1 rounded-2xl px-[2.5vw] py-[3.5vh] flex flex-col"
              style={{ background: bg, border: `1.5px solid ${border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}
            >
              <p className="font-display font-extrabold" style={{ fontSize: "5.5vw", color, lineHeight: 1 }}>{figure}</p>
              <p className="font-display font-bold mt-[0.5vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>{label}</p>
              <p className="font-display font-normal mt-[1.5vh] flex-1" style={{ fontSize: "1.4vw", color: "#4b5563", lineHeight: 1.4 }}>{context}</p>
              <p className="font-display font-semibold mt-[2vh]" style={{ fontSize: "1.1vw", color, opacity: 0.7 }}>Source: {source}</p>
            </div>
          ))}
        </div>

        {/* Bottom insight */}
        <div
          className="mt-[3.5vh] w-full rounded-2xl px-[3vw] py-[2vh] flex items-center gap-[2vw]"
          style={{ background: "#052e16", border: "2px solid #16a34a" }}
        >
          <svg viewBox="0 0 40 40" fill="none" style={{ width: "3.5vw", height: "3.5vw", flexShrink: 0 }}>
            <circle cx="20" cy="20" r="18" fill="#16a34a" opacity="0.2" />
            <polyline points="8,22 14,16 20,20 26,14 32,18" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#4ade80" }}>
            Telangana &amp; Andhra Pradesh alone produce ₹2T+ in agricultural output annually —
            <span className="text-white"> Mana Rythu starts here, then scales across India.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>10</span>
      </div>
    </div>
  );
}
