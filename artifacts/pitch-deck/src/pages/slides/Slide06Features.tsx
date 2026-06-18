export default function Slide06Features() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.6vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e, #15803d)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw] py-[8vh]">

        <div className="text-center mb-[5vh]">
          <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Core Features</p>
          <h2 className="font-display font-extrabold" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1 }}>
            Everything farmers need. Nothing they don't.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-[3vw] w-full" style={{ maxWidth: "82vw" }}>

          <div className="rounded-2xl p-[3vw] flex items-start gap-[2vw]" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="8" y="12" width="32" height="28" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <line x1="8" y1="20" x2="40" y2="20" stroke="#4ade80" strokeWidth="2" />
                <circle cx="18" cy="30" r="4" stroke="#4ade80" strokeWidth="2" fill="none" />
                <line x1="26" y1="28" x2="36" y2="28" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                <line x1="26" y1="33" x2="32" y2="33" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>
            <div>
              <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16", lineHeight: 1 }}>Direct Marketplace</p>
              <p className="font-display font-normal mt-[1.2vh]" style={{ fontSize: "1.5vw", color: "#374151", lineHeight: 1.4 }}>Farmers list produce and buyers purchase directly — verified profiles, zero broker involvement.</p>
            </div>
          </div>

          <div className="rounded-2xl p-[3vw] flex items-start gap-[2vw]" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="6" y="10" width="22" height="16" rx="3" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <path d="M22 16 C30 10 42 14 42 22 C42 27 38 30 34 31 L35 37 L27 32" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="11" cy="18" r="2" fill="#4ade80" />
                <circle cx="17" cy="18" r="2" fill="#4ade80" />
              </svg>
            </div>
            <div>
              <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16", lineHeight: 1 }}>Real-time Chat</p>
              <p className="font-display font-normal mt-[1.2vh]" style={{ fontSize: "1.5vw", color: "#374151", lineHeight: 1.4 }}>Farmers and buyers negotiate live. AI assistant answers crop and pricing questions in Telugu.</p>
            </div>
          </div>

          <div className="rounded-2xl p-[3vw] flex items-start gap-[2vw]" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <path d="M8 36 L16 22 L24 28 L32 14 L40 8" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="16" cy="22" r="3" fill="#4ade80" />
                <circle cx="24" cy="28" r="3" fill="#4ade80" />
                <circle cx="32" cy="14" r="3" fill="#4ade80" />
                <line x1="8" y1="42" x2="40" y2="42" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
              </svg>
            </div>
            <div>
              <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16", lineHeight: 1 }}>Live Price Intelligence</p>
              <p className="font-display font-normal mt-[1.2vh]" style={{ fontSize: "1.5vw", color: "#374151", lineHeight: 1.4 }}>Real-time APMC mandi benchmarks shown next to every listing — farmers price with confidence.</p>
            </div>
          </div>

          <div className="rounded-2xl p-[3vw] flex items-start gap-[2vw]" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
            <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="8" y="14" width="32" height="22" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <line x1="8" y1="22" x2="40" y2="22" stroke="#4ade80" strokeWidth="2" />
                <rect x="14" y="28" width="6" height="4" rx="1" fill="#4ade80" opacity="0.8" />
                <rect x="24" y="28" width="10" height="4" rx="1" fill="#4ade80" opacity="0.5" />
                <path d="M14 14 L14 8 M34 14 L34 8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
            <div>
              <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16", lineHeight: 1 }}>Secure UPI Payments</p>
              <p className="font-display font-normal mt-[1.2vh]" style={{ fontSize: "1.5vw", color: "#374151", lineHeight: 1.4 }}>Escrow-protected UPI payments released on delivery — farmers get paid on time, every time.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>06</span>
      </div>
    </div>
  );
}
