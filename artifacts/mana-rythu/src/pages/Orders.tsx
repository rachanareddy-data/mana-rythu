import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetOrders, getGetOrdersQueryKey,
  useUpdateOrderStatus,
  type UpdateOrderStatusInputStatus,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Package, MapPin, Clock, CheckCircle2, XCircle,
  Truck, AlertCircle, ShoppingBag,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; icon: any; badge: string; dot: string }> = {
  pending:    { label: "Pending",    icon: Clock,        badge: "bg-amber-50 text-amber-700 border-amber-200",  dot: "bg-amber-400" },
  accepted:   { label: "Accepted",   icon: CheckCircle2, badge: "bg-green-50 text-green-700 border-green-200",  dot: "bg-green-500" },
  rejected:   { label: "Rejected",   icon: XCircle,      badge: "bg-red-50 text-red-700 border-red-200",        dot: "bg-red-500" },
  processing: { label: "Processing", icon: AlertCircle,  badge: "bg-blue-50 text-blue-700 border-blue-200",     dot: "bg-blue-500" },
  shipped:    { label: "Shipped",    icon: Truck,        badge: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  delivered:  { label: "Delivered",  icon: CheckCircle2, badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  cancelled:  { label: "Cancelled",  icon: XCircle,      badge: "bg-gray-50 text-gray-600 border-gray-200",    dot: "bg-gray-400" },
};

const FARMER_NEXT: Record<string, string[]> = {
  pending:    ["accepted", "rejected"],
  accepted:   ["processing", "cancelled"],
  processing: ["shipped"],
  shipped:    ["delivered"],
};

const BUYER_CANCEL: Record<string, boolean> = { pending: true, accepted: true };

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border", cfg.badge)}>
      <Icon className="w-3 h-3" /> {cfg.label}
    </span>
  );
}

function OrderCard({
  order,
  userRole,
  userId,
  onStatusChange,
}: {
  order: any;
  userRole: string;
  userId: number;
  onStatusChange: (id: number, status: string) => void;
}) {
  const isFarmer = userRole === "farmer";
  const nextStatuses = isFarmer ? (FARMER_NEXT[order.status] ?? []) : [];
  const canCancel = !isFarmer && BUYER_CANCEL[order.status];

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-foreground truncate">{order.cropName ?? `Listing #${order.listingId}`}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isFarmer ? `Buyer: ${order.buyerName ?? "—"}` : `Farmer: ${order.farmerName ?? "—"}`}
              </p>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/60 rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Quantity</p>
            <p className="text-sm font-bold text-foreground">{order.quantity} kg</p>
          </div>
          <div className="bg-muted/60 rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Price / unit</p>
            <p className="text-sm font-bold text-foreground">₹{order.offeredPrice}</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 col-span-2">
            <p className="text-[10px] text-green-600 uppercase tracking-wide mb-0.5">Total Amount</p>
            <p className="text-lg font-bold text-green-700">₹{order.totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {order.note && (
          <p className="text-xs text-muted-foreground italic mb-3 px-1">"{order.note}"</p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</span>
          </div>

          <div className="flex gap-2">
            {canCancel && (
              <Button size="sm" variant="outline" className="h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/5"
                onClick={() => onStatusChange(order.id, "cancelled")}>
                Cancel
              </Button>
            )}
            {nextStatuses.length > 0 && nextStatuses.length === 1 && (
              <Button size="sm" className="h-7 text-xs gap-1"
                onClick={() => onStatusChange(order.id, nextStatuses[0])}>
                Mark {STATUS_CONFIG[nextStatuses[0]]?.label}
              </Button>
            )}
            {nextStatuses.length > 1 && (
              <Select onValueChange={(val) => onStatusChange(order.id, val)}>
                <SelectTrigger className="h-7 text-xs w-32">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  {nextStatuses.map(s => (
                    <SelectItem key={s} value={s}>{STATUS_CONFIG[s]?.label ?? s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Orders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"active" | "all">("active");

  const isFarmer = user?.role === "farmer";
  const params = isFarmer
    ? { farmerId: user?.id }
    : { buyerId: user?.id };

  const { data: orders, isLoading } = useGetOrders(params, {
    query: {
      enabled: !!user,
      queryKey: getGetOrdersQueryKey(params),
      refetchInterval: 30_000,
    },
  });

  const statusMutation = useUpdateOrderStatus();

  const handleStatusChange = (id: number, status: string) => {
    statusMutation.mutate(
      { id, data: { status: status as UpdateOrderStatusInputStatus } },
      {
        onSuccess: () => {
          toast({ title: `Order ${status}`, description: "Status updated successfully." });
          qc.invalidateQueries({ queryKey: getGetOrdersQueryKey(params) });
        },
        onError: () => toast({ title: "Update failed", variant: "destructive" }),
      }
    );
  };

  const ACTIVE_STATUSES = ["pending", "accepted", "processing", "shipped"];
  const filtered = tab === "active"
    ? (orders ?? []).filter(o => ACTIVE_STATUSES.includes(o.status))
    : (orders ?? []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <Package className="w-12 h-12 text-muted-foreground mb-3" />
        <h3 className="font-semibold text-foreground mb-1">Sign in to view orders</h3>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 pb-24 lg:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-primary" /> My Orders
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isFarmer ? "Manage incoming orders from buyers" : "Track your crop orders"}
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="mb-5">
          <TabsTrigger value="active" className="gap-1.5">
            Active
            {orders && orders.filter(o => ACTIVE_STATUSES.includes(o.status)).length > 0 && (
              <span className="text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 py-0 font-bold">
                {orders.filter(o => ACTIVE_STATUSES.includes(o.status)).length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        {["active", "all"].map(t => (
          <TabsContent key={t} value={t}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    userRole={user.role}
                    userId={user.id}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No orders yet</h3>
                <p className="text-sm text-muted-foreground">
                  {isFarmer
                    ? "Orders from buyers will appear here"
                    : "Browse the marketplace and place your first order"}
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
