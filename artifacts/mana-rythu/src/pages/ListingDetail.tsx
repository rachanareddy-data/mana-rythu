import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import {
  useGetListingById, getGetListingByIdQueryKey,
  useContactFarmer, useRateUser,
  useCreateOrder,
  useCreateOrGetConversation,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  MapPin, Star, CheckCircle2, Package, Phone, ArrowLeft,
  MessageCircle, Sprout, TrendingUp, TrendingDown, Minus,
  Clock, Info, Shield, ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star className={cn("w-7 h-7 transition-colors", n <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground hover:text-amber-300")} />
        </button>
      ))}
    </div>
  );
}

function TrendBadge({ trend }: { trend: string }) {
  const map: Record<string, { icon: any; label: string; cls: string }> = {
    up:     { icon: TrendingUp,   label: "Rising",  cls: "text-green-700 bg-green-50 border-green-200" },
    down:   { icon: TrendingDown, label: "Falling", cls: "text-red-600 bg-red-50 border-red-200" },
    stable: { icon: Minus,        label: "Stable",  cls: "text-yellow-700 bg-yellow-50 border-yellow-200" },
  };
  const { icon: Icon, label, cls } = map[trend] ?? map.stable;
  return (
    <span className={cn("flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border", cls)}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </span>
  );
}

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = parseInt(id ?? "0");
  const { toast } = useToast();
  const qc = useQueryClient();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: listing, isLoading } = useGetListingById(numId, {
    query: { enabled: !isNaN(numId), queryKey: getGetListingByIdQueryKey(numId) },
  });

  const [contactOpen, setContactOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ buyerName: "", buyerPhone: "", message: "" });
  const [orderForm, setOrderForm] = useState({ quantity: "", offeredPrice: "", note: "" });
  const [rating, setRating] = useState(0);
  const [farmerPhone, setFarmerPhone] = useState<string | null>(null);

  const contactMutation = useContactFarmer();
  const rateMutation = useRateUser();
  const orderMutation = useCreateOrder();
  const chatMutation = useCreateOrGetConversation();

  const handleContact = () => {
    if (!contactForm.buyerName || !contactForm.message) return;
    contactMutation.mutate(
      { id: numId, data: { ...contactForm } },
      {
        onSuccess: (data: any) => {
          setFarmerPhone(data.farmerPhone);
          toast({ title: "Request sent!", description: data.message });
          setContactOpen(false);
          setContactForm({ buyerName: "", buyerPhone: "", message: "" });
        },
        onError: () => toast({ title: "Failed to send", variant: "destructive" }),
      }
    );
  };

  const handleOrder = () => {
    if (!user || !listing) return;
    const qty = parseFloat(orderForm.quantity);
    const price = parseFloat(orderForm.offeredPrice);
    if (!qty || !price) { toast({ title: "Fill quantity and price", variant: "destructive" }); return; }
    orderMutation.mutate(
      { data: { listingId: numId, buyerId: user.id, quantity: qty, offeredPrice: price, note: orderForm.note || undefined } },
      {
        onSuccess: () => {
          toast({ title: "Order placed!", description: "The farmer will be notified." });
          setOrderOpen(false);
          setOrderForm({ quantity: "", offeredPrice: "", note: "" });
          navigate("/orders");
        },
        onError: () => toast({ title: "Order failed", variant: "destructive" }),
      }
    );
  };

  const handleStartChat = () => {
    if (!user || !listing) return;
    chatMutation.mutate(
      { data: { buyerId: user.id, farmerId: listing.farmerId, listingId: numId } },
      {
        onSuccess: (conv: any) => navigate(`/chat/${conv.id}`),
        onError: () => toast({ title: "Could not open chat", variant: "destructive" }),
      }
    );
  };

  const handleRate = () => {
    if (!listing || rating === 0) return;
    rateMutation.mutate(
      { id: listing.farmerId, data: { rating } },
      {
        onSuccess: () => {
          toast({ title: "Rating submitted!", description: `You rated ${listing.farmerName} ${rating} stars.` });
          qc.invalidateQueries({ queryKey: getGetListingByIdQueryKey(numId) });
          setRateOpen(false);
        },
        onError: () => toast({ title: "Rating failed", variant: "destructive" }),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-muted-foreground">Listing not found.</p>
        <Link href="/marketplace" className="mt-4">
          <Button variant="outline" size="sm">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 lg:pb-8 space-y-6">
      <Link href="/marketplace" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Image */}
          <div className="h-64 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center relative">
            {listing.imageUrl ? (
              <img src={listing.imageUrl} alt={listing.cropName} className="w-full h-full object-cover" />
            ) : (
              <Sprout className="w-24 h-24 text-green-400" />
            )}
            <div className="absolute top-3 right-3">
              <TrendBadge trend={listing.trend} />
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2 gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{listing.cropName}</h1>
              {listing.available
                ? <Badge className="text-sm shrink-0">Available</Badge>
                : <Badge variant="outline" className="text-sm shrink-0">Sold Out</Badge>}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
              <MapPin className="w-4 h-4" /><span>{listing.location}</span>
            </div>

            {/* Price range — prominent */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-100 mb-4">
              <p className="text-xs text-muted-foreground mb-1">Price Range (Estimated)</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">
                  ₹{listing.minPrice.toLocaleString()} – ₹{listing.maxPrice.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/{listing.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Source: Market Average (Estimated). Not a guaranteed price.
              </p>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Quantity Available</p>
                  <p className="font-semibold text-foreground">{listing.quantity.toLocaleString()} {listing.unit}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-semibold text-foreground text-sm">
                    {formatDistanceToNow(new Date(listing.updatedAt), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {listing.description && (
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Description</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Trust disclaimer */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Mana Rythu does not guarantee any price. Always verify current mandi rates before completing a transaction. Prices are indicative market averages only.
            </p>
          </div>
        </div>

        {/* Farmer sidebar */}
        <div className="space-y-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Farmer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                  {(listing.farmerName ?? "F").slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-foreground">{listing.farmerName ?? "Unknown"}</p>
                    {listing.farmerVerified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  {listing.farmerRating && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-muted-foreground">{listing.farmerRating.toFixed(1)} rating</span>
                    </div>
                  )}
                  {listing.farmerVerified && (
                    <span className="text-xs text-primary font-medium flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Verified Farmer
                    </span>
                  )}
                </div>
              </div>

              {farmerPhone && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-700 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact number</p>
                    <p className="text-sm font-semibold text-foreground">{farmerPhone}</p>
                  </div>
                </div>
              )}

              {user && user.role === "buyer" && listing.available && (
                <>
                  <Button className="w-full gap-2" onClick={() => setOrderOpen(true)}>
                    <ShoppingCart className="w-4 h-4" /> Place Order
                  </Button>
                  <Button variant="outline" className="w-full gap-2" onClick={handleStartChat} disabled={chatMutation.isPending}>
                    <MessageCircle className="w-4 h-4" /> {chatMutation.isPending ? "Opening..." : "Chat Farmer"}
                  </Button>
                </>
              )}
              <Button
                className={user && user.role === "buyer" ? "w-full gap-2" : "w-full gap-2"}
                variant={user && user.role === "buyer" ? "ghost" : "default"}
                onClick={() => setContactOpen(true)}
                disabled={!listing.available}
              >
                <Phone className="w-4 h-4" /> Contact Farmer
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={() => setRateOpen(true)}>
                <Star className="w-4 h-4" /> Rate Farmer
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Listed on</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(listing.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Market trend</p>
                <TrendBadge trend={listing.trend} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Contact {listing.farmerName ?? "Farmer"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Your name *</Label>
              <Input value={contactForm.buyerName} onChange={e => setContactForm(f => ({ ...f, buyerName: e.target.value }))} placeholder="Full name" className="mt-1.5" />
            </div>
            <div>
              <Label>Your phone (optional)</Label>
              <Input value={contactForm.buyerPhone} onChange={e => setContactForm(f => ({ ...f, buyerPhone: e.target.value }))} placeholder="+91 ..." className="mt-1.5" />
            </div>
            <div>
              <Label>Message *</Label>
              <Textarea value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="I am interested in buying..." className="mt-1.5" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactOpen(false)}>Cancel</Button>
            <Button onClick={handleContact} disabled={contactMutation.isPending || !contactForm.buyerName || !contactForm.message}>
              {contactMutation.isPending ? "Sending..." : "Send request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Place Order dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Place Order — {listing.cropName}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted/60 rounded-lg text-xs text-muted-foreground">
              Market price: ₹{listing.minPrice}–₹{listing.maxPrice} / {listing.unit}
            </div>
            <div>
              <Label>Quantity ({listing.unit}) *</Label>
              <Input
                type="number"
                min="1"
                max={listing.quantity}
                value={orderForm.quantity}
                onChange={e => setOrderForm(f => ({ ...f, quantity: e.target.value }))}
                placeholder={`Max ${listing.quantity} ${listing.unit}`}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Your offered price (₹ per {listing.unit}) *</Label>
              <Input
                type="number"
                min="1"
                value={orderForm.offeredPrice}
                onChange={e => setOrderForm(f => ({ ...f, offeredPrice: e.target.value }))}
                placeholder={`e.g. ${listing.minPrice}`}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Note (optional)</Label>
              <Textarea
                value={orderForm.note}
                onChange={e => setOrderForm(f => ({ ...f, note: e.target.value }))}
                placeholder="Delivery requirements, pickup date, etc."
                className="mt-1.5"
                rows={2}
              />
            </div>
            {orderForm.quantity && orderForm.offeredPrice && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-green-700">
                  ₹{(parseFloat(orderForm.quantity) * parseFloat(orderForm.offeredPrice)).toLocaleString()}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderOpen(false)}>Cancel</Button>
            <Button onClick={handleOrder} disabled={orderMutation.isPending || !orderForm.quantity || !orderForm.offeredPrice}>
              {orderMutation.isPending ? "Placing..." : "Place Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rate dialog */}
      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Rate {listing.farmerName ?? "Farmer"}</DialogTitle></DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <StarPicker value={rating} onChange={setRating} />
            <p className="text-sm text-muted-foreground">{rating === 0 ? "Tap to rate" : `${rating} star${rating > 1 ? "s" : ""}`}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRateOpen(false)}>Cancel</Button>
            <Button onClick={handleRate} disabled={rating === 0 || rateMutation.isPending}>
              {rateMutation.isPending ? "Submitting..." : "Submit rating"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
