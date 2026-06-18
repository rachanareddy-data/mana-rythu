import { useState } from "react";
import { useGetFairPrice, useSuggestCrop } from "@workspace/api-client-react";
import { useLanguage } from "@/contexts/language";
import {
  Calculator, TrendingUp, TrendingDown, Minus,
  Info, ChevronDown, ArrowRight, Loader2, Sprout,
  CheckCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const GRADE_INFO = [
  { grade: "A", label: "Grade A — Premium", desc: "Uniform, undamaged, excellent colour", mult: "+10%", color: "bg-green-50 border-green-300 text-green-800", badgeClass: "border-green-300 text-green-700 bg-green-50" },
  { grade: "B", label: "Grade B — Standard", desc: "Minor blemishes, acceptable for market", mult: "0%", color: "bg-amber-50 border-amber-300 text-amber-800", badgeClass: "border-amber-300 text-amber-700 bg-amber-50" },
  { grade: "C", label: "Grade C — Economy", desc: "Visible damage, lower market appeal", mult: "-15%", color: "bg-orange-50 border-orange-300 text-orange-800", badgeClass: "border-orange-300 text-orange-700 bg-orange-50" },
];

export default function FairPriceCalculator() {
  const { t } = useLanguage();
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [grade, setGrade] = useState<"A" | "B" | "C">("B");
  const [submitted, setSubmitted] = useState(false);
  const [suggOpen, setSuggOpen] = useState(false);

  const { data: suggestions } = useSuggestCrop(
    { name: cropName },
    { query: { enabled: cropName.length >= 2, staleTime: 30_000 } } as any
  );

  const { data: result, isFetching, error, refetch } = useGetFairPrice(
    { cropName, quantity: parseFloat(quantity) || 100, unit: "kg", grade },
    { query: { enabled: false } } as any
  );

  const handleCalculate = () => {
    if (!cropName.trim()) return;
    setSubmitted(true);
    refetch();
  };

  const trendIcon = (trend: string) =>
    trend === "up" ? <TrendingUp className="w-4 h-4 text-green-600" />
    : trend === "down" ? <TrendingDown className="w-4 h-4 text-red-500" />
    : <Minus className="w-4 h-4 text-gray-500" />;

  const trendLabel = (trend: string) =>
    trend === "up" ? "Rising" : trend === "down" ? "Falling" : "Stable";

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t("fairPriceCalc")}</h1>
            <p className="text-green-100 text-sm">Get fair market price estimate for your crop</p>
          </div>
        </div>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-5">

        {/* Crop name */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {t("cropName")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
            <input
              type="text"
              value={cropName}
              onChange={e => { setCropName(e.target.value); setSuggOpen(true); setSubmitted(false); }}
              onFocus={() => setSuggOpen(true)}
              onBlur={() => setTimeout(() => setSuggOpen(false), 200)}
              placeholder="e.g. Tomato, Rice, Cotton..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border outline-none focus:ring-2 focus:ring-green-200 text-sm"
            />
          </div>
          {/* Suggestions dropdown */}
          {suggOpen && suggestions?.suggestions && suggestions.suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-xl shadow-lg overflow-hidden">
              {suggestions.suggestions.map(s => (
                <button
                  key={s}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-green-50 hover:text-green-700 transition-colors border-b border-border/50 last:border-0"
                  onMouseDown={() => { setCropName(s); setSuggOpen(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{t("quantityKg")}</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            min="1"
            placeholder="100"
            className="w-full px-4 py-2.5 rounded-xl border border-border outline-none focus:ring-2 focus:ring-green-200 text-sm"
          />
        </div>

        {/* Grade selector */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t("grade")}</label>
          <div className="grid grid-cols-3 gap-2">
            {GRADE_INFO.map(g => (
              <button
                key={g.grade}
                type="button"
                onClick={() => setGrade(g.grade as "A" | "B" | "C")}
                className={cn(
                  "p-3 rounded-xl border-2 text-left transition-all",
                  grade === g.grade
                    ? cn(g.color, "ring-2 ring-offset-1 ring-green-400")
                    : "border-border hover:border-green-200 bg-white"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Grade {g.grade}</span>
                  <span className="text-[11px] font-medium opacity-70">{g.mult}</span>
                </div>
                <p className="text-[11px] opacity-80 leading-tight">{g.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleCalculate}
          disabled={!cropName.trim() || isFetching}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-11 rounded-xl font-semibold"
        >
          {isFetching
            ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Calculating...</>
            : <><Calculator className="w-4 h-4 mr-2" /> {t("calculate")}</>
          }
        </Button>
      </div>

      {/* Results */}
      {submitted && !isFetching && result && (
        <div className="space-y-4">
          {/* Main price result */}
          <div className="bg-gradient-to-br from-green-700 to-emerald-600 rounded-2xl p-5 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-green-200 text-sm">{t("recommendedPrice")}</p>
                <p className="text-3xl font-bold mt-1">
                  ₹{result.fairMin}–₹{result.fairMax}
                </p>
                <p className="text-green-100 text-sm mt-0.5">per {result.unit}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-white/20 border-white/30 text-white text-xs">
                  Grade {grade}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-green-100">
                  {trendIcon(result.trend)}
                  {trendLabel(result.trend)}
                </div>
              </div>
            </div>

            {/* Market vs recommended */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-green-200 text-xs">{t("marketAvg")}</p>
                <p className="text-lg font-bold">₹{result.marketMin}–{result.marketMax}</p>
                <p className="text-green-200 text-[11px]">Mandi rate/{result.unit}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <p className="text-green-100 text-xs">Your {result.unit} value</p>
                <p className="text-lg font-bold">
                  ₹{Math.round(result.fairMin * parseFloat(quantity) || 0).toLocaleString("en-IN")}
                </p>
                <p className="text-green-200 text-[11px]">for {quantity} {result.unit}</p>
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" /> Price Breakdown (per {result.unit})
            </h3>
            <div className="space-y-2">
              {result.breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={cn(
                    "text-sm font-medium",
                    item.isDeduction ? "text-red-600" : "text-green-700"
                  )}>
                    {item.isDeduction ? "−" : "+"}₹{Math.abs(item.amount).toFixed(1)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 font-semibold">
                <span className="text-sm">Recommended range</span>
                <span className="text-green-700">₹{result.fairMin}–₹{result.fairMax}</span>
              </div>
            </div>
          </div>

          {/* Recommendation text */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 leading-relaxed">{result.recommendation}</p>
          </div>

          {/* Grade comparison */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-sm mb-3">Price by Grade Comparison</h3>
            <div className="grid grid-cols-3 gap-2">
              {GRADE_INFO.map(g => {
                const mkt = (result.marketMin + result.marketMax) / 2;
                const mult = g.grade === "A" ? 1.10 : g.grade === "B" ? 1.00 : 0.85;
                const est = Math.round(mkt * mult * 0.97); // after small deduction
                return (
                  <div key={g.grade} className={cn("rounded-xl p-3 border", g.grade === grade ? g.color : "bg-gray-50 border-gray-100")}>
                    <p className="text-xs font-medium mb-1">Grade {g.grade}</p>
                    <p className="font-bold text-base">₹{est}</p>
                    <p className="text-[10px] opacity-70">avg/{result.unit}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 flex items-start gap-1">
              <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
              Prices are market estimates. Actual mandi prices may vary.
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!submitted && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center">
          <Calculator className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Enter crop details above to calculate</p>
          <p className="text-xs text-muted-foreground mt-1">Get fair market price with grade adjustments</p>
        </div>
      )}
    </div>
  );
}
