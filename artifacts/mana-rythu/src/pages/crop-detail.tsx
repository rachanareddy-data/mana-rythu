import React from "react";
import { useParams, Link } from "wouter";
import { useGetCrop, getGetCropQueryKey, useCreateTransaction, getListTransactionsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, User, Tag, Leaf, CheckCircle } from "lucide-react";

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
      toast({ title: "Please login to purchase", variant: "destructive" });
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
        // Redirect to UPI URL
        if (tx.upiUrl) {
          window.location.href = tx.upiUrl;
        } else {
          // Generate local UPI url fallback
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
    return <div className="container mx-auto py-8">Loading crop details...</div>;
  }

  if (!crop) {
    return <div className="container mx-auto py-8">Crop not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/marketplace" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Marketplace
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div 
            className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center bg-cover bg-center"
            style={{ 
              backgroundImage: crop.imageUrl ? `url(${crop.imageUrl})` : 'none',
              backgroundColor: !crop.imageUrl ? 'hsl(142 20% 90%)' : undefined
            }}
          >
            {!crop.imageUrl && <span className="text-muted-foreground text-6xl">{crop.name[0]}</span>}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{crop.name}</h1>
            <div className="text-3xl font-semibold text-primary mb-4">
              ₹{crop.price} <span className="text-lg text-muted-foreground font-normal">/ {crop.unit}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="flex items-center gap-1"><Tag className="w-3 h-3"/> {crop.category}</Badge>
              {crop.organic && <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center gap-1"><Leaf className="w-3 h-3"/> Organic</Badge>}
              {crop.verified && <Badge variant="default" className="bg-blue-100 text-blue-800 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Verified</Badge>}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Farmer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{crop.farmerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>{crop.location}</span>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4 border-t border-border">
            <h3 className="font-medium mb-2">Available Quantity</h3>
            <p className="text-lg">{crop.qty} {crop.unit}</p>
          </div>

          <Button 
            size="lg" 
            className="w-full h-14 text-lg" 
            onClick={handlePurchase}
            disabled={createTransaction.isPending || (user && user.role === "farmer")}
          >
            {createTransaction.isPending ? "Processing..." : "Pay via UPI & Purchase"}
          </Button>
          {!user && (
            <p className="text-sm text-center text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">Login</Link> as a buyer to purchase
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
