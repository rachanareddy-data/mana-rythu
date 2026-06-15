export default function Slide10Demo() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Left green side-bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[1vw]" style={{ background: "#15803d" }} />

      <div className="absolute inset-0 flex pt-[6vh] pb-[5vh] pl-[8vw] pr-[6vw] gap-[4vw]">

        {/* Left: heading + links */}
        <div className="flex flex-col justify-center w-[28%]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[2vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>Live Demo</p>
          <div className="w-[4vw] h-[0.35vh] mb-[3vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "4vw", color: "#052e16", textWrap: "balance" }}>Live platform</h2>

          <p className="font-display font-normal mt-[3vh]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.6 }}>Fully functional — open the link and explore the marketplace, chat, and AI assistant live</p>

          <div className="mt-[4vh] space-y-[2vh]">
            <div className="p-[1.5vw] rounded-xl" style={{ background: "#052e16" }}>
              <p className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#4ade80" }}>Live App</p>
              <a href="https://mana-rythu.replit.app" target="_blank" rel="noopener noreferrer" className="font-display font-normal" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.7)", textDecoration: "underline" }}>mana-rythu.replit.app</a>
            </div>
            <div className="p-[1.5vw] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
              <p className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#15803d" }}>GitHub</p>
              <a href="https://github.com/rachanareddy-data/mana-rythu" target="_blank" rel="noopener noreferrer" className="font-display font-normal" style={{ fontSize: "1.5vw", color: "#374151", textDecoration: "underline" }}>github.com/rachanareddy-data/mana-rythu</a>
            </div>
          </div>
        </div>

        {/* Right: screenshot placeholders */}
        <div className="flex-1 flex flex-col gap-[2vh]">

          {/* Top row: 2 wide */}
          <div className="flex gap-[2vw] flex-1">
            <div className="flex-1 rounded-xl flex flex-col items-center justify-center" style={{ background: "#f0fdf4", border: "2px dashed #86efac" }}>
              <div className="w-[4vw] h-[4vw] rounded-full mb-[1.5vh] flex items-center justify-center" style={{ background: "#dcfce7" }}>
                <div className="w-[2vw] h-[2vw] rounded-sm" style={{ background: "#15803d" }} />
              </div>
              <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#15803d" }}>Marketplace</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.5vw", color: "#6b7280" }}>Crop listings &amp; smart search</p>
            </div>
            <div className="flex-1 rounded-xl flex flex-col items-center justify-center" style={{ background: "#f0fdf4", border: "2px dashed #86efac" }}>
              <div className="w-[4vw] h-[4vw] rounded-full mb-[1.5vh] flex items-center justify-center" style={{ background: "#dcfce7" }}>
                <div className="w-[2vw] h-[2vw] rounded-full" style={{ background: "#15803d" }} />
              </div>
              <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#15803d" }}>Real-time Chat</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.5vw", color: "#6b7280" }}>Direct farmer-buyer messaging</p>
            </div>
          </div>

          {/* Bottom row: 2 wide */}
          <div className="flex gap-[2vw] flex-1">
            <div className="flex-1 rounded-xl flex flex-col items-center justify-center" style={{ background: "#f0fdf4", border: "2px dashed #86efac" }}>
              <div className="w-[4vw] h-[4vw] rounded-full mb-[1.5vh] flex items-center justify-center" style={{ background: "#dcfce7" }}>
                <div className="w-[2vw] h-[1.2vw] rounded-sm" style={{ background: "#15803d" }} />
              </div>
              <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#15803d" }}>AI Assistant</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.5vw", color: "#6b7280" }}>Telugu &amp; English farming guidance</p>
            </div>
            <div className="flex-1 rounded-xl flex flex-col items-center justify-center" style={{ background: "#f0fdf4", border: "2px dashed #86efac" }}>
              <div className="w-[4vw] h-[4vw] rounded-full mb-[1.5vh] flex items-center justify-center" style={{ background: "#dcfce7" }}>
                <div className="w-[1.5vw] h-[2vw] rounded-sm" style={{ background: "#15803d" }} />
              </div>
              <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#15803d" }}>Farmer Dashboard</p>
              <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.5vw", color: "#6b7280" }}>Listings, orders &amp; analytics</p>
            </div>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>10 / 12</span>
      </div>
    </div>
  );
}
