import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCrops, useCreateCrop, useDeleteCrop, getGetCropsQueryKey,
  useGetListings, useDeleteListing, getGetListingsQueryKey,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Minus, ArrowRight, BarChart3, Leaf, IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  growing:   "bg-blue-50 text-blue-700 border-blue-200",
  ready:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  harvested: "bg-gray-50 text-gray-600 border-gray-200",
};
const STATUS_DOT: Record<string, string> = {
  growing: "bg-blue-500", ready: "bg-emerald-500", harvested: "bg-gray-400",
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-amber-400" />;
}

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> Rising
    </span>
  );
  if (trend === "down") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> Falling
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> Stable
    </span>
  );
}

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [, navigate] = useLocation();
  const farmerId = user?.id;
  const fileRef = useRef<HTMLInputElement>(null);

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
  const [cropForm, setCropForm] = useState({ cropName: "", sowDate: "", harvestDate: "", status: "growing" as const, notes: "" });

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

  return (
    <div className="min-h-full bg-gray-50/50">

      {/* ── Hero header ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {firstName.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">Welcome, {firstName}</h1>
                <Badge className="text-[10px] h-5 px-1.5 bg-green-100 text-green-700 border-green-200 font-medium">
                  <Leaf className="w-2.5 h-2.5 mr-0.5" /> Farmer
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">Manage your crops and marketplace listings</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2 border-gray-200" onClick={() => setCropModal(true)}>
              <Plus className="w-4 h-4" /> Track Crop
            </Button>
            <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700 shadow-sm" onClick={() => navigate("/add-crop")}>
              <ShoppingBag className="w-4 h-4" /> Post to Market
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6 pb-24 lg:pb-8">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Growing", value: cropsLoading ? "—" : growing, icon: Sprout, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Ready to Sell", value: cropsLoading ? "—" : ready, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "Active Listings", value: listingsLoading ? "—" : activeListings, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
            { label: "Est. Market Value", value: listingsLoading ? "—" : `₹${(totalValue / 1000).toFixed(0)}K`, icon: IndianRupee, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <Card key={label} className={cn("border shadow-sm hover:shadow-md transition-shadow", border)}>
              <CardContent className="p-5 flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", bg)}>
                  <Icon className={cn("w-5 h-5", color)} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{label}</p>
                  <p className="text-2xl font-bold text-gray-900 leading-none mt-0.5">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Quick CTA when no listings ── */}
        {!listingsLoading && activeListings === 0 && (
          <Card className="border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-green-900">Start selling your crops</p>
                  <p className="text-sm text-green-700 mt-0.5">Post your first listing to reach thousands of buyers</p>
                </div>
              </div>
              <Button className="gap-2 bg-green-600 hover:bg-green-700 shrink-0" onClick={() => navigate("/add-crop")}>
                Post Your First Crop <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Tabs ── */}
        <Tabs defaultValue="listings">
          <div className="flex items-center justify-between mb-1">
            <TabsList className="bg-gray-100 h-9">
              <TabsTrigger value="listings" className="text-sm h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <ShoppingBag className="w-3.5 h-3.5 mr-1.5" /> Listings
                {listings && <span className="ml-1.5 text-[10px] bg-gray-200 data-[state=active]:bg-green-100 px-1.5 py-0.5 rounded-full font-medium">{listings.length}</span>}
              </TabsTrigger>
              <TabsTrigger value="crops" className="text-sm h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Sprout className="w-3.5 h-3.5 mr-1.5" /> My Crops
                {crops && <span className="ml-1.5 text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full font-medium">{crops.length}</span>}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Listings tab */}
          <TabsContent value="listings" className="mt-3">
            {listingsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
              </div>
            ) : listings && listings.length > 0 ? (
              <div className="space-y-3">
                {listings.map(l => (
                  <Card key={l.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white">
                    <CardContent className="p-4 flex items-center gap-4">
                      {/* Image thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center shrink-0">
                        {l.imageUrl ? (
                          <img src={l.imageUrl} alt={l.cropName} className="w-full h-full object-cover" />
                        ) : (
                          <Sprout className="w-7 h-7 text-green-400" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900">{l.cropName}</span>
                          <TrendBadge trend={l.trend} />
                          {l.available
                            ? <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">● Live</span>
                            : <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">Inactive</span>
                          }
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm flex-wrap">
                          <span className="font-bold text-green-700">₹{l.minPrice.toLocaleString()} – ₹{l.maxPrice.toLocaleString()}<span className="font-normal text-gray-400 text-xs">/{l.unit}</span></span>
                          <span className="flex items-center gap-1 text-gray-400 text-xs"><Package className="w-3 h-3" />{l.quantity} {l.unit}</span>
                          <span className="flex items-center gap-1 text-gray-400 text-xs"><MapPin className="w-3 h-3" />{l.location}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">Updated {formatDistanceToNow(new Date(l.updatedAt), { addSuffix: true })}</p>
                      </div>

                      {/* Actions */}
                      <button
                        onClick={() => handleDeleteListing(l.id, l.cropName)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                        title="Remove listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">No listings yet</h3>
                <p className="text-sm text-gray-500 mb-5 max-w-xs">Post your crops to the marketplace to connect with buyers across Telangana & AP.</p>
                <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={() => navigate("/add-crop")}>
                  <Plus className="w-4 h-4" /> Post First Crop
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Crops tab */}
          <TabsContent value="crops" className="mt-3">
            {cropsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
              </div>
            ) : crops && crops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {crops.map(crop => (
                  <Card key={crop.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm leading-tight">{crop.cropName}</p>
                            <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded-full border", STATUS_COLORS[crop.status])}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOT[crop.status])} />
                              {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCrop(crop.id, crop.cropName)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {(crop.sowDate || crop.harvestDate) && (
                        <div className="space-y-1 border-t border-gray-50 pt-3">
                          {crop.sowDate && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" /> Sown: {crop.sowDate}
                            </div>
                          )}
                          {crop.harvestDate && (
                            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                              <Calendar className="w-3 h-3" /> Harvest: {crop.harvestDate}
                            </div>
                          )}
                        </div>
                      )}

                      {crop.status === "ready" && (
                        <button
                          onClick={() => navigate("/add-crop")}
                          className="mt-3 w-full text-xs text-green-700 font-medium bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg py-1.5 transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> List for Sale
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
                  <Sprout className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">No crops tracked yet</h3>
                <p className="text-sm text-gray-500 mb-5 max-w-xs">Track your growing crops to monitor harvest dates and plan your listings.</p>
                <Button variant="outline" className="gap-2 border-gray-200" onClick={() => setCropModal(true)}>
                  <Plus className="w-4 h-4" /> Add Crop
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Add Crop modal ── */}
      <Dialog open={cropModal} onOpenChange={setCropModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-green-600" /> Track New Crop
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Crop Name <span className="text-red-500">*</span></Label>
              <Input value={cropForm.cropName} onChange={e => setCropForm(f => ({ ...f, cropName: e.target.value }))} placeholder="e.g. Tomato, Rice, Cotton..." className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <select value={cropForm.status} onChange={e => setCropForm(f => ({ ...f, status: e.target.value as any }))} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="growing">Growing</option>
                <option value="ready">Ready to harvest</option>
                <option value="harvested">Harvested</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium">Sow Date</Label>
                <Input type="date" value={cropForm.sowDate} onChange={e => setCropForm(f => ({ ...f, sowDate: e.target.value }))} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">Harvest Date</Label>
                <Input type="date" value={cropForm.harvestDate} onChange={e => setCropForm(f => ({ ...f, harvestDate: e.target.value }))} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Notes</Label>
              <Input value={cropForm.notes} onChange={e => setCropForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any observations..." className="mt-1.5" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCropModal(false)}>Cancel</Button>
            <Button onClick={handleAddCrop} disabled={createCrop.isPending || !cropForm.cropName} className="bg-green-600 hover:bg-green-700">
              {createCrop.isPending ? "Adding..." : "Add Crop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
