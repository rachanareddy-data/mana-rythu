export default function Slide05HowItWorks() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Left green side-bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[1vw]" style={{ background: "#15803d" }} />

      <div className="absolute inset-0 flex flex-col pt-[7vh] px-[7vw] pb-[6vh]">

        {/* Header */}
        <div className="mb-[5vh]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[1.5vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>How It Works</p>
          <div className="w-[4vw] h-[0.35vh] mb-[2vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold" style={{ fontSize: "4vw", color: "#052e16" }}>Three steps to a direct sale</h2>
        </div>

        {/* Flow diagram */}
        <div className="flex items-start gap-0 flex-1">

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-[8vw] h-[8vw] rounded-full flex items-center justify-center mb-[2.5vh]" style={{ background: "#052e16" }}>
              <span className="font-display font-extrabold text-white" style={{ fontSize: "3vw" }}>1</span>
            </div>
            <h3 className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>Farmer lists crop</h3>
            <p className="font-display font-normal px-[1vw]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>Farmer adds a crop listing with quantity, location, and asking price in under 2 minutes</p>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center justify-center pt-[3.5vh]" style={{ width: "8vw" }}>
            <div className="flex items-center gap-0">
              <div className="h-[0.3vh] w-[4vw]" style={{ background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderTop: "1vh solid transparent", borderBottom: "1vh solid transparent", borderLeft: "1.5vw solid #22c55e" }} />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-[8vw] h-[8vw] rounded-full flex items-center justify-center mb-[2.5vh]" style={{ background: "#15803d" }}>
              <span className="font-display font-extrabold text-white" style={{ fontSize: "3vw" }}>2</span>
            </div>
            <h3 className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>Buyer discovers</h3>
            <p className="font-display font-normal px-[1vw]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>Buyer searches by crop, location, or price — smart search surfaces the best matches</p>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center justify-center pt-[3.5vh]" style={{ width: "8vw" }}>
            <div className="flex items-center gap-0">
              <div className="h-[0.3vh] w-[4vw]" style={{ background: "#22c55e" }} />
              <div style={{ width: 0, height: 0, borderTop: "1vh solid transparent", borderBottom: "1vh solid transparent", borderLeft: "1.5vw solid #22c55e" }} />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-[8vw] h-[8vw] rounded-full flex items-center justify-center mb-[2.5vh]" style={{ background: "#22c55e" }}>
              <span className="font-display font-extrabold text-white" style={{ fontSize: "3vw" }}>3</span>
            </div>
            <h3 className="font-display font-bold mb-[1.5vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>Deal closed directly</h3>
            <p className="font-display font-normal px-[1vw]" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>Real-time chat lets farmer and buyer negotiate and close the deal — no middleman involved</p>
          </div>

        </div>

        {/* Bottom note */}
        <div className="mt-[3vh] pt-[2.5vh] flex items-center gap-[1.2vw]" style={{ borderTop: "1px solid #d1fae5" }}>
          <div className="w-[0.4vw] h-[0.4vw] rounded-full" style={{ background: "#22c55e" }} />
          <p className="font-display font-normal" style={{ fontSize: "1.7vw", color: "#6b7280" }}>Runs on mobile — works with low-bandwidth connections across rural Telangana &amp; AP</p>
        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>05 / 12</span>
      </div>
    </div>
  );
}
