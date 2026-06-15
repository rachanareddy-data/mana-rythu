export default function Slide01Title() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)" }}>

      {/* Decorative geometric accent top-right */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[20vw] h-[20vw] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(-30%, 30%)" }} />

      {/* Top label */}
      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold tracking-widest uppercase" style={{ fontSize: "1.4vw", color: "#4ade80", letterSpacing: "0.2em" }}>Pitch Deck · 2026</p>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col justify-center pl-[7vw]">
        {/* Green rule */}
        <div className="w-[5vw] h-[0.4vh] mb-[3vh]" style={{ background: "#22c55e" }} />

        {/* Product name */}
        <h1 className="font-display font-extrabold tracking-tight leading-none text-white" style={{ fontSize: "9vw", lineHeight: 0.92 }}>
          Mana
        </h1>
        <h1 className="font-display font-extrabold tracking-tight leading-none" style={{ fontSize: "9vw", lineHeight: 0.92, color: "#4ade80" }}>
          Rythu
        </h1>

        <div className="mt-[4vh] w-[40vw]">
          <p className="font-display font-normal text-white" style={{ fontSize: "2.2vw", lineHeight: 1.4, opacity: 0.85 }}>
            Direct Farm-to-Buyer Marketplace for Telangana &amp; Andhra Pradesh
          </p>
        </div>

        <div className="mt-[5vh]">
          <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#4ade80" }}>Rachana Reddy</p>
          <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.6)" }}>M.S. Data Science · Saint Peter's University</p>
        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.3)" }}>01 / 12</span>
      </div>
    </div>
  );
}
