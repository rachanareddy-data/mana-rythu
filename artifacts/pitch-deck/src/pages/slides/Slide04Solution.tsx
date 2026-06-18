export default function Slide04Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute left-0 top-0 bottom-0" style={{ width: "42vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full" style={{ width: "20vw", height: "20vw", background: "rgba(74,222,128,0.1)", top: "5vh", left: "5vw" }} />
        <div className="absolute rounded-full" style={{ width: "12vw", height: "12vw", background: "rgba(74,222,128,0.08)", bottom: "8vh", right: "3vw" }} />
        <div className="absolute inset-0 flex flex-col justify-center pl-[5vw] pr-[3vw]">
          <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.15em" }}>The Solution</p>
          <p className="font-display font-extrabold text-white mt-[1.5vh]" style={{ fontSize: "4.5vw", lineHeight: 1 }}>Mana</p>
          <p className="font-display font-extrabold" style={{ fontSize: "4.5vw", lineHeight: 1, color: "#4ade80" }}>Rythu</p>
          <p className="font-display font-semibold text-white mt-[3vh]" style={{ fontSize: "1.7vw", lineHeight: 1.4, opacity: 0.85 }}>A direct digital marketplace where farmers and buyers transact fairly — no middlemen needed.</p>
          <div className="mt-[4vh] rounded-2xl p-[2vw]" style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)" }}>
            <p className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw", lineHeight: 1 }}>
              <span style={{ color: "#4ade80" }}>50%</span> more
            </p>
            <p className="font-display font-semibold text-white mt-[0.8vh]" style={{ fontSize: "1.4vw", opacity: 0.7 }}>farmer income, on average</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[5vw]" style={{ width: "58vw" }}>
        <p className="font-display font-bold" style={{ fontSize: "1.6vw", color: "#6b7280", marginBottom: "2.5vh" }}>How we make it work</p>

        <div className="flex items-start gap-[2.5vw] mb-[3.5vh]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
              <circle cx="24" cy="16" r="8" stroke="#15803d" strokeWidth="2.5" fill="none" />
              <path d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M16 24 C16 24 12 18 18 16 C24 14 22 24 22 24" stroke="#22c55e" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Direct Farmer Listings</p>
            <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.45vw", color: "#6b7280", lineHeight: 1.4 }}>Farmers post produce at their price. Buyers browse and purchase directly — no brokers involved.</p>
          </div>
        </div>

        <div className="flex items-start gap-[2.5vw] mb-[3.5vh]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
              <rect x="6" y="10" width="22" height="16" rx="3" stroke="#15803d" strokeWidth="2.5" fill="none" />
              <circle cx="10" cy="18" r="2" fill="#15803d" />
              <circle cx="17" cy="18" r="2" fill="#15803d" />
              <path d="M22 16 C28 11 40 15 40 22 C40 26 37 28 34 30 L35 36 L28 31" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Real-time AI Chat</p>
            <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.45vw", color: "#6b7280", lineHeight: 1.4 }}>Negotiation, advice, and price guidance in Telugu and English — powered by GPT-4o.</p>
          </div>
        </div>

        <div className="flex items-start gap-[2.5vw]">
          <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
            <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
              <path d="M8 36 L16 24 L24 30 L32 18 L40 12" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="16" cy="24" r="2.5" fill="#22c55e" />
              <circle cx="24" cy="30" r="2.5" fill="#22c55e" />
              <circle cx="32" cy="18" r="2.5" fill="#22c55e" />
            </svg>
          </div>
          <div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Market Price Intelligence</p>
            <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.45vw", color: "#6b7280", lineHeight: 1.4 }}>Live market benchmarks from APMC mandis help farmers price confidently and fairly.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>05</span>
      </div>
    </div>
  );
}
