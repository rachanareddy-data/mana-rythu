import { useListCrops } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function Maps() {
  const { data: crops, isLoading } = useListCrops();
  const mapCrops = crops?.filter(c => c.latitude != null && c.longitude != null) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Premium Header Overlay */}
      <div className="absolute top-8 left-8 right-8 z-20 pointer-events-none">
        <div className="container mx-auto">
          <div className="flex justify-between items-start">
            <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-border/50 shadow-2xl pointer-events-auto max-w-sm">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="text-primary w-6 h-6" /> Crop Atlas
              </h1>
              <p className="text-muted-foreground text-sm">Live visualization of agricultural production across regions.</p>
              
              <div className="mt-6 flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Points</p>
                  <p className="text-2xl font-display font-bold text-primary">
                    {isLoading ? "..." : mapCrops.length}
                  </p>
                </div>
                <Navigation className="w-8 h-8 text-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Map Area */}
      <div className="flex-1 relative bg-primary/5 dark:bg-primary/5">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
        
        {/* Grid pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10 pointer-events-none">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Map Points */}
        <div className="absolute inset-0 container mx-auto relative pt-32">
          {mapCrops.map((crop, i) => {
            const latRange = 37 - 8;
            const lonRange = 97 - 68;
            const top = 100 - (((crop.latitude! - 8) / latRange) * 100);
            const left = (((crop.longitude! - 68) / lonRange) * 100);

            const clampedTop = Math.max(10, Math.min(90, top));
            const clampedLeft = Math.max(10, Math.min(90, left));

            return (
              <Link key={crop.id} href={`/crop/${crop.id}`}>
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                  className="absolute w-5 h-5 -ml-2.5 -mt-2.5 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)] cursor-pointer border-2 border-background z-20 group"
                  style={{ top: `${clampedTop}%`, left: `${clampedLeft}%` }}
                >
                  <div className="absolute w-full h-full bg-primary rounded-full animate-ping opacity-20"></div>
                  
                  {/* Floating Glass Panel on Hover */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-background/90 backdrop-blur-xl border border-border/50 text-foreground w-48 rounded-2xl shadow-2xl z-30 pointer-events-none overflow-hidden">
                    <div className="h-16 bg-muted/50 overflow-hidden">
                      {crop.imageUrl && <img src={crop.imageUrl} className="w-full h-full object-cover opacity-80" />}
                    </div>
                    <div className="p-3">
                      <p className="font-bold font-display line-clamp-1">{crop.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{crop.location}</p>
                      <div className="mt-2 font-bold text-primary">₹{crop.price}/{crop.unit}</div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
          
          {mapCrops.length === 0 && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-background/80 backdrop-blur-md px-6 py-4 rounded-full border border-border/50 shadow-xl flex items-center gap-3">
                <MapPin className="text-muted-foreground w-5 h-5" />
                <p className="text-muted-foreground font-medium">Awaiting geographical data</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
