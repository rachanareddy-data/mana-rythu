export default function Slide08TechStack() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[1vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e)" }} />

      <div className="absolute inset-0 flex pt-[6vh] pb-[5vh] px-[7vw] gap-[5vw]">

        {/* Left: heading */}
        <div className="flex flex-col justify-center w-[28%]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[2vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>Engineering</p>
          <div className="w-[4vw] h-[0.35vh] mb-[3vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "4vw", color: "#052e16", textWrap: "balance" }}>Technology foundation</h2>
          <p className="font-display font-normal mt-[3vh]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.6 }}>Production-grade stack — type-safe from database schema to UI hook</p>
        </div>

        {/* Right: grouped tech tags */}
        <div className="flex-1 flex flex-col justify-center gap-[3vh]">

          {/* Frontend */}
          <div>
            <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.5vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.1em" }}>Frontend</p>
            <div className="flex flex-wrap gap-[1vw]">
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#052e16", color: "#4ade80" }}>React 18</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#052e16", color: "#4ade80" }}>Vite 7</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#052e16", color: "#4ade80" }}>TypeScript 5.9</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#052e16", color: "#4ade80" }}>Tailwind CSS v4</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#052e16", color: "#4ade80" }}>TanStack Query</span>
            </div>
          </div>

          <div className="w-full h-[0.2vh]" style={{ background: "#d1fae5" }} />

          {/* Backend */}
          <div>
            <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.5vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.1em" }}>Backend &amp; API</p>
            <div className="flex flex-wrap gap-[1vw]">
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>Express 5</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>Node.js 24</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>OpenAPI 3.0</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>Zod</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>Orval codegen</span>
            </div>
          </div>

          <div className="w-full h-[0.2vh]" style={{ background: "#d1fae5" }} />

          {/* Database + AI */}
          <div>
            <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.5vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.1em" }}>Data &amp; AI</p>
            <div className="flex flex-wrap gap-[1vw]">
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>PostgreSQL</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>Drizzle ORM</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>OpenAI GPT-4o</span>
              <span className="px-[1.5vw] py-[0.6vh] rounded-full font-display font-semibold" style={{ fontSize: "1.7vw", background: "#f0fdf4", color: "#052e16", border: "1.5px solid #bbf7d0" }}>pnpm workspaces</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>08 / 12</span>
      </div>
    </div>
  );
}
