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

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">

        <h1 className="font-display font-extrabold text-center text-white" style={{ fontSize: "7vw", lineHeight: 1.05, maxWidth: "80vw" }}>
          India's farmers
          <br />
          grow <span style={{ color: "#4ade80" }}>your food.</span>
          <br />
          Middlemen keep
          <br />
          <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.6)", color: "transparent" }}>their money.</span>
        </h1>

        <div style={{ width: "8vw", height: "2px", background: "rgba(34,197,94,0.3)", margin: "5vh 0" }} />

        <div className="flex items-end justify-center gap-[6vw]">
          <div className="flex flex-col items-center">
            <p className="font-display font-extrabold" style={{ fontSize: "7vw", lineHeight: 1, color: "#4ade80" }}>₹20</p>
            <p className="font-display font-semibold mt-[1vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.4)" }}>farmer earns per kg</p>
          </div>

          <div className="flex flex-col items-center pb-[2vh]">
            <svg viewBox="0 0 80 32" fill="none" style={{ width: "10vw" }}>
              <line x1="4" y1="16" x2="70" y2="16" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <polyline points="60,8 72,16 60,24" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <p className="font-display font-bold mt-[1.2vh]" style={{ fontSize: "1.4vw", color: "#dc2626" }}>2–3 middlemen</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-display font-extrabold" style={{ fontSize: "7vw", lineHeight: 1, color: "rgba(255,255,255,0.7)" }}>₹40</p>
            <p className="font-display font-semibold mt-[1vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.4)" }}>buyer pays per kg</p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.1)" }}>02</span>
      </div>
    </div>
  );
}
