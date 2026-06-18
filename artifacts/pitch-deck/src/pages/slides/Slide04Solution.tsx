export default function Slide04Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute left-0 top-0 bottom-0" style={{ width: "42vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full" style={{ width: "20vw", height: "20vw", background: "rgba(74,222,128,0.1)", top: "5vh", left: "5vw" }} />
        <div className="absolute rounded-full" style={{ width: "12vw", height: "12vw", background: "rgba(74,222,128,0.08)", bottom: "8vh", right: "3vw" }} />
        <div className="absolute inset-0 flex flex-col justify-center pl-[5vw] pr-[4vw]">
          <p className="font-display font-semibold" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.18em" }}>The Solution</p>
          <p className="font-display font-extrabold text-white mt-[1.5vh]" style={{ fontSize: "5vw", lineHeight: 0.9 }}>Mana</p>
          <p className="font-display font-extrabold" style={{ fontSize: "5vw", lineHeight: 0.9, color: "#4ade80" }}>Rythu</p>
          <p className="font-display font-semibold text-white mt-[3vh]" style={{ fontSize: "1.65vw", lineHeight: 1.45, opacity: 0.85 }}>
            A direct digital marketplace where farm-to-buyer deals happen in real time — broker-free.
          </p>
          <div className="mt-[4vh] rounded-2xl px-[2vw] py-[2.5vh]" style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(74,222,128,0.4)" }}>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "3.8vw", lineHeight: 1 }}>
              <span style={{ color: "#4ade80" }}>50%</span> more
            </p>
            <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.6)" }}>average income gain for farmers</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[5vw]" style={{ width: "58vw" }}>
        <p className="font-display font-bold mb-[3vh]" style={{ fontSize: "1.5vw", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em" }}>Four pillars</p>

        <div className="flex items-start gap-[2vw] mb-[3.5vh]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
              <rect x="8" y="12" width="32" height="26" rx="4" stroke="#15803d" strokeWidth="2.5" fill="none" />
              <line x1="8" y1="20" x2="40" y2="20" stroke="#15803d" strokeWidth="2" />
              <circle cx="18" cy="30" r="4" stroke="#15803d" strokeWidth="2" fill="none" />
              <line x1="26" y1="28" x2="36" y2="28" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
              <line x1="26" y1="33" x2="32" y2="33" stroke="#15803d" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Direct Farmer-to-Buyer</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>Verified listings, direct purchase, no broker in the chain.</p>
          </div>
        </div>

        <div className="flex items-start gap-[2vw] mb-[3.5vh]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
              <path d="M8 34 L16 20 L24 26 L32 12 L40 6" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="16" cy="20" r="3" fill="#22c55e" />
              <circle cx="24" cy="26" r="3" fill="#22c55e" />
              <circle cx="32" cy="12" r="3" fill="#22c55e" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>AI Price Intelligence</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>Live APMC mandi benchmarks — farmers negotiate, not guess.</p>
          </div>
        </div>

        <div className="flex items-start gap-[2vw] mb-[3.5vh]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
              <rect x="6" y="10" width="22" height="16" rx="3" stroke="#15803d" strokeWidth="2.5" fill="none" />
              <circle cx="10" cy="18" r="2" fill="#15803d" />
              <circle cx="17" cy="18" r="2" fill="#15803d" />
              <path d="M22 16 C28 11 40 15 40 22 C40 26 37 28 34 30 L35 36 L28 31" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Real-time Chat + GPT-4o</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>Negotiations in Telugu and English, AI-assisted, instant.</p>
          </div>
        </div>

        <div className="flex items-start gap-[2vw]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
              <rect x="8" y="14" width="32" height="22" rx="4" stroke="#15803d" strokeWidth="2.5" fill="none" />
              <line x1="8" y1="22" x2="40" y2="22" stroke="#15803d" strokeWidth="2" />
              <rect x="14" y="28" width="6" height="4" rx="1" fill="#22c55e" opacity="0.9" />
              <rect x="24" y="28" width="10" height="4" rx="1" fill="#22c55e" opacity="0.5" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>UPI Escrow Payments</p>
            <p className="font-display font-normal mt-[0.4vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>Funds held securely, released on delivery confirmation.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>05</span>
      </div>
    </div>
  );
}
