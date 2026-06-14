import { useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCrops, useCreateCrop, useDeleteCrop, getGetCropsQueryKey,
  useGetListings, useDeleteListing, getGetListingsQueryKey,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useLanguage } from "@/contexts/language";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sprout, Plus, Trash2, Package, MapPin, ShoppingBag,
  Calendar, CheckCircle2, TrendingUp, TrendingDown,
  Minus, ArrowRight, IndianRupee, Leaf, BarChart3,
  Clock, Eye, Bug, Truck,
} from "lucide-react";
import PestDetection from "@/components/PestDetection";
import LogisticsEstimator from "@/components/LogisticsEstimator";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const STATUS_CONFIG: Record<string, { labelKey: string; dot: string; badge: string }> = {
  growing:   { labelKey: "growing",     dot: "bg-blue-500",    badge: "bg-blue-50 text-blue-700 border-blue-200" },
  ready:     { labelKey: "readyToSell", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  harvested: { labelKey: "harvested",   dot: "bg-gray-400",    badge: "bg-gray-50 text-gray-600 border-gray-200" },
};

function TrendBadge({ trend, rising, stable, falling }: { trend: string; rising: string; stable: string; falling: string }) {
  if (trend === "up") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> {rising}
    </span>
  );
  if (trend === "down") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> {falling}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> {stable}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  loading?: boolean;
}

