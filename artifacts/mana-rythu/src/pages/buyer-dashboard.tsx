import React from "react";
import { useListTransactions, getListTransactionsQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { data: transactions, isLoading } = useListTransactions();

  // Filter transactions for current buyer
  const buyerTransactions = transactions?.filter(tx => tx.buyerId === user?.id) || [];
  const totalSpent = buyerTransactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Buyer Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">₹{totalSpent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{buyerTransactions.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading...</div>
          ) : buyerTransactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buyerTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{format(new Date(tx.createdAt), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="font-medium">{tx.cropName || `Crop #${tx.cropId}`}</TableCell>
                    <TableCell>{tx.farmerName || `Farmer #${tx.farmerId}`}</TableCell>
                    <TableCell>₹{tx.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={tx.status === 'completed' ? 'bg-green-100 text-green-800' : ''}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              You haven't made any purchases yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
