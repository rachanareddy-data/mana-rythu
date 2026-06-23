const BASE = import.meta.env.BASE_URL;

export default function SlideLiveProduct() {
  const screens = [
    {
      label: "Marketplace",
      badgeColor: "#16a34a",
      emoji: "🏪",
      screenshot: `${BASE}screenshots/marketplace.jpg`,
      bullets: ["Verified listings · direct purchase", "Real-time APMC price benchmarks"],
    },
    {
      label: "Farmer Dashboard",
      badgeColor: "#16a34a",
      emoji: "🌾",
      screenshot: `${BASE}screenshots/farmer-dashboard2.jpg`,
      bullets: ["Post crops · track orders · est. value", "One-tap listing to live market"],
    },
    {
      label: "AI Pest Detection",
      badgeColor: "#7c3aed",
      emoji: "🤖",
      screenshot: `${BASE}screenshots/pest-detection.jpg`,
      bullets: ["Upload leaf photo → AI diagnoses in Telugu", "Treatment plan delivered instantly"],
    },
    {
      label: "AI Price Intelligence",
      badgeColor: "#0891b2",
      emoji: "₹",
      screenshot: `${BASE}screenshots/fair-price.jpg`,
      bullets: ["Live APMC benchmarks · Grade A/B/C pricing", "Farmers know fair value before listing"],
    },
    {
      label: "Real-Time Chat",
      badgeColor: "#d97706",
      emoji: "💬",
      screenshot: `${BASE}screenshots/chat-ui.jpg`,
      bullets: ["Farmer ↔ buyer direct messaging", "GPT-4o negotiation assist in Telugu"],
    },
    {
      label: "Logistics Estimator",
      badgeColor: "#b45309",
      emoji: "🚚",
      screenshot: `${BASE}screenshots/logistics.jpg`,
      bullets: ["Origin → destination transport cost", "Covers all Telangana & AP routes"],
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-start px-[4.5vw] pt-[2.8vh] pb-[2vh]">

        {/* Header — compact */}
        <div className="text-center mb-[2vh] flex-shrink-0">
          <div className="inline-flex items-center gap-[0.6vw] mb-[0.9vh] px-[1.2vw] py-[0.55vh] rounded-full" style={{ background: "rgba(74,222,128,0.15)", border: "1.5px solid rgba(74,222,128,0.4)" }}>
            <div className="rounded-full animate-pulse" style={{ width: "0.55vw", height: "0.55vw", background: "#4ade80" }} />
            <p className="font-display font-extrabold" style={{ fontSize: "0.9vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.18em" }}>Live Product — Built &amp; Running</p>
          </div>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "2.9vw", lineHeight: 1 }}>
            Built. Shipped. Working today.
          </h2>
        </div>

        {/* 3×2 Screenshot-first Grid */}
        <div className="grid grid-cols-3 gap-[1.2vw] w-full flex-1 min-h-0" style={{ maxWidth: "91vw" }}>
          {screens.map(({ label, badgeColor, emoji, screenshot, bullets }) => (
            <div key={label} className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>

              {/* Card header — tight */}
              <div className="flex items-center justify-between px-[1vw] py-[0.7vh] flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-[0.45vw]">
                  <span style={{ fontSize: "1.15vw" }}>{emoji}</span>
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.2vw" }}>{label}</p>
                </div>
                <span className="font-display font-bold px-[0.6vw] py-[0.15vh] rounded-full" style={{ fontSize: "0.72vw", background: `${badgeColor}28`, color: badgeColor, border: `1px solid ${badgeColor}55` }}>Live ●</span>
              </div>

              {/* Screenshot — dominant */}
              <div className="mx-[0.7vw] mt-[0.7vh] rounded-xl overflow-hidden flex-shrink-0" style={{ height: "19.5vh", border: "1px solid rgba(255,255,255,0.12)" }}>
                <img
                  src={screenshot}
                  alt={`${label} screenshot`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>

              {/* 2 bullets — concise */}
              <div className="px-[1vw] py-[0.85vh] flex flex-col gap-[0.45vh] flex-shrink-0">
                {bullets.map((b) => (
                  <div key={b} className="flex items-start gap-[0.5vw]">
                    <div className="rounded-full mt-[0.55vh] flex-shrink-0" style={{ width: "0.45vw", height: "0.45vw", background: "#4ade80" }} />
                    <p className="font-display font-normal" style={{ fontSize: "0.98vw", color: "rgba(255,255,255,0.72)", lineHeight: 1.3 }}>{b}</p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Footer — inline, minimal */}
        <div className="mt-[1.5vh] flex-shrink-0">
          <p className="font-display font-bold text-center" style={{ fontSize: "1.15vw", color: "#4ade80" }}>
            Every module above is implemented and functional. No mockups. No promises.
          </p>
        </div>

      </div>

      <div className="absolute bottom-[2.5vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>07</span>
      </div>
    </div>
  );
}
