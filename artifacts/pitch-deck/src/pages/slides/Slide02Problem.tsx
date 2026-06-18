export default function Slide02Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>The Problem</p>
        <h2 className="font-display font-extrabold mb-[6vh]" style={{ fontSize: "4.5vw", color: "#052e16", lineHeight: 1 }}>
          A broken supply chain
        </h2>

        <div className="flex items-stretch w-full gap-0" style={{ maxWidth: "88vw" }}>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="w-full rounded-2xl flex flex-col items-center py-[4vh] px-[2vw]" style={{ background: "#f0fdf4", border: "2.5px solid #22c55e", height: "100%" }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
                <circle cx="32" cy="16" r="10" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <path d="M8 54c0-11 48-11 48 0" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M14 32 C14 28 12 24 18 22 C24 20 24 30 20 32" stroke="#22c55e" strokeWidth="2" fill="none" />
              </svg>
              <p className="font-display font-bold mt-[2vh]" style={{ fontSize: "2vw", color: "#15803d" }}>Farmer</p>
              <p className="font-display font-extrabold mt-[1.5vh]" style={{ fontSize: "4vw", color: "#15803d", lineHeight: 1 }}>₹20</p>
              <p className="font-display font-semibold mt-[0.8vh]" style={{ fontSize: "1.3vw", color: "#6b7280" }}>actually receives</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-[1.5vw]" style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 60 24" fill="none" style={{ width: "7vw" }}>
              <line x1="4" y1="12" x2="52" y2="12" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              <polyline points="44,5 54,12 44,19" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <div className="mt-[1.5vh] text-center">
              <p className="font-display font-bold" style={{ fontSize: "1.5vw", color: "#dc2626" }}>+₹10</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.1vw", color: "#9ca3af" }}>broker 1</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="w-full rounded-2xl flex flex-col items-center py-[4vh] px-[2vw]" style={{ background: "#fef9c3", border: "2.5px solid #f59e0b", height: "100%" }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
                <rect x="10" y="22" width="44" height="30" rx="5" fill="#f59e0b" opacity="0.2" />
                <rect x="10" y="22" width="44" height="30" rx="5" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                <path d="M22 22V16a10 10 0 0120 0v6" stroke="#92400e" strokeWidth="2.5" fill="none" />
                <circle cx="32" cy="37" r="4" fill="#f59e0b" />
              </svg>
              <p className="font-display font-bold mt-[2vh]" style={{ fontSize: "2vw", color: "#92400e" }}>Middlemen</p>
              <p className="font-display font-extrabold mt-[1.5vh]" style={{ fontSize: "4vw", color: "#dc2626", lineHeight: 1 }}>₹20</p>
              <p className="font-display font-semibold mt-[0.8vh]" style={{ fontSize: "1.3vw", color: "#6b7280" }}>extracted in margin</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-[1.5vw]" style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 60 24" fill="none" style={{ width: "7vw" }}>
              <line x1="4" y1="12" x2="52" y2="12" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
              <polyline points="44,5 54,12 44,19" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <div className="mt-[1.5vh] text-center">
              <p className="font-display font-bold" style={{ fontSize: "1.5vw", color: "#dc2626" }}>+₹10</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.1vw", color: "#9ca3af" }}>broker 2</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="w-full rounded-2xl flex flex-col items-center py-[4vh] px-[2vw]" style={{ background: "#eff6ff", border: "2.5px solid #93c5fd", height: "100%" }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw" }}>
                <circle cx="32" cy="16" r="10" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                <path d="M8 54c0-11 48-11 48 0" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <rect x="24" y="38" width="16" height="12" rx="2" stroke="#3b82f6" strokeWidth="2" fill="none" />
              </svg>
              <p className="font-display font-bold mt-[2vh]" style={{ fontSize: "2vw", color: "#1d4ed8" }}>Buyer</p>
              <p className="font-display font-extrabold mt-[1.5vh]" style={{ fontSize: "4vw", color: "#1d4ed8", lineHeight: 1 }}>₹40</p>
              <p className="font-display font-semibold mt-[0.8vh]" style={{ fontSize: "1.3vw", color: "#6b7280" }}>ends up paying</p>
            </div>
          </div>

        </div>

        <div className="mt-[5vh] px-[5vw] py-[2vh] rounded-2xl" style={{ background: "#052e16" }}>
          <p className="font-display font-bold text-white text-center" style={{ fontSize: "2vw" }}>
            The farmer earns <span style={{ color: "#dc2626" }}>half</span> of what the buyer pays. The rest disappears.
          </p>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>03</span>
      </div>
    </div>
  );
}
