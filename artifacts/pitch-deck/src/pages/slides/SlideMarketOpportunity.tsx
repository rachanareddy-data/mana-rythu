export default function SlideMarketOpportunity() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#052e16" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.12) 0%, transparent 55%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">

        <div className="text-center mb-[6vh]">
          <p className="font-display font-semibold mb-[1.2vh]" style={{ fontSize: "1.2vw", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.2em" }}>Market Size</p>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: "4.5vw", lineHeight: 1 }}>
            The scale is undeniable
          </h2>
        </div>

        <div className="flex items-end gap-[3vw] w-full" style={{ maxWidth: "86vw" }}>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl w-full flex flex-col items-center justify-end pt-[3vh] pb-[3.5vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", height: "38vh" }}>
              <p className="font-display font-extrabold text-center" style={{ fontSize: "7.5vw", lineHeight: 1, color: "#4ade80" }}>₹30T</p>
              <p className="font-display font-bold text-white text-center mt-[1.5vh]" style={{ fontSize: "2vw", lineHeight: 1.2 }}>Agri Supply Chain</p>
              <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.45)" }}>India's total agri supply chain value<br />(Ministry of Agriculture)</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl w-full flex flex-col items-center justify-end pt-[3vh] pb-[3.5vh] px-[2vw]" style={{ background: "rgba(34,197,94,0.18)", border: "2.5px solid #22c55e", height: "54vh" }}>
              <p className="font-display font-extrabold text-center" style={{ fontSize: "7.5vw", lineHeight: 1, color: "#4ade80" }}>140M</p>
              <p className="font-display font-bold text-white text-center mt-[1.5vh]" style={{ fontSize: "2vw", lineHeight: 1.2 }}>Farm Holdings</p>
              <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.45)" }}>India's addressable grower base<br />(NSSO census)</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl w-full flex flex-col items-center justify-end pt-[3vh] pb-[3.5vh] px-[2vw]" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", height: "30vh" }}>
              <p className="font-display font-extrabold text-center" style={{ fontSize: "7.5vw", lineHeight: 1, color: "#4ade80" }}>350M</p>
              <p className="font-display font-bold text-white text-center mt-[1.5vh]" style={{ fontSize: "2vw", lineHeight: 1.2 }}>Rural Internet Users</p>
              <p className="font-display font-normal text-center mt-[1vh]" style={{ fontSize: "1.2vw", color: "rgba(255,255,255,0.45)" }}>Online rural population<br />(TRAI 2024)</p>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-[3vw] mt-[4vh]">
          <div className="h-[1px] flex-1" style={{ background: "rgba(74,222,128,0.2)" }} />
          <p className="font-display font-semibold" style={{ fontSize: "1.5vw", color: "rgba(255,255,255,0.35)" }}>
            Starting in Telangana &amp; AP — expanding across South India
          </p>
          <div className="h-[1px] flex-1" style={{ background: "rgba(74,222,128,0.2)" }} />
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "rgba(255,255,255,0.18)" }}>10</span>
      </div>
    </div>
  );
}
