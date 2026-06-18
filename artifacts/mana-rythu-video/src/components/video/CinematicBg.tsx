export function CinematicBg({ overlay = 'rgba(5,46,22,0.65)' }: { overlay?: string }) {
  const BASE = import.meta.env.BASE_URL;
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Farmland video background */}
      <video
        src={`${BASE}videos/farmland.mp4`}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
      />
      {/* Color overlay */}
      <div className="absolute inset-0" style={{ background: overlay }} />
      {/* Subtle vignette */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
}
