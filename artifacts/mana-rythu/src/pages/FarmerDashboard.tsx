import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCrops, useCreateCrop, useUpdateCrop, useDeleteCrop, getGetCropsQueryKey,
  useGetListings, useCreateListing, useDeleteListing, getGetListingsQueryKey,
  useGetMe,
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
  Sprout, Plus, Trash2, Package, MapPin, Edit, ShoppingBag,
  Calendar, TrendingUp, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  growing: "bg-blue-100 text-blue-700 border-blue-200",
  ready: "bg-green-100 text-green-700 border-green-200",
  harvested: "bg-gray-100 text-gray-600 border-gray-200",
};

const STATUS_ICONS: Record<string, any> = {
  growing: Sprout,
  ready: CheckCircle2,
  harvested: Package,
};

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

  const [cropModal, setCropModal] = useState(false);
  const [listingModal, setListingModal] = useState(false);
  const [cropForm, setCropForm] = useState({ cropName: "", sowDate: "", harvestDate: "", status: "growing" as const, notes: "" });
  const [listingForm, setListingForm] = useState({ cropName: "", price: "", quantity: "", unit: "kg", location: "", description: "" });

  const invalidateCrops = () => qc.invalidateQueries({ queryKey: getGetCropsQueryKey(farmerId ? { farmerId } : undefined) });
  const invalidateListings = () => qc.invalidateQueries({ queryKey: getGetListingsQueryKey(farmerId ? { farmerId } : undefined) });

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
    if (!farmerId || !listingForm.cropName || !listingForm.price || !listingForm.quantity || !listingForm.location) return;
    createListing.mutate(
      {
        data: {
          farmerId,
          cropName: listingForm.cropName,
          price: parseFloat(listingForm.price),
          quantity: parseFloat(listingForm.quantity),
          unit: listingForm.unit,
          location: listingForm.location,
          description: listingForm.description || null,
          imageUrl: null,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Listing created!", description: `${listingForm.cropName} is now live on the marketplace.` });
          setListingForm({ cropName: "", price: "", quantity: "", unit: "kg", location: "", description: "" });
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
      {/* Header */}
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

      {/* Tabs */}
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
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Sown: {crop.sowDate}</span>
                            </div>
                          )}
                          {crop.harvestDate && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              <span>Harvest: {crop.harvestDate}</span>
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
            <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
          ) : listings && listings.length > 0 ? (
            <div className="space-y-3">
              {listings.map(l => (
                <Card key={l.id} className="border border-border shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{l.cropName}</p>
                        {l.available
                          ? <Badge className="text-xs">Live</Badge>
                          : <Badge variant="outline" className="text-xs">Inactive</Badge>}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span className="font-medium text-primary">₹{l.price.toLocaleString()}/{l.unit}</span>
                        <span className="flex items-center gap-1"><Package className="w-3 h-3" />{l.quantity} {l.unit}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{l.location}</span>
                      </div>
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

      {/* Add Crop modal */}
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
              <select
                value={cropForm.status}
                onChange={e => setCropForm(f => ({ ...f, status: e.target.value as any }))}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
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

      {/* Add Listing modal */}
      <Dialog open={listingModal} onOpenChange={setListingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create Marketplace Listing</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Crop Name *</Label>
              <Input value={listingForm.cropName} onChange={e => setListingForm(f => ({ ...f, cropName: e.target.value }))} placeholder="e.g. Tomato" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Label>Price (₹) *</Label>
                <Input type="number" value={listingForm.price} onChange={e => setListingForm(f => ({ ...f, price: e.target.value }))} placeholder="per unit" className="mt-1.5" />
              </div>
              <div>
                <Label>Unit</Label>
                <select value={listingForm.unit} onChange={e => setListingForm(f => ({ ...f, unit: e.target.value }))} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="kg">kg</option>
                  <option value="quintal">quintal</option>
                  <option value="ton">ton</option>
                  <option value="piece">piece</option>
                </select>
              </div>
            </div>
            <div>
              <Label>Quantity *</Label>
              <Input type="number" value={listingForm.quantity} onChange={e => setListingForm(f => ({ ...f, quantity: e.target.value }))} placeholder="Available quantity" className="mt-1.5" />
            </div>
            <div>
              <Label>Location *</Label>
              <Input value={listingForm.location} onChange={e => setListingForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Hyderabad, Warangal..." className="mt-1.5" />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Input value={listingForm.description} onChange={e => setListingForm(f => ({ ...f, description: e.target.value }))} placeholder="Freshly harvested, organic..." className="mt-1.5" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setListingModal(false)}>Cancel</Button>
            <Button onClick={handleAddListing} disabled={createListing.isPending || !listingForm.cropName || !listingForm.price || !listingForm.quantity || !listingForm.location}>
              {createListing.isPending ? "Creating..." : "Create Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
