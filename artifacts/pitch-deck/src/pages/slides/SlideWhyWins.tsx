export default function SlideWhyWins() {
  const cols = ["Marketplace", "AI Intelligence", "Real-Time Chat", "Logistics", "Telugu-first AI"];

  const rows = [
    { name: "Mana Rythu", highlight: true,  checks: [true,  true,  true,  true,  true]  },
    { name: "eNAM",        highlight: false, checks: [true,  false, false, false, false] },
    { name: "DeHaat",      highlight: false, checks: [true,  true,  false, true,  false] },
    { name: "Agri10x",     highlight: false, checks: [true,  false, false, false, false] },
  ];

  const moats = [
    { icon: "🌐", title: "Language moat",       desc: "Telugu-first AI — competitors are English-only, unreachable for most farmers." },
    { icon: "📈", title: "Data flywheel",        desc: "Every transaction sharpens pricing models. Harder to replicate as it scales." },
    { icon: "🔗", title: "Network effect",       desc: "More farmers draw more buyers. More buyers draw more farmers. Bilateral lock-in." },
    { icon: "🧠", title: "Full-stack AI",         desc: "Crop intelligence + price intelligence in one platform — not two separate tools." },
    { icon: "🚚", title: "Logistics integration", desc: "Listing to last-mile cost estimate — no competitor connects all of this." },
    { icon: "🛡", title: "Trust infrastructure",  desc: "Reputation tiers + UPI escrow — the only platform both sides can trust financially." },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      {/* Left: moats */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-[6vw] pr-[3vw]" style={{ width: "46vw" }}>
        <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why We Win</p>
        <h2 className="font-display font-extrabold mb-[3.5vh]" style={{ fontSize: "3.6vw", color: "#052e16", lineHeight: 1 }}>
          Six moats.<br />Built in, not bolted on.
        </h2>

        <div className="flex flex-col gap-[2.2vh]">
          {moats.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-[1.4vw]">
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "3.6vw", height: "3.6vw", background: "#052e16" }}>
                <span style={{ fontSize: "1.7vw" }}>{icon}</span>
              </div>
              <div>
                <p className="font-display font-bold" style={{ fontSize: "1.6vw", color: "#052e16", lineHeight: 1 }}>{title}</p>
                <p className="font-display font-normal mt-[0.3vh]" style={{ fontSize: "1.2vw", color: "#6b7280", lineHeight: 1.35 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: competitive table */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-[5vw] pl-[2vw]" style={{ width: "54vw" }}>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
          <div className="px-[2vw] py-[1.5vh]" style={{ background: "#052e16" }}>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.4vw" }}>Competitive Landscape</p>
          </div>
          {/* Header */}
          <div className="flex px-[2vw] py-[1.2vh]" style={{ borderBottom: "1px solid #e5e7eb", background: "#f0fdf4" }}>
            <p className="font-display font-bold" style={{ fontSize: "1.15vw", color: "#052e16", flex: 1.6 }}>Platform</p>
            {cols.map((col) => (
              <p key={col} className="font-display font-bold text-center" style={{ fontSize: "1.05vw", color: "#052e16", flex: 1, lineHeight: 1.2 }}>{col}</p>
            ))}
          </div>
          {/* Rows */}
          {rows.map(({ name, highlight, checks }) => (
            <div key={name} className="flex px-[2vw] py-[1.8vh]" style={{ borderBottom: "1px solid #e5e7eb", background: highlight ? "#dcfce7" : "white" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.2vw", color: highlight ? "#15803d" : "#374151", flex: 1.6 }}>{name}</p>
              {checks.map((has, i) => (
                <p key={i} className="font-display font-bold text-center" style={{ fontSize: "1.5vw", color: has ? "#16a34a" : "#d1d5db", flex: 1 }}>
                  {has ? "✓" : "—"}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="rounded-xl px-[2vw] py-[1.8vh] mt-[2.5vh]" style={{ background: "#052e16" }}>
          <p className="font-display font-bold text-center text-white" style={{ fontSize: "1.4vw", lineHeight: 1.4 }}>
            No competitor combines all five capabilities.{" "}
            <span style={{ color: "#4ade80" }}>Mana Rythu is the only full-stack solution built for this market.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>11</span>
      </div>
    </div>
  );
}
