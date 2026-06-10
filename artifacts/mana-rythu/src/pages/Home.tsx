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
  Cloud, Droplets, Thermometer, TrendingUp, TrendingDown, Minus,
  Users, ShoppingBag, Sprout, BarChart2, Plus, ArrowRight,
  CheckCircle2, Leaf,
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
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
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

export default function Home() {
  const { user } = useAuth();
  const { data: summary, isLoading: sumLoading } = useGetDashboardSummary();
  const { data: prices, isLoading: pricesLoading } = useGetMarketPrices();
  const { data: crops, isLoading: cropsLoading } = useGetRecommendedCrops();
  const { data: weather, isLoading: weatherLoading } = useGetWeather();

  return (
    <div className="p-6 space-y-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {user ? `Good day, ${user.name.split(" ")[0]}` : "Welcome to Mana Rythu"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/farmer">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Add Crop
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button size="sm" variant="outline" className="gap-2">
              <ShoppingBag className="w-4 h-4" /> Sell Crop
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {sumLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border border-border">
              <CardContent className="p-5"><Skeleton className="h-16 w-full" /></CardContent>
            </Card>
          ))
        ) : summary ? (
          <>
            <StatCard label="Total Farmers" value={summary.totalFarmers.toLocaleString()} icon={Sprout} color="bg-green-100 text-green-700" />
            <StatCard label="Active Buyers" value={summary.totalBuyers.toLocaleString()} icon={Users} color="bg-blue-100 text-blue-700" />
            <StatCard label="Active Listings" value={summary.activeListings.toLocaleString()} icon={ShoppingBag} color="bg-amber-100 text-amber-700" />
            <StatCard label="Verified Farmers" value={summary.verifiedFarmers.toLocaleString()} icon={CheckCircle2} color="bg-emerald-100 text-emerald-700" />
          </>
        ) : null}
      </div>

      {/* Weather + Market prices row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weather card */}
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
                <div className="flex gap-4 mb-3">
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

        {/* Market prices */}
        <Card className="lg:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-500" /> Today's Mandi Prices
            </CardTitle>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </CardHeader>
          <CardContent>
            {pricesLoading ? (
              <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            ) : prices ? (
              <div className="divide-y divide-border">
                {prices.slice(0, 6).map((p) => (
                  <div key={p.cropName} className="flex items-center justify-between py-2.5">
                    <div>
                      <span className="text-sm font-medium text-foreground">{p.cropName}</span>
                      <span className="text-xs text-muted-foreground ml-2">{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendIcon trend={p.trend} />
                      <div className="text-right">
                        <span className="text-sm font-semibold text-foreground">₹{p.price.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">/{p.unit}</span>
                      </div>
                      <span className={cn("text-xs font-medium", p.trend === "up" ? "text-green-600" : p.trend === "down" ? "text-red-500" : "text-yellow-600")}>
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

      {/* Recommended crops */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" /> Recommended Crops
          </h2>
          <Link href="/marketplace" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {cropsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
          </div>
        ) : crops ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {crops.map((c) => (
              <Card key={c.cropName} className="border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                <CardContent className="p-4">
                  <div className="w-full h-16 bg-gradient-to-br from-green-100 to-emerald-50 rounded-lg mb-3 flex items-center justify-center">
                    <Sprout className="w-7 h-7 text-green-600" />
                  </div>
                  <p className="font-semibold text-sm text-foreground leading-tight mb-1">{c.cropName}</p>
                  <p className="text-xs text-muted-foreground mb-2">{c.season}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">₹{c.avgPrice.toLocaleString()}</span>
                    <Badge
                      variant={c.demandLevel === "high" ? "default" : "outline"}
                      className="text-[10px] px-1.5 py-0.5"
                    >
                      {c.demandLevel}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed line-clamp-2">{c.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
