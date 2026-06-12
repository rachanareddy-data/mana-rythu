import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Upload, Bug, AlertTriangle, CheckCircle2, Loader2,
  ShieldAlert, ShieldCheck, Zap, X, Camera,
} from "lucide-react";

interface PestResult {
  disease: string;
  severity: "Low" | "Medium" | "High";
  confidence: number;
  treatments_en: string[];
  treatments_te: string[];
  prevention_en: string[];
  prevention_te: string[];
}

const SEVERITY_CONFIG = {
  Low:    { label: "Low Risk",  color: "bg-green-50 text-green-700 border-green-200",  icon: ShieldCheck,   bar: "bg-green-500",  header: "bg-green-50 border-green-200" },
  Medium: { label: "Moderate",  color: "bg-amber-50 text-amber-700 border-amber-200",  icon: AlertTriangle, bar: "bg-amber-500",  header: "bg-amber-50 border-amber-200" },
  High:   { label: "High Risk", color: "bg-red-50 text-red-700 border-red-200",        icon: ShieldAlert,   bar: "bg-red-500",    header: "bg-red-50 border-red-200" },
};

export default function PestDetection({ cropName }: { cropName?: string }) {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultLang, setResultLang] = useState<"en" | "te">("en");
  const [customCrop, setCustomCrop] = useState(cropName ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      setImageUrl(dataUrl);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const detect = async () => {
    if (!imageUrl || !customCrop.trim()) {
      setError("Please upload an image and enter the crop name.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/pest-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, cropName: customCrop.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Detection failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message ?? "Detection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setImageUrl(null);
    setResult(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const sev = result ? (SEVERITY_CONFIG[result.severity as keyof typeof SEVERITY_CONFIG] ?? SEVERITY_CONFIG.Low) : null;

  return (
    <div className="space-y-4">
      <Card className="border border-orange-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 py-4 px-5">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
              <Bug className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-orange-900">{t("pestAITitle")}</span>
            <span className="ml-auto text-[10px] font-normal text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
              {t("aiPowered")}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          {/* Crop name input */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
              {t("pestCropName")}
            </label>
            <input
              type="text"
              value={customCrop}
              onChange={e => setCustomCrop(e.target.value)}
              placeholder="e.g. Tomato, Chili, Rice..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
            />
          </div>

          {/* Upload area */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5 block">
              {t("uploadCropImage")}
            </label>
            {!imagePreview ? (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-orange-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-orange-400 hover:bg-orange-50/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Camera className="w-7 h-7 text-orange-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">{t("uploadCropImageBtn")}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t("uploadCropImageDesc")}</p>
                </div>
                <span className="text-xs text-orange-600 font-medium bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                  <Upload className="w-3 h-3 inline mr-1" />Browse
                </span>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-orange-100">
                <img src={imagePreview} alt="Uploaded crop" className="w-full max-h-56 object-contain bg-gray-50" />
                <button
                  onClick={reset}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          <Button
            onClick={detect}
            disabled={loading || !imageUrl}
            className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {t("analysingImage")}</>
            ) : (
              <><Zap className="w-4 h-4" /> {t("detectPestBtn")}</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Loading skeleton */}
      {loading && (
        <Card className="border shadow-sm">
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      )}

      {/* Result card */}
      {result && sev && !loading && (
        <Card className={cn("border shadow-sm overflow-hidden", sev.header)}>
          <div className={cn("px-5 py-4 border-b", sev.header)}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <sev.icon className="w-5 h-5 text-gray-700 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-base">{result.disease}</p>
                  <p className="text-xs text-gray-500">{customCrop}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", sev.color)}>
                  {sev.label}
                </span>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-2.5 py-1">
                  {result.confidence}% {t("confidence").toLowerCase()}
                </span>
              </div>
            </div>

            {/* Confidence bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>{t("confidence")}</span><span>{result.confidence}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", sev.bar)} style={{ width: `${result.confidence}%` }} />
              </div>
            </div>
          </div>

          <CardContent className="p-5 space-y-4">
            {/* Language toggle — EN / Telugu (always, independent of app lang) */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setResultLang("en")}
                className={cn(
                  "flex-1 text-xs font-medium py-1.5 rounded-lg border transition-colors",
                  resultLang === "en" ? "bg-gray-900 text-white border-gray-900" : "text-gray-500 border-gray-200 hover:bg-gray-50"
                )}
              >
                {t("english")}
              </button>
              <button
                onClick={() => setResultLang("te")}
                className={cn(
                  "flex-1 text-xs font-medium py-1.5 rounded-lg border transition-colors",
                  resultLang === "te" ? "bg-gray-900 text-white border-gray-900" : "text-gray-500 border-gray-200 hover:bg-gray-50"
                )}
              >
                తెలుగు
              </button>
            </div>

            {/* Treatment steps */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">Rx</span>
                {t("treatmentSteps")}
              </p>
              <ul className="space-y-2">
                {(resultLang === "te" ? result.treatments_te : result.treatments_en).map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention tips */}
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                {t("preventionTips")}
              </p>
              <ul className="space-y-2">
                {(resultLang === "te" ? result.prevention_te : result.prevention_en).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {result.disease === "Healthy Crop" && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-green-800 font-medium">{t("healthyCropMsg")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
