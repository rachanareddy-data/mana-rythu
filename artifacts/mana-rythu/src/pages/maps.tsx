import { useState } from "react";
import { useListCrops } from "@workspace/api-client-react";
import { Link } from "wouter";
import { MapPin, Navigation, Leaf, ShieldCheck, Sprout, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function getCropImageSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/objects/")) return `/api/storage${url}`;
  return url;
}

const CATEGORY_COLORS: Record<string, string> = {
  Vegetables: "#22c55e",
  Fruits:     "#f59e0b",
  Grains:     "#84cc16",
  Spices:     "#ef4444",
  Other:      "#8b5cf6",
};

export default function Maps() {
  const { data: crops, isLoading } = useListCrops();
  const mapCrops = crops?.filter(c => c.latitude != null && c.longitude != null) || [];
  const [selected, setSelected] = useState<typeof mapCrops[number] | null>(null);

  const categoryStats = mapCrops.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] bg-[#0a0f0a] overflow-hidden">

      {/* ── Full-bleed map canvas ── */}
      <div className="absolute inset-0 z-0">
        {/* Satellite-feel base */}
        <div className="absolute inset-0 bg-[#0d1a10]" />

        {/* Grid lines (topographic feel) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fine" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4ade80" strokeWidth="0.5"/>
            </pattern>
            <pattern id="coarse" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#4ade80" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fine)" />
          <rect width="100%" height="100%" fill="url(#coarse)" />
        </svg>

        {/* Ambient glow pools */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-700/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-teal-700/10 rounded-full blur-[90px]" />
      </div>

      {/* ── India outline (decorative SVG) ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 400 500" className="w-[60vw] max-w-2xl h-auto opacity-[0.04]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="220" rx="130" ry="190" stroke="#4ade80" strokeWidth="1.5"/>
          <ellipse cx="200" cy="220" rx="80" ry="140" stroke="#4ade80" strokeWidth="0.8" strokeDasharray="4 4"/>
        </svg>
      </div>

      {/* ── Crop marker dots ── */}
      <div className="absolute inset-0 z-10">
        {mapCrops.map((crop, i) => {
          const latRange = 37 - 8;
          const lonRange = 97 - 68;
          const rawTop  = 100 - (((crop.latitude!  - 8)  / latRange) * 100);
          const rawLeft =       (((crop.longitude! - 68) / lonRange) * 100);
          const top  = Math.max(8, Math.min(88, rawTop));
          const left = Math.max(8, Math.min(90, rawLeft));
          const color = CATEGORY_COLORS[crop.category] ?? "#4ade80";
          const isSelected = selected?.id === crop.id;

          return (
            <motion.button
              key={crop.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, type: "spring", damping: 14 }}
              onClick={() => setSelected(isSelected ? null : crop)}
              className="absolute z-20 focus:outline-none"
              style={{ top: `${top}%`, left: `${left}%`, transform: "translate(-50%,-50%)" }}
            >
              {/* Ping ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ backgroundColor: color }}
              />
              {/* Core dot */}
              <span
                className={`relative flex h-4 w-4 rounded-full border-2 border-[#0a0f0a] shadow-lg transition-transform duration-200 ${isSelected ? "scale-150" : "hover:scale-125"}`}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 12px 3px ${color}55`,
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* ── Left info panel ── */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        className="relative z-30 w-72 shrink-0 flex flex-col gap-4 p-5 self-start mt-6 ml-5 pointer-events-auto"
      >
        {/* Title card */}
        <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl p-5 shadow-2xl">
          <h1 className="text-2xl font-display font-black text-white flex items-center gap-2.5 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-500/20">
              <Globe className="h-5 w-5 text-emerald-400" />
            </div>
            Crop Atlas
          </h1>
          <p className="text-white/40 text-sm">Live agri-intelligence across India</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/5 border border-white/8 p-3">
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Mapped</p>
              <p className="text-2xl font-black text-white font-display">
                {isLoading ? "…" : mapCrops.length}
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/8 p-3">
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">States</p>
              <p className="text-2xl font-black text-white font-display">
                {isLoading ? "…" : Object.keys(categoryStats).length}
              </p>
            </div>
          </div>
        </div>

        {/* Category legend */}
        {!isLoading && Object.keys(categoryStats).length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl p-4 shadow-xl">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Categories</p>
            <div className="space-y-2">
              {Object.entries(categoryStats).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[cat] ?? "#4ade80" }}
                    />
                    <span className="text-sm text-white/60 font-medium">{cat}</span>
                  </div>
                  <span className="text-xs font-bold text-white/40">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No GPS data notice */}
        {!isLoading && mapCrops.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl p-4 shadow-xl text-center">
            <Navigation className="h-8 w-8 text-white/20 mx-auto mb-2" />
            <p className="text-sm text-white/40">No geolocation data yet</p>
            <p className="text-xs text-white/25 mt-1">Listings with coordinates appear here</p>
          </div>
        )}
      </motion.aside>

      {/* ── Selected crop detail panel (right) ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
            className="absolute right-5 top-6 z-30 w-72 pointer-events-auto"
          >
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Image */}
              <div className="relative h-36 bg-white/5">
                {getCropImageSrc(selected.imageUrl) ? (
                  <img
                    src={getCropImageSrc(selected.imageUrl)!}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-5xl font-display font-black opacity-20"
                    style={{ color: CATEGORY_COLORS[selected.category] }}
                  >
                    {selected.name[0]}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Badges */}
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {selected.organic && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-xs font-bold">
                      <Leaf className="w-2.5 h-2.5" /> Organic
                    </span>
                  )}
                  {selected.verified && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/90 text-white text-xs font-bold">
                      <ShieldCheck className="w-2.5 h-2.5" /> Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-black text-white text-lg leading-tight">{selected.name}</h3>
                    <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {selected.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-black text-emerald-400 font-display">₹{selected.price}</p>
                    <p className="text-xs text-white/30">/{selected.unit}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/40 mb-4 pt-3 border-t border-white/8">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-[10px]">
                      {selected.farmerName[0]}
                    </div>
                    <span className="font-medium">{selected.farmerName}</span>
                  </div>
                  <span className="bg-white/5 border border-white/8 px-2 py-0.5 rounded-md">
                    {selected.qty} {selected.unit} left
                  </span>
                </div>

                <Link href={`/crop/${selected.id}`}>
                  <button className="w-full h-10 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-sm font-bold transition-all">
                    View Listing →
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom centre instruction ── */}
      {!isLoading && mapCrops.length > 0 && !selected && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-xs text-white/25 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/8 pointer-events-none"
        >
          Tap a marker to view crop details
        </motion.p>
      )}
    </div>
  );
}
