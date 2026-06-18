export default function Slide09Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Impact</p>
        <h2 className="font-display font-extrabold text-white mb-[6vh]" style={{ fontSize: "4vw", lineHeight: 1 }}>
          The math is simple.
        </h2>

        <div className="flex items-stretch gap-[3vw] w-full" style={{ maxWidth: "84vw" }}>

          <div className="flex flex-col items-center justify-center rounded-2xl py-[5vh] px-[3vw]" style={{ flex: 1, background: "linear-gradient(145deg, rgba(34,197,94,0.25) 0%, rgba(22,163,74,0.15) 100%)", border: "2px solid #22c55e" }}>
            <div style={{ fontSize: "11vw", fontWeight: 800, lineHeight: 1, color: "#4ade80" }}>50<span style={{ fontSize: "6vw" }}>%</span></div>
            <p className="font-display font-bold text-white mt-[2vh]" style={{ fontSize: "2.2vw" }}>More Income</p>
            <p className="font-display font-normal mt-[1.2vh] text-center" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>Farmers keep what was always theirs</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl py-[5vh] px-[3vw]" style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontSize: "11vw", fontWeight: 800, lineHeight: 1, color: "white" }}>30<span style={{ fontSize: "6vw" }}>%</span></div>
            <p className="font-display font-bold text-white mt-[2vh]" style={{ fontSize: "2.2vw" }}>Cheaper for Buyers</p>
            <p className="font-display font-normal mt-[1.2vh] text-center" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>Fresher produce, shorter chain, lower cost</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl py-[5vh] px-[3vw]" style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontSize: "11vw", fontWeight: 800, lineHeight: 1, color: "white" }}>2<span style={{ fontSize: "6vw" }}>×</span></div>
            <p className="font-display font-bold text-white mt-[2vh]" style={{ fontSize: "2.2vw" }}>Price Visibility</p>
            <p className="font-display font-normal mt-[1.2vh] text-center" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>Live APMC data — farmers negotiate, not beg</p>
          </div>

        </div>

        <p className="font-display font-semibold mt-[5.5vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.25)" }}>
          No fake numbers. No projections. Just what direct trade does.
        </p>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.12)" }}>08</span>
      </div>
    </div>
  );
}
