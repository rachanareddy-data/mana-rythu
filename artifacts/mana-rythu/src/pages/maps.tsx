import React from "react";
import { useListCrops } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";

export default function Maps() {
  const { data: crops, isLoading } = useListCrops();

  // Filter crops that actually have lat/lon
  const mapCrops = crops?.filter(c => c.latitude != null && c.longitude != null) || [];

  return (
    <div className="container mx-auto py-8 px-4 h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Crop Map</h1>
        <p className="text-muted-foreground">Visualizing agricultural production across regions</p>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col relative border-2 border-border/60 shadow-lg">
        <CardHeader className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm shadow-md rounded-lg w-64 p-4 border border-border">
          <CardTitle className="text-lg">Map Overview</CardTitle>
          <CardDescription>
            {isLoading ? "Loading data..." : `${mapCrops.length} mapped locations`}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 relative bg-blue-50/30 dark:bg-blue-950/10">
          {/* Simple custom SVG Map implementation using an abstract Indian/Global grid as a placeholder 
              since we don't have a real map API key. */}
          <div className="w-full h-full relative overflow-hidden">
            {/* Base abstract map background */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-10 pointer-events-none">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated map points */}
            {mapCrops.map(crop => {
              // Very naive projection just for visual effect: 
              // Assume lat 8 to 37 (India roughly), lon 68 to 97
              const latRange = 37 - 8;
              const lonRange = 97 - 68;
              
              // Map to percentages (invert lat so 37 is top)
              const top = 100 - (((crop.latitude! - 8) / latRange) * 100);
              const left = (((crop.longitude! - 68) / lonRange) * 100);

              // Clamp values to keep them in view for out-of-bounds data
              const clampedTop = Math.max(5, Math.min(95, top));
              const clampedLeft = Math.max(5, Math.min(95, left));

              return (
                <Link key={crop.id} href={`/crop/${crop.id}`}>
                  <div 
                    className="absolute w-4 h-4 -ml-2 -mt-2 bg-primary rounded-full shadow-lg cursor-pointer transform hover:scale-150 transition-transform duration-200 border-2 border-background z-20 group"
                    style={{ top: `${clampedTop}%`, left: `${clampedTop}%` }} // Simplified for demo without real projection
                  >
                    <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap z-30 pointer-events-none">
                      {crop.name} • ₹{crop.price}
                    </div>
                  </div>
                </Link>
              );
            })}

            {mapCrops.length === 0 && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-muted-foreground bg-background/80 px-4 py-2 rounded-full backdrop-blur-sm">
                  No location data available for crops
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
