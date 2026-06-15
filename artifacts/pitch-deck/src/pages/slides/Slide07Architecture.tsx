export default function Slide07Architecture() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Left green side-bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[1vw]" style={{ background: "#15803d" }} />

      <div className="absolute inset-0 flex pt-[6vh] pb-[5vh] pl-[8vw] pr-[6vw] gap-[5vw]">

        {/* Left: heading */}
        <div className="flex flex-col justify-center w-[30%]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[2vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>System Design</p>
          <div className="w-[4vw] h-[0.35vh] mb-[3vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "4vw", color: "#052e16", textWrap: "balance" }}>System Architecture</h2>
          <p className="font-display font-normal mt-[3vh]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.6 }}>Contract-first API design with OpenAPI spec driving type-safe codegen for both client and server</p>
        </div>

        {/* Right: diagram */}
        <div className="flex-1 flex flex-col justify-center gap-[1.2vh]">

          {/* Layer 1 */}
          <div className="rounded-xl flex items-center gap-[2vw] px-[2.5vw] py-[2vh]" style={{ background: "#052e16" }}>
            <div className="w-[2vw] h-[2vw] rounded-full shrink-0" style={{ background: "#4ade80" }} />
            <div>
              <p className="font-display font-bold text-white" style={{ fontSize: "2vw" }}>Farmer / Buyer</p>
              <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.55)" }}>Mobile browser — Android, iOS, low-bandwidth</p>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0">
              <div className="w-[0.2vw] h-[1.5vh]" style={{ background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderLeft: "0.5vw solid transparent", borderRight: "0.5vw solid transparent", borderTop: "0.8vh solid #22c55e" }} />
            </div>
          </div>

          {/* Layer 2 */}
          <div className="rounded-xl flex items-center gap-[2vw] px-[2.5vw] py-[2vh]" style={{ background: "#15803d" }}>
            <div className="w-[2vw] h-[2vw] rounded-full shrink-0" style={{ background: "#dcfce7" }} />
            <div>
              <p className="font-display font-bold text-white" style={{ fontSize: "2vw" }}>React + Vite Frontend</p>
              <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.65)" }}>TypeScript, Tailwind CSS, TanStack Query, Framer Motion</p>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0">
              <div className="w-[0.2vw] h-[1.5vh]" style={{ background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderLeft: "0.5vw solid transparent", borderRight: "0.5vw solid transparent", borderTop: "0.8vh solid #22c55e" }} />
            </div>
          </div>

          {/* Layer 3 */}
          <div className="rounded-xl flex items-center gap-[2vw] px-[2.5vw] py-[2vh]" style={{ background: "#166534" }}>
            <div className="w-[2vw] h-[2vw] rounded-full shrink-0" style={{ background: "#dcfce7" }} />
            <div>
              <p className="font-display font-bold text-white" style={{ fontSize: "2vw" }}>Express 5 REST API</p>
              <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.65)" }}>Node.js 24, OpenAPI contract-first, Zod validation, Orval codegen</p>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0">
              <div className="w-[0.2vw] h-[1.5vh]" style={{ background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderLeft: "0.5vw solid transparent", borderRight: "0.5vw solid transparent", borderTop: "0.8vh solid #22c55e" }} />
            </div>
          </div>

          {/* Layer 4 + 5 side by side */}
          <div className="flex gap-[2vw]">
            <div className="flex-1 rounded-xl flex items-center gap-[1.5vw] px-[2vw] py-[2vh]" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
              <div className="w-[1.5vw] h-[1.5vw] rounded-full shrink-0" style={{ background: "#15803d" }} />
              <div>
                <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>PostgreSQL</p>
                <p className="font-display font-normal" style={{ fontSize: "1.5vw", color: "#6b7280" }}>Drizzle ORM, drizzle-zod</p>
              </div>
            </div>
            <div className="flex-1 rounded-xl flex items-center gap-[1.5vw] px-[2vw] py-[2vh]" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
              <div className="w-[1.5vw] h-[1.5vw] rounded-full shrink-0" style={{ background: "#15803d" }} />
              <div>
                <p className="font-display font-bold" style={{ fontSize: "1.9vw", color: "#052e16" }}>OpenAI GPT-4o</p>
                <p className="font-display font-normal" style={{ fontSize: "1.5vw", color: "#6b7280" }}>AI assistant, guidance</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>07 / 12</span>
      </div>
    </div>
  );
}
