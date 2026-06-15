export default function Slide02Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Left green side-bar accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[1vw]" style={{ background: "#15803d" }} />

      {/* Content area */}
      <div className="absolute inset-0 flex">

        {/* Left: narrative */}
        <div className="flex flex-col justify-center pl-[8vw] pr-[4vw] w-[55%]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[2vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>The Problem</p>
          <div className="w-[4vw] h-[0.35vh] mb-[3vh]" style={{ background: "#22c55e" }} />

          <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "4.2vw", color: "#052e16", textWrap: "balance" }}>
            Farmers lose a large share of their crop value to middlemen
          </h2>

          <div className="mt-[4vh] space-y-[2vh]">
            <div className="flex items-start gap-[1.2vw]">
              <div className="w-[0.5vw] h-[0.5vw] rounded-full mt-[0.8vh] shrink-0" style={{ background: "#15803d" }} />
              <p className="font-display font-normal" style={{ fontSize: "2vw", color: "#374151", lineHeight: 1.5 }}>Crops move through 3–4 layers of traders before reaching buyers</p>
            </div>
            <div className="flex items-start gap-[1.2vw]">
              <div className="w-[0.5vw] h-[0.5vw] rounded-full mt-[0.8vh] shrink-0" style={{ background: "#15803d" }} />
              <p className="font-display font-normal" style={{ fontSize: "2vw", color: "#374151", lineHeight: 1.5 }}>Prices are set by intermediaries, not the market</p>
            </div>
            <div className="flex items-start gap-[1.2vw]">
              <div className="w-[0.5vw] h-[0.5vw] rounded-full mt-[0.8vh] shrink-0" style={{ background: "#15803d" }} />
              <p className="font-display font-normal" style={{ fontSize: "2vw", color: "#374151", lineHeight: 1.5 }}>Farmers have no visibility into what buyers actually pay</p>
            </div>
          </div>
        </div>

        {/* Right: big stat */}
        <div className="flex flex-col justify-center items-center w-[45%] pr-[6vw]">
          <div className="rounded-2xl p-[4vw] text-center w-full" style={{ background: "#052e16" }}>
            <p className="font-display font-extrabold leading-none" style={{ fontSize: "12vw", color: "#4ade80" }}>3–4x</p>
            <p className="font-display font-semibold mt-[2vh]" style={{ fontSize: "2vw", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
              layers of intermediaries between farmer and final buyer
            </p>
            <div className="mt-[2.5vh] w-[8vw] h-[0.3vh] mx-auto" style={{ background: "#22c55e", opacity: 0.5 }} />
            <p className="font-display font-normal mt-[2vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.45)" }}>India agricultural supply chain</p>
          </div>
        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>02 / 12</span>
      </div>
    </div>
  );
}
