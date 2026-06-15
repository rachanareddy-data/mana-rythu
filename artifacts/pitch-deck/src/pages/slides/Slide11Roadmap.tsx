export default function Slide11Roadmap() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Roadmap</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <h2 className="font-display font-extrabold text-center mb-[6vh]" style={{ fontSize: "4vw", color: "#052e16" }}>Three phases to scale</h2>

        {/* Timeline */}
        <div className="flex w-full gap-0 relative">

          {/* Connector line */}
          <div className="absolute" style={{ top: "5vw", left: "15vw", right: "15vw", height: "0.4vh", background: "#d1fae5", zIndex: 0 }} />

          {/* Phase 1 — Now */}
          <div className="flex-1 flex flex-col items-center text-center relative" style={{ zIndex: 1 }}>
            <div className="rounded-full flex items-center justify-center mb-[2.5vh]" style={{ width: "10vw", height: "10vw", background: "#052e16", border: "4px solid #22c55e" }}>
              <span className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw" }}>1</span>
            </div>
            <div className="rounded-xl px-[2vw] py-[1.5vh]" style={{ background: "#052e16" }}>
              <p className="font-display font-bold text-white" style={{ fontSize: "1.8vw" }}>NOW</p>
            </div>
            <div className="mt-[2vh] space-y-[0.8vh]">
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Live marketplace</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#052e16" }}>AI assistant</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Real-time chat</p>
            </div>
          </div>

          {/* Phase 2 — Next */}
          <div className="flex-1 flex flex-col items-center text-center relative" style={{ zIndex: 1 }}>
            <div className="rounded-full flex items-center justify-center mb-[2.5vh]" style={{ width: "10vw", height: "10vw", background: "#15803d", border: "4px solid #22c55e" }}>
              <span className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw" }}>2</span>
            </div>
            <div className="rounded-xl px-[2vw] py-[1.5vh]" style={{ background: "#f0fdf4", border: "2px solid #22c55e" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#15803d" }}>NEXT</p>
            </div>
            <div className="mt-[2vh] space-y-[0.8vh]">
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#052e16" }}>UPI payments</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Weather alerts</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#052e16" }}>Price prediction</p>
            </div>
          </div>

          {/* Phase 3 — Future */}
          <div className="flex-1 flex flex-col items-center text-center relative" style={{ zIndex: 1 }}>
            <div className="rounded-full flex items-center justify-center mb-[2.5vh]" style={{ width: "10vw", height: "10vw", background: "#f0fdf4", border: "4px solid #d1fae5" }}>
              <span className="font-display font-extrabold" style={{ fontSize: "3.5vw", color: "#6b7280" }}>3</span>
            </div>
            <div className="rounded-xl px-[2vw] py-[1.5vh]" style={{ background: "#f8fafc", border: "2px solid #e5e7eb" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#9ca3af" }}>FUTURE</p>
            </div>
            <div className="mt-[2vh] space-y-[0.8vh]">
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#6b7280" }}>Disease detection</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#6b7280" }}>Delivery tracking</p>
              <p className="font-display font-semibold" style={{ fontSize: "1.7vw", color: "#6b7280" }}>Multi-language</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>11</span>
      </div>
    </div>
  );
}
