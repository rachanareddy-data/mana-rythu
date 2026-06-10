import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  useGetListingById, getGetListingByIdQueryKey,
  useContactFarmer, useRateUser,
  getGetListingsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
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
  MessageCircle, Sprout, Calendar, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star className={cn("w-6 h-6 transition-colors", n <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground")} />
        </button>
      ))}
    </div>
  );
}

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = parseInt(id ?? "0");
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: listing, isLoading } = useGetListingById(numId, {
    query: { enabled: !isNaN(numId), queryKey: getGetListingByIdQueryKey(numId) },
  });

  const [contactOpen, setContactOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ buyerName: "", buyerPhone: "", message: "" });
  const [rating, setRating] = useState(0);
  const [farmerPhone, setFarmerPhone] = useState<string | null>(null);

  const contactMutation = useContactFarmer();
  const rateMutation = useRateUser();

  const handleContact = () => {
    if (!contactForm.buyerName || !contactForm.message) return;
    contactMutation.mutate(
      { id: numId, data: { ...contactForm } },
      {
        onSuccess: (data: any) => {
          setFarmerPhone(data.farmerPhone);
          toast({ title: "Request sent!", description: data.message });
          setContactForm({ buyerName: "", buyerPhone: "", message: "" });
        },
        onError: () => toast({ title: "Failed to send", variant: "destructive" }),
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
        <Link href="/marketplace"><Button variant="outline" size="sm" className="mt-4" asChild><span>Back to Marketplace</span></Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24 lg:pb-6 space-y-6">
      {/* Back */}
      <Link href="/marketplace" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main card */}
        <div className="lg:col-span-2 space-y-5">
          {/* Image */}
          <div className="h-56 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 rounded-xl flex items-center justify-center">
            <Sprout className="w-20 h-20 text-green-400" />
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold text-foreground">{listing.cropName}</h1>
              {listing.available ? (
                <Badge className="text-sm">Available</Badge>
              ) : (
                <Badge variant="outline" className="text-sm">Sold Out</Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-primary">₹{listing.price.toLocaleString()}</span>
              <span className="text-muted-foreground mb-1">/{listing.unit}</span>
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
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="font-semibold text-foreground">{listing.quantity.toLocaleString()} {listing.unit}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{listing.location}</p>
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
        </div>

        {/* Farmer sidebar */}
        <div className="space-y-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Farmer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
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
                </div>
              </div>

              {farmerPhone && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-700" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contact number</p>
                    <p className="text-sm font-semibold text-foreground">{farmerPhone}</p>
                  </div>
                </div>
              )}

              <Button className="w-full gap-2" onClick={() => setContactOpen(true)} disabled={!listing.available}>
                <MessageCircle className="w-4 h-4" />
                Contact Farmer
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={() => setRateOpen(true)}>
                <Star className="w-4 h-4" />
                Rate Farmer
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Listed on</p>
              <p className="text-sm font-medium text-foreground mt-1">
                {new Date(listing.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {listing.farmerName ?? "Farmer"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Your name</Label>
              <Input value={contactForm.buyerName} onChange={e => setContactForm(f => ({ ...f, buyerName: e.target.value }))} placeholder="Full name" className="mt-1.5" />
            </div>
            <div>
              <Label>Your phone (optional)</Label>
              <Input value={contactForm.buyerPhone} onChange={e => setContactForm(f => ({ ...f, buyerPhone: e.target.value }))} placeholder="+91 ..." className="mt-1.5" />
            </div>
            <div>
              <Label>Message</Label>
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

      {/* Rate dialog */}
      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rate {listing.farmerName ?? "Farmer"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <StarPicker value={rating} onChange={setRating} />
            <p className="text-sm text-muted-foreground">{rating === 0 ? "Select a rating" : `${rating} star${rating > 1 ? "s" : ""}`}</p>
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
