export default function Slide09Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.8vh]" style={{ background: "linear-gradient(90deg, #15803d 0%, #22c55e 50%, #15803d 100%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <div className="text-center mb-[4.5vh]">
          <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Impact</p>
          <h2 className="font-display font-extrabold" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1 }}>
            Real outcomes for real farmers
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[3vw] w-full">

          <div className="rounded-2xl p-[3vw] flex flex-col items-center text-center" style={{ background: "linear-gradient(140deg, #052e16 0%, #15803d 100%)" }}>
            <div className="font-display font-extrabold" style={{ fontSize: "8.5vw", lineHeight: 1, color: "#4ade80" }}>50<span style={{ fontSize: "4vw" }}>%</span></div>
            <p className="font-display font-bold text-white mt-[1.5vh]" style={{ fontSize: "2vw" }}>More Income</p>
            <div className="w-[3vw] h-[0.3vh] rounded-full mt-[1.5vh] mb-[1.5vh]" style={{ background: "rgba(74,222,128,0.4)" }} />
            <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
              Cutting middlemen means farmers keep more of every rupee earned — directly boosting household income.
            </p>
          </div>

          <div className="rounded-2xl p-[3vw] flex flex-col items-center text-center" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
            <div className="font-display font-extrabold" style={{ fontSize: "8.5vw", lineHeight: 1, color: "#15803d" }}>30<span style={{ fontSize: "4vw" }}>%</span></div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Lower Prices</p>
            <div className="w-[3vw] h-[0.3vh] rounded-full mt-[1.5vh] mb-[1.5vh]" style={{ background: "#bbf7d0" }} />
            <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280", lineHeight: 1.5 }}>
              Buyers pay closer to farm-gate prices. Fresher produce, shorter supply chains, less spoilage.
            </p>
          </div>

          <div className="rounded-2xl p-[3vw] flex flex-col items-center text-center" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
            <div className="font-display font-extrabold" style={{ fontSize: "8.5vw", lineHeight: 1, color: "#15803d" }}>2<span style={{ fontSize: "4vw" }}>×</span></div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Price Visibility</p>
            <div className="w-[3vw] h-[0.3vh] rounded-full mt-[1.5vh] mb-[1.5vh]" style={{ background: "#bbf7d0" }} />
            <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280", lineHeight: 1.5 }}>
              Farmers negotiate with live APMC benchmarks — no more accepting whatever the broker offers.
            </p>
          </div>

        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>08</span>
      </div>
    </div>
  );
}
