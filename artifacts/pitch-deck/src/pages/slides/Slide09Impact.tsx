export default function Slide09Impact() {
  const cards = [
    {
      icon: (
        <svg viewBox="0 0 80 80" fill="none" style={{ width: "7vw", height: "7vw" }}>
          <text x="40" y="54" textAnchor="middle" fontSize="42" fontWeight="bold" fill="#4ade80">₹</text>
          <path d="M18 60 L28 44 L36 52 L48 36 L62 46" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      headline: "Higher Farmer Income",
      body: "Farmers keep the full market price. No commission, no deductions, no middlemen taking a cut.",
      accent: "#22c55e",
    },
    {
      icon: (
        <svg viewBox="0 0 80 80" fill="none" style={{ width: "7vw", height: "7vw" }}>
          <circle cx="40" cy="40" r="28" stroke="#f87171" strokeWidth="3" fill="none" />
          <line x1="18" y1="18" x2="62" y2="62" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
          {/* Middleman icon inside */}
          <circle cx="40" cy="34" r="7" stroke="#f87171" strokeWidth="2" fill="none" />
          <path d="M28 54 C28 46 52 46 52 54" stroke="#f87171" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      ),
      headline: "Zero Middlemen Dependency",
      body: "Every rupee saved by cutting the chain goes directly back to the farmer who grew the food.",
      accent: "#f87171",
    },
    {
      icon: (
        <svg viewBox="0 0 80 80" fill="none" style={{ width: "7vw", height: "7vw" }}>
          <circle cx="40" cy="40" r="28" stroke="#60a5fa" strokeWidth="3" fill="none" />
          <line x1="40" y1="20" x2="40" y2="42" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="42" x2="54" y2="54" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      headline: "Faster Trade Execution",
      body: "Live listings, real-time chat, and instant negotiation. A deal that took days now closes in hours.",
      accent: "#60a5fa",
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.10) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Impact</p>
        <h2 className="font-display font-extrabold text-white text-center mb-[6vh]" style={{ fontSize: "4.5vw", lineHeight: 1 }}>
          Real change for real farmers
        </h2>

        <div className="flex gap-[2.5vw] w-full">
          {cards.map(({ icon, headline, body, accent }) => (
            <div
              key={headline}
              className="flex-1 rounded-3xl flex flex-col items-center text-center py-[5vh] px-[2.5vw]"
              style={{ background: "rgba(255,255,255,0.07)", border: `2px solid ${accent}22` }}
            >
              <div
                className="rounded-2xl flex items-center justify-center mb-[3vh]"
                style={{ width: "11vw", height: "11vw", background: `${accent}18`, border: `1.5px solid ${accent}40` }}
              >
                {icon}
              </div>
              <p className="font-display font-extrabold text-white mb-[1.5vh]" style={{ fontSize: "2.4vw", lineHeight: 1.15 }}>{headline}</p>
              <p className="font-display font-normal" style={{ fontSize: "1.45vw", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>08</span>
      </div>
    </div>
  );
}
