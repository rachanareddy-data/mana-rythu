import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Truck, MapPin, Package, Clock, IndianRupee, Loader2, ChevronDown, ChevronUp } from "lucide-react";

interface LogisticsResult {
  fromLocation: string;
  toLocation: string;
  weight: number;
  distance: number;
  estimatedCost: number;
  deliveryTime: string;
  costPerKg: number;
  breakdown: { label: string; amount: number }[];
  note: string;
}

const TELANGANA_AP_CITIES = [
  "Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam",
  "Nalgonda", "Mahbubnagar", "Adilabad", "Sangareddy", "Siddipet",
  "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool",
  "Nellore", "Rajahmundry", "Kakinada", "Eluru", "Ongole",
];

export default function LogisticsEstimator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LogisticsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [open, setOpen] = useState(false);

  const estimate = async () => {
    if (!from.trim() || !to.trim() || !weight) {
      setError("Please fill in all fields.");
      return;
    }
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      setError("Weight must be a positive number.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/logistics/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromLocation: from.trim(), toLocation: to.trim(), weight: w }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Estimation failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to estimate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-blue-100 shadow-sm overflow-hidden">
      <button
        className="w-full text-left"
        onClick={() => setOpen(v => !v)}
      >
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 px-4">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-blue-900 font-semibold">Book Transport</span>
            </div>
            {open ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-blue-400" />}
          </CardTitle>
        </CardHeader>
      </button>

      {open && (
        <CardContent className="p-4 space-y-3">
          <p className="text-xs text-gray-500">Estimate delivery cost for your crop transport across Telangana & AP.</p>

          {/* From */}
          <div>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide block mb-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                list="cities-from"
                value={from}
                onChange={e => setFrom(e.target.value)}
                placeholder="Origin city..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
              <datalist id="cities-from">
                {TELANGANA_AP_CITIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          {/* To */}
          <div>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide block mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                list="cities-to"
                value={to}
                onChange={e => setTo(e.target.value)}
                placeholder="Destination city..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
              <datalist id="cities-to">
                {TELANGANA_AP_CITIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide block mb-1">Weight (kg)</label>
            <div className="relative">
              <Package className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="e.g. 500"
                min="1"
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">{error}</p>
          )}

          <Button
            onClick={estimate}
            disabled={loading}
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
            size="sm"
          >
            {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Estimating...</> : <><Truck className="w-3.5 h-3.5" /> Get Estimate</>}
          </Button>

          {loading && <Skeleton className="h-24 rounded-xl" />}

          {result && !loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
              {/* Main result */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-medium">Estimated Cost</span>
                  <span className="text-xl font-bold text-blue-800">₹{result.estimatedCost.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-lg p-2 border border-blue-100">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500">Distance</p>
                    <p className="text-xs font-bold text-gray-800">{result.distance} km</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-blue-100">
                    <Clock className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500">Delivery</p>
                    <p className="text-[10px] font-bold text-gray-800 leading-tight">{result.deliveryTime}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-blue-100">
                    <IndianRupee className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
                    <p className="text-[10px] text-gray-500">Per kg</p>
                    <p className="text-xs font-bold text-gray-800">₹{result.costPerKg}</p>
                  </div>
                </div>
              </div>

              {/* Breakdown toggle */}
              <button
                onClick={() => setShowBreakdown(v => !v)}
                className="w-full px-4 py-2 text-xs text-blue-600 font-medium flex items-center justify-between bg-white border-t border-blue-100 hover:bg-blue-50 transition-colors"
              >
                Cost breakdown {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showBreakdown && (
                <div className="bg-white px-4 pb-3 border-t border-blue-50 space-y-1.5">
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-semibold text-gray-800">₹{item.amount}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-xs font-bold">
                    <span>Total</span>
                    <span className="text-blue-700">₹{result.estimatedCost}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 italic">{result.note}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
