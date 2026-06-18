export default function SlideLiveProduct() {
  const screens = [
    {
      label: "Marketplace",
      badgeColor: "#16a34a",
      emoji: "🏪",
      bullets: ["Verified crop listings · buyer discovery", "Direct purchase — zero broker, zero commission"],
    },
    {
      label: "Farmer Dashboard",
      badgeColor: "#16a34a",
      emoji: "🌾",
      bullets: ["Post crop · track orders · view offers", "Full visibility from listing to payment"],
    },
    {
      label: "AI Pest Detection",
      badgeColor: "#7c3aed",
      emoji: "🤖",
      bullets: ["Upload leaf photo → AI diagnoses disease", "Treatment plan returned in Telugu instantly"],
    },
    {
      label: "AI Price Intelligence",
      badgeColor: "#0891b2",
      emoji: "₹",
      bullets: ["Pulls live APMC mandi benchmarks", "AI recommends fair asking price by grade"],
    },
    {
      label: "Real-Time Chat",
      badgeColor: "#d97706",
      emoji: "💬",
      bullets: ["Farmer-to-buyer negotiation, no middleman", "GPT-4o assistant responds in Telugu or English"],
    },
    {
      label: "Logistics Estimator",
      badgeColor: "#b45309",
      emoji: "🚚",
      bullets: ["Enter pickup & delivery → get distance + cost", "Covers all Telangana & AP districts"],
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 25%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[5.5vw] py-[4vh]">

        <div className="text-center mb-[3vh]">
          <div className="inline-flex items-center gap-[0.7vw] mb-[1.2vh] px-[1.4vw] py-[0.7vh] rounded-full" style={{ background: "rgba(74,222,128,0.15)", border: "1.5px solid rgba(74,222,128,0.4)" }}>
            <div className="rounded-full" style={{ width: "0.6vw", height: "0.6vw", background: "#4ade80" }} />
            <p className="font-display font-extrabold" style={{ fontSize: "1.05vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.18em" }}>Live Product (Implemented)</p>
          </div>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw", lineHeight: 1 }}>
            Built. Shipped. Working today.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[1.6vw] w-full" style={{ maxWidth: "89vw" }}>
          {screens.map(({ label, badgeColor, emoji, bullets }) => (
            <div key={label} className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
              {/* Card header */}
              <div className="flex items-center justify-between px-[1.4vw] py-[1vh]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-[0.6vw]">
                  <span style={{ fontSize: "1.4vw" }}>{emoji}</span>
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.45vw" }}>{label}</p>
                </div>
                <span className="font-display font-bold px-[0.7vw] py-[0.2vh] rounded-full" style={{ fontSize: "0.85vw", background: `${badgeColor}28`, color: badgeColor, border: `1px solid ${badgeColor}55` }}>Live</span>
              </div>

              {/* Screenshot placeholder */}
              <div className="mx-[1.2vw] mt-[1.2vh] rounded-xl flex flex-col items-center justify-center gap-[0.5vh]" style={{ height: "10vh", border: "1.5px dashed rgba(74,222,128,0.25)", background: "rgba(0,0,0,0.2)" }}>
                <p style={{ fontSize: "1.8vw", lineHeight: 1 }}>📸</p>
                <p className="font-display font-semibold" style={{ fontSize: "0.95vw", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label} UI</p>
              </div>

              {/* Bullets */}
              <div className="flex flex-col gap-[0.7vh] px-[1.4vw] py-[1.2vh]">
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-[0.6vw]">
                    <div className="rounded-full flex-shrink-0 mt-[0.5vh]" style={{ width: "0.5vw", height: "0.5vw", background: "#4ade80" }} />
                    <p className="font-display font-normal" style={{ fontSize: "1.15vw", color: "rgba(255,255,255,0.72)", lineHeight: 1.35 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[2.2vh] px-[4vw] py-[1.3vh] rounded-xl" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.4vw", color: "#4ade80" }}>
            Every feature above is implemented and functional. No mockups. No promises.
          </p>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>07</span>
      </div>
    </div>
  );
}
