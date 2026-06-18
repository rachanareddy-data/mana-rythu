export default function Slide08TechStack() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(34,197,94,0.1) 0%, transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <div className="text-center mb-[5.5vh]">
          <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Tech Stack</p>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "4vw", lineHeight: 1 }}>
            Built. Shipped. Running today.
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-[2vw] w-full mb-[2.5vw]">

          <div className="rounded-2xl p-[2.5vw] flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <svg viewBox="0 0 56 56" fill="none" style={{ width: "5vw", height: "5vw", marginBottom: "1.5vh" }}>
              <circle cx="28" cy="28" r="18" fill="#61DAFB" opacity="0.15" />
              <circle cx="28" cy="28" r="5" fill="#61DAFB" />
              <ellipse cx="28" cy="28" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2.5" fill="none" />
              <ellipse cx="28" cy="28" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2.5" fill="none" transform="rotate(60 28 28)" />
              <ellipse cx="28" cy="28" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2.5" fill="none" transform="rotate(120 28 28)" />
            </svg>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.7vw" }}>React + Vite</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.45)" }}>Typesafe SPA frontend</p>
          </div>

          <div className="rounded-2xl p-[2.5vw] flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <svg viewBox="0 0 56 56" fill="none" style={{ width: "5vw", height: "5vw", marginBottom: "1.5vh" }}>
              <rect x="10" y="10" width="36" height="36" rx="8" fill="#68A063" opacity="0.2" />
              <path d="M18 36 L18 22 L28 36 L38 22 L38 36" stroke="#68A063" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.7vw" }}>Node / Express 5</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.45)" }}>OpenAPI spec-first REST API</p>
          </div>

          <div className="rounded-2xl p-[2.5vw] flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <svg viewBox="0 0 56 56" fill="none" style={{ width: "5vw", height: "5vw", marginBottom: "1.5vh" }}>
              <rect x="8" y="16" width="40" height="24" rx="5" fill="#336791" opacity="0.25" />
              <ellipse cx="28" cy="16" rx="20" ry="6" fill="#336791" opacity="0.4" />
              <ellipse cx="28" cy="40" rx="20" ry="6" fill="#336791" opacity="0.2" />
              <line x1="8" y1="16" x2="8" y2="40" stroke="#336791" strokeWidth="2.5" />
              <line x1="48" y1="16" x2="48" y2="40" stroke="#336791" strokeWidth="2.5" />
            </svg>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.7vw" }}>PostgreSQL + Drizzle</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.45)" }}>Typed ORM, relational DB</p>
          </div>

          <div className="rounded-2xl p-[2.5vw] flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <svg viewBox="0 0 56 56" fill="none" style={{ width: "5vw", height: "5vw", marginBottom: "1.5vh" }}>
              <circle cx="28" cy="28" r="18" fill="#10a37f" opacity="0.15" />
              <path d="M20 36 C20 28 28 16 36 20 C40 22 38 30 32 32 C26 34 24 28 28 24" stroke="#10a37f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <p className="font-display font-bold text-white" style={{ fontSize: "1.7vw" }}>GPT-4o</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.45)" }}>Telugu + English AI chat</p>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-[2vw] w-full">

          <div className="rounded-2xl p-[2vw] flex items-center gap-[1.5vw]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <svg viewBox="0 0 40 40" fill="none" style={{ width: "3.5vw", height: "3.5vw", flexShrink: 0 }}>
              <rect x="6" y="8" width="28" height="24" rx="4" stroke="#a78bfa" strokeWidth="2" fill="none" />
              <path d="M14 18 L20 14 L26 18 L20 22 Z" stroke="#a78bfa" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
              <line x1="20" y1="22" x2="20" y2="28" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-display font-bold text-white" style={{ fontSize: "1.5vw" }}>TypeScript</p>
              <p className="font-display font-normal" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.4)" }}>End-to-end type safety</p>
            </div>
          </div>

          <div className="rounded-2xl p-[2vw] flex items-center gap-[1.5vw]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <svg viewBox="0 0 40 40" fill="none" style={{ width: "3.5vw", height: "3.5vw", flexShrink: 0 }}>
              <path d="M20 6 L6 14 L6 30 L20 38 L34 30 L34 14 Z" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinejoin="round" />
              <path d="M6 14 L20 22 L34 14" stroke="#06b6d4" strokeWidth="2" strokeLinejoin="round" fill="none" />
              <line x1="20" y1="22" x2="20" y2="38" stroke="#06b6d4" strokeWidth="2" />
            </svg>
            <div>
              <p className="font-display font-bold text-white" style={{ fontSize: "1.5vw" }}>Orval Codegen</p>
              <p className="font-display font-normal" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.4)" }}>Auto-generated API hooks</p>
            </div>
          </div>

          <div className="rounded-2xl p-[2vw] flex items-center gap-[1.5vw]" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <svg viewBox="0 0 40 40" fill="none" style={{ width: "3.5vw", height: "3.5vw", flexShrink: 0 }}>
              <circle cx="20" cy="20" r="12" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <path d="M14 20 C14 14 20 10 26 14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="26" cy="14" r="2" fill="#f59e0b" />
              <line x1="20" y1="20" x2="20" y2="28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-display font-bold text-white" style={{ fontSize: "1.5vw" }}>WebSocket Chat</p>
              <p className="font-display font-normal" style={{ fontSize: "1.1vw", color: "rgba(255,255,255,0.4)" }}>Real-time messaging layer</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>12</span>
      </div>
    </div>
  );
}
