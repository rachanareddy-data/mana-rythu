export default function Slide01Title() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>
      {/* Full-height green left panel */}
      <div className="absolute left-0 top-0 bottom-0" style={{ width: "48vw", background: "linear-gradient(160deg, #052e16 0%, #15803d 100%)" }}>
        <div className="absolute rounded-full opacity-10" style={{ width: "28vw", height: "28vw", background: "#4ade80", top: "-6vw", left: "-8vw" }} />
        <div className="absolute rounded-full opacity-10" style={{ width: "18vw", height: "18vw", background: "#4ade80", bottom: "-4vw", right: "-4vw" }} />
        <div className="absolute inset-0 flex flex-col justify-center pl-[6vw]">
          <div className="w-[4vw] h-[0.5vh] mb-[3vh]" style={{ background: "#4ade80" }} />
          <p className="font-display font-extrabold text-white" style={{ fontSize: "7.5vw", lineHeight: 0.9 }}>Mana</p>
          <p className="font-display font-extrabold" style={{ fontSize: "7.5vw", lineHeight: 0.9, color: "#4ade80" }}>Rythu</p>
        </div>
      </div>
      {/* Right panel */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pl-[5vw] pr-[5vw]" style={{ width: "52vw" }}>
        <p className="font-display font-extrabold leading-tight" style={{ fontSize: "3.5vw", color: "#052e16", lineHeight: 1.15 }}>
          Farm to buyer.<br />No middlemen.
        </p>
        <p className="font-display font-normal mt-[3vh]" style={{ fontSize: "2vw", color: "#6b7280" }}>
          Telangana &amp; Andhra Pradesh
        </p>
        <div className="mt-[6vh] pt-[3vh]" style={{ borderTop: "1px solid #e5e7eb" }}>
          <p className="font-display font-semibold" style={{ fontSize: "1.8vw", color: "#15803d" }}>Rachana Baddam</p>
          <p className="font-display font-normal mt-[0.5vh]" style={{ fontSize: "1.5vw", color: "#9ca3af" }}>M.S. Data Science · Saint Peter's University</p>
        </div>
      </div>
      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>01</span>
      </div>
    </div>
  );
}
