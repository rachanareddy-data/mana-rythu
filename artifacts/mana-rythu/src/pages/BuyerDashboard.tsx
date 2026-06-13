import { useState } from "react";
import { Link } from "wouter";
import { useGetListings, getGetListingsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useLanguage } from "@/contexts/language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, MapPin, Star, CheckCircle2, Package,
  Sprout, X, TrendingUp, TrendingDown, Minus,
  Clock, ShoppingCart, SlidersHorizontal, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

function TrendBadge({ trend, rising, stable, falling }: { trend: string; rising: string; stable: string; falling: string }) {
  if (trend === "up") return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> {rising}
    </span>
  );
  if (trend === "down") return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> {falling}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> {stable}
    </span>
  );
}

const CATEGORIES = [
  { label: "All", keywords: [] },
  { label: "🌾 Grains", keywords: ["rice", "wheat", "maize", "paddy", "bajra", "jowar", "ragi"] },
  { label: "🍅 Vegetables", keywords: ["tomato", "onion", "potato", "brinjal", "cabbage", "okra", "carrot", "cauliflower", "beans", "peas"] },
  { label: "🌶️ Spices", keywords: ["chili", "turmeric", "ginger", "coriander", "pepper", "cumin"] },
  { label: "🥭 Fruits", keywords: ["mango", "banana", "papaya", "guava", "grape", "orange"] },
  { label: "💰 Cash Crops", keywords: ["cotton", "groundnut", "sugarcane", "sunflower", "soybean", "tobacco"] },
];

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [trendFilter, setTrendFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const apiParams: Record<string, string | number> = {};
  if (location) apiParams.location = location;
  if (maxPrice) apiParams.maxPrice = parseFloat(maxPrice);
  if (trendFilter) apiParams.trend = trendFilter;

  const apiParamsOrUndefined = Object.keys(apiParams).length ? apiParams : undefined;
  const { data: allListings, isLoading } = useGetListings(
    apiParamsOrUndefined,
    { query: { queryKey: getGetListingsQueryKey(apiParamsOrUndefined), staleTime: 0 } }
  );

  const listings = allListings?.filter(l => {
    const nameMatch = !search || l.cropName.toLowerCase().includes(search.toLowerCase());
    const catObj = CATEGORIES.find(c => c.label === category);
    const catMatch = category === "All" || !catObj?.keywords.length ||
      catObj.keywords.some(k => l.cropName.toLowerCase().includes(k));
    return nameMatch && catMatch;
  });

  const hasFilters = search || location || maxPrice || trendFilter || category !== "All";
  const clearAll = () => {
    setSearch(""); setLocation(""); setMaxPrice("");
    setTrendFilter(""); setCategory("All");
  };

  const firstName = user?.name?.split(" ")[0] ?? "Buyer";

  const trendOptions = [
    { value: "", label: t("allTrends") },
    { value: "up", label: `📈 ${t("rising")}` },
    { value: "stable", label: `➖ ${t("stable")}` },
    { value: "down", label: `📉 ${t("falling")}` },
  ];

  return (
    <div className="flex flex-col h-full pb-20 lg:pb-0 bg-gray-50/50">

      {/* ── Hero header ── */}
      <div className="bg-white border-b border-gray-100 px-5 py-5 shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {user ? `Hello, ${firstName} 👋` : t("browseCrops")}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">{t("browseFreshProduce")}</p>
            </div>
            {/* Stats pills */}
            <div className="hidden sm:flex items-center gap-3">
              {!isLoading && (
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  {listings?.length ?? 0} {t("available")}
                </span>
              )}
            </div>
          </div>

          {/* Search bar — prominent */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for tomato, rice, cotton, groundnut..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400 min-w-0"
            />
            {search ? (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-0.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                  category === cat.label
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-5xl w-full mx-auto">

        {/* ── Filter sidebar — desktop ── */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 px-4 py-5 space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-gray-700 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" /> {t("filter")}
            </h2>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-medium">{t("clearAll")}</button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t("location")}</p>
              <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Warangal" className="h-9 text-sm border-gray-200" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t("maxPriceLabel")}</p>
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 100" className="h-9 text-sm border-gray-200" type="number" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t("marketTrend")}</p>
              <div className="space-y-1">
                {trendOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setTrendFilter(opt.value)}
                    className={cn(
                      "flex items-center w-full text-left text-xs px-2.5 py-2 rounded-lg transition-colors",
                      trendFilter === opt.value
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main grid ── */}
        <div className="flex-1 overflow-y-auto p-4 lg:pl-0">

          {/* Trust banner */}
          <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              {t("pricesIndicative")}
            </p>
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {isLoading
                ? t("loading")
                : <><span className="font-semibold text-gray-800">{listings?.length ?? 0}</span> {t("cropsFound")}</>}
            </p>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                  <X className="w-3 h-3" /> {t("clearFilters")}
                </button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-1.5 h-8 text-xs border-gray-200"
                onClick={() => setShowMobileFilters(v => !v)}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> {t("filter")}
                {hasFilters && <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
              </Button>
            </div>
          </div>

          {/* Mobile filter drawer */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white border border-gray-100 rounded-2xl p-4 mb-4 shadow-sm grid grid-cols-2 gap-3">
              <Input value={location} onChange={e => setLocation(e.target.value)} placeholder={t("location")} className="h-9 text-sm" />
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder={t("maxPriceLabel")} className="h-9 text-sm" type="number" />
              <select
                value={trendFilter}
                onChange={e => setTrendFilter(e.target.value)}
                className="h-9 col-span-2 rounded-md border border-input bg-background px-3 text-sm"
              >
                {trendOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
            </div>
          ) : listings && listings.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {listings.map((l, idx) => (
                <motion.div
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                  whileHover={{ scale: 1.025, y: -4, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.975 }}
                  className="group"
                >
                  <Link href={`/listing/${l.id}`} className="block h-full">
                  <Card className="border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-white overflow-hidden h-full cursor-pointer">
                    {/* Image */}
                    <div className="h-44 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 relative overflow-hidden">
                      {l.imageUrl ? (
                        <img
                          src={l.imageUrl}
                          alt={l.cropName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sprout className="w-16 h-16 text-green-300 group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                      {/* Overlay badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                        {l.farmerVerified && (
                          <span className="bg-white/95 backdrop-blur rounded-full p-1 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          </span>
                        )}
                        {l.available && (
                          <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            FRESH
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <TrendBadge trend={l.trend} rising={t("rising")} stable={t("stable")} falling={t("falling")} />
                      </div>
                    </div>

                    <CardContent className="p-4">
                      {/* Name + location */}
                      <h3 className="font-bold text-gray-900 text-base mb-0.5 leading-tight">{l.cropName}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{l.location}</span>
                      </div>

                      {/* Price — prominent */}
                      <div className="bg-green-50 rounded-lg px-3 py-2 mb-3">
                        <p className="text-[10px] text-green-600 font-medium mb-0.5">{t("priceRange").toUpperCase()}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-green-700">₹{l.minPrice.toLocaleString()} – ₹{l.maxPrice.toLocaleString()}</span>
                          <span className="text-xs text-green-500">/{l.unit}</span>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Package className="w-3 h-3" />{l.quantity.toLocaleString()} {l.unit}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDistanceToNow(new Date(l.updatedAt), { addSuffix: true })}</span>
                      </div>

                      {/* Farmer row */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700">
                            {(l.farmerName ?? "F").slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-700 truncate max-w-20 block">{l.farmerName ?? "Farmer"}</span>
                            {l.farmerVerified && (
                              <span className="text-[9px] text-green-600 font-medium flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" /> {t("verified")}
                              </span>
                            )}
                          </div>
                        </div>
                        {l.farmerRating ? (
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-amber-700">{l.farmerRating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">{t("view")} →</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {hasFilters ? t("noCropsMatchFilter") : t("nocropsFound")}
              </h3>
              <p className="text-sm text-gray-500 mb-5 max-w-xs">
                {hasFilters ? t("adjustFiltersOrBrowse") : t("noListedYet")}
              </p>
              {hasFilters && (
                <Button variant="outline" size="sm" onClick={clearAll} className="border-gray-200">
                  {t("clearAll")} {t("filter").toLowerCase()}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
