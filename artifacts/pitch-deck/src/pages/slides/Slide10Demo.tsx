export default function Slide10Demo() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f8fafc" }}>

      <div className="absolute inset-0 flex">

        {/* Left: QR + links */}
        <div className="flex flex-col justify-center pl-[7vw] pr-[4vw]" style={{ width: "35vw" }}>
          <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Live Demo</p>
          <div className="w-[3vw] h-[0.3vh] mb-[3vh]" style={{ background: "#22c55e" }} />

          <h2 className="font-display font-extrabold" style={{ fontSize: "4.5vw", color: "#052e16", lineHeight: 1 }}>
            Try it now
          </h2>

          {/* Simulated QR code using grid */}
          <div className="mt-[3vh] mb-[3vh]" style={{ width: "12vw", height: "12vw" }}>
            <svg viewBox="0 0 100 100" style={{ width: "12vw", height: "12vw" }}>
              {/* QR code frame */}
              <rect x="5" y="5" width="90" height="90" rx="4" fill="white" stroke="#052e16" strokeWidth="2" />
              {/* Top-left finder */}
              <rect x="12" y="12" width="24" height="24" rx="2" fill="#052e16" />
              <rect x="16" y="16" width="16" height="16" rx="1" fill="white" />
              <rect x="20" y="20" width="8" height="8" fill="#052e16" />
              {/* Top-right finder */}
              <rect x="64" y="12" width="24" height="24" rx="2" fill="#052e16" />
              <rect x="68" y="16" width="16" height="16" rx="1" fill="white" />
              <rect x="72" y="20" width="8" height="8" fill="#052e16" />
              {/* Bottom-left finder */}
              <rect x="12" y="64" width="24" height="24" rx="2" fill="#052e16" />
              <rect x="16" y="68" width="16" height="16" rx="1" fill="white" />
              <rect x="20" y="72" width="8" height="8" fill="#052e16" />
              {/* Data dots pattern */}
              <rect x="44" y="12" width="6" height="6" fill="#052e16" />
              <rect x="52" y="12" width="6" height="6" fill="#052e16" />
              <rect x="44" y="20" width="6" height="6" fill="#15803d" />
              <rect x="44" y="28" width="6" height="6" fill="#052e16" />
              <rect x="52" y="28" width="6" height="6" fill="#052e16" />
              <rect x="12" y="44" width="6" height="6" fill="#052e16" />
              <rect x="20" y="44" width="6" height="6" fill="#15803d" />
              <rect x="28" y="44" width="6" height="6" fill="#052e16" />
              <rect x="36" y="44" width="6" height="6" fill="#052e16" />
              <rect x="44" y="44" width="6" height="6" fill="#15803d" />
              <rect x="52" y="44" width="6" height="6" fill="#052e16" />
              <rect x="60" y="44" width="6" height="6" fill="#052e16" />
              <rect x="68" y="44" width="6" height="6" fill="#15803d" />
              <rect x="76" y="44" width="6" height="6" fill="#052e16" />
              <rect x="12" y="52" width="6" height="6" fill="#052e16" />
              <rect x="28" y="52" width="6" height="6" fill="#052e16" />
              <rect x="44" y="52" width="6" height="6" fill="#052e16" />
              <rect x="60" y="52" width="6" height="6" fill="#15803d" />
              <rect x="76" y="52" width="6" height="6" fill="#052e16" />
              <rect x="44" y="60" width="6" height="6" fill="#052e16" />
              <rect x="52" y="60" width="6" height="6" fill="#15803d" />
              <rect x="60" y="60" width="6" height="6" fill="#052e16" />
              <rect x="68" y="60" width="6" height="6" fill="#052e16" />
              <rect x="76" y="60" width="6" height="6" fill="#052e16" />
              <rect x="44" y="68" width="6" height="6" fill="#15803d" />
              <rect x="52" y="76" width="6" height="6" fill="#052e16" />
              <rect x="60" y="68" width="6" height="6" fill="#052e16" />
              <rect x="68" y="76" width="6" height="6" fill="#15803d" />
              <rect x="76" y="68" width="6" height="6" fill="#052e16" />
            </svg>
          </div>

          <a href="https://mana-rythu.replit.app" target="_blank" rel="noopener noreferrer" className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#15803d", textDecoration: "underline" }}>mana-rythu.replit.app</a>
          <a href="https://github.com/rachanareddy-data/mana-rythu" target="_blank" rel="noopener noreferrer" className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.5vw", color: "#6b7280", textDecoration: "underline" }}>github.com/rachanareddy-data</a>
        </div>

        {/* Right: App mockup */}
        <div className="flex-1 flex items-center justify-center pr-[5vw]">

          {/* Browser frame mockup */}
          <div className="rounded-2xl overflow-hidden w-full" style={{ background: "#052e16", boxShadow: "0 20px 60px rgba(5,46,22,0.3)" }}>
            {/* Browser bar */}
            <div className="flex items-center gap-[0.8vw] px-[2vw] py-[1.5vh]" style={{ background: "#14532d" }}>
              <div className="w-[1vw] h-[1vw] rounded-full" style={{ background: "#ef4444" }} />
              <div className="w-[1vw] h-[1vw] rounded-full" style={{ background: "#f59e0b" }} />
              <div className="w-[1vw] h-[1vw] rounded-full" style={{ background: "#22c55e" }} />
              <div className="flex-1 mx-[1vw] rounded-full px-[1.5vw] py-[0.4vh]" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.5)" }}>mana-rythu.replit.app</p>
              </div>
            </div>
            {/* App content mock */}
            <div className="px-[2vw] py-[2.5vh]" style={{ minHeight: "42vh" }}>
              {/* Nav bar */}
              <div className="flex items-center justify-between mb-[2vh]">
                <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#4ade80" }}>Mana Rythu</p>
                <div className="flex gap-[1.5vw]">
                  <div className="rounded-full px-[1.5vw] py-[0.5vh]" style={{ background: "#15803d" }}>
                    <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "white" }}>Marketplace</p>
                  </div>
                  <div className="rounded-full px-[1.5vw] py-[0.5vh]" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "rgba(255,255,255,0.6)" }}>Chat</p>
                  </div>
                </div>
              </div>
              {/* Search bar */}
              <div className="rounded-xl px-[1.5vw] py-[1vh] mb-[2vh]" style={{ background: "rgba(255,255,255,0.08)" }}>
                <p className="font-display font-normal" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.4)" }}>Search crops, location...</p>
              </div>
              {/* Crop cards */}
              <div className="flex gap-[1.5vw]">
                <div className="flex-1 rounded-xl p-[1.5vw]" style={{ background: "#15803d" }}>
                  <div className="w-full rounded-lg mb-[1vh]" style={{ height: "7vh", background: "#166534" }} />
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.4vw" }}>Tomatoes</p>
                  <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80" }}>Rs. 28/kg</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.6)" }}>Warangal</p>
                </div>
                <div className="flex-1 rounded-xl p-[1.5vw]" style={{ background: "#15803d" }}>
                  <div className="w-full rounded-lg mb-[1vh]" style={{ height: "7vh", background: "#166534" }} />
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.4vw" }}>Rice</p>
                  <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80" }}>Rs. 42/kg</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.6)" }}>Nalgonda</p>
                </div>
                <div className="flex-1 rounded-xl p-[1.5vw]" style={{ background: "#15803d" }}>
                  <div className="w-full rounded-lg mb-[1vh]" style={{ height: "7vh", background: "#166534" }} />
                  <p className="font-display font-bold text-white" style={{ fontSize: "1.4vw" }}>Cotton</p>
                  <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80" }}>Rs. 95/kg</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.6)" }}>Guntur</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>10</span>
      </div>
    </div>
  );
}
