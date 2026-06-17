export default function SlideBusinessModel() {
  const streams = [
    {
      num: "01",
      title: "Transaction Commission",
      detail: "A small percentage fee on each successfully completed crop deal on the platform.",
      when: "Phase 2",
      accent: "#16a34a",
    },
    {
      num: "02",
      title: "Premium Business Accounts",
      detail: "Verified bulk buyer accounts with enhanced visibility, trust badges, and analytics dashboards.",
      when: "Phase 2",
      accent: "#0891b2",
    },
    {
      num: "03",
      title: "Logistics Partnerships",
      detail: "Referral revenue from partnering with carriers for last-mile transport in Telangana & AP.",
      when: "Phase 3",
      accent: "#7c3aed",
    },
    {
      num: "04",
      title: "Future Financial Services",
      detail: "Crop financing, agri insurance, and input credit — integrated after establishing market trust.",
      when: "Phase 4+",
      accent: "#d97706",
    },
  ];

  return (
    <div
      className="w-screen h-screen overflow-hidden relative font-display"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.14) 0%, transparent 55%)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <p className="font-display font-semibold mb-[1vh]" style={{ fontSize: "1.3vw", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.2em" }}>Business Model</p>
        <h2 className="font-display font-extrabold text-center mb-[1.5vh]" style={{ fontSize: "4.2vw", color: "#14532d", lineHeight: 1 }}>
          How we plan to earn
        </h2>
        <div className="mb-[4vh] px-[2vw] py-[0.8vh] rounded-full" style={{ background: "rgba(22,163,74,0.12)", border: "1px solid #bbf7d0" }}>
          <p className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#15803d" }}>
            Currently in free launch phase — building marketplace trust first
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[2vw] w-full">
          {streams.map(({ num, title, detail, when, accent }) => (
            <div
              key={num}
              className="rounded-2xl flex items-start gap-[1.8vw] px-[2.5vw] py-[2.5vh]"
              style={{ background: "#ffffff", border: "1px solid #dcfce7", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-[1vh]">
                <div
                  className="rounded-xl flex items-center justify-center"
                  style={{ width: "4vw", height: "4vw", background: accent }}
                >
                  <span className="font-display font-extrabold text-white" style={{ fontSize: "1.8vw" }}>{num}</span>
                </div>
                <span
                  className="font-display font-semibold px-[0.8vw] py-[0.3vh] rounded-full"
                  style={{ fontSize: "1.05vw", background: "#f0fdf4", color: "#15803d", whiteSpace: "nowrap", border: "1px solid #bbf7d0" }}
                >
                  {when}
                </span>
              </div>
              <div>
                <p className="font-display font-bold" style={{ fontSize: "1.8vw", color: "#14532d", lineHeight: 1.2 }}>{title}</p>
                <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.35vw", color: "#4b5563", lineHeight: 1.4 }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#86efac" }}>10</span>
      </div>
    </div>
  );
}
