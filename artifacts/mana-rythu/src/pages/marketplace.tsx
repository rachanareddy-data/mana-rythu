import React, { useState } from "react";
import { Link } from "wouter";
import { useListCrops } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const { data: crops, isLoading } = useListCrops({ search });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
          <p className="text-muted-foreground">Fresh produce directly from verified farmers</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Input 
            placeholder="Search crops..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-[300px]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : crops?.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium">No crops found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {crops?.map((crop) => (
            <Card key={crop.id} className="overflow-hidden flex flex-col">
              <div 
                className="h-48 bg-muted flex items-center justify-center bg-cover bg-center"
                style={{ 
                  backgroundImage: crop.imageUrl ? `url(${crop.imageUrl})` : 'none',
                  backgroundColor: !crop.imageUrl ? 'hsl(142 20% 90%)' : undefined
                }}
              >
                {!crop.imageUrl && <span className="text-muted-foreground text-4xl">{crop.name[0]}</span>}
              </div>
              <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{crop.name}</h3>
                  <div className="font-semibold text-primary">₹{crop.price}/{crop.unit}</div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{crop.farmerName} • {crop.location}</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline">{crop.category}</Badge>
                  {crop.organic && <Badge variant="secondary" className="bg-green-100 text-green-800">Organic</Badge>}
                  {crop.verified && <Badge variant="default" className="bg-blue-100 text-blue-800">Verified</Badge>}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/crop/${crop.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
