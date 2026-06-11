import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCrops, useCreateCrop, useDeleteCrop, getGetCropsQueryKey,
  useGetListings, useCreateListing, useDeleteListing, getGetListingsQueryKey,
  useSuggestPrice,
} from "@workspace/api-client-react";
import { useAuth } from "@/App";
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
  Calendar, CheckCircle2, Sparkles, TrendingUp, TrendingDown,
  Minus, ImageIcon, X, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  growing:   "bg-blue-100 text-blue-700 border-blue-200",
  ready:     "bg-green-100 text-green-700 border-green-200",
  harvested: "bg-gray-100 text-gray-600 border-gray-200",
};
const STATUS_ICONS: Record<string, any> = {
  growing: Sprout, ready: CheckCircle2, harvested: Package,
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-green-600" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-yellow-500" />;
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: any; color: string }) {
  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

type ListingForm = {
  cropName: string; minPrice: string; maxPrice: string;
  quantity: string; unit: string; location: string;
  description: string; imageUrl: string; trend: "up" | "down" | "stable";
};

const DEFAULT_LISTING: ListingForm = {
  cropName: "", minPrice: "", maxPrice: "", quantity: "",
  unit: "kg", location: "", description: "", imageUrl: "", trend: "stable",
};

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const farmerId = user?.id;

  const { data: crops, isLoading: cropsLoading } = useGetCrops(
    farmerId ? { farmerId } : undefined,
    { query: { queryKey: getGetCropsQueryKey(farmerId ? { farmerId } : undefined) } }
  );
  const { data: listings, isLoading: listingsLoading } = useGetListings(
    farmerId ? { farmerId } : undefined,
    { query: { queryKey: getGetListingsQueryKey(farmerId ? { farmerId } : undefined) } }
  );

  const createCrop = useCreateCrop();
  const deleteCrop = useDeleteCrop();
  const createListing = useCreateListing();
  const deleteListing = useDeleteListing();

  // Listing modal state
  const [cropModal, setCropModal] = useState(false);
  const [listingModal, setListingModal] = useState(false);
  const [cropForm, setCropForm] = useState({ cropName: "", sowDate: "", harvestDate: "", status: "growing" as const, notes: "" });
  const [listingForm, setListingForm] = useState<ListingForm>(DEFAULT_LISTING);
  const [aiSuggestQuery, setAiSuggestQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // AI suggestion — triggers when crop name has 3+ chars
  const { data: aiSuggestion, isLoading: aiLoading } = useSuggestPrice(
    { cropName: aiSuggestQuery },
    { query: { enabled: aiSuggestQuery.length >= 3, staleTime: 60_000 } }
  );

  const invalidateCrops = () => qc.invalidateQueries({ queryKey: getGetCropsQueryKey(farmerId ? { farmerId } : undefined) });
  const invalidateListings = () => qc.invalidateQueries({ queryKey: getGetListingsQueryKey(farmerId ? { farmerId } : undefined) });

  // Debounce AI query on crop name blur
  const handleCropNameChange = (val: string) => {
    setListingForm(f => ({ ...f, cropName: val }));
  };
  const triggerAiSuggest = () => {
    if (listingForm.cropName.trim().length >= 3) setAiSuggestQuery(listingForm.cropName.trim());
  };

  const applyAiSuggestion = () => {
    if (!aiSuggestion) return;
    setListingForm(f => ({
      ...f,
      minPrice: String(aiSuggestion.suggestedMinPrice),
      maxPrice: String(aiSuggestion.suggestedMaxPrice),
      unit: aiSuggestion.unit,
      trend: aiSuggestion.trend as "up" | "down" | "stable",
    }));
    toast({ title: "AI suggestion applied!", description: aiSuggestion.note });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setListingForm(f => ({ ...f, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setListingForm(f => ({ ...f, imageUrl: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleAddCrop = () => {
    if (!farmerId || !cropForm.cropName) return;
    createCrop.mutate(
      { data: { farmerId, cropName: cropForm.cropName, sowDate: cropForm.sowDate || null, harvestDate: cropForm.harvestDate || null, status: cropForm.status, notes: cropForm.notes || null } },
      {
        onSuccess: () => {
          toast({ title: "Crop added!", description: `${cropForm.cropName} has been added.` });
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

  const handleAddListing = () => {
    const { cropName, minPrice, maxPrice, quantity, location } = listingForm;
    if (!farmerId || !cropName || !minPrice || !maxPrice || !quantity || !location) return;
    const min = parseFloat(minPrice), max = parseFloat(maxPrice);
    if (min > max) { toast({ title: "Min price must be ≤ max price", variant: "destructive" }); return; }

    createListing.mutate(
      {
        data: {
          farmerId,
          cropName,
          minPrice: min,
          maxPrice: max,
          quantity: parseFloat(quantity),
          unit: listingForm.unit,
          location,
          description: listingForm.description || null,
          imageUrl: listingForm.imageUrl || null,
          trend: listingForm.trend,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Listing created!", description: `${cropName} is now live on the marketplace.` });
          setListingForm(DEFAULT_LISTING);
          setImagePreview(null);
          setAiSuggestQuery("");
          setListingModal(false);
          invalidateListings();
        },
        onError: () => toast({ title: "Failed to create listing", variant: "destructive" }),
      }
    );
  };

  const handleDeleteListing = (id: number) => {
    deleteListing.mutate({ id }, {
      onSuccess: () => { toast({ title: "Listing removed" }); invalidateListings(); },
      onError: () => toast({ title: "Failed to delete listing", variant: "destructive" }),
    });
  };

  const growing = crops?.filter(c => c.status === "growing").length ?? 0;
  const ready = crops?.filter(c => c.status === "ready").length ?? 0;
  const harvested = crops?.filter(c => c.status === "harvested").length ?? 0;
  const activeListings = listings?.filter(l => l.available).length ?? 0;

  return (
    <div className="p-6 pb-24 lg:pb-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Farmer Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your crops and marketplace listings</p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" className="gap-2" onClick={() => setCropModal(true)}>
            <Plus className="w-4 h-4" /> Add Crop
          </Button>
          <Button size="sm" variant="outline" className="gap-2" onClick={() => setListingModal(true)}>
            <ShoppingBag className="w-4 h-4" /> Sell Crop
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Growing" value={growing} icon={Sprout} color="bg-blue-100 text-blue-700" />
        <StatCard label="Ready to Sell" value={ready} icon={CheckCircle2} color="bg-green-100 text-green-700" />
        <StatCard label="Harvested" value={harvested} icon={Package} color="bg-gray-100 text-gray-600" />
        <StatCard label="Active Listings" value={activeListings} icon={ShoppingBag} color="bg-amber-100 text-amber-700" />
      </div>

      <Tabs defaultValue="crops">
        <TabsList className="mb-6">
          <TabsTrigger value="crops" className="gap-2">
            <Sprout className="w-4 h-4" /> My Crops
            {crops && <Badge variant="secondary" className="ml-1 text-xs">{crops.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="listings" className="gap-2">
            <ShoppingBag className="w-4 h-4" /> Listings
            {listings && <Badge variant="secondary" className="ml-1 text-xs">{listings.length}</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crops">
          {cropsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            </div>
          ) : crops && crops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map(crop => {
                const Icon = STATUS_ICONS[crop.status] ?? Sprout;
                return (
                  <Card key={crop.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-green-700" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{crop.cropName}</p>
                            <Badge variant="outline" className={cn("text-xs mt-0.5 border", STATUS_COLORS[crop.status])}>
                              {crop.status}
                            </Badge>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCrop(crop.id, crop.cropName)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {(crop.sowDate || crop.harvestDate) && (
                        <div className="space-y-1 mt-3 border-t border-border pt-3">
                          {crop.sowDate && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5" /><span>Sown: {crop.sowDate}</span>
                            </div>
                          )}
                          {crop.harvestDate && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5 text-primary" /><span>Harvest: {crop.harvestDate}</span>
                            </div>
                          )}
                        </div>
                      )}
                      {crop.notes && (
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{crop.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Sprout className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No crops yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Add your first crop to start tracking your harvest.</p>
              <Button size="sm" onClick={() => setCropModal(true)} className="gap-2"><Plus className="w-4 h-4" /> Add Crop</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="listings">
          {listingsLoading ? (
            <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
          ) : listings && listings.length > 0 ? (
            <div className="space-y-3">
              {listings.map(l => (
                <Card key={l.id} className="border border-border shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center shrink-0 overflow-hidden">
                      {l.imageUrl ? (
                        <img src={l.imageUrl} alt={l.cropName} className="w-full h-full object-cover" />
                      ) : (
                        <Sprout className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground">{l.cropName}</p>
                        {l.available ? <Badge className="text-xs">Live</Badge> : <Badge variant="outline" className="text-xs">Inactive</Badge>}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendIcon trend={l.trend} />
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground flex-wrap">
                        <span className="font-semibold text-primary">₹{l.minPrice.toLocaleString()} – ₹{l.maxPrice.toLocaleString()}/{l.unit}</span>
                        <span className="flex items-center gap-1"><Package className="w-3 h-3" />{l.quantity} {l.unit}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{l.location}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Updated {formatDistanceToNow(new Date(l.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteListing(l.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No listings yet</h3>
              <p className="text-sm text-muted-foreground mb-4">List your crops on the marketplace to connect with buyers.</p>
              <Button size="sm" onClick={() => setListingModal(true)} className="gap-2"><Plus className="w-4 h-4" /> Create Listing</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ── Add Crop modal ── */}
      <Dialog open={cropModal} onOpenChange={setCropModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Crop</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Crop Name *</Label>
              <Input value={cropForm.cropName} onChange={e => setCropForm(f => ({ ...f, cropName: e.target.value }))} placeholder="e.g. Tomato, Rice..." className="mt-1.5" />
            </div>
            <div>
              <Label>Status</Label>
              <select value={cropForm.status} onChange={e => setCropForm(f => ({ ...f, status: e.target.value as any }))} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="growing">Growing</option>
                <option value="ready">Ready to harvest</option>
                <option value="harvested">Harvested</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Sow Date</Label>
                <Input type="date" value={cropForm.sowDate} onChange={e => setCropForm(f => ({ ...f, sowDate: e.target.value }))} className="mt-1.5" />
              </div>
              <div>
                <Label>Harvest Date</Label>
                <Input type="date" value={cropForm.harvestDate} onChange={e => setCropForm(f => ({ ...f, harvestDate: e.target.value }))} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Input value={cropForm.notes} onChange={e => setCropForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any observations..." className="mt-1.5" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCropModal(false)}>Cancel</Button>
            <Button onClick={handleAddCrop} disabled={createCrop.isPending || !cropForm.cropName}>
              {createCrop.isPending ? "Adding..." : "Add Crop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Create Listing modal (with AI + image) ── */}
      <Dialog open={listingModal} onOpenChange={open => { setListingModal(open); if (!open) { setAiSuggestQuery(""); setImagePreview(null); setListingForm(DEFAULT_LISTING); } }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create Marketplace Listing</DialogTitle></DialogHeader>
          <div className="space-y-5">
            {/* Crop name + AI trigger */}
            <div>
              <Label>Crop Name *</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={listingForm.cropName}
                  onChange={e => handleCropNameChange(e.target.value)}
                  onBlur={triggerAiSuggest}
                  placeholder="e.g. Tomato"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 shrink-0"
                  onClick={triggerAiSuggest}
                  disabled={listingForm.cropName.length < 3 || aiLoading}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {aiLoading ? "..." : "AI Suggest"}
                </Button>
              </div>

              {/* AI Suggestion panel */}
              {aiSuggestion && aiSuggestQuery && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> AI Price Suggestion
                    </p>
                    <Badge variant="outline" className="text-[10px] capitalize">{aiSuggestion.confidence} confidence</Badge>
                  </div>
                  <p className="text-sm font-bold text-amber-900 mb-1">
                    ₹{aiSuggestion.suggestedMinPrice} – ₹{aiSuggestion.suggestedMaxPrice} / {aiSuggestion.unit}
                  </p>
                  {aiSuggestion.variants.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {aiSuggestion.variants.slice(0, 3).map(v => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setListingForm(f => ({ ...f, cropName: v }))}
                          className="text-[10px] px-2 py-0.5 bg-white border border-amber-300 rounded-full text-amber-700 hover:bg-amber-100 transition-colors"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-[10px] text-amber-700 mb-2 italic">{aiSuggestion.note}</p>
                  <Button type="button" size="sm" variant="outline" className="w-full gap-1.5 border-amber-300 text-amber-800 hover:bg-amber-100 text-xs" onClick={applyAiSuggestion}>
                    <Sparkles className="w-3 h-3" /> Apply suggestion (you can edit)
                  </Button>
                </div>
              )}
            </div>

            {/* Price range */}
            <div>
              <Label>Price Range (₹) *</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1">
                  <Input
                    type="number"
                    value={listingForm.minPrice}
                    onChange={e => setListingForm(f => ({ ...f, minPrice: e.target.value }))}
                    placeholder="Min price"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5 ml-1">Minimum</p>
                </div>
                <span className="text-muted-foreground font-medium">–</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    value={listingForm.maxPrice}
                    onChange={e => setListingForm(f => ({ ...f, maxPrice: e.target.value }))}
                    placeholder="Max price"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5 ml-1">Maximum</p>
                </div>
                <div className="w-20">
                  <select value={listingForm.unit} onChange={e => setListingForm(f => ({ ...f, unit: e.target.value }))} className="w-full h-10 rounded-md border border-input bg-background px-2 text-sm">
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="ton">ton</option>
                    <option value="piece">piece</option>
                  </select>
                  <p className="text-[10px] text-muted-foreground mt-0.5 ml-1">Unit</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                <Info className="w-3 h-3" /> Use a range (e.g. ₹40 – ₹50/kg) for trust and transparency.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Quantity *</Label>
                <Input type="number" value={listingForm.quantity} onChange={e => setListingForm(f => ({ ...f, quantity: e.target.value }))} placeholder="Available qty" className="mt-1.5" />
              </div>
              <div>
                <Label>Market Trend</Label>
                <select value={listingForm.trend} onChange={e => setListingForm(f => ({ ...f, trend: e.target.value as any }))} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="up">📈 Rising</option>
                  <option value="stable">➖ Stable</option>
                  <option value="down">📉 Falling</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Location *</Label>
              <Input value={listingForm.location} onChange={e => setListingForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Warangal, Guntur..." className="mt-1.5" />
            </div>

            <div>
              <Label>Description (optional)</Label>
              <Input value={listingForm.description} onChange={e => setListingForm(f => ({ ...f, description: e.target.value }))} placeholder="Freshly harvested, organic..." className="mt-1.5" />
            </div>

            {/* Image upload — required */}
            <div>
              <Label className="flex items-center gap-1.5">
                Crop Photo <span className="text-destructive text-xs font-bold">* Required</span>
              </Label>
              <p className="text-[10px] text-muted-foreground mt-0.5 mb-1.5">A clear photo of the crop is required to build buyer trust.</p>
              <div>
                {imagePreview ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border">
                    <img src={imagePreview} alt="Crop preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload photo</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setListingModal(false)}>Cancel</Button>
            <Button
              onClick={handleAddListing}
              disabled={createListing.isPending || !listingForm.cropName || !listingForm.minPrice || !listingForm.maxPrice || !listingForm.quantity || !listingForm.location || !listingForm.imageUrl}
            >
              {createListing.isPending ? "Creating..." : "Create Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
