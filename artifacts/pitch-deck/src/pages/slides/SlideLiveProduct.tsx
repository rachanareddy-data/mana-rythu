export default function SlideLiveProduct() {
  const screens = [
    {
      label: "Farmer Dashboard",
      badge: "Live",
      badgeColor: "#16a34a",
      desc: "Crop listings, income summary, order status at a glance",
      lines: [
        { label: "Active Listings", value: "3" },
        { label: "Pending Orders", value: "2" },
        { label: "This Month", value: "₹18,400" },
      ],
    },
    {
      label: "Marketplace",
      badge: "Live",
      badgeColor: "#16a34a",
      desc: "Browse verified crop listings with live prices and trust scores",
      lines: [
        { label: "Tomatoes · Grade A", value: "₹27/kg" },
        { label: "Rice · Grade B", value: "₹36/kg" },
        { label: "Onions · Grade A", value: "₹22/kg" },
      ],
    },
    {
      label: "AI Pest Detection",
      badge: "Live",
      badgeColor: "#7c3aed",
      desc: "Upload a leaf photo — AI diagnoses disease and recommends treatment",
      lines: [
        { label: "Detection", value: "Early Blight" },
        { label: "Confidence", value: "94%" },
        { label: "Treatment", value: "Copper fungicide" },
      ],
    },
    {
      label: "AI Fair Price",
      badge: "Live",
      badgeColor: "#0891b2",
      desc: "APMC benchmark comparison with AI-recommended price per grade",
      lines: [
        { label: "APMC Average", value: "₹22/kg" },
        { label: "Recommended", value: "₹27/kg" },
        { label: "Advantage", value: "+23%" },
      ],
    },
    {
      label: "Real-Time Chat",
      badge: "Live",
      badgeColor: "#d97706",
      desc: "Direct farmer-to-buyer negotiation with GPT-4o assistant in Telugu",
      lines: [
        { label: "Active Chats", value: "4" },
        { label: "AI Responses", value: "Telugu ✓" },
        { label: "Avg. Deal Time", value: "< 8 min" },
      ],
    },
    {
      label: "Logistics Estimator",
      badge: "Live",
      badgeColor: "#b45309",
      desc: "Distance-based transport cost estimation across TS & AP routes",
      lines: [
        { label: "Route", value: "Nalgonda→Hyd" },
        { label: "Distance", value: "142 km" },
        { label: "Est. Cost", value: "₹2,400" },
      ],
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw] py-[5vh]">

        <div className="text-center mb-[4vh]">
          <div className="inline-flex items-center gap-[0.8vw] mb-[1.5vh] px-[1.5vw] py-[0.8vh] rounded-full" style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.35)" }}>
            <div className="rounded-full" style={{ width: "0.7vw", height: "0.7vw", background: "#4ade80" }} />
            <p className="font-display font-bold" style={{ fontSize: "1.1vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.15em" }}>All features implemented and running</p>
          </div>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>
            Live Product — Built and Running
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[1.8vw] w-full" style={{ maxWidth: "88vw" }}>
          {screens.map(({ label, badge, badgeColor, desc, lines }) => (
            <div key={label} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
              <div className="flex items-center justify-between px-[1.5vw] py-[1.2vh]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.5vw" }}>{label}</p>
                <span className="font-display font-bold px-[0.8vw] py-[0.3vh] rounded-full" style={{ fontSize: "1vw", background: `${badgeColor}30`, color: badgeColor, border: `1px solid ${badgeColor}60` }}>{badge}</span>
              </div>
              <div className="px-[1.5vw] py-[1.5vh]">
                <p className="font-display font-normal mb-[1.5vh]" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{desc}</p>
                <div className="flex flex-col gap-[0.8vh]">
                  {lines.map(({ label: ll, value }) => (
                    <div key={ll} className="flex items-center justify-between">
                      <p className="font-display font-normal" style={{ fontSize: "1.15vw", color: "rgba(255,255,255,0.45)" }}>{ll}</p>
                      <p className="font-display font-bold" style={{ fontSize: "1.25vw", color: "#4ade80" }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[3vh] px-[4vw] py-[1.8vh] rounded-2xl" style={{ background: "rgba(74,222,128,0.12)", border: "1.5px solid rgba(74,222,128,0.3)" }}>
          <p className="font-display font-bold text-center" style={{ fontSize: "1.6vw", color: "#4ade80" }}>
            All features shown are implemented and functional in the live product.
          </p>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>08</span>
      </div>
    </div>
  );
}
