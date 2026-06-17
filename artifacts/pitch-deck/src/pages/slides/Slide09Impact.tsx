export default function Slide09Impact() {
  const props = [
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
          <circle cx="28" cy="28" r="20" stroke="#4ade80" strokeWidth="3" fill="none" />
          <line x1="28" y1="16" x2="28" y2="32" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          <circle cx="28" cy="38" r="2.5" fill="#4ade80" />
        </svg>
      ),
      headline: "Full Price Transparency",
      body: "Farmers see live mandi market prices before listing. No guessing what their crop is worth.",
    },
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
          <circle cx="24" cy="22" r="14" stroke="#4ade80" strokeWidth="3" fill="none" />
          <line x1="34" y1="32" x2="48" y2="46" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="22" x2="28" y2="22" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="18" x2="24" y2="26" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      headline: "Faster Buyer Discovery",
      body: "A searchable live marketplace replaces cold calls and word-of-mouth. Buyers find crops by name, location, and trend.",
    },
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
          <text x="28" y="38" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#4ade80">₹</text>
          <path d="M10 44 L20 30 L28 36 L36 24 L46 32" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      headline: "Better Price Visibility",
      body: "AI fair price calculator suggests a grade-based price range so farmers never undersell their harvest.",
    },
    {
      icon: (
        <svg viewBox="0 0 56 56" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
          <path d="M8 36 L8 14 C8 12 10 10 12 10 L44 10 C46 10 48 12 48 14 L48 30 C48 32 46 34 44 34 L20 34 Z" fill="#4ade80" opacity="0.25" />
          <path d="M8 36 L8 14 C8 12 10 10 12 10 L44 10 C46 10 48 12 48 14 L48 30 C48 32 46 34 44 34 L20 34 Z" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          <line x1="18" y1="20" x2="38" y2="20" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="26" x2="30" y2="26" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      headline: "AI Guidance in Your Language",
      body: "GPT-4o answers farming questions in Telugu, English, and Hindi — with voice input and text-to-speech.",
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.10) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Impact</p>
        <h2 className="font-display font-extrabold text-white text-center mb-[5vh]" style={{ fontSize: "4.2vw", lineHeight: 1 }}>
          Measurable value for every farmer
        </h2>

        <div className="grid grid-cols-2 gap-[2vw] w-full">
          {props.map(({ icon, headline, body }) => (
            <div
              key={headline}
              className="rounded-2xl flex items-start gap-[2vw] px-[2.5vw] py-[2.5vh]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(74,222,128,0.2)" }}
            >
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ width: "6vw", height: "6vw", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
              >
                {icon}
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1.2 }}>{headline}</p>
                <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.35vw", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>12</span>
      </div>
    </div>
  );
}
