import { Link } from "wouter";
import {
  useGetDashboardSummary, useGetMarketPrices,
  useGetRecommendedCrops, useGetWeather,
} from "@workspace/api-client-react";
import { useAuth } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cloud, Droplets, TrendingUp, TrendingDown, Minus,
  Users, ShoppingBag, Sprout, BarChart2, Plus, ArrowRight,
  CheckCircle2, Leaf, Star, ShoppingCart, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: any; color: string }) {
  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          </div>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", color)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-yellow-500" />;
}

function DemandBadge({ level }: { level: string }) {
  const cls = level === "high"
    ? "bg-green-100 text-green-700 border-green-200"
    : level === "medium"
    ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-gray-100 text-gray-600 border-gray-200";
  return <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0.5 border capitalize", cls)}>{level}</Badge>;
}

export default function Home() {
  const { user } = useAuth();
  const { data: summary, isLoading: sumLoading } = useGetDashboardSummary();
  const { data: prices, isLoading: pricesLoading } = useGetMarketPrices();
  const { data: crops, isLoading: cropsLoading } = useGetRecommendedCrops();
  const { data: weather, isLoading: weatherLoading } = useGetWeather();

  const isFarmer = user?.role === "farmer";
  const isBuyer = user?.role === "buyer";
  const isAdmin = user?.role === "admin";

  return (
    <div className="pb-24 lg:pb-8">
      {/* Hero section */}
      <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 px-6 py-10 overflow-hidden">
        {/* Subtle texture dots */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-green-200" />
            <span className="text-green-200 text-sm font-medium">Mana Rythu — Farmer's Marketplace</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
            {user
              ? `Welcome back, ${user.name.split(" ")[0]}`
              : "Connect Farmers to Markets"}
          </h1>
          <p className="text-green-100 text-sm mb-6 leading-relaxed max-w-lg">
            {isFarmer && "List your crops with AI-suggested fair prices. Reach buyers directly from your dashboard."}
            {isBuyer && "Browse fresh produce directly from verified farmers. Get the best price with full transparency."}
            {isAdmin && "Monitor platform health, verify farmers, and manage all listings."}
            {!user && "A transparent, direct-to-buyer agriculture marketplace for Telangana and Andhra Pradesh farmers."}
          </p>
          <div className="flex flex-wrap gap-3">
            {!user && (
              <>
                <Link href="/register">
                  <Button className="bg-white text-green-700 hover:bg-green-50 font-semibold gap-2">
                    <Plus className="w-4 h-4" /> Join as Farmer
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                    <ShoppingBag className="w-4 h-4" /> Browse Crops
                  </Button>
                </Link>
              </>
            )}
            {isFarmer && (
              <>
                <Link href="/farmer">
                  <Button className="bg-white text-green-700 hover:bg-green-50 font-semibold gap-2">
                    <Plus className="w-4 h-4" /> Add Crop / List for Sale
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                    <ShoppingBag className="w-4 h-4" /> View Marketplace
                  </Button>
                </Link>
              </>
            )}
            {isBuyer && (
              <>
                <Link href="/buyer">
                  <Button className="bg-white text-green-700 hover:bg-green-50 font-semibold gap-2">
                    <ShoppingCart className="w-4 h-4" /> Browse Crops
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                    <ShoppingBag className="w-4 h-4" /> All Listings
                  </Button>
                </Link>
              </>
            )}
            {isAdmin && (
              <Link href="/admin">
                <Button className="bg-white text-green-700 hover:bg-green-50 font-semibold gap-2">
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Platform stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sumLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border border-border">
                <CardContent className="p-5"><Skeleton className="h-16 w-full" /></CardContent>
              </Card>
            ))
          ) : summary ? (
            <>
              <StatCard label="Registered Farmers" value={summary.totalFarmers.toLocaleString()} icon={Sprout} color="bg-green-100 text-green-700" />
              <StatCard label="Active Buyers" value={summary.totalBuyers.toLocaleString()} icon={Users} color="bg-blue-100 text-blue-700" />
              <StatCard label="Active Listings" value={summary.activeListings.toLocaleString()} icon={ShoppingBag} color="bg-amber-100 text-amber-700" />
              <StatCard label="Verified Farmers" value={summary.verifiedFarmers.toLocaleString()} icon={CheckCircle2} color="bg-emerald-100 text-emerald-700" />
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <StatCard key={i} label={["Registered Farmers","Active Buyers","Active Listings","Verified Farmers"][i]} value={0} icon={[Sprout,Users,ShoppingBag,CheckCircle2][i]} color={["bg-green-100 text-green-700","bg-blue-100 text-blue-700","bg-amber-100 text-amber-700","bg-emerald-100 text-emerald-700"][i]} />
            ))
          )}
        </div>

        {/* Weather + Mandi Prices */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weather */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-500" /> Weather Advisory
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weatherLoading ? (
                <Skeleton className="h-28 w-full" />
              ) : weather ? (
                <div>
                  <div className="flex items-end gap-3 mb-3">
                    <span className="text-4xl font-bold text-foreground">{weather.temperature}°C</span>
                    <span className="text-muted-foreground text-sm mb-1">{weather.condition}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      <span>{weather.humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      <span>{weather.rainfall}mm Rain</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{weather.advisory}</p>
                  <p className="text-xs text-primary mt-2 font-medium">{weather.location}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Mandi Prices */}
          <Card className="lg:col-span-2 border border-border shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-amber-500" /> Today's Mandi Prices
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Estimated</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-1.5 mb-3 text-[11px] text-muted-foreground">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-400" />
                <span>Source: Market Average (Estimated). Not a guaranteed price.</span>
              </div>
              {pricesLoading ? (
                <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
              ) : prices ? (
                <div className="divide-y divide-border">
                  {prices.slice(0, 6).map((p) => (
                    <div key={p.cropName} className="flex items-center justify-between py-2.5 gap-2">
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-foreground truncate block">{p.cropName}</span>
                        <span className="text-xs text-muted-foreground">{p.location}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <TrendIcon trend={p.trend} />
                        <div className="text-right">
                          <div className="text-sm font-semibold text-primary">
                            ₹{p.minPrice.toLocaleString()}–{p.maxPrice.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-muted-foreground">{p.unit}</div>
                        </div>
                        <span className={cn("text-xs font-medium w-10 text-right", p.trend === "up" ? "text-green-600" : p.trend === "down" ? "text-red-500" : "text-yellow-600")}>
                          {p.changePercent > 0 ? "+" : ""}{p.changePercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Recommended crops to grow */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" /> Crops to Consider This Season
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Info className="w-3 h-3" /> Advisory only — price ranges are market estimates, not guarantees
              </p>
            </div>
            <Link href="/marketplace" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline shrink-0">
              Marketplace <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {cropsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
            </div>
          ) : crops ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {crops.map((c) => (
                <Card key={c.cropName} className="border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="w-full h-14 bg-gradient-to-br from-green-100 to-emerald-50 rounded-lg mb-3 flex items-center justify-center">
                      <Sprout className="w-7 h-7 text-green-600" />
                    </div>
                    <p className="font-semibold text-sm text-foreground leading-tight mb-0.5">{c.cropName}</p>
                    <p className="text-xs text-muted-foreground mb-2">{c.season}</p>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-primary">
                        ₹{c.minPrice.toLocaleString()}–₹{c.maxPrice.toLocaleString()}
                        <span className="font-normal text-muted-foreground">/{c.unit}</span>
                      </div>
                      <DemandBadge level={c.demandLevel} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed line-clamp-2">{c.reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>

        {/* Getting started CTA — shown to non-logged-in users or new farmers */}
        {(!user || (isFarmer && summary?.totalListings === 0)) && (
          <Card className="border border-primary/20 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-foreground text-lg mb-1">
                  {user ? "List your first crop" : "Start selling on Mana Rythu"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user
                    ? "Add a crop with a photo and AI-suggested fair price. Buyers will find you."
                    : "Register as a farmer and list your crops directly to buyers across Telangana and AP."}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                {user ? (
                  <Link href="/farmer">
                    <Button className="gap-2"><Plus className="w-4 h-4" /> Add Crop</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button className="gap-2"><Plus className="w-4 h-4" /> Register</Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline">Sign in</Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
