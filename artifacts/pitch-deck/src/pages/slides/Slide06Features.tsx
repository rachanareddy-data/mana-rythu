export default function Slide06Features() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f7fdf9" }}>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[1vh]" style={{ background: "linear-gradient(90deg, #15803d, #22c55e)" }} />

      <div className="absolute inset-0 flex flex-col pt-[5.5vh] px-[7vw] pb-[5vh]">

        {/* Header */}
        <div className="mb-[4vh]">
          <p className="font-display font-semibold tracking-widest uppercase mb-[1.5vh]" style={{ fontSize: "1.3vw", color: "#15803d", letterSpacing: "0.15em" }}>Platform Features</p>
          <div className="w-[4vw] h-[0.35vh] mb-[2vh]" style={{ background: "#22c55e" }} />
          <h2 className="font-display font-extrabold" style={{ fontSize: "4vw", color: "#052e16" }}>Built for farms, designed for India</h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-[2.5vw] flex-1">

          {/* Feature 1 */}
          <div className="flex gap-[2vw] items-start p-[2.5vw] rounded-xl" style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(21,128,61,0.07)" }}>
            <div className="w-[4vw] h-[4vw] rounded-xl flex items-center justify-center shrink-0" style={{ background: "#052e16" }}>
              <div className="w-[2vw] h-[2vw] rounded-sm" style={{ background: "#4ade80" }} />
            </div>
            <div>
              <h3 className="font-display font-bold mb-[1vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>Crop Marketplace</h3>
              <p className="font-display font-normal" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>Live listings with crop photo, price, location, and availability — searchable by any buyer</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-[2vw] items-start p-[2.5vw] rounded-xl" style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(21,128,61,0.07)" }}>
            <div className="w-[4vw] h-[4vw] rounded-xl flex items-center justify-center shrink-0" style={{ background: "#052e16" }}>
              <div className="w-[1.8vw] h-[1.8vw] rounded-full" style={{ background: "#4ade80" }} />
            </div>
            <div>
              <h3 className="font-display font-bold mb-[1vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>Real-time Chat</h3>
              <p className="font-display font-normal" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>WhatsApp-style messaging with edit and delete support — farmers and buyers negotiate directly</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-[2vw] items-start p-[2.5vw] rounded-xl" style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(21,128,61,0.07)" }}>
            <div className="w-[4vw] h-[4vw] rounded-xl flex items-center justify-center shrink-0" style={{ background: "#052e16" }}>
              <div className="w-[2vw] h-[1.2vw] rounded-sm" style={{ background: "#4ade80" }} />
            </div>
            <div>
              <h3 className="font-display font-bold mb-[1vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>AI Farming Assistant</h3>
              <p className="font-display font-normal" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>OpenAI-powered guidance in Telugu and English — crop advice, weather, and pricing questions</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-[2vw] items-start p-[2.5vw] rounded-xl" style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(21,128,61,0.07)" }}>
            <div className="w-[4vw] h-[4vw] rounded-xl flex items-center justify-center shrink-0" style={{ background: "#052e16" }}>
              <div className="w-[1.8vw] h-[1.8vw]" style={{ background: "#4ade80", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            </div>
            <div>
              <h3 className="font-display font-bold mb-[1vh]" style={{ fontSize: "2.2vw", color: "#052e16" }}>Smart Search</h3>
              <p className="font-display font-normal" style={{ fontSize: "1.8vw", color: "#6b7280", lineHeight: 1.5 }}>Live suggestions with relevance scoring — search crops by name, location, or variety instantly</p>
            </div>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "#d1d5db" }}>06 / 12</span>
      </div>
    </div>
  );
}
