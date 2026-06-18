export default function SlideEmotionalHook() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(34,197,94,0.14) 0%, transparent 65%)" }} />

      <div className="absolute top-[6vh] left-[7vw]">
        <div className="flex gap-[0.5vw]">
          <div style={{ width: "0.4vw", height: "4vh", background: "#22c55e", borderRadius: "2px" }} />
          <div style={{ width: "0.4vw", height: "4vh", background: "rgba(34,197,94,0.3)", borderRadius: "2px" }} />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[12vw]">
        <p className="font-display font-semibold mb-[3vh] tracking-widest" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.25em" }}>
          The Reality
        </p>

        <h1 className="font-display font-extrabold text-center text-white" style={{ fontSize: "6.5vw", lineHeight: 1.08, maxWidth: "80vw" }}>
          India's farmers grow
          <br />
          <span style={{ color: "#4ade80" }}>your food.</span>
          <br />
          Middlemen take
          <br />
          <span style={{ WebkitTextStroke: "2px #22c55e", color: "transparent" }}>their money.</span>
        </h1>

        <div style={{ width: "6vw", height: "2px", background: "rgba(34,197,94,0.35)", margin: "4.5vh 0" }} />

        <div className="flex items-center justify-center gap-[8vw]">
          <div className="flex flex-col items-center">
            <p className="font-display font-extrabold" style={{ fontSize: "5.5vw", lineHeight: 1, color: "#4ade80" }}>₹20</p>
            <p className="font-display font-semibold mt-[0.8vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.45)" }}>farmer earns</p>
          </div>

          <div className="flex flex-col items-center gap-[0.8vh]">
            <svg viewBox="0 0 60 24" fill="none" style={{ width: "7vw" }}>
              <line x1="4" y1="12" x2="52" y2="12" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="43,5 53,12 43,19" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <p className="font-display font-bold" style={{ fontSize: "1.2vw", color: "#dc2626" }}>2–3 middlemen</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-display font-extrabold" style={{ fontSize: "5.5vw", lineHeight: 1, color: "white" }}>₹40</p>
            <p className="font-display font-semibold mt-[0.8vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.45)" }}>buyer pays</p>
          </div>
        </div>

        <p className="font-display font-semibold text-center mt-[5vh]" style={{ fontSize: "1.8vw", color: "rgba(255,255,255,0.35)" }}>
          Every rupee the middleman takes is a rupee stolen from the farmer who fed us.
        </p>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.12)" }}>02</span>
      </div>
    </div>
  );
}
