export default function Slide05HowItWorks() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <div className="text-center mb-[5vh]">
          <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.15em" }}>How It Works</p>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>
            Three steps. No middlemen.
          </h2>
        </div>

        <div className="flex items-center w-full" style={{ maxWidth: "86vw" }}>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center py-[3.5vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(74,222,128,0.5)", width: "100%" }}>
              <div className="font-display font-extrabold mb-[2vh]" style={{ fontSize: "4vw", color: "#4ade80", lineHeight: 1 }}>1</div>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw", marginBottom: "1.5vh" }}>
                <circle cx="32" cy="20" r="10" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M10 55 C10 42 54 42 54 55" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <line x1="32" y1="36" x2="32" y2="44" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                <circle cx="32" cy="46" r="2" fill="#4ade80" />
              </svg>
              <p className="font-display font-bold text-white text-center" style={{ fontSize: "2vw" }}>Farmer Lists</p>
              <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>Posts produce with photos, quantity, and asking price in minutes.</p>
            </div>
          </div>

          <div className="flex flex-col items-center px-[1.5vw]" style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 48 20" fill="none" style={{ width: "6vw" }}>
              <line x1="2" y1="10" x2="38" y2="10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="30,4 40,10 30,16" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center py-[3.5vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(74,222,128,0.5)", width: "100%" }}>
              <div className="font-display font-extrabold mb-[2vh]" style={{ fontSize: "4vw", color: "#4ade80", lineHeight: 1 }}>2</div>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw", marginBottom: "1.5vh" }}>
                <rect x="8" y="14" width="26" height="20" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
                <circle cx="14" cy="24" r="2.5" fill="white" />
                <circle cx="21" cy="24" r="2.5" fill="white" />
                <path d="M28 20 C36 14 54 18 54 28 C54 34 50 37 46 38 L47 46 L39 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="32" cy="56" r="3" fill="#4ade80" />
              </svg>
              <p className="font-display font-bold text-white text-center" style={{ fontSize: "2vw" }}>Chat &amp; Agree</p>
              <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>Buyer and farmer negotiate directly. AI assistant answers questions in Telugu.</p>
            </div>
          </div>

          <div className="flex flex-col items-center px-[1.5vw]" style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 48 20" fill="none" style={{ width: "6vw" }}>
              <line x1="2" y1="10" x2="38" y2="10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points="30,4 40,10 30,16" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center py-[3.5vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.07)", border: "2px solid rgba(74,222,128,0.5)", width: "100%" }}>
              <div className="font-display font-extrabold mb-[2vh]" style={{ fontSize: "4vw", color: "#4ade80", lineHeight: 1 }}>3</div>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "5.5vw", height: "5.5vw", marginBottom: "1.5vh" }}>
                <rect x="10" y="18" width="44" height="28" rx="5" stroke="white" strokeWidth="2.5" fill="none" />
                <line x1="10" y1="28" x2="54" y2="28" stroke="white" strokeWidth="2" />
                <rect x="16" y="34" width="10" height="6" rx="2" fill="#4ade80" opacity="0.9" />
                <circle cx="46" cy="37" r="4" stroke="#4ade80" strokeWidth="2" fill="none" />
              </svg>
              <p className="font-display font-bold text-white text-center" style={{ fontSize: "2vw" }}>Pay &amp; Deliver</p>
              <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>UPI payment released to farmer on delivery confirmation. Safe and transparent.</p>
            </div>
          </div>

        </div>

        <div className="mt-[5vh] flex items-center gap-[1.5vw]">
          <div className="h-[0.3vh] flex-1 rounded-full" style={{ background: "rgba(74,222,128,0.3)" }} />
          <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.5)" }}>Zero commission. Full transparency.</p>
          <div className="h-[0.3vh] flex-1 rounded-full" style={{ background: "rgba(74,222,128,0.3)" }} />
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>08</span>
      </div>
    </div>
  );
}
