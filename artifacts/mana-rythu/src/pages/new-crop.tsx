import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCrop, getListCropsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Leaf, MapPin, Tag, Box } from "lucide-react";
import { motion } from "framer-motion";
import { CropImageUpload } from "@/components/ui/crop-image-upload";

const cropSchema = z.object({
  name: z.string().min(1, "Crop name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  qty: z.coerce.number().min(1, "Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().optional(),
  organic: z.boolean().default(false),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional()
});

export default function NewCrop() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createCrop = useCreateCrop();

  const form = useForm<z.infer<typeof cropSchema>>({
    resolver: zodResolver(cropSchema),
    defaultValues: {
      name: "", price: 0, qty: 0, unit: "kg",
      category: "", location: "", imageUrl: "",
      organic: false, latitude: undefined, longitude: undefined
    }
  });

  const onSubmit = (data: z.infer<typeof cropSchema>) => {
    createCrop.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Crop listed successfully!" });
        queryClient.invalidateQueries({ queryKey: getListCropsQueryKey() });
        setLocation("/farmer/dashboard");
      },
      onError: (err: any) => {
        toast({ 
          title: "Failed to list crop", 
          description: err.data?.error || "An error occurred",
          variant: "destructive" 
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Premium Header */}
      <div className="bg-card border-b border-border/50 sticky top-0 z-20">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setLocation("/farmer/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-display font-bold">List New Produce</h1>
          </div>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={createCrop.isPending} className="rounded-full px-6 shadow-md shadow-primary/20">
            {createCrop.isPending ? "Listing..." : "Publish Listing"}
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-8">
        <Form {...form}>
          <form className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50 shadow-sm overflow-hidden rounded-3xl">
                <div className="bg-primary/5 px-8 py-6 border-b border-border/50 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><Tag className="w-5 h-5"/></div>
                  <h2 className="text-xl font-display font-bold">Basic Information</h2>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Crop Name</FormLabel>
                        <FormControl><Input placeholder="e.g. Sona Masuri Rice" className="h-12 bg-muted/50 rounded-xl text-lg" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/50 rounded-xl text-lg"><SelectValue placeholder="Select category" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Vegetables">Vegetables</SelectItem>
                            <SelectItem value="Fruits">Fruits</SelectItem>
                            <SelectItem value="Grains">Grains</SelectItem>
                            <SelectItem value="Spices">Spices</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}/>
                  </div>

                  <FormField control={form.control} name="organic" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                      <div className="space-y-1">
                        <FormLabel className="text-base font-bold text-green-700 flex items-center gap-2">
                          <Leaf className="w-5 h-5" /> Certified Organic Produce
                        </FormLabel>
                        <p className="text-sm text-green-600/80">Toggle if this crop was grown without synthetic pesticides or fertilizers.</p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-green-600 scale-125" />
                      </FormControl>
                    </FormItem>
                  )}/>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border/50 shadow-sm overflow-hidden rounded-3xl">
                <div className="bg-secondary/5 px-8 py-6 border-b border-border/50 flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Box className="w-5 h-5"/></div>
                  <h2 className="text-xl font-display font-bold">Pricing & Inventory</h2>
                </div>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Price per Unit (₹)</FormLabel>
                        <FormControl><Input type="number" min="0" className="h-12 bg-muted/50 rounded-xl text-lg font-bold text-primary" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="qty" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Total Quantity</FormLabel>
                        <FormControl><Input type="number" min="0" className="h-12 bg-muted/50 rounded-xl text-lg" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="unit" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Unit of Measurement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-muted/50 rounded-xl text-lg"><SelectValue placeholder="Select unit" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="ton">Tons</SelectItem>
                            <SelectItem value="quintal">Quintals</SelectItem>
                            <SelectItem value="pieces">Pieces</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}/>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border/50 shadow-sm overflow-hidden rounded-3xl">
                <div className="bg-blue-500/5 px-8 py-6 border-b border-border/50 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><MapPin className="w-5 h-5"/></div>
                  <h2 className="text-xl font-display font-bold">Location & Media</h2>
                </div>
                <CardContent className="p-8 space-y-6">
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Farm Location</FormLabel>
                      <FormControl><Input placeholder="e.g. Guntur, Andhra Pradesh" className="h-12 bg-muted/50 rounded-xl text-lg" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  
                  <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" /> Produce Photo
                      </FormLabel>
                      <FormControl>
                        <CropImageUpload
                          value={field.value}
                          onChange={(path) => field.onChange(path ?? "")}
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload a clear photo of your produce to attract more buyers
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}/>

                  <div className="pt-4 border-t border-border/50 grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="latitude" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">Map Latitude (Optional)</FormLabel>
                        <FormControl><Input type="number" step="any" className="bg-muted/50 rounded-xl" {...field} value={field.value || ""} /></FormControl>
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="longitude" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">Map Longitude (Optional)</FormLabel>
                        <FormControl><Input type="number" step="any" className="bg-muted/50 rounded-xl" {...field} value={field.value || ""} /></FormControl>
                      </FormItem>
                    )}/>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
