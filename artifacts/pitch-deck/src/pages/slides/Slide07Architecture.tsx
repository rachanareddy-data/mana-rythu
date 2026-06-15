export default function Slide07Architecture() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Architecture</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <h2 className="font-display font-extrabold mb-[5vh] text-center" style={{ fontSize: "3.8vw", color: "#052e16" }}>Type-safe, end-to-end</h2>

        <div className="flex items-center w-full">

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-xl flex flex-col items-center justify-center px-[1vw] py-[2vh] w-full" style={{ background: "#f0fdf4", border: "2px solid #22c55e" }}>
              <svg viewBox="0 0 48 36" fill="none" style={{ width: "4.5vw", height: "3.5vw" }}>
                <rect x="2" y="2" width="44" height="32" rx="4" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <line x1="2" y1="10" x2="46" y2="10" stroke="#15803d" strokeWidth="2" />
                <circle cx="8" cy="6" r="1.8" fill="#15803d" />
                <circle cx="14" cy="6" r="1.8" fill="#15803d" />
                <circle cx="20" cy="6" r="1.8" fill="#15803d" />
                <rect x="8" y="15" width="32" height="14" rx="2" fill="#dcfce7" />
              </svg>
              <p className="font-display font-bold mt-[1vh]" style={{ fontSize: "1.6vw", color: "#052e16" }}>React</p>
              <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280" }}>Vite + TypeScript</p>
            </div>
          </div>

          <div className="flex flex-col items-center mx-[1vw]" style={{ flexShrink: 0 }}>
            <div className="w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
            <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.2vw", color: "#22c55e" }}>OpenAPI</p>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-xl flex flex-col items-center justify-center px-[1vw] py-[2vh] w-full" style={{ background: "#052e16", border: "2px solid #15803d" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
                <path d="M8 16 L24 8 L40 16 L40 32 L24 40 L8 32 Z" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <path d="M8 16 L24 24 L40 16" stroke="#4ade80" strokeWidth="2" fill="none" />
                <line x1="24" y1="24" x2="24" y2="40" stroke="#4ade80" strokeWidth="2" />
              </svg>
              <p className="font-display font-bold mt-[1vh] text-white" style={{ fontSize: "1.6vw" }}>Express 5</p>
              <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#4ade80" }}>REST API + Zod</p>
            </div>
          </div>

          <div className="flex flex-col items-center mx-[1vw]" style={{ flexShrink: 0 }}>
            <div className="w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
            <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.2vw", color: "#22c55e" }}>Drizzle</p>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-xl flex flex-col items-center justify-center px-[1vw] py-[2vh] w-full" style={{ background: "#f0fdf4", border: "2px solid #22c55e" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
                <ellipse cx="24" cy="14" rx="18" ry="6" stroke="#15803d" strokeWidth="2.5" fill="#dcfce7" />
                <path d="M6 14 L6 34 C6 37.3 14.1 40 24 40 C33.9 40 42 37.3 42 34 L42 14" stroke="#15803d" strokeWidth="2.5" fill="none" />
                <path d="M6 24 C6 27.3 14.1 30 24 30 C33.9 30 42 27.3 42 24" stroke="#15803d" strokeWidth="2" fill="none" />
              </svg>
              <p className="font-display font-bold mt-[1vh]" style={{ fontSize: "1.6vw", color: "#052e16" }}>PostgreSQL</p>
              <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#6b7280" }}>Drizzle ORM</p>
            </div>
          </div>

          <div className="flex flex-col items-center mx-[1vw]" style={{ flexShrink: 0 }}>
            <div className="w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
            <p className="font-display font-semibold mt-[0.5vh]" style={{ fontSize: "1.2vw", color: "#22c55e" }}>API</p>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-xl flex flex-col items-center justify-center px-[1vw] py-[2vh] w-full" style={{ background: "#052e16", border: "2px solid #15803d" }}>
              <svg viewBox="0 0 48 48" fill="none" style={{ width: "4.5vw", height: "4.5vw" }}>
                <path d="M24 6 C20 14 12 16 8 20 C12 24 12 32 16 36 C20 40 28 40 32 36 C36 32 36 24 40 20 C36 16 28 14 24 6 Z" stroke="#4ade80" strokeWidth="2.5" fill="none" />
                <circle cx="24" cy="24" r="5" fill="#4ade80" />
              </svg>
              <p className="font-display font-bold mt-[1vh] text-white" style={{ fontSize: "1.6vw" }}>OpenAI</p>
              <p className="font-display font-normal" style={{ fontSize: "1.3vw", color: "#4ade80" }}>GPT-4o</p>
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
