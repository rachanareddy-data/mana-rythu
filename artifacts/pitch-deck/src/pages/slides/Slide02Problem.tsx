export default function Slide02Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#ffffff" }}>

      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>The Problem</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]">

        <h2 className="font-display font-extrabold text-center mb-[5vh]" style={{ fontSize: "4vw", color: "#052e16", lineHeight: 1 }}>
          Who profits from your harvest?
        </h2>

        <div className="flex items-center w-full" style={{ maxWidth: "86vw" }}>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center justify-center py-[2.5vh]" style={{ width: "100%", background: "#f0fdf4", border: "2.5px solid #22c55e" }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="32" cy="16" r="12" fill="#15803d" />
                <path d="M8 58c0-13.255 10.745-24 24-24s24 10.745 24 24" fill="#15803d" />
                <path d="M14 28 C14 28 10 20 18 18 C26 16 22 28 22 28" stroke="#4ade80" strokeWidth="2" fill="none" />
              </svg>
              <p className="font-display font-bold mt-[1.5vh]" style={{ fontSize: "2vw", color: "#15803d" }}>Farmer</p>
              <div className="mt-[1.5vh] px-[2vw] py-[0.8vh] rounded-full" style={{ background: "#15803d" }}>
                <p className="font-display font-extrabold text-white" style={{ fontSize: "2.5vw" }}>₹20/kg</p>
              </div>
              <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>receives</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: "0 0 14vw" }}>
            <svg viewBox="0 0 80 20" fill="none" style={{ width: "10vw", height: "3vw" }}>
              <line x1="2" y1="10" x2="66" y2="10" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              <polyline points="56,3 72,10 56,17" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <div className="mt-[1.5vh] px-[1.5vw] py-[0.6vh] rounded-lg" style={{ background: "#fef9c3", border: "1.5px solid #fbbf24" }}>
              <p className="font-display font-bold" style={{ fontSize: "1.3vw", color: "#92400e" }}>+₹20 taken</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center justify-center py-[2.5vh]" style={{ width: "100%", background: "#fef9c3", border: "2.5px solid #fbbf24" }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <rect x="10" y="24" width="44" height="30" rx="4" fill="#f59e0b" />
                <path d="M22 24V18a10 10 0 0120 0v6" stroke="#92400e" strokeWidth="3" fill="none" />
                <circle cx="32" cy="39" r="4" fill="#92400e" />
                <rect x="20" y="10" width="24" height="12" rx="2" fill="#fbbf24" />
                <line x1="28" y1="10" x2="28" y2="22" stroke="#92400e" strokeWidth="1.5" />
                <line x1="36" y1="10" x2="36" y2="22" stroke="#92400e" strokeWidth="1.5" />
              </svg>
              <p className="font-display font-bold mt-[1.5vh]" style={{ fontSize: "2vw", color: "#92400e" }}>Middlemen</p>
              <div className="mt-[1.5vh] px-[2vw] py-[0.8vh] rounded-full" style={{ background: "#f59e0b" }}>
                <p className="font-display font-extrabold text-white" style={{ fontSize: "2.5vw" }}>₹20/kg</p>
              </div>
              <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>profit</p>
            </div>
          </div>

          <div className="flex flex-col items-center" style={{ flex: "0 0 14vw" }}>
            <svg viewBox="0 0 80 20" fill="none" style={{ width: "10vw", height: "3vw" }}>
              <line x1="2" y1="10" x2="66" y2="10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
              <polyline points="56,3 72,10 56,17" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col items-center" style={{ flex: 1 }}>
            <div className="rounded-2xl flex flex-col items-center justify-center py-[2.5vh]" style={{ width: "100%", background: "#eff6ff", border: "2.5px solid #93c5fd" }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="32" cy="16" r="12" fill="#3b82f6" />
                <path d="M8 58c0-13.255 10.745-24 24-24s24 10.745 24 24" fill="#3b82f6" />
              </svg>
              <p className="font-display font-bold mt-[1.5vh]" style={{ fontSize: "2vw", color: "#1d4ed8" }}>Buyer</p>
              <div className="mt-[1.5vh] px-[2vw] py-[0.8vh] rounded-full" style={{ background: "#dc2626" }}>
                <p className="font-display font-extrabold text-white" style={{ fontSize: "2.5vw" }}>₹40/kg</p>
              </div>
              <p className="font-display font-normal mt-[1vh]" style={{ fontSize: "1.4vw", color: "#6b7280" }}>pays</p>
            </div>
          </div>

        </div>

        <div className="mt-[4vh] px-[4vw] py-[1.8vh] rounded-2xl" style={{ background: "#052e16" }}>
          <p className="font-display font-bold text-center text-white" style={{ fontSize: "2.2vw" }}>
            The farmer does the work. The middlemen take half.
          </p>
        </div>

      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>03</span>
      </div>
    </div>
  );
}
