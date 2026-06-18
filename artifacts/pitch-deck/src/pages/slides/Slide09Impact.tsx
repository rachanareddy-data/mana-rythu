export default function Slide09Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Why Direct Trade Works</p>
        <h2 className="font-display font-extrabold text-white mb-[5.5vh]" style={{ fontSize: "4vw", lineHeight: 1 }}>
          The chain is broken by design.
        </h2>

        <div className="flex items-stretch gap-[3vw] w-full mb-[4vh]" style={{ maxWidth: "84vw" }}>

          <div className="flex flex-col justify-between rounded-2xl py-[4vh] px-[3vw]" style={{ flex: 1, background: "linear-gradient(145deg, rgba(34,197,94,0.2) 0%, rgba(22,163,74,0.1) 100%)", border: "2px solid #22c55e" }}>
            <div>
              <p className="font-display font-bold" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em" }}>Traditional market</p>
              <div className="flex items-center gap-[2vw] mt-[2.5vh]">
                <div>
                  <p className="font-display font-extrabold" style={{ fontSize: "6vw", color: "#4ade80", lineHeight: 1 }}>₹20</p>
                  <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.3vw", color: "rgba(255,255,255,0.5)" }}>farmer receives / kg</p>
                </div>
                <svg viewBox="0 0 60 24" fill="none" style={{ width: "5vw", flexShrink: 0 }}>
                  <line x1="2" y1="12" x2="48" y2="12" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                  <polyline points="40,5 50,12 40,19" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <div>
                  <p className="font-display font-extrabold" style={{ fontSize: "6vw", color: "rgba(255,255,255,0.55)", lineHeight: 1 }}>₹40</p>
                  <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.3vw", color: "rgba(255,255,255,0.5)" }}>buyer pays / kg</p>
                </div>
              </div>
              <p className="font-display font-semibold mt-[2vh]" style={{ fontSize: "1.4vw", color: "#dc2626" }}>
                ₹20 captured by 2–3 middlemen. Every time.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[2vh]" style={{ flex: 1 }}>

            <div className="rounded-2xl py-[2.5vh] px-[2.5vw] flex items-center gap-[2vw]" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#052e16", border: "2px solid #22c55e" }}>
                <span style={{ fontSize: "2.2vw" }}>₹0</span>
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1 }}>Zero commission</p>
                <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.25vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>Traditional mandis charge 10–25%. Mana Rythu charges nothing. The spread belongs to the farmer and buyer.</p>
              </div>
            </div>

            <div className="rounded-2xl py-[2.5vh] px-[2.5vw] flex items-center gap-[2vw]" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#052e16", border: "2px solid #22c55e" }}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.8vw", height: "2.8vw" }}>
                  <path d="M6 30 L12 18 L18 24 L26 10 L34 6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="12" cy="18" r="2.5" fill="#4ade80" />
                  <circle cx="18" cy="24" r="2.5" fill="#4ade80" />
                  <circle cx="26" cy="10" r="2.5" fill="#4ade80" />
                </svg>
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1 }}>Live APMC price data</p>
                <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.25vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>Farmers see the actual market rate before they negotiate — negotiating with data, not guesswork.</p>
              </div>
            </div>

            <div className="rounded-2xl py-[2.5vh] px-[2.5vw] flex items-center gap-[2vw]" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5vw", height: "5vw", background: "#052e16", border: "2px solid #22c55e" }}>
                <svg viewBox="0 0 40 40" fill="none" style={{ width: "2.8vw", height: "2.8vw" }}>
                  <circle cx="20" cy="20" r="12" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <path d="M14 20 C14 14 20 10 26 14" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="26" cy="14" r="2" fill="#4ade80" />
                  <line x1="20" y1="20" x2="20" y2="28" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw", lineHeight: 1 }}>AI negotiation in Telugu</p>
                <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.25vw", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>GPT-4o advises farmers on pricing, pest management, and logistics — in their own language.</p>
              </div>
            </div>

          </div>

        </div>

        <p className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.22)" }}>
          These are structural advantages of direct trade — not projections.
        </p>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.12)" }}>09</span>
      </div>
    </div>
  );
}
