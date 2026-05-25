import { Link } from "wouter";
import { useGetDashboardStats, useListCrops, useDeleteCrop, getListCropsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, TrendingUp, IndianRupee, Wheat, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data for premium feel since the API doesn't provide timeseries
const revenueData = [
  { name: 'Jan', total: 12000 },
  { name: 'Feb', total: 18000 },
  { name: 'Mar', total: 15000 },
  { name: 'Apr', total: 24000 },
  { name: 'May', total: 21000 },
  { name: 'Jun', total: 32000 },
  { name: 'Jul', total: 38000 },
];

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
    <div className="min-h-screen bg-background pb-12">
      <div className="bg-card border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
            </div>
            <Link href="/farmer/crops/new">
              <Button className="rounded-full shadow-lg shadow-primary/20 gap-2 h-11 px-6">
                <Plus className="w-5 h-5" /> List New Crop
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-border/50 shadow-sm bg-card hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-display font-bold text-foreground">₹{stats?.totalRevenue?.toLocaleString() || "0"}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-border/50 shadow-sm bg-card hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Active Listings</p>
                    <h3 className="text-3xl font-display font-bold text-foreground">{crops?.length || 0}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Wheat className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-muted-foreground">Across various categories</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-border/50 shadow-sm bg-card hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Transactions</p>
                    <h3 className="text-3xl font-display font-bold text-foreground">{stats?.totalTransactions || 0}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-muted-foreground">Successfully completed</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="font-display">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} tickFormatter={(value) => `₹${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity/Listing Section */}
          <div className="lg:col-span-3">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display">My Crop Listings</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse"></div>)}
                  </div>
                ) : crops && crops.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50 hover:bg-transparent">
                          <TableHead className="font-medium text-muted-foreground">Crop Info</TableHead>
                          <TableHead className="font-medium text-muted-foreground">Price</TableHead>
                          <TableHead className="font-medium text-muted-foreground">Stock</TableHead>
                          <TableHead className="font-medium text-muted-foreground">Status</TableHead>
                          <TableHead className="text-right font-medium text-muted-foreground">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {crops.map((crop) => (
                          <TableRow key={crop.id} className="border-border/50 group">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {crop.imageUrl ? (
                                  <img src={crop.imageUrl} className="h-12 w-12 rounded-lg object-cover bg-muted" alt="" />
                                ) : (
                                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                                    {crop.name[0]}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-foreground">{crop.name}</p>
                                  <p className="text-xs text-muted-foreground">{crop.category}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">₹{crop.price}<span className="text-muted-foreground font-normal">/{crop.unit}</span></TableCell>
                            <TableCell>{crop.qty} {crop.unit}</TableCell>
                            <TableCell>
                              {crop.verified ? (
                                <Badge className="bg-blue-500/10 text-blue-600 border-none hover:bg-blue-500/20">Verified</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-muted text-muted-foreground border-none">Pending</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" disabled>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20" onClick={() => handleDelete(crop.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-16 px-4">
                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wheat className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No crops listed yet</h3>
                    <p className="text-muted-foreground mb-6">Start selling directly to buyers by adding your first crop.</p>
                    <Link href="/farmer/crops/new">
                      <Button className="rounded-full px-6">List a Crop</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
