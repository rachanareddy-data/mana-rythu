const BASE = import.meta.env.BASE_URL;

export default function SlideLiveProduct() {
  const screens = [
    {
      label: "Marketplace",
      badgeColor: "#16a34a",
      emoji: "🏪",
      screenshot: `${BASE}screenshots/marketplace.jpg`,
      caption: "Verified listings · direct purchase · zero commission",
    },
    {
      label: "Farmer Dashboard",
      badgeColor: "#16a34a",
      emoji: "🌾",
      screenshot: `${BASE}screenshots/farmer-dashboard2.jpg`,
      caption: "Post crop · track orders · est. value at a glance",
    },
    {
      label: "AI Pest Detection",
      badgeColor: "#7c3aed",
      emoji: "🤖",
      screenshot: `${BASE}screenshots/pest-detection.jpg`,
      caption: "Upload leaf photo → AI diagnoses pest in Telugu",
    },
    {
      label: "AI Price Intelligence",
      badgeColor: "#0891b2",
      emoji: "₹",
      screenshot: `${BASE}screenshots/fair-price.jpg`,
      caption: "Live APMC benchmarks · Grade A / B / C pricing",
    },
    {
      label: "Real-Time Chat",
      badgeColor: "#d97706",
      emoji: "💬",
      screenshot: `${BASE}screenshots/chat-ui.jpg`,
      caption: "Farmer ↔ buyer direct — GPT-4o assists in Telugu",
    },
    {
      label: "Logistics Estimator",
      badgeColor: "#b45309",
      emoji: "🚚",
      screenshot: `${BASE}screenshots/logistics.jpg`,
      caption: "Origin → destination route cost across TS & AP",
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 25%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[5vw] py-[3.5vh]">

        {/* Header */}
        <div className="text-center mb-[2.5vh]">
          <div className="inline-flex items-center gap-[0.7vw] mb-[1.2vh] px-[1.4vw] py-[0.7vh] rounded-full" style={{ background: "rgba(74,222,128,0.15)", border: "1.5px solid rgba(74,222,128,0.4)" }}>
            <div className="rounded-full animate-pulse" style={{ width: "0.6vw", height: "0.6vw", background: "#4ade80" }} />
            <p className="font-display font-extrabold" style={{ fontSize: "1vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.18em" }}>Live Product (Implemented &amp; Running)</p>
          </div>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "3.2vw", lineHeight: 1 }}>
            Built. Shipped. Working today.
          </h2>
        </div>

        {/* 3×2 Screenshot Grid */}
        <div className="grid grid-cols-3 gap-[1.4vw] w-full" style={{ maxWidth: "90vw" }}>
          {screens.map(({ label, badgeColor, emoji, screenshot, caption }) => (
            <div key={label} className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)" }}>

              {/* Card header */}
              <div className="flex items-center justify-between px-[1.2vw] py-[0.9vh]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-[0.5vw]">
                  <span style={{ fontSize: "1.3vw" }}>{emoji}</span>
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.35vw" }}>{label}</p>
                </div>
                <span className="font-display font-bold px-[0.7vw] py-[0.2vh] rounded-full" style={{ fontSize: "0.78vw", background: `${badgeColor}28`, color: badgeColor, border: `1px solid ${badgeColor}55` }}>Live</span>
              </div>

              {/* Real screenshot */}
              <div className="mx-[1vw] mt-[1vh] rounded-xl overflow-hidden flex-shrink-0" style={{ height: "13.5vh", border: "1px solid rgba(255,255,255,0.12)" }}>
                <img
                  src={screenshot}
                  alt={`${label} UI screenshot`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>

              {/* One-line caption */}
              <p className="font-display font-normal px-[1.2vw] py-[1vh]" style={{ fontSize: "1.05vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
                {caption}
              </p>
            </div>
          ))}
        </div>

        {/* Footer strip */}
        <div className="mt-[2vh] px-[4vw] py-[1.2vh] rounded-xl" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.35vw", color: "#4ade80" }}>
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
