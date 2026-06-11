import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useGetListings, getGetListingsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, Filter, MapPin, Star, CheckCircle2, Package,
  Sprout, SlidersHorizontal, X, TrendingUp, TrendingDown,
  Minus, Clock, Info, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up") return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> Rising
    </span>
  );
  if (trend === "down") return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> Falling
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> Stable
    </span>
  );
}

function PriceRange({ min, max, unit }: { min: number; max: number; unit: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold text-primary">₹{min.toLocaleString()} – ₹{max.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground">/{unit}</span>
    </div>
  );
}

export default function Marketplace() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [trendFilter, setTrendFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const params: Record<string, string | number> = {};
  if (search) params.cropName = search;
  if (locationFilter) params.location = locationFilter;
  if (minPrice) params.minPrice = parseFloat(minPrice);
  if (maxPrice) params.maxPrice = parseFloat(maxPrice);
  if (trendFilter) params.trend = trendFilter;

  const { data: listings, isLoading } = useGetListings(
    Object.keys(params).length ? params : undefined,
    { query: { queryKey: getGetListingsQueryKey(params) } }
  );

  const clearFilters = () => {
    setSearch(""); setLocationFilter(""); setMinPrice(""); setMaxPrice(""); setTrendFilter("");
  };
  const hasFilters = search || locationFilter || minPrice || maxPrice || trendFilter;

  return (
    <div className="flex h-full pb-20 lg:pb-0">
      {/* Filter sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card p-5 space-y-5 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h2>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-destructive hover:underline">Clear all</button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Crop Name</Label>
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. Rice, Tomato..." className="mt-2 h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</Label>
            <Input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="e.g. Hyderabad" className="mt-2 h-9 text-sm" />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Price Range (₹/{"{unit}"})</Label>
            <div className="flex gap-2 mt-2">
              <Input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="h-9 text-sm" type="number" />
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="h-9 text-sm" type="number" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Market Trend</Label>
            <div className="flex flex-col gap-2 mt-2">
              {[
                { value: "", label: "All trends" },
                { value: "up", label: "📈 Rising" },
                { value: "stable", label: "➖ Stable" },
                { value: "down", label: "📉 Falling" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTrendFilter(opt.value)}
                  className={cn(
                    "text-left text-sm px-3 py-1.5 rounded-lg border transition-colors",
                    trendFilter === opt.value
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:border-border"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search crops by name..."
                className="bg-transparent border-none outline-none text-sm flex-1 min-w-0"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {user?.role === "farmer" && (
              <Button size="sm" className="gap-1.5 shrink-0" onClick={() => navigate("/add-crop")}>
                <Plus className="w-4 h-4" /> Post Crop
              </Button>
            )}
            <Button variant="outline" size="sm" className="lg:hidden gap-2 shrink-0" onClick={() => setShowFilters(v => !v)}>
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {hasFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 lg:hidden">
              <Input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="Location" className="h-9 text-sm" />
              <Input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min price" className="h-9 text-sm" type="number" />
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max price" className="h-9 text-sm" type="number" />
              <select
                value={trendFilter}
                onChange={e => setTrendFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">All trends</option>
                <option value="up">📈 Rising</option>
                <option value="stable">➖ Stable</option>
                <option value="down">📉 Falling</option>
              </select>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-destructive hover:underline col-span-2 text-left">Clear all filters</button>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Trust notice */}
          <div className="flex items-start gap-2 mb-5 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              <span className="font-semibold">Source: Market Average (Estimated).</span> All prices shown are indicative ranges based on current mandi data. Final transaction price is between buyer and farmer.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Loading..." : `${listings?.length ?? 0} listings found`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
            </div>
          ) : listings && listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map((l) => (
                <Link key={l.id} href={`/listing/${l.id}`} className="block group">
                  <Card className="border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                    {/* Image */}
                    <div className="h-40 rounded-t-xl overflow-hidden relative bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center">
                      {l.imageUrl ? (
                        <img src={l.imageUrl} alt={l.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <Sprout className="w-16 h-16 text-green-400 group-hover:scale-110 transition-transform" />
                      )}
                      <div className="absolute top-2 left-2 flex gap-1.5">
                        {l.available && <Badge className="text-[10px] py-0 px-1.5">Available</Badge>}
                        {l.farmerVerified && (
                          <span className="bg-white/90 rounded-full p-1 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <TrendBadge trend={l.trend} />
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground text-base leading-tight mb-1">{l.cropName}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{l.location}</span>
                      </div>

                      <PriceRange min={l.minPrice} max={l.maxPrice} unit={l.unit} />

                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 mb-3">
                        <Package className="w-3.5 h-3.5" />
                        <span>{l.quantity.toLocaleString()} {l.unit} available</span>
                      </div>

                      {/* Trust labels */}
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-3 pb-3 border-b border-border">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>Updated {formatDistanceToNow(new Date(l.updatedAt), { addSuffix: true })}</span>
                        <span className="mx-1">·</span>
                        <span className="italic">Est. market price</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-primary">
                              {(l.farmerName ?? "F").slice(0, 1).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate max-w-24">{l.farmerName ?? "Unknown"}</span>
                          {l.farmerVerified && <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />}
                        </div>
                        {l.farmerRating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium">{l.farmerRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Sprout className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No listings found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {hasFilters ? "Try adjusting your filters." : "No crops are listed yet."}
              </p>
              {hasFilters && (
                <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>Clear filters</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
