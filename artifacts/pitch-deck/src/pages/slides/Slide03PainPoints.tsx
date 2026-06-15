export default function Slide03PainPoints() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(74,222,128,0.06) 0%, transparent 40%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[8vw]">
        <p className="font-display font-semibold mb-[5vh]" style={{ fontSize: "1.4vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>4 barriers</p>

        <div className="flex gap-[4vw] w-full">

          <div className="flex-1 text-center">
            <div className="mx-auto mb-[2vh] flex items-center justify-center" style={{ width: "6vw", height: "6vw" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="24" cy="24" r="20" stroke="#4ade80" strokeWidth="2" fill="none" />
                <line x1="24" y1="12" x2="24" y2="24" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
                <circle cx="24" cy="32" r="2.5" fill="#4ade80" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>No</p>
            <p className="font-display font-bold mt-[0.8vh]" style={{ fontSize: "1.9vw", color: "#4ade80" }}>Price visibility</p>
          </div>

          <div className="flex-1 text-center">
            <div className="mx-auto mb-[2vh] flex items-center justify-center" style={{ width: "6vw", height: "6vw" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="24" cy="24" r="20" stroke="#4ade80" strokeWidth="2" fill="none" />
                <polyline points="14,30 20,20 26,26 32,14 38,20" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>3–4x</p>
            <p className="font-display font-bold mt-[0.8vh]" style={{ fontSize: "1.9vw", color: "#4ade80" }}>Trader layers</p>
          </div>

          <div className="flex-1 text-center">
            <div className="mx-auto mb-[2vh] flex items-center justify-center" style={{ width: "6vw", height: "6vw" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="24" cy="24" r="20" stroke="#4ade80" strokeWidth="2" fill="none" />
                <line x1="14" y1="24" x2="34" y2="24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                <polyline points="28,17 35,24 28,31" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="10" y1="24" x2="14" y2="24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 3" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>Zero</p>
            <p className="font-display font-bold mt-[0.8vh]" style={{ fontSize: "1.9vw", color: "#4ade80" }}>Direct access</p>
          </div>

          <div className="flex-1 text-center">
            <div className="mx-auto mb-[2vh] flex items-center justify-center" style={{ width: "6vw", height: "6vw" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="24" cy="24" r="20" stroke="#4ade80" strokeWidth="2" fill="none" />
                <circle cx="24" cy="20" r="7" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <line x1="29" y1="26" x2="36" y2="33" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>No</p>
            <p className="font-display font-bold mt-[0.8vh]" style={{ fontSize: "1.9vw", color: "#4ade80" }}>AI guidance</p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.2)" }}>03</span>
      </div>
    </div>
  );
}
