export default function Slide06Features() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f0fdf4" }}>

      <div className="absolute top-0 left-0 right-0 h-[1vh]" style={{ background: "linear-gradient(90deg, #15803d 0%, #22c55e 50%, #15803d 100%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw] py-[8vh]">

        <div className="text-center mb-[4.5vh]">
          <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Platform Features</p>
          <h2 className="font-display font-extrabold" style={{ fontSize: "3.8vw", color: "#052e16", lineHeight: 1 }}>
            Built for every side of the trade
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[2.5vw] w-full">

          <div className="rounded-2xl flex flex-col p-[2.5vw]" style={{ background: "white", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 16px rgba(22,163,74,0.08)" }}>
            <div className="rounded-xl mb-[1.5vh] flex items-center justify-center" style={{ width: "5vw", height: "5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <circle cx="20" cy="16" r="8" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <path d="M4 42c0-8.837 7.163-16 16-16" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <rect x="28" y="26" width="16" height="14" rx="3" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <line x1="36" y1="22" x2="36" y2="26" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="36" cy="20" r="2" fill="#4ade80" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>Farmer Portal</p>
            <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.4 }}>List produce, set prices, manage orders, and track earnings in one clean dashboard.</p>
          </div>

          <div className="rounded-2xl flex flex-col p-[2.5vw]" style={{ background: "white", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 16px rgba(22,163,74,0.08)" }}>
            <div className="rounded-xl mb-[1.5vh] flex items-center justify-center" style={{ width: "5vw", height: "5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="6" y="10" width="36" height="28" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <circle cx="16" cy="22" r="4" stroke="#4ade80" strokeWidth="2" fill="none" />
                <line x1="24" y1="20" x2="36" y2="20" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="26" x2="32" y2="26" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>Buyer Marketplace</p>
            <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.4 }}>Browse by crop, location, and price — with verified farmer profiles and real reviews.</p>
          </div>

          <div className="rounded-2xl flex flex-col p-[2.5vw]" style={{ background: "white", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 16px rgba(22,163,74,0.08)" }}>
            <div className="rounded-xl mb-[1.5vh] flex items-center justify-center" style={{ width: "5vw", height: "5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="6" y="10" width="22" height="16" rx="3" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <path d="M22 16 C28 11 42 14 42 22 C42 27 38 30 34 31 L35 37 L27 32" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="11" cy="18" r="2" fill="#4ade80" />
                <circle cx="17" cy="18" r="2" fill="#4ade80" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>Real-time Chat</p>
            <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.4 }}>Direct negotiation between farmers and buyers with AI support in Telugu and English.</p>
          </div>

          <div className="rounded-2xl flex flex-col p-[2.5vw]" style={{ background: "white", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 16px rgba(22,163,74,0.08)" }}>
            <div className="rounded-xl mb-[1.5vh] flex items-center justify-center" style={{ width: "5vw", height: "5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <path d="M8 36 L16 24 L24 30 L32 16 L40 10" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="16" cy="24" r="3" fill="#4ade80" />
                <circle cx="24" cy="30" r="3" fill="#4ade80" />
                <circle cx="32" cy="16" r="3" fill="#4ade80" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>Price Intelligence</p>
            <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.4 }}>Live APMC mandi benchmarks displayed alongside every listing so pricing stays fair.</p>
          </div>

          <div className="rounded-2xl flex flex-col p-[2.5vw]" style={{ background: "white", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 16px rgba(22,163,74,0.08)" }}>
            <div className="rounded-xl mb-[1.5vh] flex items-center justify-center" style={{ width: "5vw", height: "5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <circle cx="24" cy="24" r="16" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <path d="M24 8 C30 14 30 34 24 40" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M24 8 C18 14 18 34 24 40" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                <line x1="8" y1="24" x2="40" y2="24" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>Multilingual AI</p>
            <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.4 }}>GPT-4o assistant answers crop questions and advises on pricing in Telugu, Hindi, or English.</p>
          </div>

          <div className="rounded-2xl flex flex-col p-[2.5vw]" style={{ background: "white", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 16px rgba(22,163,74,0.08)" }}>
            <div className="rounded-xl mb-[1.5vh] flex items-center justify-center" style={{ width: "5vw", height: "5vw", background: "#052e16" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.2vw", height: "3.2vw" }}>
                <rect x="8" y="14" width="32" height="22" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <line x1="8" y1="22" x2="40" y2="22" stroke="#4ade80" strokeWidth="2" />
                <rect x="14" y="28" width="6" height="4" rx="1" fill="#4ade80" opacity="0.7" />
                <rect x="24" y="28" width="10" height="4" rx="1" fill="#4ade80" opacity="0.5" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#052e16" }}>Transparent Payments</p>
            <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.35vw", color: "#6b7280", lineHeight: 1.4 }}>UPI-integrated escrow ensures farmers are paid on time — every time.</p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#86efac" }}>06</span>
      </div>
    </div>
  );
}
