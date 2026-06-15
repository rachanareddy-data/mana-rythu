export default function Slide05HowItWorks() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>How It Works</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-[6vw]">
        <div className="flex items-center gap-0 w-full">

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-full flex items-center justify-center mb-[2.5vh]" style={{ width: "14vw", height: "14vw", background: "#052e16" }}>
              <svg viewBox="0 0 80 80" fill="none" style={{ width: "8vw", height: "8vw" }}>
                <path d="M40 64 L40 32" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M40 44 C32 44 24 38 24 28 C34 28 42 34 40 44" fill="#4ade80" />
                <path d="M40 52 C48 52 56 46 56 36 C46 36 38 42 40 52" fill="#22c55e" />
                <line x1="20" y1="68" x2="60" y2="68" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-center" style={{ fontSize: "3vw", color: "#052e16" }}>List</p>
            <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.8vw", color: "#6b7280" }}>Farmer posts crop in 2 min</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center" style={{ width: "8vw" }}>
            <svg viewBox="0 0 60 20" fill="none" style={{ width: "8vw", height: "4vw" }}>
              <line x1="2" y1="10" x2="46" y2="10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              <polyline points="38,3 54,10 38,17" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-full flex items-center justify-center mb-[2.5vh]" style={{ width: "14vw", height: "14vw", background: "#15803d" }}>
              <svg viewBox="0 0 80 80" fill="none" style={{ width: "8vw", height: "8vw" }}>
                <circle cx="35" cy="35" r="18" stroke="#4ade80" strokeWidth="3.5" fill="none" />
                <line x1="49" y1="49" x2="62" y2="62" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="27" y1="35" x2="43" y2="35" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <line x1="35" y1="27" x2="35" y2="43" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-center" style={{ fontSize: "3vw", color: "#052e16" }}>Find</p>
            <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.8vw", color: "#6b7280" }}>Buyer searches by crop &amp; location</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center" style={{ width: "8vw" }}>
            <svg viewBox="0 0 60 20" fill="none" style={{ width: "8vw", height: "4vw" }}>
              <line x1="2" y1="10" x2="46" y2="10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
              <polyline points="38,3 54,10 38,17" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-full flex items-center justify-center mb-[2.5vh]" style={{ width: "14vw", height: "14vw", background: "#22c55e" }}>
              <svg viewBox="0 0 80 80" fill="none" style={{ width: "8vw", height: "8vw" }}>
                <path d="M14 52 L28 38 L36 46 L52 26 L66 38" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <polyline points="58,26 66,26 66,34" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p className="font-display font-extrabold text-center" style={{ fontSize: "3vw", color: "#052e16" }}>Deal</p>
            <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.8vw", color: "#6b7280" }}>Chat, negotiate, close directly</p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>05</span>
      </div>
    </div>
  );
}
