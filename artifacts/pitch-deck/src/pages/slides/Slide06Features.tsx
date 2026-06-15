export default function Slide06Features() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display" style={{ background: "#f8fafc" }}>

      <div className="absolute top-[6vh] left-[7vw]">
        <p className="font-display font-semibold" style={{ fontSize: "1.3vw", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.15em" }}>Platform</p>
        <div className="mt-[0.8vh] w-[3vw] h-[0.3vh]" style={{ background: "#22c55e" }} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[7vw]">
        <h2 className="font-display font-extrabold text-center mb-[6vh]" style={{ fontSize: "4.5vw", color: "#052e16" }}>Four tools. One platform.</h2>

        <div className="grid grid-cols-4 gap-[3vw] w-full">

          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl flex items-center justify-center mb-[2vh]" style={{ width: "10vw", height: "10vw", background: "#052e16" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <rect x="8" y="8" width="18" height="18" rx="3" fill="#4ade80" />
                <rect x="34" y="8" width="18" height="18" rx="3" fill="#4ade80" opacity="0.6" />
                <rect x="8" y="34" width="18" height="18" rx="3" fill="#4ade80" opacity="0.6" />
                <rect x="34" y="34" width="18" height="18" rx="3" fill="#4ade80" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Marketplace</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "#6b7280" }}>Live crop listings</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl flex items-center justify-center mb-[2vh]" style={{ width: "10vw", height: "10vw", background: "#052e16" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <path d="M8 42 L8 16 C8 14 10 12 12 12 L48 12 C50 12 52 14 52 16 L52 36 C52 38 50 40 48 40 L20 40 Z" fill="#4ade80" />
                <circle cx="22" cy="26" r="2.5" fill="#052e16" />
                <circle cx="30" cy="26" r="2.5" fill="#052e16" />
                <circle cx="38" cy="26" r="2.5" fill="#052e16" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Live Chat</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "#6b7280" }}>Negotiate directly</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl flex items-center justify-center mb-[2vh]" style={{ width: "10vw", height: "10vw", background: "#052e16" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="30" cy="30" r="18" stroke="#4ade80" strokeWidth="3" fill="none" />
                <path d="M22 26 C22 20 38 20 38 28 C38 34 30 34 30 38" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="30" cy="43" r="2.5" fill="#4ade80" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>AI Assistant</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "#6b7280" }}>Telugu &amp; English</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl flex items-center justify-center mb-[2vh]" style={{ width: "10vw", height: "10vw", background: "#052e16" }}>
              <svg viewBox="0 0 60 60" fill="none" style={{ width: "6vw", height: "6vw" }}>
                <circle cx="26" cy="22" r="10" stroke="#4ade80" strokeWidth="3" fill="none" />
                <line x1="34" y1="30" x2="50" y2="46" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display font-bold" style={{ fontSize: "2vw", color: "#052e16" }}>Smart Search</p>
            <p className="font-display font-normal mt-[0.8vh]" style={{ fontSize: "1.6vw", color: "#6b7280" }}>Instant results</p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-[3vh] right-[3vw]">
        <span className="font-display font-semibold" style={{ fontSize: "1.4vw", color: "#d1d5db" }}>06</span>
      </div>
    </div>
  );
}
