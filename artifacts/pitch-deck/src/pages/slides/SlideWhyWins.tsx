export default function SlideWhyWins() {
  const cols = ["Marketplace", "AI Crop Intel", "AI Pricing", "Real-Time Chat", "Logistics", "Telugu-first AI"];

  const rows = [
    { name: "Mana Rythu", highlight: true,  checks: [true,  true,  true,  true,  true,  true]  },
    { name: "eNAM",        highlight: false, checks: [true,  false, true,  false, false, false] },
    { name: "DeHaat",      highlight: false, checks: [true,  true,  false, false, true,  false] },
    { name: "Agri10x",     highlight: false, checks: [true,  false, false, false, false, false] },
  ];

  const moats = [
    { icon: "🌐", title: "Language moat",       desc: "Telugu-first AI. Competitors are English-only." },
    { icon: "📈", title: "Data flywheel",        desc: "Every trade makes pricing smarter. Compounding." },
    { icon: "🔗", title: "Network effect",       desc: "More farmers → more buyers. Self-reinforcing." },
    { icon: "🧠", title: "Full-stack AI",         desc: "Pest + pricing AI unified — not two products." },
    { icon: "🚚", title: "Last-mile logistics",  desc: "Farm to buyer, transport included. Rivals skip this." },
    { icon: "🛡", title: "Trust infrastructure", desc: "Escrow + reputation tiers. Both sides protected." },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      {/* Left: moat cards */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center pl-[5.5vw] pr-[2.5vw]" style={{ width: "45vw" }}>
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.1vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why We Win</p>
        <h2 className="font-display font-extrabold mb-[3vh]" style={{ fontSize: "3.4vw", color: "#052e16", lineHeight: 1 }}>
          Six moats.<br />Built in, not bolted on.
        </h2>

        <div className="grid grid-cols-2 gap-x-[1.8vw] gap-y-[1.6vh]">
          {moats.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl p-[1.2vw] flex items-start gap-[0.8vw]" style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb" }}>
              <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: "2.8vw", height: "2.8vw", background: "#052e16" }}>
                <span style={{ fontSize: "1.4vw" }}>{icon}</span>
              </div>
              <div>
                <p className="font-display font-bold" style={{ fontSize: "1.2vw", color: "#052e16", lineHeight: 1.1 }}>{title}</p>
                <p className="font-display font-normal mt-[0.3vh]" style={{ fontSize: "1.0vw", color: "#6b7280", lineHeight: 1.3 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: competitive table */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-[4vw] pl-[2vw]" style={{ width: "55vw" }}>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
          <div className="px-[2vw] py-[1.4vh]" style={{ background: "#052e16" }}>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.35vw" }}>Competitive Landscape</p>
          </div>
          {/* Header */}
          <div className="flex px-[2vw] py-[1.1vh]" style={{ borderBottom: "1px solid #e5e7eb", background: "#f0fdf4" }}>
            <p className="font-display font-bold" style={{ fontSize: "1vw", color: "#052e16", flex: 1.5 }}>Platform</p>
            {cols.map((col) => (
              <p key={col} className="font-display font-bold text-center" style={{ fontSize: "0.9vw", color: "#052e16", flex: 1, lineHeight: 1.2 }}>{col}</p>
            ))}
          </div>
          {/* Rows */}
          {rows.map(({ name, highlight, checks }) => (
            <div key={name} className="flex px-[2vw] py-[1.6vh]" style={{ borderBottom: "1px solid #f3f4f6", background: highlight ? "#dcfce7" : "white" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.1vw", color: highlight ? "#15803d" : "#374151", flex: 1.5 }}>{name}</p>
              {checks.map((has, i) => (
                <p key={i} className="font-display font-bold text-center" style={{ fontSize: "1.45vw", color: has ? "#16a34a" : "#d1d5db", flex: 1 }}>
                  {has ? "✓" : "—"}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="rounded-xl px-[2vw] py-[1.5vh] mt-[2vh]" style={{ background: "#052e16" }}>
          <p className="font-display font-bold text-center text-white" style={{ fontSize: "1.3vw", lineHeight: 1.4 }}>
            No competitor has all six.{" "}
            <span style={{ color: "#4ade80" }}>Mana Rythu is the only full-stack solution.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>11</span>
      </div>
    </div>
  );
}
