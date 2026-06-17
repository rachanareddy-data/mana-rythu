import homeImg from "@assets/screenshots/home.jpg";
import marketplaceImg from "@assets/screenshots/marketplace.jpg";
import fairPriceImg from "@assets/screenshots/fair-price.jpg";
import chatImg from "@assets/screenshots/chat.jpg";

export default function Slide10Demo() {
  const panels = [
    { img: homeImg, label: "Home Dashboard", sub: "Weather · Mandi prices · Live stats" },
    { img: marketplaceImg, label: "Marketplace", sub: "Live crop listings · Price trends" },
    { img: fairPriceImg, label: "AI Fair Price", sub: "Instant price calculator" },
    { img: chatImg, label: "Real-Time Chat", sub: "Direct farmer ↔ buyer messaging" },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.12) 0%, transparent 60%)" }} />

      {/* Header */}
      <div className="absolute top-[3.5vh] left-0 right-0 flex flex-col items-center">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Live Demo</p>
        <h2 className="font-display font-extrabold text-white mt-[0.5vh]" style={{ fontSize: "3.8vw", lineHeight: 1 }}>See it in action</h2>
        <p className="font-display font-semibold mt-[0.8vh]" style={{ fontSize: "1.3vw", color: "rgba(74,222,128,0.7)", fontStyle: "italic" }}>
          All features demonstrated are currently implemented and functional.
        </p>
      </div>

      {/* 2×2 screenshot grid */}
      <div
        className="absolute"
        style={{
          top: "20vh",
          left: "5vw",
          right: "5vw",
          bottom: "3.5vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "1.8vw",
        }}
      >
        {panels.map(({ img, label, sub }) => (
          <div
            key={label}
            className="relative rounded-2xl overflow-hidden"
            style={{ border: "1.5px solid rgba(74,222,128,0.25)" }}
          >
            <img
              src={img}
              alt={label}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-[1.2vw] py-[1.2vh]"
              style={{ background: "linear-gradient(to top, rgba(5,46,22,0.92) 0%, transparent 100%)" }}
            >
              <p className="font-display font-bold text-white" style={{ fontSize: "1.6vw", lineHeight: 1.2 }}>{label}</p>
              <p className="font-display font-normal" style={{ fontSize: "1.2vw", color: "#4ade80" }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[1.5vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.2)" }}>13</span>
      </div>
    </div>
  );
}
