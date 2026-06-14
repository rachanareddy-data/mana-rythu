import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useGetUserProfile, useCreateReview, useGetReviews } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useLanguage } from "@/contexts/language";
import {
  Star, StarOff, ShieldCheck, MapPin, Phone, MessageSquare,
  Package, TrendingUp, Award, ThumbsUp, ArrowLeft, Loader2,
  BadgeCheck, Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

function StarRow({ value, onChange, max = 5 }: { value: number; onChange?: (v: number) => void; max?: number }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => i + 1).map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHover(i)}
          onMouseLeave={() => onChange && setHover(0)}
          className={cn("transition-colors", onChange ? "cursor-pointer" : "cursor-default")}
        >
          <Star className={cn("w-5 h-5", (hover || value) >= i ? "fill-amber-400 text-amber-400" : "text-gray-300")} />
        </button>
      ))}
    </div>
  );
}

function TrustBadge({ score }: { score: number }) {
  const level = score >= 85 ? "Gold" : score >= 65 ? "Silver" : "Bronze";
  const colors = {
    Gold: "bg-amber-50 border-amber-300 text-amber-800",
    Silver: "bg-gray-50 border-gray-300 text-gray-700",
    Bronze: "bg-orange-50 border-orange-300 text-orange-800",
  };
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold", colors[level])}>
      <Award className="w-4 h-4" />
      <span>{level} Trusted Buyer</span>
      <span className="text-xs opacity-70">({score}/100)</span>
    </div>
  );
}

export default function UserProfile() {
  const [, params] = useRoute("/profile/:id");
  const userId = parseInt(params?.id ?? "0");
  const { user } = useAuth();
  const { t } = useLanguage();
  const qc = useQueryClient();

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  const { data: profile, isLoading, error } = useGetUserProfile(userId, { query: { enabled: !!userId } } as any);
  const { mutateAsync: createReview } = useCreateReview();

  const canReview = user && user.id !== userId && !reviewDone;

  const handleSubmitReview = async () => {
    if (!user || reviewRating === 0) return;
    setSubmitting(true);
    try {
      await createReview({
        data: {
          fromUserId: user.id,
          toUserId: userId,
          rating: reviewRating,
          comment: reviewComment.trim() || null,
        },
      });
      setReviewDone(true);
      qc.invalidateQueries({ queryKey: ["/api/users", userId, "profile"] });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <p className="text-muted-foreground">User not found.</p>
        <Link href="/marketplace">
          <Button variant="outline" className="mt-4">← Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const isBuyer = profile.role === "buyer";
  const isFarmer = profile.role === "farmer";

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Back button */}
      <Link href="/marketplace">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Cover */}
        <div className={cn(
          "h-24",
          isFarmer ? "bg-gradient-to-r from-green-600 to-emerald-500" : "bg-gradient-to-r from-blue-600 to-sky-500"
        )} />

        <div className="px-5 pb-5">
          {/* Avatar */}
          <div className="-mt-10 mb-3">
            <div className={cn(
              "w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center text-2xl font-bold text-white shadow-md",
              isFarmer ? "bg-green-600" : "bg-blue-600"
            )}>
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
                {profile.verified && (
                  <span title="Verified" className="text-green-600">
                    <BadgeCheck className="w-5 h-5" />
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground capitalize mt-0.5">{profile.role}</p>
            </div>

            {/* Trust score badge for buyers */}
            {isBuyer && profile.trustedBuyerScore != null && (
              <TrustBadge score={Math.round(profile.trustedBuyerScore)} />
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{profile.bio}</p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-green-600" />
                {profile.location}
              </span>
            )}
            {profile.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-500" />
                {profile.phone}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Member since {new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {isFarmer && (
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <Package className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-700">{profile.activeListings}</p>
                <p className="text-[11px] text-green-600">Active Listings</p>
              </div>
            )}
            <div className={cn("rounded-xl p-3 text-center", isFarmer ? "bg-amber-50" : "bg-blue-50")}>
              <Star className={cn("w-5 h-5 mx-auto mb-1", isFarmer ? "text-amber-500" : "text-blue-500")} />
              <p className={cn("text-lg font-bold", isFarmer ? "text-amber-700" : "text-blue-700")}>
                {profile.rating ? profile.rating.toFixed(1) : "—"}
              </p>
              <p className={cn("text-[11px]", isFarmer ? "text-amber-600" : "text-blue-600")}>
                Rating ({profile.ratingCount})
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <MessageSquare className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-700">{profile.totalReviews}</p>
              <p className="text-[11px] text-purple-600">Reviews</p>
            </div>
            {isBuyer && (
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <ThumbsUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-700">
                  {profile.trustedBuyerScore != null ? `${Math.round(profile.trustedBuyerScore)}%` : "—"}
                </p>
                <p className="text-[11px] text-green-600">Trust Score</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent listings (farmer only) */}
      {isFarmer && profile.recentListings.length > 0 && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
          <h2 className="font-semibold text-base mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" /> Active Listings
          </h2>
          <div className="space-y-3">
            {profile.recentListings.map((l) => (
              <Link key={l.id} href={`/listing/${l.id}`}>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-green-50/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg">🌾</div>
                    <div>
                      <p className="font-medium text-sm">{l.cropName}</p>
                      <p className="text-xs text-muted-foreground">{l.location} · {l.quantity}{l.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-green-700">₹{l.minPrice}–{l.maxPrice}</p>
                    {l.qualityGrade && (
                      <Badge variant="outline" className={cn(
                        "text-[10px] mt-0.5",
                        l.qualityGrade === "A" && "border-green-300 text-green-700 bg-green-50",
                        l.qualityGrade === "B" && "border-amber-300 text-amber-700 bg-amber-50",
                        l.qualityGrade === "C" && "border-orange-300 text-orange-700 bg-orange-50",
                      )}>
                        Grade {l.qualityGrade}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Reviews section */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-purple-600" />
          Reviews ({profile.totalReviews})
        </h2>

        {/* Write a review */}
        {canReview && (
          <div className="mb-5 p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-sm font-medium text-green-800 mb-3">{t("writeReview")}</p>
            <StarRow value={reviewRating} onChange={setReviewRating} />
            <textarea
              value={reviewComment}
              onChange={e => setReviewComment(e.target.value)}
              placeholder="Share your experience (optional)..."
              rows={2}
              className="w-full mt-3 px-3 py-2 text-sm rounded-xl border border-border outline-none focus:ring-2 focus:ring-green-200 resize-none"
            />
            <Button
              onClick={handleSubmitReview}
              disabled={reviewRating === 0 || submitting}
              size="sm"
              className="mt-2 bg-green-600 hover:bg-green-700"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
              Submit Review
            </Button>
          </div>
        )}

        {reviewDone && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            ✅ Your review has been submitted!
          </div>
        )}

        {/* Review list */}
        {profile.recentReviews.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {profile.recentReviews.map(r => (
              <div key={r.id} className="flex gap-3 p-3 rounded-xl border border-border">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                  {r.fromUserName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{r.fromUserName}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">{r.fromUserRole}</Badge>
                    <StarRow value={r.rating} max={5} />
                  </div>
                  {r.comment && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.comment}</p>}
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
