export default function Slide07Architecture() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[5vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Architecture</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      {/* Vertical flow diagram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-0">

          {/* Left: vertical pipeline */}
          <div className="flex flex-col items-center">

            {/* Layer 1 — React */}
            <div className="rounded-2xl flex items-center gap-[2vw] px-[3vw] py-[2vh]" style={{ width: "32vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#052e16" }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
                  {/* Browser/React icon */}
                  <rect x="4" y="6" width="40" height="30" rx="4" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <line x1="4" y1="14" x2="44" y2="14" stroke="#4ade80" strokeWidth="2" />
                  <circle cx="10" cy="10" r="2" fill="#4ade80" />
                  <circle cx="17" cy="10" r="2" fill="#4ade80" />
                  <circle cx="24" cy="24" r="6" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <line x1="24" y1="38" x2="24" y2="42" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="16" y1="42" x2="32" y2="42" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16" }}>React Frontend</p>
                <p className="font-display font-normal" style={{ fontSize: "1.4vw", color: "#6b7280" }}>Vite · TypeScript · Tailwind v4</p>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center my-[0.5vh]">
              <div style={{ width: "0.3vw", height: "2.5vh", background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderLeft: "0.8vw solid transparent", borderRight: "0.8vw solid transparent", borderTop: "1.2vh solid #22c55e" }} />
            </div>

            {/* Layer 2 — Express */}
            <div className="rounded-2xl flex items-center gap-[2vw] px-[3vw] py-[2vh]" style={{ width: "32vw", background: "#052e16", border: "2px solid #15803d" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#15803d" }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
                  {/* Server/API icon */}
                  <rect x="6" y="8" width="36" height="10" rx="3" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <rect x="6" y="22" width="36" height="10" rx="3" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <circle cx="38" cy="13" r="2" fill="#4ade80" />
                  <circle cx="38" cy="27" r="2" fill="#4ade80" />
                  <path d="M10 38 L24 42 L38 38" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div>
                <p className="font-display font-extrabold text-white" style={{ fontSize: "2.2vw" }}>Express API</p>
                <p className="font-display font-normal" style={{ fontSize: "1.4vw", color: "#4ade80" }}>Express 5 · Node 24 · Zod validation</p>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center my-[0.5vh]">
              <div style={{ width: "0.3vw", height: "2.5vh", background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderLeft: "0.8vw solid transparent", borderRight: "0.8vw solid transparent", borderTop: "1.2vh solid #22c55e" }} />
            </div>

            {/* Layer 3 — PostgreSQL */}
            <div className="rounded-2xl flex items-center gap-[2vw] px-[3vw] py-[2vh]" style={{ width: "32vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#052e16" }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
                  {/* Database icon */}
                  <ellipse cx="24" cy="12" rx="16" ry="5" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <path d="M8 12 L8 36 C8 38.76 15.16 41 24 41 C32.84 41 40 38.76 40 36 L40 12" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <path d="M8 22 C8 24.76 15.16 27 24 27 C32.84 27 40 24.76 40 22" stroke="#4ade80" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div>
                <p className="font-display font-extrabold" style={{ fontSize: "2.2vw", color: "#052e16" }}>PostgreSQL</p>
                <p className="font-display font-normal" style={{ fontSize: "1.4vw", color: "#6b7280" }}>Drizzle ORM · type-safe queries</p>
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center my-[0.5vh]">
              <div style={{ width: "0.3vw", height: "2.5vh", background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderLeft: "0.8vw solid transparent", borderRight: "0.8vw solid transparent", borderTop: "1.2vh solid #22c55e" }} />
            </div>

            {/* Layer 4 — OpenAI */}
            <div className="rounded-2xl flex items-center gap-[2vw] px-[3vw] py-[2vh]" style={{ width: "32vw", background: "#052e16", border: "2px solid #15803d" }}>
              <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "5.5vw", height: "5.5vw", background: "#15803d" }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: "3.5vw", height: "3.5vw" }}>
                  {/* AI/brain icon */}
                  <circle cx="24" cy="24" r="10" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                  <path d="M24 8 C20 16 12 18 8 22 C12 26 12 34 16 38" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M24 8 C28 16 36 18 40 22 C36 26 36 34 32 38" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <circle cx="24" cy="24" r="4" fill="#4ade80" />
                </svg>
              </div>
              <div>
                <p className="font-display font-extrabold text-white" style={{ fontSize: "2.2vw" }}>OpenAI Services</p>
                <p className="font-display font-normal" style={{ fontSize: "1.4vw", color: "#4ade80" }}>GPT-4o · multilingual AI assistant</p>
              </div>
            </div>

          </div>

          {/* Right: summary panel */}
          <div className="ml-[5vw] flex flex-col gap-[2.5vh]" style={{ width: "22vw" }}>
            <div>
              <p className="font-display font-extrabold" style={{ fontSize: "3.2vw", color: "#052e16", lineHeight: 1 }}>Type-safe</p>
              <p className="font-display font-extrabold" style={{ fontSize: "3.2vw", color: "#15803d", lineHeight: 1 }}>end-to-end</p>
            </div>
            <div className="w-[3vw] h-[0.4vh]" style={{ background: "#22c55e" }} />
            <div className="space-y-[1.5vh]">
              <div className="flex items-center gap-[1vw]">
                <div className="w-[0.8vw] h-[0.8vw] rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>OpenAPI contract</p>
              </div>
              <div className="flex items-center gap-[1vw]">
                <div className="w-[0.8vw] h-[0.8vw] rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>Orval codegen</p>
              </div>
              <div className="flex items-center gap-[1vw]">
                <div className="w-[0.8vw] h-[0.8vw] rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>React Query hooks</p>
              </div>
              <div className="flex items-center gap-[1vw]">
                <div className="w-[0.8vw] h-[0.8vw] rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                <p className="font-display font-semibold" style={{ fontSize: "1.6vw", color: "#374151" }}>Zod runtime safety</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>07</span>
      </div>
    </div>
  );
}
