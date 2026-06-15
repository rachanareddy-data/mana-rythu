export default function Slide02Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>The Problem</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="font-display font-extrabold text-center mb-[6vh]" style={{ fontSize: "5.5vw", color: "#052e16", lineHeight: 1 }}>
          Farmers get <span style={{ color: "#dc2626" }}>30%</span> of what buyers pay
        </h2>

        {/* Visual chain */}
        <div className="flex items-center gap-0">

          {/* Farmer */}
          <div className="flex flex-col items-center">
            <div className="rounded-2xl flex flex-col items-center justify-center" style={{ width: "12vw", height: "12vw", background: "#f0fdf4", border: "2px solid #22c55e" }}>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="14" r="8" fill="#15803d" />
                <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#15803d" />
              </svg>
              <p className="font-display font-bold mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "#15803d" }}>Farmer</p>
            </div>
            <div className="mt-[1.5vh] rounded-full px-[1.5vw] py-[0.5vh]" style={{ background: "#dcfce7" }}>
              <p className="font-display font-extrabold" style={{ fontSize: "2vw", color: "#15803d" }}>30%</p>
            </div>
          </div>

          <div className="flex items-center mx-[1vw]">
            <div style={{ width: "2.5vw", height: "0.3vh", background: "#d1d5db" }} />
            <div style={{ width: 0, height: 0, borderTop: "0.7vh solid transparent", borderBottom: "0.7vh solid transparent", borderLeft: "0.9vw solid #d1d5db" }} />
          </div>

          {/* Trader 1 */}
          <div className="flex flex-col items-center">
            <div className="rounded-2xl flex flex-col items-center justify-center" style={{ width: "10vw", height: "10vw", background: "#fef9c3", border: "2px solid #fbbf24" }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="18" width="32" height="22" rx="3" fill="#f59e0b" />
                <path d="M16 18V14a8 8 0 0116 0v4" stroke="#92400e" strokeWidth="2.5" fill="none" />
                <circle cx="24" cy="29" r="3" fill="#92400e" />
              </svg>
              <p className="font-display font-bold mt-[0.5vh]" style={{ fontSize: "1.4vw", color: "#92400e" }}>Trader</p>
            </div>
          </div>

          <div className="flex items-center mx-[1vw]">
            <div style={{ width: "2.5vw", height: "0.3vh", background: "#d1d5db" }} />
            <div style={{ width: 0, height: 0, borderTop: "0.7vh solid transparent", borderBottom: "0.7vh solid transparent", borderLeft: "0.9vw solid #d1d5db" }} />
          </div>

          {/* Trader 2 */}
          <div className="flex flex-col items-center">
            <div className="rounded-2xl flex flex-col items-center justify-center" style={{ width: "10vw", height: "10vw", background: "#fef9c3", border: "2px solid #fbbf24" }}>
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="18" width="32" height="22" rx="3" fill="#f59e0b" />
                <path d="M16 18V14a8 8 0 0116 0v4" stroke="#92400e" strokeWidth="2.5" fill="none" />
                <circle cx="24" cy="29" r="3" fill="#92400e" />
              </svg>
              <p className="font-display font-bold mt-[0.5vh]" style={{ fontSize: "1.4vw", color: "#92400e" }}>Trader</p>
            </div>
          </div>

          <div className="flex items-center mx-[1vw]">
            <div style={{ width: "2.5vw", height: "0.3vh", background: "#d1d5db" }} />
            <div style={{ width: 0, height: 0, borderTop: "0.7vh solid transparent", borderBottom: "0.7vh solid transparent", borderLeft: "0.9vw solid #d1d5db" }} />
          </div>

          {/* Buyer */}
          <div className="flex flex-col items-center">
            <div className="rounded-2xl flex flex-col items-center justify-center" style={{ width: "12vw", height: "12vw", background: "#eff6ff", border: "2px solid #93c5fd" }}>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="14" r="8" fill="#3b82f6" />
                <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#3b82f6" />
              </svg>
              <p className="font-display font-bold mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "#1d4ed8" }}>Buyer</p>
            </div>
            <div className="mt-[1.5vh] rounded-full px-[1.5vw] py-[0.5vh]" style={{ background: "#dbeafe" }}>
              <p className="font-display font-extrabold" style={{ fontSize: "2vw", color: "#1d4ed8" }}>100%</p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>02</span>
      </div>
    </div>
  );
}
