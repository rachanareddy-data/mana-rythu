export default function Slide11Roadmap() {
  const phases = [
    {
      num: "1",
      label: "COMPLETE",
      title: "Marketplace Launch",
      items: ["Live crop listings", "Real-time chat", "Orders & trust system"],
      done: true,
    },
    {
      num: "2",
      label: "NEXT",
      title: "Payments + Notifications",
      items: ["UPI / Razorpay integration", "Email & SMS alerts", "Premium accounts"],
      done: false,
    },
    {
      num: "3",
      label: "PHASE 3",
      title: "Live Data APIs",
      items: ["eNAM mandi price feed", "OpenWeatherMap integration", "Push weather alerts"],
      done: false,
    },
    {
      num: "4",
      label: "PHASE 4",
      title: "Prediction + Govt. Schemes",
      items: ["Crop yield ML model", "PM-KISAN scheme integration", "Agri loan linkages"],
      done: false,
    },
    {
      num: "5",
      label: "FUTURE",
      title: "Mobile Application",
      items: ["React Native iOS & Android", "Offline-first for low connectivity", "Vernacular voice UI"],
      done: false,
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 55%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[5vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.2em" }}>Roadmap</p>
        <h2 className="font-display font-extrabold text-center mb-[4vh]" style={{ fontSize: "3.8vw", color: "#14532d", lineHeight: 1 }}>
          Five phases to full scale
        </h2>

        <div className="flex w-full gap-[1.5vw] items-stretch">
          {phases.map(({ num, label, title, items, done }, i) => (
            <div key={num} className="flex-1 flex flex-col">
              {/* Phase header */}
              <div
                className="rounded-t-2xl px-[1.5vw] py-[1.5vh] flex flex-col items-center"
                style={{ background: done ? "#052e16" : i === 1 ? "#15803d" : "#f9fafb", border: done ? "2px solid #052e16" : i === 1 ? "2px solid #15803d" : "1.5px solid #e5e7eb" }}
              >
                <div
                  className="rounded-full flex items-center justify-center mb-[0.8vh]"
                  style={{ width: "4vw", height: "4vw", background: done ? "#22c55e" : i === 1 ? "#22c55e" : "#f3f4f6" }}
                >
                  <span
                    className="font-display font-extrabold"
                    style={{ fontSize: "2.2vw", color: done || i === 1 ? "#052e16" : "#9ca3af" }}
                  >{num}</span>
                </div>
                <span
                  className="font-display font-semibold px-[0.8vw] py-[0.2vh] rounded-full mb-[0.5vh]"
                  style={{
                    fontSize: "1vw",
                    background: done ? "#22c55e" : i === 1 ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                    color: done ? "#052e16" : i === 1 ? "white" : "#9ca3af",
                    letterSpacing: "0.08em",
                  }}
                >{label}</span>
                <p
                  className="font-display font-bold text-center"
                  style={{ fontSize: "1.5vw", color: done || i === 1 ? "white" : "#374151", lineHeight: 1.2 }}
                >{title}</p>
              </div>

              {/* Items */}
              <div
                className="flex-1 rounded-b-2xl px-[1.5vw] py-[1.8vh] flex flex-col gap-[1vh]"
                style={{ background: done ? "#f0fdf4" : "#f9fafb", border: done ? "2px solid #bbf7d0" : "1.5px solid #e5e7eb", borderTop: "none" }}
              >
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-[0.8vw]">
                    <div
                      className="rounded-full flex-shrink-0 mt-[0.4vh]"
                      style={{ width: "0.7vw", height: "0.7vw", background: done ? "#22c55e" : "#d1d5db" }}
                    />
                    <p className="font-display font-normal" style={{ fontSize: "1.25vw", color: done ? "#15803d" : "#6b7280", lineHeight: 1.3 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>14</span>
      </div>
    </div>
  );
}
