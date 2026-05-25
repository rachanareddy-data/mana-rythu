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
import { ShieldCheck, Users, Wheat, Activity } from "lucide-react";
import { motion } from "framer-motion";

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
        toast({ title: "User verified successfully" });
        queryClient.invalidateQueries({ queryKey: getListUsersQueryKey() });
      }
    });
  };

  const handleVerifyCrop = (id: number) => {
    verifyCrop.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Crop verified successfully" });
        queryClient.invalidateQueries({ queryKey: getListCropsQueryKey() });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg"><ShieldCheck className="text-blue-400 w-6 h-6"/></div>
            <h1 className="text-3xl font-display font-bold">Command Center</h1>
          </div>
          <p className="text-slate-400 ml-11">Platform moderation and verification queue</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8">
        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="bg-card border border-border/50 p-1 rounded-xl h-auto">
            <TabsTrigger value="users" className="py-3 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md gap-2">
              <Users className="w-4 h-4" /> User Queue
            </TabsTrigger>
            <TabsTrigger value="crops" className="py-3 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md gap-2">
              <Wheat className="w-4 h-4" /> Crop Approvals
            </TabsTrigger>
            <TabsTrigger value="transactions" className="py-3 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md gap-2">
              <Activity className="w-4 h-4" /> Network Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-card border-b border-border/50">
                  <CardTitle className="font-display">User Verification Queue</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {usersLoading ? (
                    <div className="p-8 animate-pulse text-muted-foreground">Loading users...</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow className="border-border/50">
                            <TableHead className="pl-6">Profile</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users?.map(user => (
                            <TableRow key={user.id} className="border-border/50">
                              <TableCell className="pl-6">
                                <div className="font-bold text-foreground">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">{user.role}</Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{format(new Date(user.createdAt), 'MMM d, yyyy')}</TableCell>
                              <TableCell>
                                {user.verified ? (
                                  <Badge className="bg-green-500/10 text-green-600 border-none">Verified</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-none">Pending KYC</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                {!user.verified ? (
                                  <Button size="sm" className="rounded-full shadow-md shadow-primary/10" onClick={() => handleVerifyUser(user.id)} disabled={verifyUser.isPending}>
                                    Approve
                                  </Button>
                                ) : (
                                  <span className="text-muted-foreground text-sm font-medium">Approved</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Similar updates for crops and transactions... simplified for length */}
          <TabsContent value="crops" className="m-0">
            <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
               <CardHeader className="bg-card border-b border-border/50">
                  <CardTitle className="font-display">Crop Moderation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {cropsLoading ? (
                    <div className="p-8">Loading...</div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead className="pl-6">Crop</TableHead>
                          <TableHead>Farmer</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right pr-6">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {crops?.map(crop => (
                          <TableRow key={crop.id}>
                            <TableCell className="pl-6 font-medium">{crop.name}</TableCell>
                            <TableCell>{crop.farmerName}</TableCell>
                            <TableCell><Badge variant="outline">{crop.category}</Badge></TableCell>
                            <TableCell>
                              {crop.verified ? <Badge className="bg-green-500/10 text-green-600 border-none">Verified</Badge> : <Badge className="bg-amber-500/10 text-amber-600 border-none">Pending</Badge>}
                            </TableCell>
                            <TableCell className="text-right pr-6">
                               {!crop.verified && (
                                <Button size="sm" onClick={() => handleVerifyCrop(crop.id)} disabled={verifyCrop.isPending}>
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

          <TabsContent value="transactions" className="m-0">
             <Card className="border-border/50 shadow-sm rounded-3xl overflow-hidden">
               <CardHeader className="bg-card border-b border-border/50">
                  <CardTitle className="font-display">Network Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {txLoading ? (
                    <div className="p-8">Loading...</div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead className="pl-6">Date</TableHead>
                          <TableHead>Parties</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="pr-6">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions?.map(tx => (
                          <TableRow key={tx.id}>
                            <TableCell className="pl-6">{format(new Date(tx.createdAt), 'MMM d, yyyy')}</TableCell>
                            <TableCell>
                               <div className="text-sm">Buyer: {tx.buyerName}</div>
                               <div className="text-sm">Seller: {tx.farmerName}</div>
                            </TableCell>
                            <TableCell className="font-bold text-primary">₹{tx.amount}</TableCell>
                            <TableCell className="pr-6"><Badge variant="outline">{tx.status}</Badge></TableCell>
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
    </div>
  );
}
