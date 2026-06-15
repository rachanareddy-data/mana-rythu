export default function Slide11Roadmap() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[5vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Roadmap</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]">
        <h2 className="font-display font-extrabold text-center mb-[5vh]" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1 }}>
          What comes next
        </h2>

        <div className="flex w-full gap-[3vw]">

          {/* Next Release */}
          <div className="flex-1 rounded-3xl overflow-hidden" style={{ border: "2px solid #22c55e" }}>
            <div className="px-[2.5vw] py-[1.8vh]" style={{ background: "#052e16" }}>
              <p className="font-display font-extrabold text-white" style={{ fontSize: "2.2vw" }}>Next Release</p>
              <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#4ade80" }}>Not yet in codebase</p>
            </div>
            <div className="px-[2.5vw] py-[2.5vh] space-y-[2.2vh]" style={{ background: "#f0fdf4" }}>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#052e16" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <rect x="4" y="4" width="20" height="20" rx="4" stroke="#4ade80" strokeWidth="2" fill="none" />
                    <path d="M9 14 L13 18 L19 10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#052e16" }}>UPI / Razorpay Payments</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280" }}>Zero payment code exists in the repo today</p>
                </div>
              </div>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#052e16" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <circle cx="14" cy="10" r="6" stroke="#4ade80" strokeWidth="2" fill="none" />
                    <path d="M6 22 C7 17 21 17 22 22" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M18 6 L22 4 M22 10 L26 10" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Email &amp; SMS Alerts</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280" }}>In-app only; no SMTP/Twilio in codebase</p>
                </div>
              </div>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#052e16" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <path d="M14 4 C10 4 6 8 6 13 C6 20 14 24 14 24 C14 24 22 20 22 13 C22 8 18 4 14 4 Z" stroke="#4ade80" strokeWidth="2" fill="none" />
                    <circle cx="14" cy="13" r="3" fill="#4ade80" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Live Market Price API</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280" }}>Mandi prices are a static array today</p>
                </div>
              </div>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#052e16" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <path d="M4 18 C6 10 10 8 14 12 C18 16 22 10 24 6" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="14" cy="22" r="3" stroke="#4ade80" strokeWidth="2" fill="none" />
                    <line x1="8" y1="22" x2="20" y2="22" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Real Weather API</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280" }}>Weather endpoint returns hardcoded JSON</p>
                </div>
              </div>

            </div>
          </div>

          {/* Future Vision */}
          <div className="flex-1 rounded-3xl overflow-hidden" style={{ border: "2px solid #d1d5db" }}>
            <div className="px-[2.5vw] py-[1.8vh]" style={{ background: "#374151" }}>
              <p className="font-display font-extrabold text-white" style={{ fontSize: "2.2vw" }}>Future Vision</p>
              <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#9ca3af" }}>No code planned yet</p>
            </div>
            <div className="px-[2.5vw] py-[2.5vh] space-y-[2.2vh]" style={{ background: "#f9fafb" }}>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#374151" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <rect x="8" y="4" width="12" height="20" rx="3" stroke="#9ca3af" strokeWidth="2" fill="none" />
                    <line x1="11" y1="21" x2="17" y2="21" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#374151" }}>Mobile App</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#9ca3af" }}>Web-only today; React Native planned</p>
                </div>
              </div>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#374151" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <path d="M4 22 L10 12 L16 18 L20 10 L24 14" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="10" cy="12" r="2.5" fill="#9ca3af" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#374151" }}>Yield Prediction ML</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#9ca3af" }}>No ML model or training data in repo</p>
                </div>
              </div>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#374151" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <rect x="4" y="8" width="20" height="14" rx="2" stroke="#9ca3af" strokeWidth="2" fill="none" />
                    <path d="M10 4 L10 8 M18 4 L18 8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 14 L13 14 L13 18 L8 18 Z" fill="#9ca3af" opacity="0.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#374151" }}>Govt. Scheme Integration</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#9ca3af" }}>PM-KISAN / state scheme APIs not connected</p>
                </div>
              </div>

              <div className="flex items-start gap-[1.2vw]">
                <div className="rounded-lg flex items-center justify-center flex-shrink-0 mt-[0.2vh]" style={{ width: "3.2vw", height: "3.2vw", background: "#374151" }}>
                  <svg viewBox="0 0 28 28" fill="none" style={{ width: "2vw", height: "2vw" }}>
                    <rect x="4" y="14" width="20" height="10" rx="2" stroke="#9ca3af" strokeWidth="2" fill="none" />
                    <path d="M10 14 L10 10 C10 7 18 7 18 10 L18 14" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="14" cy="19" r="2" fill="#9ca3af" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold" style={{ fontSize: "1.7vw", color: "#374151" }}>Real Carrier Logistics</p>
                  <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#9ca3af" }}>Cost estimate only; no DTDC/BlueDart API</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>11</span>
      </div>
    </div>
  );
}
