import { useListTransactions, getListTransactionsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ShoppingBag, IndianRupee, MapPin, User as UserIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { data: transactions, isLoading } = useListTransactions();

  // Filter transactions for current buyer
  const buyerTransactions = transactions?.filter(tx => tx.buyerId === user?.id) || [];
  const totalSpent = buyerTransactions.reduce((acc, tx) => acc + tx.amount, 0);

  // Mock data for spending chart
  const spendingData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 8000 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 12000 },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="bg-card border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Buyer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your sourcing and purchase history, {user?.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 shadow-sm bg-card hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Spent</p>
                    <h3 className="text-3xl font-display font-bold text-foreground">₹{totalSpent.toLocaleString()}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-border/50 shadow-sm bg-card hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
                    <h3 className="text-3xl font-display font-bold text-foreground">{buyerTransactions.length}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="col-span-1 md:col-span-2">
            <Card className="border-border/50 shadow-sm bg-card h-full">
               <CardContent className="p-6 h-full flex flex-col justify-center">
                 <p className="text-sm font-medium text-muted-foreground mb-4">Spending Trend</p>
                 <div className="h-16 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={spendingData}>
                        <defs>
                          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSpend)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
               </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-border/50 shadow-sm overflow-hidden rounded-3xl">
          <div className="bg-card px-8 py-6 border-b border-border/50">
            <h2 className="text-xl font-display font-bold">Recent Purchases</h2>
          </div>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse"></div>)}
              </div>
            ) : buyerTransactions.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="py-4 font-medium text-muted-foreground pl-8">Date</TableHead>
                      <TableHead className="font-medium text-muted-foreground">Order Details</TableHead>
                      <TableHead className="font-medium text-muted-foreground">Source</TableHead>
                      <TableHead className="font-medium text-muted-foreground">Amount</TableHead>
                      <TableHead className="font-medium text-muted-foreground pr-8">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buyerTransactions.map((tx) => (
                      <TableRow key={tx.id} className="border-border/50">
                        <TableCell className="pl-8 text-muted-foreground">
                          {format(new Date(tx.createdAt), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-foreground">{tx.cropName || `Order #${tx.cropId}`}</div>
                          <div className="text-xs text-muted-foreground">ID: {tx.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs">
                              <UserIcon className="w-3 h-3" />
                            </div>
                            <span className="font-medium">{tx.farmerName || `Farmer #${tx.farmerId}`}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-foreground">₹{tx.amount.toLocaleString()}</TableCell>
                        <TableCell className="pr-8">
                          <Badge variant="outline" className={`border-none ${
                            tx.status === 'completed' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                          }`}>
                            <span className="capitalize">{tx.status}</span>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-24 px-4">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground">Visit the marketplace to source fresh produce.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
