export default function Slide12Close() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)" }}>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] rounded-full opacity-[0.08]" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(25%, -25%)" }} />
      <div className="absolute bottom-0 left-0 w-[22vw] h-[22vw] rounded-full opacity-[0.08]" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(-25%, 25%)" }} />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-center pl-[8vw] pr-[8vw]">

        {/* Green rule */}
        <div className="w-[5vw] h-[0.4vh] mb-[3.5vh]" style={{ background: "#22c55e" }} />

        {/* Brand name */}
        <h1 className="font-display font-extrabold text-white leading-none" style={{ fontSize: "8vw", lineHeight: 0.95 }}>
          Mana Rythu
        </h1>
        <p className="font-display font-normal mt-[2.5vh]" style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
          Direct Farm-to-Buyer Marketplace for Telangana &amp; Andhra Pradesh
        </p>

        {/* Divider */}
        <div className="mt-[4vh] w-full h-[0.15vh]" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Links + author */}
        <div className="mt-[3.5vh] flex items-start gap-[6vw]">
          <div>
            <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.5vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.12em" }}>Live App</p>
            <a href="https://mana-rythu.replit.app" target="_blank" rel="noopener noreferrer" className="font-display font-normal" style={{ fontSize: "1.9vw", color: "rgba(255,255,255,0.75)", textDecoration: "underline" }}>mana-rythu.replit.app</a>
          </div>
          <div>
            <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.5vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.12em" }}>Source Code</p>
            <a href="https://github.com/rachanareddy-data/mana-rythu" target="_blank" rel="noopener noreferrer" className="font-display font-normal" style={{ fontSize: "1.9vw", color: "rgba(255,255,255,0.75)", textDecoration: "underline" }}>github.com/rachanareddy-data/mana-rythu</a>
          </div>
          <div>
            <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.5vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.12em" }}>Author</p>
            <p className="font-display font-semibold" style={{ fontSize: "1.9vw", color: "rgba(255,255,255,0.85)" }}>Rachana Reddy</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.7vw", color: "rgba(255,255,255,0.5)" }}>M.S. Data Science · Saint Peter's University</p>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.2)" }}>12 / 12</span>
      </div>
    </div>
  );
}
