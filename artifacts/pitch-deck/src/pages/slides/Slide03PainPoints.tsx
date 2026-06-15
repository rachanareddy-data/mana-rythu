export default function Slide03PainPoints() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[1vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e)" }} />

      <div className="absolute inset-0 flex flex-col pt-[4vh] px-[7vw] pb-[4vh]">

        {/* Header */}
        <div className="mb-[3vh]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[1vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>Root Causes</p>
          <div className="w-[4vw] h-[0.35vh] mb-[1.5vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold" style={{ fontSize: "3.8vw", color: "#052e16" }}>Four barriers farmers face daily</h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-[2vw] flex-1">

          {/* Card 1 */}
          <div className="rounded-xl p-[2.2vw]" style={{ background: "#f0fdf4", borderTop: "3px solid #15803d" }}>
            <div className="w-[2.5vw] h-[2.5vw] rounded-lg flex items-center justify-center mb-[1.2vh]" style={{ background: "#dcfce7" }}>
              <div className="w-[1.2vw] h-[1.2vw] rounded-full" style={{ background: "#15803d" }} />
            </div>
            <h3 className="font-display font-bold mb-[0.8vh]" style={{ fontSize: "2vw", color: "#052e16" }}>No price transparency</h3>
            <p className="font-display font-normal" style={{ fontSize: "1.7vw", color: "#6b7280", lineHeight: 1.5 }}>Farmers sell without knowing what buyers pay — prices are set by traders, not markets</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl p-[2.2vw]" style={{ background: "#f0fdf4", borderTop: "3px solid #15803d" }}>
            <div className="w-[2.5vw] h-[2.5vw] rounded-lg flex items-center justify-center mb-[1.2vh]" style={{ background: "#dcfce7" }}>
              <div className="w-[1.2vw] h-[1.2vw] rounded-full" style={{ background: "#15803d" }} />
            </div>
            <h3 className="font-display font-bold mb-[0.8vh]" style={{ fontSize: "2vw", color: "#052e16" }}>Middlemen margin</h3>
            <p className="font-display font-normal" style={{ fontSize: "1.7vw", color: "#6b7280", lineHeight: 1.5 }}>Each layer in the chain takes a cut — the farmer receives the least, the buyer pays the most</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl p-[2.2vw]" style={{ background: "#f0fdf4", borderTop: "3px solid #15803d" }}>
            <div className="w-[2.5vw] h-[2.5vw] rounded-lg flex items-center justify-center mb-[1.2vh]" style={{ background: "#dcfce7" }}>
              <div className="w-[1.2vw] h-[1.2vw] rounded-full" style={{ background: "#15803d" }} />
            </div>
            <h3 className="font-display font-bold mb-[0.8vh]" style={{ fontSize: "2vw", color: "#052e16" }}>No direct buyer access</h3>
            <p className="font-display font-normal" style={{ fontSize: "1.7vw", color: "#6b7280", lineHeight: 1.5 }}>Rural location and lack of digital tools means farmers cannot reach buyers independently</p>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl p-[2.2vw]" style={{ background: "#f0fdf4", borderTop: "3px solid #15803d" }}>
            <div className="w-[2.5vw] h-[2.5vw] rounded-lg flex items-center justify-center mb-[1.2vh]" style={{ background: "#dcfce7" }}>
              <div className="w-[1.2vw] h-[1.2vw] rounded-full" style={{ background: "#15803d" }} />
            </div>
            <h3 className="font-display font-bold mb-[0.8vh]" style={{ fontSize: "2vw", color: "#052e16" }}>No agronomic guidance</h3>
            <p className="font-display font-normal" style={{ fontSize: "1.7vw", color: "#6b7280", lineHeight: 1.5 }}>Crop and pricing decisions are made without data — advice is informal and inconsistent</p>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[3vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>03 / 12</span>
      </div>
    </div>
  );
}
