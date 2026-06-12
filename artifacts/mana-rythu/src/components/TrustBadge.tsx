import { cn } from "@/lib/utils";
import { ShieldCheck, Medal } from "lucide-react";

interface TrustBadgeProps {
  trustScore: number;
  verified?: boolean;
  size?: "sm" | "md";
}

export function getTrustTier(score: number): { label: string; color: string; icon: string } {
  if (score >= 80) return { label: "Gold",   color: "text-amber-600 bg-amber-50 border-amber-200",   icon: "🥇" };
  if (score >= 50) return { label: "Silver", color: "text-slate-600 bg-slate-50 border-slate-200",   icon: "🥈" };
  return                  { label: "Bronze", color: "text-orange-700 bg-orange-50 border-orange-200", icon: "🥉" };
}

export default function TrustBadge({ trustScore, verified = false, size = "sm" }: TrustBadgeProps) {
  const tier = getTrustTier(trustScore);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full border",
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1",
        tier.color
      )}>
        <Medal className={size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />
        {tier.icon} {tier.label}
      </span>

      {verified && (
        <span className={cn(
          "inline-flex items-center gap-1 font-semibold rounded-full border",
          size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1",
          "text-green-700 bg-green-50 border-green-200"
        )}>
          <ShieldCheck className={size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />
          Verified
        </span>
      )}
    </div>
  );
}
