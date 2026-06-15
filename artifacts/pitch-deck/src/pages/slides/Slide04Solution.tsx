export default function Slide04Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 70%, #15803d 100%)" }}>

      {/* Decorative circle top-right */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(20%, -20%)" }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center pl-[10vw]">
        <p className="font-display font-semibold tracking-widest uppercase mb-[3vh]" style={{ fontSize: "1.4vw", color: "#4ade80", letterSpacing: "0.2em" }}>The Solution</p>
        <div className="w-[5vw] h-[0.4vh] mb-[4vh]" style={{ background: "#22c55e" }} />

        <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "6.5vw", lineHeight: 0.95, textWrap: "balance" }}>
          Mana Rythu
        </h2>
        <div className="mt-[3vh] w-[48vw]">
          <p className="font-display font-normal text-white" style={{ fontSize: "2.4vw", lineHeight: 1.5, opacity: 0.85 }}>
            A direct marketplace connecting farmers to buyers — with real-time chat, fair price tools, and an AI-powered farming assistant
          </p>
        </div>

        {/* Three pillars */}
        <div className="mt-[6vh] flex gap-[4vw]">
          <div>
            <div className="w-[4vw] h-[0.4vh] mb-[1.5vh]" style={{ background: "#4ade80" }} />
            <p className="font-display font-semibold text-white" style={{ fontSize: "1.8vw" }}>Direct deals</p>
            <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.55)" }}>No intermediaries</p>
          </div>
          <div>
            <div className="w-[4vw] h-[0.4vh] mb-[1.5vh]" style={{ background: "#4ade80" }} />
            <p className="font-display font-semibold text-white" style={{ fontSize: "1.8vw" }}>Fair pricing</p>
            <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.55)" }}>Market-rate calculator</p>
          </div>
          <div>
            <div className="w-[4vw] h-[0.4vh] mb-[1.5vh]" style={{ background: "#4ade80" }} />
            <p className="font-display font-semibold text-white" style={{ fontSize: "1.8vw" }}>AI guidance</p>
            <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.55)" }}>24/7 farming assistant</p>
          </div>
        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.25)" }}>04 / 12</span>
      </div>
    </div>
  );
}
