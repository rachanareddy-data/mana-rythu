export default function Slide11Roadmap() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[1vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e)" }} />

      <div className="absolute inset-0 flex flex-col pt-[4.5vh] pb-[4vh] px-[7vw]">

        {/* Header */}
        <div className="mb-[3vh]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[1vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>What's Next</p>
          <div className="w-[4vw] h-[0.35vh] mb-[1.5vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold" style={{ fontSize: "3.8vw", color: "#052e16" }}>Product roadmap</h2>
        </div>

        {/* Roadmap table */}
        <div className="flex flex-col gap-[1vh] flex-1 justify-center">

          {/* Header row */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[0.8vh]">
            <div style={{ width: "2.5vw" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", flex: 3 }}>Feature</p>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", flex: 3 }}>Description</p>
            <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", flex: 1 }}>Priority</p>
          </div>
          <div className="w-full h-[0.15vh]" style={{ background: "#d1fae5" }} />

          {/* Row 1 */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[1.1vh] rounded-xl" style={{ background: "#ffffff" }}>
            <div className="w-[0.9vw] h-[0.9vw] rounded-full shrink-0" style={{ background: "#ef4444" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#052e16", flex: 3 }}>UPI Payments</p>
            <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "#6b7280", flex: 3 }}>In-app payment processing via UPI</p>
            <span className="px-[1.2vw] py-[0.3vh] rounded-full font-display font-semibold" style={{ fontSize: "1.4vw", background: "#fee2e2", color: "#dc2626", flex: 1 }}>High</span>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[1.1vh] rounded-xl" style={{ background: "#ffffff" }}>
            <div className="w-[0.9vw] h-[0.9vw] rounded-full shrink-0" style={{ background: "#ef4444" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#052e16", flex: 3 }}>Weather Alerts</p>
            <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "#6b7280", flex: 3 }}>Hyperlocal alerts for planting and harvest</p>
            <span className="px-[1.2vw] py-[0.3vh] rounded-full font-display font-semibold" style={{ fontSize: "1.4vw", background: "#fee2e2", color: "#dc2626", flex: 1 }}>High</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[1.1vh] rounded-xl" style={{ background: "#f8fafc" }}>
            <div className="w-[0.9vw] h-[0.9vw] rounded-full shrink-0" style={{ background: "#f59e0b" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#052e16", flex: 3 }}>Crop Price Prediction</p>
            <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "#6b7280", flex: 3 }}>ML model to forecast market prices 7–30 days ahead</p>
            <span className="px-[1.2vw] py-[0.3vh] rounded-full font-display font-semibold" style={{ fontSize: "1.4vw", background: "#fef3c7", color: "#d97706", flex: 1 }}>Medium</span>
          </div>

          {/* Row 4 */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[1.1vh] rounded-xl" style={{ background: "#f8fafc" }}>
            <div className="w-[0.9vw] h-[0.9vw] rounded-full shrink-0" style={{ background: "#f59e0b" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#052e16", flex: 3 }}>AI Disease Detection</p>
            <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "#6b7280", flex: 3 }}>Photo-based crop disease identification via computer vision</p>
            <span className="px-[1.2vw] py-[0.3vh] rounded-full font-display font-semibold" style={{ fontSize: "1.4vw", background: "#fef3c7", color: "#d97706", flex: 1 }}>Medium</span>
          </div>

          {/* Row 5 */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[1.1vh] rounded-xl" style={{ background: "#f8fafc" }}>
            <div className="w-[0.9vw] h-[0.9vw] rounded-full shrink-0" style={{ background: "#22c55e" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#052e16", flex: 3 }}>Delivery Tracking</p>
            <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "#6b7280", flex: 3 }}>End-to-end logistics tracking for shipments</p>
            <span className="px-[1.2vw] py-[0.3vh] rounded-full font-display font-semibold" style={{ fontSize: "1.4vw", background: "#dcfce7", color: "#15803d", flex: 1 }}>Planned</span>
          </div>

          {/* Row 6 */}
          <div className="flex items-center gap-[2vw] px-[2vw] py-[1.1vh] rounded-xl" style={{ background: "#f8fafc" }}>
            <div className="w-[0.9vw] h-[0.9vw] rounded-full shrink-0" style={{ background: "#22c55e" }} />
            <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#052e16", flex: 3 }}>Multi-language Support</p>
            <p className="font-display font-normal" style={{ fontSize: "1.6vw", color: "#6b7280", flex: 3 }}>Expand to Hindi, Kannada, and Marathi</p>
            <span className="px-[1.2vw] py-[0.3vh] rounded-full font-display font-semibold" style={{ fontSize: "1.4vw", background: "#dcfce7", color: "#15803d", flex: 1 }}>Planned</span>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[3vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>11 / 12</span>
      </div>
    </div>
  );
}
