import { Link } from "wouter";
import {
  useGetDashboardSummary, useGetMarketPrices,
  useGetRecommendedCrops, useGetWeather,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useLanguage } from "@/contexts/language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cloud, Droplets, TrendingUp, TrendingDown, Minus,
  Users, ShoppingBag, Sprout, BarChart2, Plus, ArrowRight,
  CheckCircle2, Leaf, Star, ShoppingCart, Info, Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const STAT_CONFIGS = [
  { key: "totalFarmers",   labelKey: "registeredFarmers", icon: Sprout,       colorClass: "bg-green-100 text-green-700",   borderClass: "border-green-200/60" },
  { key: "totalBuyers",    labelKey: "activeBuyers",      icon: Users,        colorClass: "bg-sky-100 text-sky-700",       borderClass: "border-sky-200/60" },
  { key: "activeListings", labelKey: "activeListings",    icon: ShoppingBag,  colorClass: "bg-amber-100 text-amber-700",   borderClass: "border-amber-200/60" },
  { key: "verifiedFarmers",labelKey: "verifiedFarmers",   icon: CheckCircle2, colorClass: "bg-emerald-100 text-emerald-700", borderClass: "border-emerald-200/60" },
] as const;

function StatCard({ label, value, icon: Icon, colorClass, borderClass }: { label: string; value: string | number; icon: any; colorClass: string; borderClass: string }) {
  return (
    <motion.div whileHover={{ y: -3, transition: { duration: 0.18 } }} whileTap={{ scale: 0.98 }}>
      <Card className={cn("border shadow-sm hover:shadow-md transition-all h-full", borderClass)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
              <p className="text-3xl font-bold text-foreground mt-1.5 leading-none">{value}</p>
            </div>
            <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center shrink-0", colorClass)}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-green-600" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-amber-500" />;
}

function DemandBadge({ level }: { level: string }) {
  const cls = level === "high"
    ? "bg-green-100 text-green-700 border-green-200"
    : level === "medium"
    ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span className={cn("inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize", cls)}>
      {level === "high" ? "🔥" : level === "medium" ? "📈" : "📉"} {level}
    </span>
  );
}

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { data: summary, isLoading: sumLoading } = useGetDashboardSummary();
  const { data: prices, isLoading: pricesLoading } = useGetMarketPrices();
  const { data: crops, isLoading: cropsLoading } = useGetRecommendedCrops();
  const { data: weather, isLoading: weatherLoading } = useGetWeather();

  const isFarmer = user?.role === "farmer";
  const isBuyer  = user?.role === "buyer";
  const isAdmin  = user?.role === "admin";

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative px-6 py-14 overflow-hidden min-h-[300px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/85 to-green-800/60" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/30 to-transparent" />

        {/* Decorative orbs */}
        <div className="absolute top-8 right-8 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-green-500/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
              <span className="text-green-200 text-xs font-medium">Mana Rythu — Farmer's Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              {user ? `${t("welcome")}, ${user.name.split(" ")[0]} 👋` : t("connectFarmersToMarkets")}
            </h1>
            <p className="text-green-100/80 text-sm sm:text-base mb-7 leading-relaxed max-w-lg">
              {isFarmer && t("farmerHeroDesc")}
              {isBuyer  && t("buyerHeroDesc")}
              {isAdmin  && t("adminHeroDesc")}
              {!user    && t("manaPlatformDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              {!user && (
                <>
                  <Link href="/register">
                    <Button className="bg-white text-green-800 hover:bg-green-50 font-semibold gap-2 h-10 shadow-lg">
                      <Plus className="w-4 h-4" /> {t("joinAsFarmer")}
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 h-10 backdrop-blur-sm">
                      <ShoppingBag className="w-4 h-4" /> {t("browseCrops")}
                    </Button>
                  </Link>
                </>
              )}
              {isFarmer && (
                <>
                  <Link href="/farmer-dashboard">
                    <Button className="bg-white text-green-800 hover:bg-green-50 font-semibold gap-2 h-10 shadow-lg">
                      <Sprout className="w-4 h-4" /> {t("myFarmDashboard")}
                    </Button>
                  </Link>
                  <Link href="/add-crop">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 h-10 backdrop-blur-sm">
                      <Plus className="w-4 h-4" /> {t("postCrop")}
                    </Button>
                  </Link>
                </>
              )}
              {isBuyer && (
                <>
                  <Link href="/marketplace">
                    <Button className="bg-white text-green-800 hover:bg-green-50 font-semibold gap-2 h-10 shadow-lg">
                      <ShoppingBag className="w-4 h-4" /> {t("browseCrops")}
                    </Button>
                  </Link>
                  <Link href="/buyer-dashboard">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 h-10 backdrop-blur-sm">
                      <ShoppingCart className="w-4 h-4" /> {t("buyerView")}
                    </Button>
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link href="/admin">
                  <Button className="bg-white text-green-800 hover:bg-green-50 font-semibold gap-2 h-10 shadow-lg">
                    {t("adminPanel")}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-5 sm:px-6 space-y-8 pt-6">
        {/* ── Platform stats ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {sumLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border border-border">
                  <CardContent className="p-5"><Skeleton className="h-16 w-full" /></CardContent>
                </Card>
              ))
            : STAT_CONFIGS.map(({ key, labelKey, icon, colorClass, borderClass }) => (
                <StatCard
                  key={key}
                  label={t(labelKey as any)}
                  value={(summary?.[key as keyof typeof summary] ?? 0).toLocaleString()}
                  icon={icon}
                  colorClass={colorClass}
                  borderClass={borderClass}
                />
              ))
          }
        </motion.div>

        {/* ── Weather + Mandi Prices ── */}
        <motion.div
          className="grid lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* Weather card */}
          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-sky-300" />
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Cloud className="w-3.5 h-3.5 text-blue-600" />
                </div>
                {t("weatherAdvisory")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {weatherLoading ? (
                <Skeleton className="h-28 w-full" />
              ) : weather ? (
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl font-bold text-foreground leading-none">{weather.temperature}°</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">C</p>
                      <p className="text-xs text-muted-foreground">{weather.condition}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      <span>{weather.humidity}% humidity</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Wind className="w-3.5 h-3.5 text-slate-400" />
                      <span>{weather.rainfall}mm rain</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed bg-muted/60 rounded-xl p-2.5">{weather.advisory}</p>
                  <p className="text-xs text-primary mt-2 font-semibold">📍 {weather.location}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Mandi Prices */}
          <Card className="lg:col-span-2 border border-border shadow-sm overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
            <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
                </div>
                {t("todaysMandiPrices")}
              </CardTitle>
              <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700 bg-amber-50">{t("estimated")}</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-1.5 mb-3 text-[10px] text-muted-foreground bg-blue-50/70 border border-blue-100 rounded-lg px-2.5 py-1.5">
                <Info className="w-3 h-3 shrink-0 text-blue-400" />
                <span>Market average estimates. Not a guaranteed price.</span>
              </div>
              {pricesLoading ? (
                <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-9 w-full" />)}</div>
              ) : prices ? (
                <div className="divide-y divide-border/60">
                  {prices.slice(0, 6).map((p) => (
                    <div key={p.cropName} className="flex items-center justify-between py-2.5 gap-2 group">
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground truncate block">{p.cropName}</span>
                        <span className="text-[10px] text-muted-foreground">{p.location}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1">
                          <TrendIcon trend={p.trend} />
                          <span className={cn("text-xs font-semibold", p.trend === "up" ? "text-green-600" : p.trend === "down" ? "text-red-500" : "text-amber-600")}>
                            {p.changePercent > 0 ? "+" : ""}{p.changePercent}%
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">
                            ₹{p.minPrice.toLocaleString()}–{p.maxPrice.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-muted-foreground">{p.unit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Seasonal crops ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" /> {t("cropsThisSeason")}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Info className="w-3 h-3" /> {t("advisoryOnly")}
              </p>
            </div>
            <Link href="/marketplace" className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline shrink-0">
              {t("marketplace")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {cropsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-2xl" />)}
            </div>
          ) : crops ? (
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {crops.map((c) => (
                <motion.div
                  key={c.cropName}
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } }}
                  whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card className="border border-border shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden h-full">
                    <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-500" />
                    <CardContent className="p-4 pt-3">
                      <div className="w-full h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl mb-3 flex items-center justify-center border border-green-100/60">
                        <Sprout className="w-7 h-7 text-green-600" />
                      </div>
                      <p className="font-bold text-sm text-foreground leading-tight mb-0.5">{c.cropName}</p>
                      <p className="text-[10px] text-muted-foreground mb-2.5 font-medium">{c.season}</p>
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold text-primary">
                          ₹{c.minPrice.toLocaleString()}–{c.maxPrice.toLocaleString()}
                          <span className="font-normal text-muted-foreground text-[10px]">/{c.unit}</span>
                        </div>
                        <DemandBadge level={c.demandLevel} />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2.5 leading-relaxed line-clamp-2">{c.reason}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* ── Getting started CTA ── */}
        {(!user || (isFarmer && summary?.totalListings === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-primary/20 overflow-hidden shadow-sm">
              <div className="h-1 w-full gradient-primary" />
              <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-green">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    {user ? t("listFirstCropTitle") : t("startSellingTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user ? t("listFirstCropDesc") : t("startSellingDesc")}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  {user ? (
                    <Link href="/farmer-dashboard">
                      <Button className="gap-2 gradient-primary shadow-green border-0">
                        <Plus className="w-4 h-4" /> {t("goToDashboard")}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/register">
                        <Button className="gap-2 gradient-primary shadow-green border-0">
                          <Plus className="w-4 h-4" /> {t("register")}
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button variant="outline">{t("signIn")}</Button>
                      </Link>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
