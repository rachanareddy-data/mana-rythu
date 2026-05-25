import { useParams, Link } from "wouter";
import { useGetCrop, getGetCropQueryKey, useCreateTransaction, getListTransactionsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, ShieldCheck, Leaf, ChevronLeft, Calendar, ArrowRight, User as UserIcon } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function getCropImageSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/objects/")) return `/api/storage${url}`;
  return url;
}

export default function CropDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: crop, isLoading } = useGetCrop(id, { 
    query: { enabled: !!id, queryKey: getGetCropQueryKey(id) } 
  });

  const createTransaction = useCreateTransaction();

  const handlePurchase = () => {
    if (!user) {
      toast({ title: "Please sign in to purchase", variant: "destructive" });
      return;
    }

    if (user.role === "farmer") {
      toast({ title: "Farmers cannot make purchases", variant: "destructive" });
      return;
    }

    createTransaction.mutate({
      data: {
        cropId: id,
        amount: crop?.price || 0
      }
    }, {
      onSuccess: (tx) => {
        toast({ title: "Purchase initiated!" });
        queryClient.invalidateQueries({ queryKey: getListTransactionsQueryKey() });
        if (tx.upiUrl) {
          window.location.href = tx.upiUrl;
        } else {
          const upi = `upi://pay?pa=manaRythu@upi&pn=ManaRythu&am=${crop?.price}&cu=INR`;
          window.location.href = upi;
        }
      },
      onError: () => {
        toast({ title: "Purchase failed", variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-[60vh] w-full bg-muted animate-pulse"></div>
        <div className="container mx-auto px-4 -mt-20 relative z-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card rounded-3xl p-8 shadow-xl border border-border/50 h-96 animate-pulse"></div>
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border/50 h-96 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Crop Not Found</h2>
        <Link href="/marketplace">
          <Button rounded-full>Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image Area */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-muted overflow-hidden">
        {getCropImageSrc(crop.imageUrl) ? (
          <img src={getCropImageSrc(crop.imageUrl)!} alt={crop.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="text-9xl font-display font-bold text-primary/20">{crop.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        
        {/* Back Button Overlay */}
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <Link href="/marketplace">
            <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-xl border-border/50 rounded-full hover:bg-background">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  {crop.category}
                </div>
                {crop.organic && (
                  <div className="bg-green-500/10 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <Leaf className="w-4 h-4" /> Organic Certified
                  </div>
                )}
                {crop.verified && (
                  <div className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Verified Listing
                  </div>
                )}
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
                {crop.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-muted-foreground border-t border-border/50 pt-8 mt-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg">{crop.location}</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border"></div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-lg">Listed {format(new Date(crop.createdAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>

            {/* Farmer Profile Card */}
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
              <h3 className="text-2xl font-display font-bold mb-6">Meet the Farmer</h3>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <UserIcon className="h-10 w-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{crop.farmerName}</h4>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-4 h-4 text-blue-500" /> Verified Member
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing & Action Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-24 bg-card rounded-3xl p-8 shadow-2xl border border-border/50 flex flex-col h-full md:h-auto">
              <div className="mb-8">
                <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Current Price</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-display font-bold text-primary">₹{crop.price}</span>
                  <span className="text-xl text-muted-foreground font-medium mb-1">/{crop.unit}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-border/50">
                  <span className="text-muted-foreground">Available Quantity</span>
                  <span className="font-bold text-lg">{crop.qty} {crop.unit}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-border/50">
                  <span className="text-muted-foreground">Minimum Order</span>
                  <span className="font-medium text-foreground">1 {crop.unit}</span>
                </div>
              </div>

              <div className="mt-auto">
                <Button 
                  size="lg" 
                  className="w-full h-16 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all group"
                  onClick={handlePurchase}
                  disabled={createTransaction.isPending || (user?.role === "farmer")}
                >
                  {createTransaction.isPending ? "Processing..." : "Purchase via UPI"}
                  {!createTransaction.isPending && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                </Button>
                
                {!user ? (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link> to complete purchase
                  </p>
                ) : user.role === "farmer" ? (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    Farmers cannot purchase from other farmers.
                  </p>
                ) : (
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" /> 100% Secure UPI Payment
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
