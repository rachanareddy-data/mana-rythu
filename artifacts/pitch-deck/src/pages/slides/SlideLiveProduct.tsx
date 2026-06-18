export default function SlideLiveProduct() {
  const screens = [
    {
      label: "Farmer Dashboard",
      badge: "Live",
      badgeColor: "#16a34a",
      action: "What a farmer does",
      steps: ["Post crop with photo, quantity & price", "Track buyer interest and incoming offers", "Confirm deal and release UPI escrow"],
    },
    {
      label: "Marketplace",
      badge: "Live",
      badgeColor: "#16a34a",
      action: "What a buyer does",
      steps: ["Search verified listings by crop & location", "Compare prices against live APMC benchmarks", "Message farmer directly — no broker involved"],
    },
    {
      label: "AI Pest Detection",
      badge: "Live",
      badgeColor: "#7c3aed",
      action: "What the AI does",
      steps: ["Farmer uploads photo of affected crop", "GPT-4o identifies disease and severity", "Receives treatment plan in Telugu, instantly"],
    },
    {
      label: "AI Fair Price",
      badge: "Live",
      badgeColor: "#0891b2",
      action: "What the AI does",
      steps: ["Farmer enters crop type and grade", "Platform pulls current APMC mandi average", "AI recommends a fair asking price with reasoning"],
    },
    {
      label: "Real-Time Chat",
      badge: "Live",
      badgeColor: "#d97706",
      action: "How deals get done",
      steps: ["Buyer and farmer chat directly on platform", "AI assistant answers questions in Telugu or English", "Both parties agree price and quantity — in writing"],
    },
    {
      label: "Logistics Estimator",
      badge: "Live",
      badgeColor: "#b45309",
      action: "Before every deal",
      steps: ["Enter pickup village and delivery destination", "Platform calculates road distance (TS & AP routes)", "Estimated transport cost shown before deal is confirmed"],
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw] py-[5vh]">

        <div className="text-center mb-[3.5vh]">
          <div className="inline-flex items-center gap-[0.8vw] mb-[1.5vh] px-[1.5vw] py-[0.8vh] rounded-full" style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.35)" }}>
            <div className="rounded-full animate-pulse" style={{ width: "0.65vw", height: "0.65vw", background: "#4ade80" }} />
            <p className="font-display font-bold" style={{ fontSize: "1.05vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.15em" }}>All six workflows are live and working today</p>
          </div>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "3.8vw", lineHeight: 1 }}>
            Live Product — Built and Running
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[1.6vw] w-full" style={{ maxWidth: "88vw" }}>
          {screens.map(({ label, badge, badgeColor, action, steps }) => (
            <div key={label} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center justify-between px-[1.4vw] py-[1vh]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.45vw" }}>{label}</p>
                <span className="font-display font-bold px-[0.7vw] py-[0.25vh] rounded-full" style={{ fontSize: "0.9vw", background: `${badgeColor}28`, color: badgeColor, border: `1px solid ${badgeColor}55` }}>{badge}</span>
              </div>
              <div className="px-[1.4vw] py-[1.2vh]">
                <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.05vw", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{action}</p>
                <div className="flex flex-col gap-[0.8vh]">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-[0.8vw]">
                      <div className="rounded-full flex items-center justify-center flex-shrink-0 mt-[0.3vh]" style={{ width: "1.5vw", height: "1.5vw", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}>
                        <p className="font-display font-bold" style={{ fontSize: "0.85vw", color: "#4ade80" }}>{i + 1}</p>
                      </div>
                      <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[2.5vh] px-[4vw] py-[1.5vh] rounded-2xl" style={{ background: "rgba(74,222,128,0.1)", border: "1.5px solid rgba(74,222,128,0.25)" }}>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.5vw", color: "#4ade80" }}>
            Every workflow above is implemented and functional. No mockups. No promises.
          </p>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>06</span>
      </div>
    </div>
  );
}