function StatCard({ label, value, subtext, icon: Icon, gradient, iconColor, loading }: StatCardProps) {
  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4, transition: { duration: 0.18, ease: "easeOut" } }}
      whileTap={{ y: 1 }}
    >
      <Card className="border-0 shadow-md overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 flex-1">
          <div className={cn("p-5 h-full flex flex-col justify-between", gradient)}>
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium text-white/70 uppercase tracking-wide">{label}</p>
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Icon className={cn("w-5 h-5", iconColor)} />
              </div>
            </div>
            <div className="mt-3">
              {loading ? (
                <Skeleton className="h-8 w-16 bg-white/20" />
              ) : (
                <p className="text-3xl font-bold text-white leading-none">{value}</p>
              )}
              {subtext && !loading && (
                <p className="text-xs text-white/60 mt-1">{subtext}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [, navigate] = useLocation();
  const farmerId = user?.id;

  const { data: crops, isLoading: cropsLoading } = useGetCrops(
    farmerId ? { farmerId } : undefined,
    { query: { queryKey: getGetCropsQueryKey(farmerId ? { farmerId } : undefined) } }
  );
  const { data: listings, isLoading: listingsLoading } = useGetListings(
    farmerId ? { farmerId } : undefined,
    { query: { queryKey: getGetListingsQueryKey(farmerId ? { farmerId } : undefined), staleTime: 0 } }
  );

  const createCrop = useCreateCrop();
  const deleteCrop = useDeleteCrop();
  const deleteListing = useDeleteListing();

  const [cropModal, setCropModal] = useState(false);
  const [cropForm, setCropForm] = useState<{ cropName: string; sowDate: string; harvestDate: string; status: "growing" | "ready" | "harvested"; notes: string }>(
    { cropName: "", sowDate: "", harvestDate: "", status: "growing", notes: "" }
  );

  const invalidateCrops = () => qc.invalidateQueries({ queryKey: getGetCropsQueryKey(farmerId ? { farmerId } : undefined) });
  const invalidateListings = () => {
    qc.invalidateQueries({ queryKey: ["/api/listings"] });
    if (farmerId) qc.invalidateQueries({ queryKey: getGetListingsQueryKey({ farmerId }) });
  };

  const handleAddCrop = () => {
    if (!farmerId || !cropForm.cropName) return;
    createCrop.mutate(
      { data: { farmerId, cropName: cropForm.cropName, sowDate: cropForm.sowDate || null, harvestDate: cropForm.harvestDate || null, status: cropForm.status, notes: cropForm.notes || null } },
      {
        onSuccess: () => {
          toast({ title: "Crop added!", description: `${cropForm.cropName} is now being tracked.` });
          setCropForm({ cropName: "", sowDate: "", harvestDate: "", status: "growing", notes: "" });
          setCropModal(false);
          invalidateCrops();
        },
        onError: () => toast({ title: "Failed to add crop", variant: "destructive" }),
      }
    );
  };

  const handleDeleteCrop = (id: number, name: string) => {
    deleteCrop.mutate({ id }, {
      onSuccess: () => { toast({ title: `${name} removed` }); invalidateCrops(); },
      onError: () => toast({ title: "Failed to delete crop", variant: "destructive" }),
    });
  };

  const handleDeleteListing = (id: number, name: string) => {
    deleteListing.mutate({ id }, {
      onSuccess: () => { toast({ title: `${name} listing removed` }); invalidateListings(); },
      onError: () => toast({ title: "Failed to remove listing", variant: "destructive" }),
    });
  };

  const growing = crops?.filter(c => c.status === "growing").length ?? 0;
  const ready = crops?.filter(c => c.status === "ready").length ?? 0;
  const activeListings = listings?.filter(l => l.available).length ?? 0;
  const totalValue = listings?.reduce((sum, l) => sum + l.maxPrice * l.quantity, 0) ?? 0;
  const firstName = user?.name?.split(" ")[0] ?? "Farmer";
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "F";

  return (
    <div className="isolate relative z-0 min-h-full bg-background">

      {/* ── Hero header ── */}
      <div className="gradient-primary px-4 sm:px-6 py-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-white">{t("welcome")}, {firstName}</h1>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
                    <Leaf className="w-2.5 h-2.5" /> Farmer
                  </span>
                </div>
                <p className="text-sm text-green-100 mt-0.5">{t("manageCrops")}</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
                onClick={() => setCropModal(true)}
              >
                <Plus className="w-4 h-4" /> {t("trackCrop")}
              </Button>
              <Button
                size="sm"
                className="gap-1.5 bg-white text-green-700 hover:bg-green-50 shadow-sm font-semibold text-xs sm:text-sm"
                onClick={() => navigate("/add-crop")}
              >
                <ShoppingBag className="w-4 h-4" /> {t("postToMarket")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <StatCard
            label={t("growing")}
            value={growing}
            subtext={t("cropsInProgress")}
            icon={Sprout}
            gradient="bg-gradient-to-br from-green-600 to-green-700"
            iconColor="text-white"
            loading={cropsLoading}
          />
          <StatCard
            label={t("readyToSell")}
            value={ready}
            subtext={ready > 0 ? t("readyToSell") : t("noneReadyYet")}
            icon={CheckCircle2}
            gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
            iconColor="text-white"
            loading={cropsLoading}
          />
          <StatCard
            label={t("activeListings")}
            value={activeListings}
            subtext={t("liveOnMarket")}
            icon={BarChart3}
            gradient="bg-gradient-to-br from-teal-600 to-green-700"
            iconColor="text-white"
            loading={listingsLoading}
          />
          <StatCard
            label={t("estValue")}
            value={`₹${totalValue >= 1000 ? `${(totalValue / 1000).toFixed(1)}K` : totalValue}`}
            subtext={t("acrossAllListings")}
            icon={IndianRupee}
            gradient="bg-gradient-to-br from-green-700 to-green-900"
            iconColor="text-white"
            loading={listingsLoading}
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* ── Quick CTA when no listings ── */}
        {!listingsLoading && activeListings === 0 && (
          <Card className="border border-green-100 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 shadow-sm">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm sm:text-base">{t("startSellCTA")}</p>
                  <p className="text-xs sm:text-sm text-green-700 mt-0.5">{t("startSellCTADesc")}</p>
                </div>
              </div>
              <Button className="gap-2 bg-green-600 hover:bg-green-700 shrink-0 text-sm" onClick={() => navigate("/add-crop")}>
                {t("postYourFirstCrop")} <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Tabs ── */}
        <Tabs defaultValue="listings">
          <div className="flex items-center justify-between mb-3">
            <TabsList className="bg-muted h-10 p-1 rounded-xl">
              <TabsTrigger value="listings" className="text-xs sm:text-sm h-8 px-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t("listings")}</span>
                {listings && (
                  <span className="text-[10px] bg-muted-foreground/15 data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-1.5 py-0.5 rounded-full font-semibold">{listings.length}</span>
                )}
              </TabsTrigger>
              <TabsTrigger value="crops" className="text-xs sm:text-sm h-8 px-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                <span>{t("myCrops")}</span>
                {crops && (
                  <span className="text-[10px] bg-muted-foreground/15 px-1.5 py-0.5 rounded-full font-semibold">{crops.length}</span>
                )}
              </TabsTrigger>
              <TabsTrigger value="pest" className="text-xs sm:text-sm h-8 px-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground gap-1.5">
                <Bug className="w-3.5 h-3.5" />
                <span>{t("pest")}</span>
              </TabsTrigger>
              <TabsTrigger value="transport" className="text-xs sm:text-sm h-8 px-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>Transport</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── Listings tab ── */}
          <TabsContent value="listings" className="mt-0">
            {listingsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
              </div>
            ) : listings && listings.length > 0 ? (
              <div className="space-y-3">
                {listings.map(l => (
                  <Card key={l.id} className="border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-card group">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                      {/* Thumbnail */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center shrink-0 border border-green-100">
                        {l.imageUrl ? (
                          <img src={l.imageUrl} alt={l.cropName} className="w-full h-full object-cover" />
                        ) : (
                          <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className="font-bold text-foreground text-sm">{l.cropName}</span>
                          <TrendBadge trend={l.trend} rising={t("rising")} stable={t("stable")} falling={t("falling")} />
                          {l.available
                            ? <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 live-dot" /> {t("live")}
                              </span>
                            : <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded-full">Inactive</span>
                          }
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                          <span className="font-bold text-primary text-sm">
                            ₹{l.minPrice.toLocaleString()} – ₹{l.maxPrice.toLocaleString()}
                            <span className="font-normal text-muted-foreground text-xs">/{l.unit}</span>
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Package className="w-3 h-3" />{l.quantity} {l.unit}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground text-xs">
                            <MapPin className="w-3 h-3" />{l.location}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t("updated")} {formatDistanceToNow(new Date(l.updatedAt), { addSuffix: true })}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => navigate(`/listing/${l.id}`)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          title={t("view")}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(l.id, l.cropName)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title={t("delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Summary footer */}
                <div className="flex items-center justify-between px-1 pt-1">
                  <p className="text-xs text-muted-foreground">{listings.length} {t("listings").toLowerCase()} total</p>
                  <button
                    onClick={() => navigate("/add-crop")}
                    className="text-xs text-green-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> {t("addAnother")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center bg-card rounded-2xl border border-border shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{t("noListings")}</h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-xs leading-relaxed">{t("noListingsDesc")}</p>
                <Button className="gap-2 gradient-primary shadow-green border-0" onClick={() => navigate("/add-crop")}>
                  <Plus className="w-4 h-4" /> {t("postFirstCrop")}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ── Crops tab ── */}
          <TabsContent value="crops" className="mt-0">
            {cropsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
              </div>
            ) : crops && crops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {crops.map(crop => {
                  const cfg = STATUS_CONFIG[crop.status] ?? STATUS_CONFIG.growing;
                  const statusLabel = crop.status === "harvested" ? "Harvested" : t(cfg.labelKey as any);
                  return (
                    <Card key={crop.id} className="border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-card overflow-hidden group">
                      {/* Top color stripe */}
                      <div className={cn(
                        "h-1.5 w-full",
                        crop.status === "growing" ? "bg-gradient-to-r from-green-400 to-green-500"
                          : crop.status === "ready" ? "bg-gradient-to-r from-emerald-400 to-green-500"
                          : "bg-gradient-to-r from-border to-muted-foreground/30"
                      )} />
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                              <Sprout className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-foreground text-sm leading-tight truncate">{crop.cropName}</p>
                              <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded-full border", cfg.badge)}>
                                <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot, crop.status === "growing" && "animate-pulse")} />
                                {statusLabel}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteCrop(crop.id, crop.cropName)}
                            className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {(crop.sowDate || crop.harvestDate) && (
                          <div className="space-y-1.5 border-t border-border/50 pt-3 mb-3">
                            {crop.sowDate && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{t("sowDate")}: <span className="font-semibold text-foreground">{crop.sowDate}</span></span>
                              </div>
                            )}
                            {crop.harvestDate && (
                              <div className="flex items-center gap-1.5 text-xs text-primary">
                                <Calendar className="w-3 h-3" />
                                <span>{t("expectedHarvest")}: <span className="font-bold">{crop.harvestDate}</span></span>
                              </div>
                            )}
                          </div>
                        )}

                        {crop.notes && (
                          <p className="text-xs text-muted-foreground italic mb-3 line-clamp-1">"{crop.notes}"</p>
                        )}

                        {crop.status === "ready" && (
                          <button
                            onClick={() => navigate("/add-crop")}
                            className="w-full text-xs text-green-700 font-semibold bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl py-2 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> {t("listForSale")}
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center bg-card rounded-2xl border border-border shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sprout className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{t("noCrops")}</h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-xs leading-relaxed">{t("noCropsDesc")}</p>
                <Button variant="outline" className="gap-2" onClick={() => setCropModal(true)}>
                  <Plus className="w-4 h-4" /> {t("trackFirstCrop")}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ── Pest tab ── */}
          <TabsContent value="pest" className="mt-0">
            <PestDetection />
          </TabsContent>

          {/* ── Transport tab ── */}
          <TabsContent value="transport" className="mt-0">
            <LogisticsEstimator />
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Track Crop dialog ── */}
      <Dialog open={cropModal} onOpenChange={setCropModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-600" /> {t("trackNewCrop")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium">{t("cropNameLabel")} *</Label>
              <Input
                value={cropForm.cropName}
                onChange={e => setCropForm(f => ({ ...f, cropName: e.target.value }))}
                placeholder="e.g. Tomato, Rice..."
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">{t("sowDate")}</Label>
                <Input type="date" value={cropForm.sowDate} onChange={e => setCropForm(f => ({ ...f, sowDate: e.target.value }))} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">{t("expectedHarvest")}</Label>
                <Input type="date" value={cropForm.harvestDate} onChange={e => setCropForm(f => ({ ...f, harvestDate: e.target.value }))} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">{t("status")}</Label>
              <div className="flex gap-2 mt-1.5">
                {(["growing", "ready", "harvested"] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setCropForm(f => ({ ...f, status: s }))}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-colors capitalize",
                      cropForm.status === s
                        ? "bg-green-600 text-white border-green-600"
                        : "border-border text-muted-foreground hover:border-green-300"
                    )}
                  >
                    {s === "growing" ? t("growing") : s === "ready" ? t("readyToSell") : "Harvested"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">{t("notes")}</Label>
              <Input
                value={cropForm.notes}
                onChange={e => setCropForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Optional notes..."
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setCropModal(false)}>{t("cancel")}</Button>
            <Button
              onClick={handleAddCrop}
              disabled={!cropForm.cropName || createCrop.isPending}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              {createCrop.isPending ? t("loading") : <><Plus className="w-4 h-4" /> {t("save")}</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
