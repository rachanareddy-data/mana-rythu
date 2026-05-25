import { useState } from "react";
import { Link } from "wouter";
import { useListCrops } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ShieldCheck, Leaf, Filter, Tag } from "lucide-react";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Parse params
  const params: any = {};
  if (search) params.search = search;
  if (category && category !== "all") params.category = category;
  if (organicOnly) params.organic = "true";
  if (verifiedOnly) params.verified = "true";

  const { data: crops, isLoading } = useListCrops(params);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary/5 border-b border-border/50 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Marketplace</h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Source directly from verified farmers. Honest prices, premium quality.
              </p>
            </div>
          </motion.div>

          {/* Filters Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-center backdrop-blur-xl"
          >
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search produce, locations..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border/50 rounded-xl text-base"
              />
            </div>
            
            <div className="w-full h-px lg:w-px lg:h-8 bg-border/50 mx-2"></div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] h-12 rounded-xl bg-background/50">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Spices">Spices</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-6 px-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="organic" 
                    checked={organicOnly} 
                    onCheckedChange={setOrganicOnly} 
                    className="data-[state=checked]:bg-green-600"
                  />
                  <Label htmlFor="organic" className="flex items-center gap-1 cursor-pointer">
                    <Leaf className="h-4 w-4 text-green-600" /> Organic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="verified" 
                    checked={verifiedOnly} 
                    onCheckedChange={setVerifiedOnly}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="verified" className="flex items-center gap-1 cursor-pointer">
                    <ShieldCheck className="h-4 w-4 text-blue-600" /> Verified
                  </Label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 md:px-6 pt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="h-64 bg-muted rounded-2xl w-full"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded-xl w-full mt-2"></div>
              </div>
            ))}
          </div>
        ) : crops?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="h-24 w-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground">No crops found</h3>
            <p className="text-muted-foreground mt-2 text-lg">Try adjusting your filters or search terms</p>
            <Button variant="outline" className="mt-6 rounded-full" onClick={() => {
              setSearch(""); setCategory("all"); setOrganicOnly(false); setVerifiedOnly(false);
            }}>
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {crops?.map((crop) => (
                <motion.div key={crop.id} variants={item} layout>
                  <Card className="group h-full overflow-hidden flex flex-col border-border/50 bg-card hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 rounded-3xl cursor-pointer">
                    <div className="relative h-64 overflow-hidden bg-muted">
                      {crop.imageUrl ? (
                        <img 
                          src={crop.imageUrl} 
                          alt={crop.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-6xl font-display font-bold opacity-50">
                          {crop.name[0]}
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {crop.organic && (
                          <Badge className="bg-green-500/90 hover:bg-green-600 backdrop-blur-md text-white border-none px-3 py-1 shadow-lg flex items-center gap-1">
                            <Leaf className="w-3 h-3" /> Organic
                          </Badge>
                        )}
                        {crop.verified && (
                          <Badge className="bg-blue-500/90 hover:bg-blue-600 backdrop-blur-md text-white border-none px-3 py-1 shadow-lg flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-md border-border/50 text-foreground font-medium shadow-lg">
                          {crop.category}
                        </Badge>
                      </div>

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <h3 className="font-display font-bold text-2xl text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {crop.name}
                        </h3>
                        <div className="text-right whitespace-nowrap bg-primary/10 text-primary px-3 py-1 rounded-lg">
                          <span className="font-bold text-lg">₹{crop.price}</span>
                          <span className="text-sm font-medium opacity-80">/{crop.unit}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                          <span className="text-sm font-medium line-clamp-1">{crop.location}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-sm">
                              {crop.farmerName[0]}
                            </div>
                            <span className="text-sm font-medium text-foreground">{crop.farmerName}</span>
                          </div>
                          <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md text-muted-foreground">
                            {crop.qty} {crop.unit} left
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-6 pt-0 mt-auto">
                      <Link href={`/crop/${crop.id}`} className="w-full">
                        <Button className="w-full rounded-xl h-12 text-base font-medium shadow-md shadow-primary/10 group-hover:shadow-primary/25 transition-all">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
