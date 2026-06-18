export default function Slide06Features() {
  const features = [
    {
      emoji: "🌾",
      title: "Direct Marketplace",
      lines: ["Verified farmer listings", "Buyer discovery & trust scores", "Real-time crop availability"],
      color: "#052e16",
    },
    {
      emoji: "🤖",
      title: "AI Crop Intelligence",
      lines: ["Pest & disease detection", "Crop health analysis", "Smart farming recommendations"],
      color: "#7c3aed",
    },
    {
      emoji: "💬",
      title: "Real-Time Chat",
      lines: ["Farmer-to-buyer direct messaging", "GPT-4o negotiation support", "Telugu + English, no translation needed"],
      color: "#0891b2",
    },
    {
      emoji: "₹",
      title: "AI Price Intelligence",
      lines: ["Live APMC mandi benchmarks", "AI-recommended fair price", "Grade-based pricing (A / B / C)"],
      color: "#15803d",
    },
    {
      emoji: "🚚",
      title: "Logistics Estimator",
      lines: ["Transport cost calculation", "Distance-based pricing", "Telangana & AP route coverage"],
      color: "#b45309",
    },
    {
      emoji: "🛡",
      title: "Trust System + UPI Escrow",
      lines: ["Gold / Silver / Bronze reputation tiers", "Escrow-protected UPI payments", "Released on delivery confirmation"],
      color: "#dc2626",
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw] py-[6vh]">

        <div className="text-center mb-[4vh]">
          <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.2vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Core Capabilities</p>
          <h2 className="font-display font-extrabold" style={{ fontSize: "3.8vw", color: "#052e16", lineHeight: 1 }}>
            Six capabilities. One platform.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[2vw] w-full" style={{ maxWidth: "88vw" }}>
          {features.map(({ emoji, title, lines, color }) => (
            <div key={title} className="rounded-2xl p-[2.2vw] flex flex-col" style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb" }}>
              <div className="flex items-center gap-[1vw] mb-[1.5vh]">
                <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "4.5vw", height: "4.5vw", background: color }}>
                  <span style={{ fontSize: "2.2vw", lineHeight: 1 }}>{emoji}</span>
                </div>
                <p className="font-display font-extrabold" style={{ fontSize: "1.7vw", color: "#052e16", lineHeight: 1.15 }}>{title}</p>
              </div>
              <div className="flex flex-col gap-[0.6vh]">
                {lines.map((line) => (
                  <div key={line} className="flex items-start gap-[0.6vw]">
                    <div className="rounded-full mt-[0.6vh] flex-shrink-0" style={{ width: "0.55vw", height: "0.55vw", background: "#22c55e" }} />
                    <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#374151", lineHeight: 1.4 }}>{line}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>07</span>
      </div>
    </div>
  );
}
