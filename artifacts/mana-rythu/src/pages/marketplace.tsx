import { useState } from "react";
import { Link } from "wouter";
import { useListCrops } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, ShieldCheck, Leaf, SlidersHorizontal,
  ArrowRight, Sprout, X, ChevronDown,
} from "lucide-react";

function getCropImageSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/objects/")) return `/api/storage${url}`;
  return url;
}

const CATEGORIES = ["All", "Vegetables", "Fruits", "Grains", "Spices", "Other"];

const CATEGORY_IMAGES: Record<string, string> = {
  Vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop",
  Fruits:     "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop",
  Grains:     "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop",
  Spices:     "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop",
  Other:      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
};

function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/3 border border-white/8 animate-pulse">
      <div className="h-56 bg-white/8" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/8 rounded-full w-3/4" />
        <div className="h-4 bg-white/8 rounded-full w-1/2" />
        <div className="h-10 bg-white/8 rounded-2xl mt-4" />
      </div>
    </div>
  );
}

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (category !== "All") params.category = category;
  if (organicOnly) params.organic = "true";
  if (verifiedOnly) params.verified = "true";

  const { data: crops, isLoading } = useListCrops(params);

  const activeFilterCount = [
    category !== "All",
    organicOnly,
    verifiedOnly,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0a0f0a] pb-24">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2400&auto=format&fit=crop"
            alt="Fresh produce"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.18) saturate(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a]/60 to-[#0a0f0a]" />
        </div>

        <div className="relative z-10 container px-4 md:px-8 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Direct from farm</p>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4 leading-tight">
              The Marketplace
            </h1>
            <p className="text-white/50 text-lg max-w-xl mb-8">
              Browse verified produce from thousands of Indian farmers. No middlemen, honest prices.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="flex gap-3"
          >
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 pointer-events-none" />
              <input
                type="text"
                placeholder="Search produce, farmer, location…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/8 border border-white/12 text-white placeholder-white/30 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/40 backdrop-blur-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setFiltersOpen(v => !v)}
              className={`h-14 px-5 rounded-2xl border flex items-center gap-2 text-sm font-semibold transition-all ${
                filtersOpen || activeFilterCount > 0
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-white/8 border-white/12 text-white/60 hover:text-white hover:bg-white/12"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </motion.div>

          {/* Expandable filter row */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-3 items-center py-1">
                  {/* Category chips */}
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          category === cat
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white border border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="w-px h-8 bg-white/10 mx-1 hidden sm:block" />

                  {/* Toggle chips */}
                  <button
                    onClick={() => setOrganicOnly(v => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                      organicOnly
                        ? "bg-green-500/20 border-green-500/40 text-green-300"
                        : "bg-white/8 border-white/10 text-white/60 hover:text-white hover:bg-white/12"
                    }`}
                  >
                    <Leaf className="h-4 w-4" /> Organic
                  </button>
                  <button
                    onClick={() => setVerifiedOnly(v => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                      verifiedOnly
                        ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                        : "bg-white/8 border-white/10 text-white/60 hover:text-white hover:bg-white/12"
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4" /> Verified
                  </button>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setCategory("All"); setOrganicOnly(false); setVerifiedOnly(false); }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white/40 hover:text-white/70 transition-colors"
                    >
                      <X className="h-3 w-3" /> Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container px-4 md:px-8 pt-10">

        {/* Results count */}
        {!isLoading && crops && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/40 mb-6"
          >
            {crops.length} listing{crops.length !== 1 ? "s" : ""} found
            {category !== "All" && <> in <span className="text-white/60">{category}</span></>}
          </motion.p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : crops?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Sprout className="h-8 w-8 text-white/20" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">No produce found</h3>
            <p className="text-white/40 mb-6">Try different filters or a broader search term</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setOrganicOnly(false); setVerifiedOnly(false); }}
              className="px-6 py-2.5 rounded-full bg-white/8 border border-white/12 text-white/70 hover:bg-white/12 text-sm font-semibold transition-all"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {crops?.map((crop) => {
                const imgSrc = getCropImageSrc(crop.imageUrl) ?? CATEGORY_IMAGES[crop.category] ?? CATEGORY_IMAGES["Other"];
                return (
                  <motion.div
                    key={crop.id}
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
                    whileHover={{ y: -6 }}
                    layout
                    className="group relative rounded-3xl overflow-hidden border border-white/8 bg-white/3 cursor-pointer flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-white/5">
                      <img
                        src={imgSrc}
                        alt={crop.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {crop.organic && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/90 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                            <Leaf className="w-3 h-3" /> Organic
                          </span>
                        )}
                        {crop.verified && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/90 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/80 text-xs font-semibold border border-white/10">
                          {crop.category}
                        </span>
                      </div>

                      {/* Price pinned on image bottom */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-black/60 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10">
                          <span className="text-white font-black text-lg font-display">₹{crop.price}</span>
                          <span className="text-white/60 text-xs font-medium">/{crop.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="font-display font-black text-white text-lg leading-tight mb-2 group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {crop.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-white/40 text-sm mb-3">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                        <span className="line-clamp-1">{crop.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                            {crop.farmerName[0]}
                          </div>
                          <span className="text-sm text-white/50 font-medium truncate max-w-[100px]">{crop.farmerName}</span>
                        </div>
                        <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-lg border border-white/8">
                          {crop.qty} {crop.unit}
                        </span>
                      </div>

                      <Link href={`/crop/${crop.id}`}>
                        <button className="w-full h-11 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-500/40 text-emerald-300 text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn">
                          View Details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </Link>
                    </div>

                    {/* Hover glow ring */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-500/0 group-hover:ring-emerald-500/20 transition-all duration-500 pointer-events-none" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
