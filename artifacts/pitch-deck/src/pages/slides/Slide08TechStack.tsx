export default function Slide08TechStack() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="font-display font-semibold mb-[4vh]" style={{ fontSize: "1.4vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.2em" }}>Tech Stack</p>
          <h2 className="font-display font-extrabold text-center mb-[5vh]" style={{ fontSize: "4vw", color: "#052e16" }}>Production-grade, fully typed</h2>

          <div className="flex gap-[2vw] mb-[2vw]">
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#052e16" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#4ade80" }} />
              <span className="font-display font-bold text-white" style={{ fontSize: "1.9vw" }}>React 18</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#052e16" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#4ade80" }} />
              <span className="font-display font-bold text-white" style={{ fontSize: "1.9vw" }}>Vite 7</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#052e16" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#4ade80" }} />
              <span className="font-display font-bold text-white" style={{ fontSize: "1.9vw" }}>TypeScript 5.9</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#052e16" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#4ade80" }} />
              <span className="font-display font-bold text-white" style={{ fontSize: "1.9vw" }}>Tailwind v4</span>
            </div>
          </div>

          <div className="flex gap-[2vw] mb-[2vw]">
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>Express 5</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>Node.js 24</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>OpenAPI + Zod</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>Orval codegen</span>
            </div>
          </div>

          <div className="flex gap-[2vw]">
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>PostgreSQL</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>Drizzle ORM</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>OpenAI GPT-4o</span>
            </div>
            <div className="flex items-center gap-[1vw] px-[2vw] py-[1.2vh] rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #22c55e" }}>
              <div className="w-[1.4vw] h-[1.4vw] rounded-full" style={{ background: "#15803d" }} />
              <span className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>pnpm workspaces</span>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>08</span>
      </div>
    </div>
  );
}
