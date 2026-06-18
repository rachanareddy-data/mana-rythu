import homePng from "@assets/screenshots/home.jpg";
import marketplacePng from "@assets/screenshots/marketplace.jpg";
import chatPng from "@assets/screenshots/chat.jpg";
import fairPricePng from "@assets/screenshots/fair-price.jpg";

export default function Slide10Demo() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f0fdf4" }}>
      <div className="absolute top-0 left-0 right-0 h-[0.8vh]" style={{ background: "linear-gradient(90deg, #15803d 0%, #22c55e 100%)" }} />

      <div className="absolute inset-0 flex px-[5vw] py-[7vh] gap-[3vw]">

        <div className="flex flex-col justify-center" style={{ flex: "0 0 28vw" }}>
          <p className="font-display font-semibold mb-[1.5vh]" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Live Platform</p>
          <h2 className="font-display font-extrabold" style={{ fontSize: "3.8vw", color: "#052e16", lineHeight: 1.05 }}>
            The app is working today
          </h2>
          <p className="font-display font-normal mt-[2.5vh]" style={{ fontSize: "1.5vw", color: "#6b7280", lineHeight: 1.5 }}>
            Built end-to-end: farmer listings, buyer marketplace, real-time chat, and AI price assistant — all live.
          </p>
          <div className="mt-[4vh] rounded-2xl p-[2vw]" style={{ background: "#052e16" }}>
            <div className="flex items-center gap-[1vw] mb-[1.5vh]">
              <div className="rounded-full" style={{ width: "0.8vw", height: "0.8vw", background: "#4ade80" }} />
              <p className="font-display font-semibold text-white" style={{ fontSize: "1.4vw" }}>Stack</p>
            </div>
            <p className="font-display font-normal" style={{ fontSize: "1.25vw", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              React + Vite · Express 5 · PostgreSQL · Drizzle ORM · GPT-4o · TypeScript
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[1.5vw]" style={{ flex: 1 }}>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #bbf7d0", position: "relative" }}>
            <img src={homePng} alt="Mana Rythu home screen" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="absolute bottom-0 left-0 right-0 px-[1.2vw] py-[0.8vh]" style={{ background: "linear-gradient(to top, rgba(5,46,22,0.9) 0%, transparent 100%)" }}>
              <p className="font-display font-semibold text-white" style={{ fontSize: "1.2vw" }}>Home</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #bbf7d0", position: "relative" }}>
            <img src={marketplacePng} alt="Marketplace browse screen" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="absolute bottom-0 left-0 right-0 px-[1.2vw] py-[0.8vh]" style={{ background: "linear-gradient(to top, rgba(5,46,22,0.9) 0%, transparent 100%)" }}>
              <p className="font-display font-semibold text-white" style={{ fontSize: "1.2vw" }}>Marketplace</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #bbf7d0", position: "relative" }}>
            <img src={fairPricePng} alt="Fair price tool" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="absolute bottom-0 left-0 right-0 px-[1.2vw] py-[0.8vh]" style={{ background: "linear-gradient(to top, rgba(5,46,22,0.9) 0%, transparent 100%)" }}>
              <p className="font-display font-semibold text-white" style={{ fontSize: "1.2vw" }}>Fair Price Tool</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #bbf7d0", position: "relative" }}>
            <img src={chatPng} alt="Real-time chat" crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="absolute bottom-0 left-0 right-0 px-[1.2vw] py-[0.8vh]" style={{ background: "linear-gradient(to top, rgba(5,46,22,0.9) 0%, transparent 100%)" }}>
              <p className="font-display font-semibold text-white" style={{ fontSize: "1.2vw" }}>Real-time Chat</p>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#86efac" }}>demo</span>
      </div>
    </div>
  );
}
