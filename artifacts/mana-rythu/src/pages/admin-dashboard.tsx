import React from "react";
import { 
  useListUsers, 
  useListCrops, 
  useListTransactions, 
  useVerifyUser, 
  useVerifyCrop,
  getListUsersQueryKey,
  getListCropsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading: usersLoading } = useListUsers();
  const { data: crops, isLoading: cropsLoading } = useListCrops();
  const { data: transactions, isLoading: txLoading } = useListTransactions();

  const verifyUser = useVerifyUser();
  const verifyCrop = useVerifyCrop();

  const handleVerifyUser = (id: number) => {
    verifyUser.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "User verified" });
        queryClient.invalidateQueries({ queryKey: getListUsersQueryKey() });
      }
    });
  };

  const handleVerifyCrop = (id: number) => {
    verifyCrop.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Crop verified" });
        queryClient.invalidateQueries({ queryKey: getListCropsQueryKey() });
      }
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Admin Control Panel</h1>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading ? "Loading..." : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(user.createdAt), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          {user.verified ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>
                          ) : (
                            <Badge variant="secondary">Unverified</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!user.verified && (
                            <Button 
                              size="sm" 
                              onClick={() => handleVerifyUser(user.id)}
                              disabled={verifyUser.isPending}
                            >
                              Verify
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crops">
          <Card>
            <CardHeader>
              <CardTitle>Crop Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              {cropsLoading ? "Loading..." : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop</TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crops?.map(crop => (
                      <TableRow key={crop.id}>
                        <TableCell className="font-medium">{crop.name}</TableCell>
                        <TableCell>{crop.farmerName}</TableCell>
                        <TableCell>{crop.category}</TableCell>
                        <TableCell>
                          {crop.verified ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!crop.verified && (
                            <Button 
                              size="sm" 
                              onClick={() => handleVerifyCrop(crop.id)}
                              disabled={verifyCrop.isPending}
                            >
                              Verify Crop
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {txLoading ? "Loading..." : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Crop</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions?.map(tx => (
                      <TableRow key={tx.id}>
                        <TableCell>#{tx.id}</TableCell>
                        <TableCell>{format(new Date(tx.createdAt), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{tx.cropName || tx.cropId}</TableCell>
                        <TableCell>{tx.buyerName || tx.buyerId}</TableCell>
                        <TableCell>{tx.farmerName || tx.farmerId}</TableCell>
                        <TableCell>₹{tx.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
