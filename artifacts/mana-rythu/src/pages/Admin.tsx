import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAdminStats, getGetAdminStatsQueryKey,
  useGetUsers, getGetUsersQueryKey,
  useVerifyUser,
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, ShoppingBag, TrendingUp, CheckCircle2, Clock,
  Star, Shield, Sprout, BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

function StatCard({ label, value, icon: Icon, color, sub }: { label: string; value: string | number; icon: any; color: string; sub?: string }) {
  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", color)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VerificationToggle({ userId, verified, onToggle }: { userId: number; verified: boolean; onToggle: (id: number, v: boolean) => void }) {
  return (
    <button
      onClick={() => onToggle(userId, !verified)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
        verified ? "bg-primary" : "bg-muted-foreground/30"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm",
          verified ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export default function Admin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<"farmer" | "buyer">("farmer");

  const { data: stats, isLoading: statsLoading } = useGetAdminStats({ query: { queryKey: getGetAdminStatsQueryKey() } });
  const { data: farmers, isLoading: farmersLoading } = useGetUsers({ role: "farmer" }, { query: { queryKey: getGetUsersQueryKey({ role: "farmer" }) } });
  const { data: buyers, isLoading: buyersLoading } = useGetUsers({ role: "buyer" }, { query: { queryKey: getGetUsersQueryKey({ role: "buyer" }) } });

  const verifyMutation = useVerifyUser();

  const handleToggle = (id: number, verified: boolean) => {
    verifyMutation.mutate(
      { id, data: { verified } },
      {
        onSuccess: () => {
          toast({ title: verified ? "User verified" : "Verification removed", description: `User ID ${id} status updated.` });
          qc.invalidateQueries({ queryKey: getGetUsersQueryKey({ role: "farmer" }) });
          qc.invalidateQueries({ queryKey: getGetUsersQueryKey({ role: "buyer" }) });
          qc.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
        },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      }
    );
  };

  const users = activeTab === "farmer" ? farmers : buyers;
  const usersLoading = activeTab === "farmer" ? farmersLoading : buyersLoading;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Admin Panel
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Platform management and analytics</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
        ) : stats ? (
          <>
            <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} icon={Users} color="bg-blue-100 text-blue-700" />
            <StatCard label="Pending Verif." value={stats.pendingVerifications} icon={Clock} color="bg-amber-100 text-amber-700" />
            <StatCard label="Active Listings" value={stats.activeListings} icon={ShoppingBag} color="bg-green-100 text-green-700" />
            <StatCard label="New This Week" value={stats.newUsersThisWeek} icon={TrendingUp} color="bg-purple-100 text-purple-700" sub="new users" />
            <StatCard label="Total Revenue" value={`₹${(stats.totalRevenue / 1000).toFixed(0)}K`} icon={BarChart2} color="bg-emerald-100 text-emerald-700" sub="est. marketplace" />
            <StatCard label="Top Crop" value={stats.topCrops[0]?.cropName ?? "—"} icon={Sprout} color="bg-teal-100 text-teal-700" />
          </>
        ) : null}
      </div>

      {/* Charts + Tables row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top crops chart */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" /> Top Crops
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : stats?.topCrops && stats.topCrops.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={stats.topCrops} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="cropName" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {stats.topCrops.map((_, i) => (
                      <Cell key={i} fill={`hsl(142, 76%, ${36 + i * 6}%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No crop data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Users table */}
        <Card className="lg:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">User Management</CardTitle>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="h-7">
                  <TabsTrigger value="farmer" className="text-xs px-3 h-6">Farmers</TabsTrigger>
                  <TabsTrigger value="buyer" className="text-xs px-3 h-6">Buyers</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : users && users.length > 0 ? (
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">Name</th>
                      <th className="text-left py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden sm:table-cell">Location</th>
                      <th className="text-left py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">Rating</th>
                      <th className="text-right py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">Verified</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                              {u.name.slice(0, 1).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate text-sm">{u.name}</p>
                              <p className="text-xs text-muted-foreground truncate hidden sm:block">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-xs text-muted-foreground hidden sm:table-cell">
                          {u.location ?? "—"}
                        </td>
                        <td className="py-3 pr-3 hidden md:table-cell">
                          {u.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-medium">{u.rating.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-muted-foreground hidden sm:block">
                              {u.verified ? "Active" : "Pending"}
                            </span>
                            <VerificationToggle userId={u.id} verified={u.verified} onToggle={handleToggle} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No {activeTab}s registered yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
