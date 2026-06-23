export default function Slide02Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>The Problem</p>
        <h2 className="font-display font-extrabold mb-[1.5vh]" style={{ fontSize: "4.2vw", color: "#052e16", lineHeight: 1 }}>
          This isn't one farmer's struggle.
        </h2>
        <p className="font-display font-semibold mb-[6vh]" style={{ fontSize: "2vw", color: "#6b7280" }}>
          It's a structural failure affecting <span style={{ color: "#15803d", fontWeight: 800 }}>140 million</span> growers.
        </p>

        <div className="grid grid-cols-3 gap-[3vw] w-full" style={{ maxWidth: "84vw" }}>

          <div className="rounded-2xl p-[3vw] flex flex-col" style={{ background: "#fef2f2", border: "2px solid #fca5a5" }}>
            <div className="rounded-xl mb-[2vh] flex items-center justify-center" style={{ width: "5.5vw", height: "5.5vw", background: "#dc2626" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2.5" fill="none" />
                <line x1="24" y1="14" x2="24" y2="26" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <circle cx="24" cy="33" r="2.5" fill="white" />
              </svg>
            </div>
            <p className="font-display font-extrabold" style={{ fontSize: "2vw", color: "#991b1b", lineHeight: 1.1 }}>No Price Visibility</p>
            <p className="font-display font-semibold mt-[1.5vh]" style={{ fontSize: "1.4vw", color: "#6b7280", lineHeight: 1.4 }}>
              Farmers set prices blind — brokers exploit the gap.
            </p>
          </div>

          <div className="rounded-2xl p-[3vw] flex flex-col" style={{ background: "#fef9c3", border: "2px solid #fbbf24" }}>
            <div className="rounded-xl mb-[2vh] flex items-center justify-center" style={{ width: "5.5vw", height: "5.5vw", background: "#d97706" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="10" y="18" width="28" height="22" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
                <path d="M18 18V14a6 6 0 0112 0v4" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="24" cy="29" r="3" fill="white" />
              </svg>
            </div>
            <p className="font-display font-extrabold" style={{ fontSize: "2vw", color: "#92400e", lineHeight: 1.1 }}>No Direct Access</p>
            <p className="font-display font-semibold mt-[1.5vh]" style={{ fontSize: "1.4vw", color: "#6b7280", lineHeight: 1.4 }}>
              No direct buyer access — accept what's offered.
            </p>
          </div>

          <div className="rounded-2xl p-[3vw] flex flex-col" style={{ background: "#f5f3ff", border: "2px solid #c4b5fd" }}>
            <div className="rounded-xl mb-[2vh] flex items-center justify-center" style={{ width: "5.5vw", height: "5.5vw", background: "#7c3aed" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <path d="M8 40 L8 16 L24 8 L40 16 L40 40" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                <path d="M16 40 L16 28 L24 28 L24 40" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <line x1="12" y1="22" x2="20" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                <line x1="28" y1="22" x2="36" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                <line x1="28" y1="30" x2="36" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
            <p className="font-display font-extrabold" style={{ fontSize: "2vw", color: "#4c1d95", lineHeight: 1.1 }}>No Accountability</p>
            <p className="font-display font-semibold mt-[1.5vh]" style={{ fontSize: "1.4vw", color: "#6b7280", lineHeight: 1.4 }}>
              No receipts, contracts, or recourse ever.
            </p>
          </div>

        </div>

        <div className="mt-[5vh] px-[5vw] py-[2vh] rounded-2xl" style={{ background: "#052e16" }}>
          <p className="font-display font-bold text-center text-white" style={{ fontSize: "2vw" }}>
            Foundation broken at the core.{" "}
            <span style={{ color: "#4ade80" }}>Mana Rythu fixes it.</span>
          </p>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>03</span>
      </div>
    </div>
  );
}
