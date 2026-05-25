import React from "react";
import { Link } from "wouter";
import { useGetDashboardStats, useListCrops, useDeleteCrop, getListCropsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats } = useGetDashboardStats();
  const { data: crops, isLoading } = useListCrops({ farmerId: user?.id });
  const deleteCrop = useDeleteCrop();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this crop?")) {
      deleteCrop.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Crop deleted" });
          queryClient.invalidateQueries({ queryKey: getListCropsQueryKey() });
        }
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Link href="/farmer/crops/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> Add Crop
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{crops?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">₹{stats?.totalRevenue || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalTransactions || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Active Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading...</div>
          ) : crops && crops.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crops.map((crop) => (
                  <TableRow key={crop.id}>
                    <TableCell className="font-medium">{crop.name}</TableCell>
                    <TableCell>{crop.category}</TableCell>
                    <TableCell>₹{crop.price}/{crop.unit}</TableCell>
                    <TableCell>{crop.qty} {crop.unit}</TableCell>
                    <TableCell>
                      {crop.verified ? (
                        <Badge variant="default" className="bg-blue-100 text-blue-800">Verified</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" disabled>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(crop.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              You haven't listed any crops yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
