export default function Slide09Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(34,197,94,0.10) 0%, transparent 70%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]">

        <p className="font-display font-semibold mb-[2vh]" style={{ fontSize: "1.4vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Impact</p>
        <h2 className="font-display font-extrabold text-white text-center mb-[6vh]" style={{ fontSize: "4.5vw", lineHeight: 1.1 }}>
          Every rupee saved goes to the farmer
        </h2>

        {/* 3 cards */}
        <div className="flex gap-[3vw] w-full">

          {/* Card 1 */}
          <div className="flex-1 rounded-3xl flex flex-col items-center justify-center py-[4vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(74,222,128,0.3)" }}>
            <div className="rounded-2xl flex items-center justify-center mb-[2.5vh]" style={{ width: "8vw", height: "8vw", background: "#dc2626" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "5vw", height: "5vw" }}>
                {/* Ban/block icon */}
                <circle cx="30" cy="30" r="22" stroke="white" strokeWidth="3.5" fill="none" />
                <line x1="14" y1="14" x2="46" y2="46" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white text-center" style={{ fontSize: "5vw", lineHeight: 1 }}>0</p>
            <p className="font-display font-bold text-center mt-[1vh]" style={{ fontSize: "2vw", color: "#4ade80" }}>Middlemen</p>
            <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Farmers keep full margin</p>
          </div>

          {/* Card 2 */}
          <div className="flex-1 rounded-3xl flex flex-col items-center justify-center py-[4vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(74,222,128,0.3)" }}>
            <div className="rounded-2xl flex items-center justify-center mb-[2.5vh]" style={{ width: "8vw", height: "8vw", background: "#15803d" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "5vw", height: "5vw" }}>
                {/* Handshake icon */}
                <path d="M8 36 L22 22 L30 28 L38 20 L52 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M14 44 L46 44" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M20 36 C24 32 36 32 40 36" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white text-center" style={{ fontSize: "3.5vw", lineHeight: 1 }}>Direct</p>
            <p className="font-display font-bold text-center mt-[1vh]" style={{ fontSize: "2vw", color: "#4ade80" }}>Negotiation</p>
            <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Chat and close your deal</p>
          </div>

          {/* Card 3 */}
          <div className="flex-1 rounded-3xl flex flex-col items-center justify-center py-[4vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(74,222,128,0.3)" }}>
            <div className="rounded-2xl flex items-center justify-center mb-[2.5vh]" style={{ width: "8vw", height: "8vw", background: "#15803d" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "5vw", height: "5vw" }}>
                {/* AI/bot icon */}
                <rect x="10" y="20" width="40" height="28" rx="6" stroke="white" strokeWidth="3.5" fill="none" />
                <circle cx="22" cy="32" r="4" fill="white" />
                <circle cx="38" cy="32" r="4" fill="white" />
                <line x1="24" y1="40" x2="36" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <line x1="22" y1="20" x2="22" y2="14" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="38" y1="20" x2="38" y2="14" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="22" cy="12" r="2.5" fill="white" />
                <circle cx="38" cy="12" r="2.5" fill="white" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white text-center" style={{ fontSize: "3.5vw", lineHeight: 1 }}>AI</p>
            <p className="font-display font-bold text-center mt-[1vh]" style={{ fontSize: "2vw", color: "#4ade80" }}>Guidance 24/7</p>
            <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.55)" }}>Telugu &amp; English support</p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.2)" }}>09</span>
      </div>
    </div>
  );
}
