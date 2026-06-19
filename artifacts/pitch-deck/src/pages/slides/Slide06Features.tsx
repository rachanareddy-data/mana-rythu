export default function Slide06Features() {
  const features = [
    {
      emoji: "🌾",
      title: "Direct Marketplace",
      bullets: ["Verified farmer listings · buyer discovery", "Zero commission — price agreed farm to buyer"],
      color: "#052e16",
      accent: "#22c55e",
    },
    {
      emoji: "🤖",
      title: "AI Crop Intelligence",
      bullets: ["Pest & disease detection from leaf photo", "Diagnosis in Telugu — no literacy barrier"],
      color: "#7c3aed",
      accent: "#a78bfa",
    },
    {
      emoji: "💬",
      title: "Real-Time Chat",
      bullets: ["Farmer-to-buyer direct negotiation", "GPT-4o assist in Telugu & English"],
      color: "#0891b2",
      accent: "#38bdf8",
    },
    {
      emoji: "₹",
      title: "AI Price Intelligence",
      bullets: ["Live APMC mandi benchmark pricing", "Grade A / B / C — farmers know fair value"],
      color: "#15803d",
      accent: "#4ade80",
    },
    {
      emoji: "🚚",
      title: "Logistics Estimator",
      bullets: ["Farm-to-market transport cost calculator", "Full Telangana & AP route coverage"],
      color: "#b45309",
      accent: "#fbbf24",
    },
    {
      emoji: "🛡",
      title: "Trust + UPI Escrow",
      bullets: ["Gold / Silver / Bronze reputation tiers", "Escrow-protected UPI — released on delivery"],
      color: "#dc2626",
      accent: "#f87171",
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[5.5vw] py-[4.5vh]">

        <div className="text-center mb-[3.5vh]">
          <p className="font-display font-semibold mb-[0.8vh]" style={{ fontSize: "1.1vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Core Capabilities</p>
          <h2 className="font-display font-extrabold" style={{ fontSize: "3.6vw", color: "#052e16", lineHeight: 1 }}>
            Six capabilities. One platform.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[1.8vw] w-full" style={{ maxWidth: "89vw" }}>
          {features.map(({ emoji, title, bullets, color, accent }) => (
            <div key={title} className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#f8fafc", border: `1.5px solid #e5e7eb` }}>
              {/* Coloured top bar */}
              <div className="h-[0.5vh]" style={{ background: accent }} />
              <div className="px-[2vw] pt-[2vh] pb-[2.2vh] flex flex-col gap-[1.5vh]">
                {/* Icon + title */}
                <div className="flex items-center gap-[1vw]">
                  <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4.2vw", height: "4.2vw", background: color }}>
                    <span style={{ fontSize: "2.1vw", lineHeight: 1 }}>{emoji}</span>
                  </div>
                  <p className="font-display font-extrabold" style={{ fontSize: "1.65vw", color: "#052e16", lineHeight: 1.15 }}>{title}</p>
                </div>
                {/* 2 bullets */}
                <div className="flex flex-col gap-[0.7vh]">
                  {bullets.map((b) => (
                    <div key={b} className="flex items-start gap-[0.6vw]">
                      <div className="rounded-full mt-[0.65vh] flex-shrink-0" style={{ width: "0.5vw", height: "0.5vw", background: accent }} />
                      <p className="font-display font-normal" style={{ fontSize: "1.25vw", color: "#374151", lineHeight: 1.4 }}>{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>06</span>
      </div>
    </div>
  );
}
