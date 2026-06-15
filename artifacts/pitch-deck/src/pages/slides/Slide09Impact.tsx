export default function Slide09Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>

      {/* Radial glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(34,197,94,0.12) 0%, transparent 70%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[8vw]">

        {/* Central stat */}
        <div className="w-[5vw] h-[0.4vh] mb-[4vh]" style={{ background: "#22c55e" }} />

        <h1 className="font-display font-extrabold text-center text-white" style={{ fontSize: "6.5vw", lineHeight: 1, textWrap: "balance" }}>
          Every rupee saved<br />goes back to<br />the farmer
        </h1>

        {/* 3 metrics */}
        <div className="mt-[7vh] flex gap-[8vw]">
          <div className="text-center">
            <p className="font-display font-extrabold" style={{ fontSize: "6vw", color: "#4ade80", lineHeight: 1 }}>0</p>
            <p className="font-display font-semibold mt-[1vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.6)" }}>middlemen</p>
          </div>
          <div className="text-center">
            <p className="font-display font-extrabold" style={{ fontSize: "6vw", color: "#4ade80", lineHeight: 1 }}>Direct</p>
            <p className="font-display font-semibold mt-[1vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.6)" }}>negotiation</p>
          </div>
          <div className="text-center">
            <p className="font-display font-extrabold" style={{ fontSize: "6vw", color: "#4ade80", lineHeight: 1 }}>24/7</p>
            <p className="font-display font-semibold mt-[1vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.6)" }}>AI guidance</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.2)" }}>09</span>
      </div>
    </div>
  );
}
