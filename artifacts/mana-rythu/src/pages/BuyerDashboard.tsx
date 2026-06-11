import { useState } from "react";
import { Link } from "wouter";
import { useGetListings, getGetListingsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/App";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, MapPin, Star, CheckCircle2, Package,
  Sprout, X, TrendingUp, TrendingDown, Minus,
  Clock, ShoppingCart, Filter, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

function TrendBadge({ trend }: { trend: string }) {
  const map: Record<string, { icon: any; label: string; cls: string }> = {
    up:     { icon: TrendingUp,   label: "Rising",  cls: "text-green-700 bg-green-50 border-green-200" },
    down:   { icon: TrendingDown, label: "Falling", cls: "text-red-600 bg-red-50 border-red-200" },
    stable: { icon: Minus,        label: "Stable",  cls: "text-yellow-700 bg-yellow-50 border-yellow-200" },
  };
  const { icon: Icon, label, cls } = map[trend] ?? map.stable;
  return (
    <span className={cn("flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border", cls)}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

const CROP_CATEGORIES = ["All", "Vegetables", "Grains", "Spices", "Fruits", "Cash Crops"];
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Vegetables: ["tomato", "onion", "potato", "brinjal", "cabbage", "okra", "carrot", "cauliflower"],
  Grains: ["rice", "wheat", "maize", "paddy", "bajra", "jowar"],
  Spices: ["chili", "turmeric", "ginger", "coriander", "pepper"],
  Fruits: ["mango", "banana", "papaya", "guava", "grape"],
  "Cash Crops": ["cotton", "groundnut", "sugarcane", "sunflower", "soybean"],
};

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [trendFilter, setTrendFilter] = useState("");
  const [category, setCategory] = useState("All");

  const params: Record<string, string | number> = {};
  if (location) params.location = location;
  if (minPrice) params.minPrice = parseFloat(minPrice);
  if (maxPrice) params.maxPrice = parseFloat(maxPrice);
  if (trendFilter) params.trend = trendFilter;

  const { data: allListings, isLoading } = useGetListings(
    Object.keys(params).length ? params : undefined,
    { query: { queryKey: getGetListingsQueryKey(params) } }
  );

  // Client-side search + category filter
  const listings = allListings?.filter(l => {
    const nameMatch = !search || l.cropName.toLowerCase().includes(search.toLowerCase());
    const catMatch = category === "All" || (CATEGORY_KEYWORDS[category] ?? []).some(k =>
      l.cropName.toLowerCase().includes(k)
    );
    return nameMatch && catMatch;
  });

  const hasFilters = search || location || minPrice || maxPrice || trendFilter || category !== "All";
  const clearAll = () => { setSearch(""); setLocation(""); setMinPrice(""); setMaxPrice(""); setTrendFilter(""); setCategory("All"); };

  return (
    <div className="flex flex-col h-full pb-20 lg:pb-0 overflow-hidden">
      {/* Hero header */}
      <div className="relative px-6 py-10 text-white shrink-0 overflow-hidden">
        {/* Farming background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80')" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/85 to-emerald-700/70" />

        <div className="relative">
          <h1 className="text-2xl font-bold mb-1">
            {user ? `Hello, ${user.name.split(" ")[0]}` : "Browse Crops"}
          </h1>
          <p className="text-green-100 text-sm mb-5">Find fresh produce directly from verified farmers</p>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm max-w-lg">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for tomato, rice, cotton..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground min-w-0"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-6 py-3 overflow-x-auto scrollbar-hide shrink-0 border-b border-border bg-card">
        {CROP_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
              category === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Filter sidebar — desktop */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border bg-card p-4 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filters
            </h2>
            {hasFilters && <button onClick={clearAll} className="text-xs text-destructive hover:underline">Clear</button>}
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Location</p>
              <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Warangal" className="h-8 text-xs" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Max Price (₹)</p>
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 100" className="h-8 text-xs" type="number" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Trend</p>
              {["", "up", "stable", "down"].map(t => (
                <button
                  key={t}
                  onClick={() => setTrendFilter(t)}
                  className={cn(
                    "flex items-center gap-1.5 w-full text-left text-xs px-2 py-1.5 rounded-lg transition-colors mb-1",
                    trendFilter === t ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {t === "" ? "All trends" : t === "up" ? "📈 Rising" : t === "stable" ? "➖ Stable" : "📉 Falling"}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Trust banner */}
          <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Source: Market Average (Estimated).</span> Prices are indicative ranges. Final price is negotiated between buyer and farmer.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Loading..." : `${listings?.length ?? 0} crops available`}
            </p>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-primary hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
            </div>
          ) : listings && listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {listings.map(l => (
                <Link key={l.id} href={`/listing/${l.id}`} className="block group">
                  <Card className="border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all h-full">
                    {/* Image */}
                    <div className="h-40 rounded-t-xl overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center relative">
                      {l.imageUrl ? (
                        <img src={l.imageUrl} alt={l.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <Sprout className="w-16 h-16 text-green-400 group-hover:scale-110 transition-transform" />
                      )}
                      <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                        {l.available && <Badge className="text-[10px] py-0 px-1.5">Available</Badge>}
                        {l.farmerVerified && (
                          <span className="bg-white/90 rounded-full p-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <TrendBadge trend={l.trend} />
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground text-base mb-1 leading-tight">{l.cropName}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{l.location}</span>
                      </div>

                      {/* Price range */}
                      <div className="flex items-baseline gap-0.5 mb-1">
                        <span className="text-base font-bold text-primary">₹{l.minPrice.toLocaleString()} – ₹{l.maxPrice.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">/{l.unit}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Package className="w-3 h-3" />{l.quantity.toLocaleString()} {l.unit}
                        <span className="mx-1">·</span>
                        <Clock className="w-3 h-3" />{formatDistanceToNow(new Date(l.updatedAt), { addSuffix: true })}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                            {(l.farmerName ?? "F").slice(0, 1).toUpperCase()}
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
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No crops found</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-4">
                {hasFilters ? "Try different search terms or filters." : "No crops are listed yet."}
              </p>
              {hasFilters && <Button variant="outline" size="sm" onClick={clearAll}>Clear filters</Button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
