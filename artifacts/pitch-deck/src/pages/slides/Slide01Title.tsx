export default function Slide01Title() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      <div className="absolute left-0 top-0 bottom-0" style={{ width: "48vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full opacity-10" style={{ width: "28vw", height: "28vw", background: "#4ade80", top: "-6vw", left: "-8vw" }} />
        <div className="absolute rounded-full opacity-10" style={{ width: "18vw", height: "18vw", background: "#4ade80", bottom: "-4vw", right: "-4vw" }} />
        <div className="absolute inset-0 flex flex-col justify-center pl-[6vw]">
          <svg viewBox="0 0 100 100" fill="none" style={{ width: "5.5vw", height: "5.5vw", marginBottom: "2.5vh" }}>
            <path d="M50 90 L50 38" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 54 C36 54 22 44 22 28 C36 24 53 36 50 54" fill="#4ade80" opacity="0.95" />
            <path d="M50 72 C64 72 78 62 78 46 C64 42 47 54 50 72" fill="#22c55e" opacity="0.85" />
            <line x1="26" y1="94" x2="74" y2="94" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p className="font-display font-extrabold text-white" style={{ fontSize: "7.5vw", lineHeight: 0.9 }}>Mana</p>
          <p className="font-display font-extrabold" style={{ fontSize: "7.5vw", lineHeight: 0.9, color: "#4ade80" }}>Rythu</p>
          <p className="font-display font-semibold text-white mt-[3vh]" style={{ fontSize: "1.5vw", opacity: 0.5, letterSpacing: "0.05em" }}>మన రైతు</p>
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[6vw]" style={{ width: "52vw" }}>

        <p className="font-display font-extrabold" style={{ fontSize: "3.8vw", color: "#052e16", lineHeight: 1.1 }}>
          Farm to buyer.
          <br />
          <span style={{ color: "#16a34a" }}>Direct. Fair. Now.</span>
        </p>

        <p className="font-display font-normal mt-[2.5vh]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>
          An AI-powered marketplace connecting Telangana &amp; AP farmers directly to buyers — no brokers, no price manipulation.
        </p>

        <div className="mt-[5vh] pt-[4vh]" style={{ borderTop: "1.5px solid #e5e7eb" }}>
          <div className="flex items-center gap-[1.2vw] mb-[1.5vh]">
            <div style={{ width: "3px", height: "3.5vh", background: "#22c55e", borderRadius: "2px", flexShrink: 0 }} />
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#15803d" }}>Rachana Baddam</p>
              <p className="font-display font-normal" style={{ fontSize: "1.45vw", color: "#9ca3af" }}>M.S. Data Science · Saint Peter's University</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[2.5vw] mt-[3vh]">
          <div className="flex items-center gap-[0.7vw]">
            <div className="rounded-full" style={{ width: "0.8vw", height: "0.8vw", background: "#22c55e", flexShrink: 0 }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#6b7280" }}>Marketplace</p>
          </div>
          <div className="flex items-center gap-[0.7vw]">
            <div className="rounded-full" style={{ width: "0.8vw", height: "0.8vw", background: "#22c55e", flexShrink: 0 }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#6b7280" }}>AI Chat</p>
          </div>
          <div className="flex items-center gap-[0.7vw]">
            <div className="rounded-full" style={{ width: "0.8vw", height: "0.8vw", background: "#22c55e", flexShrink: 0 }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#6b7280" }}>Price Intel</p>
          </div>
          <div className="flex items-center gap-[0.7vw]">
            <div className="rounded-full" style={{ width: "0.8vw", height: "0.8vw", background: "#22c55e", flexShrink: 0 }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.35vw", color: "#6b7280" }}>UPI Payments</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>01</span>
      </div>
    </div>
  );
}
