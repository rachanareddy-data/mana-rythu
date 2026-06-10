import { useState } from "react";
import { Link } from "wouter";
import { useGetListings, getGetListingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, Filter, MapPin, Star, CheckCircle2, Package,
  Sprout, SlidersHorizontal, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const params: Record<string, string | number> = {};
  if (search) params.cropName = search;
  if (locationFilter) params.location = locationFilter;
  if (minPrice) params.minPrice = parseFloat(minPrice);
  if (maxPrice) params.maxPrice = parseFloat(maxPrice);

  const { data: listings, isLoading } = useGetListings(
    Object.keys(params).length ? params : undefined,
    { query: { queryKey: getGetListingsQueryKey(params) } }
  );

  const clearFilters = () => {
    setSearch(""); setLocationFilter(""); setMinPrice(""); setMaxPrice("");
  };
  const hasFilters = search || locationFilter || minPrice || maxPrice;

  return (
    <div className="flex h-full pb-20 lg:pb-0">
      {/* Filter sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card p-5 space-y-6">
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
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="e.g. Rice, Tomato..."
              className="mt-2 h-9 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</Label>
            <Input
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              placeholder="e.g. Hyderabad"
              className="mt-2 h-9 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Price Range (₹/kg)</Label>
            <div className="flex gap-2 mt-2">
              <Input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="h-9 text-sm" type="number" />
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="h-9 text-sm" type="number" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/90 backdrop-blur border-b border-border px-6 py-4">
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
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-2 shrink-0"
              onClick={() => setShowFilters(v => !v)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
            </Button>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 lg:hidden">
              <Input value={locationFilter} onChange={e => setLocationFilter(e.target.value)} placeholder="Location" className="h-9 text-sm" />
              <Input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min price" className="h-9 text-sm" type="number" />
              <Input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max price" className="h-9 text-sm" type="number" />
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-destructive hover:underline col-span-2 text-left">Clear all filters</button>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Loading..." : `${listings?.length ?? 0} listings found`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
            </div>
          ) : listings && listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map((l) => (
                <Link key={l.id} href={`/listing/${l.id}`} className="block group">
                    <Card className="border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                      {/* Image placeholder */}
                      <div className="h-36 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                        <Sprout className="w-14 h-14 text-green-400 group-hover:scale-110 transition-transform" />
                        {l.available && (
                          <Badge className="absolute top-3 left-3 text-xs">Available</Badge>
                        )}
                        {l.farmerVerified && (
                          <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground text-base leading-tight mb-1">{l.cropName}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{l.location}</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-xl font-bold text-primary">₹{l.price.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">/{l.unit}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Package className="w-3.5 h-3.5" />
                            <span>{l.quantity.toLocaleString()} {l.unit}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-[9px] font-bold text-primary">
                                {(l.farmerName ?? "F").slice(0, 1).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground truncate max-w-24">
                              {l.farmerName ?? "Unknown"}
                            </span>
                            {l.farmerVerified && <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />}
                          </div>
                          <StarRating rating={l.farmerRating ?? null} />
                        </div>
                      </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No listings found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {hasFilters ? "Try adjusting your filters." : "No crops are listed yet. Farmers can add listings from the Farmer Dashboard."}
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
