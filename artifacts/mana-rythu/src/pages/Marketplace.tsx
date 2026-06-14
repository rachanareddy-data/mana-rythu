import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useGetListings, getGetListingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth";
import { useLanguage } from "@/contexts/language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, Filter, MapPin, Star, CheckCircle2, Package,
  Sprout, SlidersHorizontal, X, TrendingUp, TrendingDown,
  Minus, Clock, Info, Plus, RefreshCw,
} from "lucide-react";
import TrustBadge from "@/components/TrustBadge";
import LogisticsEstimator from "@/components/LogisticsEstimator";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const POLL_INTERVAL = 15_000;

function TrendBadge({ trend, rising, stable, falling }: { trend: string; rising: string; stable: string; falling: string }) {
  if (trend === "up") return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> {rising}
    </span>
  );
  if (trend === "down") return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> {falling}
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> {stable}
    </span>
  );
}

export default function Marketplace() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [trendFilter, setTrendFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [justRefreshed, setJustRefreshed] = useState(false);

  const params: Record<string, string | number> = {};
  if (search) params.cropName = search;
  if (locationFilter) params.location = locationFilter;
  if (minPrice) params.minPrice = parseFloat(minPrice);
  if (maxPrice) params.maxPrice = parseFloat(maxPrice);
  if (trendFilter) params.trend = trendFilter;

  const listingParams = Object.keys(params).length ? params : undefined;
  const { data: listings, isLoading, isFetching } = useGetListings(
    listingParams,
    {
      query: {
        queryKey: getGetListingsQueryKey(listingParams),
        staleTime: 0,
        refetchInterval: POLL_INTERVAL,
        refetchIntervalInBackground: false,
      }
    }
  );

  useEffect(() => {
    if (!isFetching) {
      setLastRefresh(new Date());
      setJustRefreshed(true);
      const timer = setTimeout(() => setJustRefreshed(false), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isFetching]);

  const manualRefresh = () => {
    qc.invalidateQueries({ queryKey: getGetListingsQueryKey(listingParams) });
  };

  const clearFilters = () => {
    setSearch(""); setLocationFilter(""); setMinPrice(""); setMaxPrice(""); setTrendFilter("");
  };
  const hasFilters = !!(search || locationFilter || minPrice || maxPrice || trendFilter);
  const activeFilterCount = [search, locationFilter, minPrice, maxPrice, trendFilter].filter(Boolean).length;

  const trendOptions = [
    { value: "", label: t("allTrends") },
    { value: "up", label: `📈 ${t("rising")}` },
    { value: "stable", label: `➖ ${t("stable")}` },
    { value: "down", label: `📉 ${t("falling")}` },
  ];

  return (
    <div className="isolate flex h-full pb-20 lg:pb-0">

      {/* ── Filter sidebar — desktop ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card p-5 space-y-5 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" /> {t("filter")}
          </h2>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-destructive hover:underline">{t("clearAll")}</button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("cropName")}</Label>
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. Rice, Tomato..." className="mt-2 h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("location")}</Label>
            <Input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="e.g. Hyderabad" className="mt-2 h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("priceRange")} (₹/unit)</Label>
            <div className="flex gap-2 mt-2">
              <Input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="h-9 text-sm" type="number" />
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="h-9 text-sm" type="number" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t("marketTrend")}</Label>
            <div className="flex flex-col gap-1.5 mt-2">
              {trendOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTrendFilter(opt.value)}
                  className={cn(
                    "text-left text-sm px-3 py-2 rounded-lg border transition-colors",
                    trendFilter === opt.value
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={cn(
              "w-2 h-2 rounded-full transition-colors",
              isFetching ? "bg-amber-400 animate-pulse" : justRefreshed ? "bg-green-500" : "bg-green-400"
            )} />
            <span>
              {isFetching
                ? t("refreshing")
                : `${t("updated")} ${formatDistanceToNow(lastRefresh, { addSuffix: true })}`}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{t("autoRefreshes")}</p>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Sticky header ── */}
        <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            {/* Search bar */}
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 min-w-0">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t("searchCrops")}
                className="bg-transparent border-none outline-none text-sm flex-1 min-w-0"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Manual refresh */}
            <button
              onClick={manualRefresh}
              className={cn(
                "p-2.5 rounded-xl border border-border transition-all hover:bg-muted",
                isFetching && "animate-spin text-green-600"
              )}
              title="Refresh listings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Farmer: post crop */}
            {user?.role === "farmer" && (
              <Button size="sm" className="gap-1.5 shrink-0" onClick={() => navigate("/add-crop")}>
                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">{t("postCrop")}</span>
              </Button>
            )}

            {/* Mobile filters toggle */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-1.5 shrink-0 relative"
              onClick={() => setShowFilters(v => !v)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">{t("filter")}</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-border space-y-3 lg:hidden">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">{t("location")}</p>
                  <Input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="e.g. Warangal" className="h-9 text-sm" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1">{t("maxPriceLabel")}</p>
                  <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 100" className="h-9 text-sm" type="number" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase mb-1.5">{t("marketTrend")}</p>
                <div className="flex gap-2">
                  {trendOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setTrendFilter(opt.value)}
                      className={cn(
                        "flex-1 text-xs px-2 py-1.5 rounded-lg border transition-colors",
                        trendFilter === opt.value
                          ? "border-primary bg-primary/5 text-primary font-semibold"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-destructive hover:underline">{t("clearAll")} {t("filter").toLowerCase()}</button>
              )}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6">

          {/* Trust notice */}
          <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              {t("pricesIndicative")}
            </p>
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-foreground">
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <span>{listings?.length ?? 0} {t("cropsFound")}</span>
                )}
              </div>
              {/* Live dot */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isFetching ? "bg-amber-400 animate-pulse" : "bg-green-500"
                )} />
                <span className="hidden sm:inline">{isFetching ? t("refreshing") : t("live")}</span>
              </div>
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
                <X className="w-3 h-3" /> {t("clearFilters")}
              </button>
            )}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-2xl" />)}
            </div>
          ) : listings && listings.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {listings.map((l) => (
                <motion.div
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  whileTap={{ y: 1 }}
                  className="group"
                >
                  <Link href={`/listing/${l.id}`} className="block h-full">
                  <Card className="border border-border shadow-sm hover:shadow-xl transition-shadow cursor-pointer h-full overflow-hidden">
                    {/* Image */}
                    <div className="h-44 relative overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 flex items-center justify-center">
                      {l.imageUrl ? (
                        <img
                          src={l.imageUrl}
                          alt={l.cropName}
                          className="w-full h-full object-cover group-hover:brightness-105 transition-all duration-300"
                        />
                      ) : (
                        <Sprout className="w-16 h-16 text-green-300" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                        {l.available && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-white bg-green-600/90 backdrop-blur px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> {t("available")}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <TrendBadge trend={l.trend} rising={t("rising")} stable={t("stable")} falling={t("falling")} />
                      </div>
                      {l.farmerVerified && (
                        <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur rounded-full p-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground text-base leading-tight mb-1 group-hover:text-primary transition-colors">{l.cropName}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{l.location}</span>
                      </div>

                      {/* Price */}
                      <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 mb-2.5">
                        <p className="text-[10px] text-green-600 font-medium uppercase tracking-wide mb-0.5">{t("priceRange")}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-green-700">₹{l.minPrice.toLocaleString()} – ₹{l.maxPrice.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">/{l.unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <Package className="w-3.5 h-3.5 shrink-0" />
                        <span>{l.quantity.toLocaleString()} {l.unit} {t("available")}</span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-border">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-primary">
                              {(l.farmerName ?? "F").slice(0, 1).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate max-w-20">{l.farmerName ?? "Unknown"}</p>
                            <TrustBadge
                              trustScore={(l as any).farmerTrustScore ?? 50}
                              verified={l.farmerVerified ?? false}
                              size="sm"
                            />
                          </div>
                        </div>
                        {l.farmerRating ? (
                          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-semibold text-amber-700">{l.farmerRating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground italic shrink-0">{t("estPrice")}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 sm:py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center mb-4">
                <Sprout className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{t("nocropsFound")}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-4">
                {hasFilters ? t("tryAdjustFilters") : t("noListedYet")}
              </p>
              {hasFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="gap-1.5">
                  <X className="w-3.5 h-3.5" /> {t("clearFilters")}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* ── Book Transport — always visible at every screen size ── */}
        <div className="px-4 sm:px-6 pb-6">
          <LogisticsEstimator />
        </div>
      </div>
    </div>
  );
}
