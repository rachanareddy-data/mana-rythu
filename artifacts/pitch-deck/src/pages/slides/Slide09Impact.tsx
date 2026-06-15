export default function Slide09Impact() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)" }}>

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[35vw] h-[35vw] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(20%, -20%)" }} />
      <div className="absolute bottom-0 left-0 w-[25vw] h-[25vw] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #22c55e, transparent)", transform: "translate(-20%, 20%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-[12vw]">
        <p className="font-display font-semibold tracking-widest uppercase mb-[3vh]" style={{ fontSize: "1.4vw", color: "#4ade80", letterSpacing: "0.2em" }}>Why This Matters</p>
        <div className="w-[5vw] h-[0.4vh] mb-[4vh] mx-auto" style={{ background: "#22c55e" }} />

        <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "4.5vw", textWrap: "balance", lineHeight: 1.15 }}>
          Every rupee saved from a middleman goes directly back to the farmer's family
        </h2>

        <p className="font-display font-normal mt-[4vh]" style={{ fontSize: "2.2vw", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, textWrap: "balance" }}>
          Agriculture is the backbone of Telangana and Andhra Pradesh. Mana Rythu is economic infrastructure — not just a marketplace.
        </p>

        {/* Three impact stats */}
        <div className="mt-[5vh] flex gap-[5vw]">
          <div className="text-center">
            <div className="w-[4vw] h-[0.4vh] mb-[1.5vh] mx-auto" style={{ background: "#4ade80" }} />
            <p className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw" }}>0</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.6)" }}>middlemen in the transaction</p>
          </div>
          <div className="text-center">
            <div className="w-[4vw] h-[0.4vh] mb-[1.5vh] mx-auto" style={{ background: "#4ade80" }} />
            <p className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw" }}>Direct</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.6)" }}>farmer-to-buyer negotiation</p>
          </div>
          <div className="text-center">
            <div className="w-[4vw] h-[0.4vh] mb-[1.5vh] mx-auto" style={{ background: "#4ade80" }} />
            <p className="font-display font-extrabold text-white" style={{ fontSize: "3.5vw" }}>24/7</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "rgba(255,255,255,0.6)" }}>AI guidance in Telugu &amp; English</p>
          </div>
        </div>
      </div>

      {/* Slide number */}
      <div className="absolute bottom-[4vh] right-[5vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.2)" }}>09 / 12</span>
      </div>
    </div>
  );
}
