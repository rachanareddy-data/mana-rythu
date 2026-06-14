import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateListing, getGetListingsQueryKey,
  useSuggestCrop, getSuggestCropQueryKey,
  useSuggestPrice, getSuggestPriceQueryKey,
} from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sprout, ImageIcon, X, Sparkles, TrendingUp, TrendingDown,
  Minus, Upload, ChevronRight, Loader2, CheckCircle2, Info,
  ArrowLeft, MapPin, Package, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

type ListingForm = {
  cropName: string;
  minPrice: string;
  maxPrice: string;
  quantity: string;
  unit: "kg" | "quintal" | "ton";
  location: string;
  imageUrl: string;
  trend: "up" | "down" | "stable";
};

const DEFAULT: ListingForm = {
  cropName: "", minPrice: "", maxPrice: "",
  quantity: "", unit: "kg", location: "",
  imageUrl: "", trend: "stable",
};

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> Rising 📈
    </span>
  );
  if (trend === "down") return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
      <TrendingDown className="w-3 h-3" /> Falling 📉
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-full">
      <Minus className="w-3 h-3" /> Stable ➖
    </span>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

export default function AddCrop() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ListingForm>(DEFAULT);
  const [errors, setErrors] = useState<Partial<Record<keyof ListingForm, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Autocomplete
  const [autocompleteQuery, setAutocompleteQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // AI price trigger
  const [priceQuery, setPriceQuery] = useState("");

  // Debounce autocomplete
  useEffect(() => {
    if (form.cropName.length < 2) { setAutocompleteQuery(""); return; }
    const t = setTimeout(() => setAutocompleteQuery(form.cropName), 300);
    return () => clearTimeout(t);
  }, [form.cropName]);

  const { data: cropSuggestions } = useSuggestCrop(
    { name: autocompleteQuery },
    { query: { queryKey: getSuggestCropQueryKey({ name: autocompleteQuery }), enabled: autocompleteQuery.length >= 2, staleTime: 30_000 } }
  );

  const { data: aiPrice, isLoading: aiLoading } = useSuggestPrice(
    { cropName: priceQuery },
    { query: { queryKey: getSuggestPriceQueryKey({ cropName: priceQuery }), enabled: priceQuery.length >= 3, staleTime: 60_000 } }
  );

  const createListing = useCreateListing();

  const set = (field: keyof ListingForm, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleCropNameChange = (val: string) => {
    set("cropName", val);
    setShowAutocomplete(true);
  };

  const selectSuggestion = (name: string) => {
    set("cropName", name);
    setShowAutocomplete(false);
    setPriceQuery(name);
  };

  const triggerPriceSuggest = () => {
    const name = form.cropName.trim();
    if (name.length >= 3) setPriceQuery(name);
    setShowAutocomplete(false);
  };

  const applyAiPrice = () => {
    if (!aiPrice) return;
    setForm(f => ({
      ...f,
      minPrice: String(aiPrice.suggestedMinPrice),
      maxPrice: String(aiPrice.suggestedMaxPrice),
      unit: aiPrice.unit as "kg" | "quintal" | "ton",
      trend: aiPrice.trend as "up" | "down" | "stable",
    }));
    setErrors(e => ({ ...e, minPrice: undefined, maxPrice: undefined }));
    toast({ title: "AI suggestion applied!", description: aiPrice.note });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setForm(f => ({ ...f, imageUrl: result }));
      setErrors(e => ({ ...e, imageUrl: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setForm(f => ({ ...f, imageUrl: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!form.imageUrl) errs.imageUrl = "Crop image is required";
    if (!form.cropName.trim()) errs.cropName = "Crop name is required";
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) <= 0)
      errs.quantity = "Enter a valid quantity";
    if (!form.minPrice || isNaN(Number(form.minPrice)) || Number(form.minPrice) <= 0)
      errs.minPrice = "Enter a valid minimum price";
    if (!form.maxPrice || isNaN(Number(form.maxPrice)) || Number(form.maxPrice) <= 0)
      errs.maxPrice = "Enter a valid maximum price";
    if (Number(form.minPrice) > Number(form.maxPrice))
      errs.maxPrice = "Max price must be ≥ min price";
    if (!form.location.trim()) errs.location = "Location is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    // Still loading user from /me — wait, don't error
    if (authLoading) return;
    if (!user?.id) {
      toast({ title: "Please sign in as a farmer", variant: "destructive" });
      navigate("/login");
      return;
    }
    if (!validate()) return;

    createListing.mutate(
      {
        data: {
          farmerId: user.id,
          cropName: form.cropName.trim(),
          minPrice: parseFloat(form.minPrice),
          maxPrice: parseFloat(form.maxPrice),
          quantity: parseFloat(form.quantity),
          unit: form.unit,
          location: form.location.trim(),
          imageUrl: form.imageUrl || null,
          trend: form.trend,
        },
      },
      {
        onSuccess: () => {
          // Invalidate all listing queries (prefix match covers filtered + unfiltered)
          qc.invalidateQueries({ queryKey: ["/api/listings"] });
          if (user?.id) qc.invalidateQueries({ queryKey: getGetListingsQueryKey({ farmerId: user.id }) });
          toast({ title: "Crop posted successfully! 🎉", description: `${form.cropName} is now live on the marketplace.` });
          navigate("/marketplace");
        },
        onError: () => toast({ title: "Failed to post crop. Try again.", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-green-50/60 to-white p-4">
      {/* Page header */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/farmer">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Post a Crop Listing</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Fill in the details and let AI suggest the best price</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ── Left: Main form (3 cols) ── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Image Upload */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" /> Crop Photo <span className="text-destructive text-sm">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-52 object-cover rounded-xl border border-border"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-green-700 text-white text-xs gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Photo added
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className={cn(
                      "w-full h-52 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer",
                      errors.imageUrl
                        ? "border-destructive/60 bg-destructive/5"
                        : "border-border hover:border-primary/50 hover:bg-green-50"
                    )}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-green-700" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Click to upload crop photo</p>
                      <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG, WebP — clear daylight photo preferred</p>
                    </div>
                  </button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <FieldError msg={errors.imageUrl} />
              </CardContent>
            </Card>

            {/* Crop Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-primary" /> Crop Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Crop name */}
                <div>
                  <Label className="text-sm font-medium">Crop Name <span className="text-destructive">*</span></Label>
                  <div className="flex gap-2 mt-1.5">
                    <div className="flex-1 relative">
                      <Input
                        value={form.cropName}
                        onChange={e => handleCropNameChange(e.target.value)}
                        onFocus={() => form.cropName.length >= 2 && setShowAutocomplete(true)}
                        onBlur={() => setTimeout(() => setShowAutocomplete(false), 150)}
                        placeholder="e.g. Tomato, Rice, Cotton..."
                        className={cn(errors.cropName && "border-destructive")}
                      />
                      {showAutocomplete && cropSuggestions && cropSuggestions.suggestions.length > 0 && (
                        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg overflow-hidden">
                          <p className="px-3 py-1.5 text-[10px] text-muted-foreground font-medium border-b border-border flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" /> AI suggestions
                          </p>
                          {cropSuggestions.suggestions.map(s => (
                            <button
                              key={s}
                              type="button"
                              onMouseDown={() => selectSuggestion(s)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 hover:text-green-800 transition-colors flex items-center gap-2"
                            >
                              <Sprout className="w-3.5 h-3.5 text-green-500 shrink-0" />
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5 shrink-0"
                      onClick={triggerPriceSuggest}
                      disabled={form.cropName.length < 3 || aiLoading}
                    >
                      {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                      AI Price
                    </Button>
                  </div>
                  <FieldError msg={errors.cropName} />
                </div>

                {/* Quantity + Unit */}
                <div>
                  <Label className="text-sm font-medium">Quantity <span className="text-destructive">*</span></Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input
                      type="number"
                      min="0"
                      value={form.quantity}
                      onChange={e => set("quantity", e.target.value)}
                      placeholder="e.g. 500"
                      className={cn("flex-1", errors.quantity && "border-destructive")}
                    />
                    <select
                      value={form.unit}
                      onChange={e => set("unit", e.target.value)}
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm w-28 shrink-0"
                    >
                      <option value="kg">kg</option>
                      <option value="quintal">quintal</option>
                      <option value="ton">ton</option>
                    </select>
                  </div>
                  <FieldError msg={errors.quantity} />
                </div>

                {/* Location */}
                <div>
                  <Label className="text-sm font-medium">Location <span className="text-destructive">*</span></Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={form.location}
                      onChange={e => set("location", e.target.value)}
                      placeholder="e.g. Guntur, Andhra Pradesh"
                      className={cn("pl-9", errors.location && "border-destructive")}
                    />
                  </div>
                  <FieldError msg={errors.location} />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" /> Price Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Min Price (₹) <span className="text-destructive">*</span></Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">₹</span>
                      <Input
                        type="number"
                        min="0"
                        value={form.minPrice}
                        onChange={e => set("minPrice", e.target.value)}
                        placeholder="e.g. 25"
                        className={cn("pl-7", errors.minPrice && "border-destructive")}
                      />
                    </div>
                    <FieldError msg={errors.minPrice} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Max Price (₹) <span className="text-destructive">*</span></Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">₹</span>
                      <Input
                        type="number"
                        min="0"
                        value={form.maxPrice}
                        onChange={e => set("maxPrice", e.target.value)}
                        placeholder="e.g. 32"
                        className={cn("pl-7", errors.maxPrice && "border-destructive")}
                      />
                    </div>
                    <FieldError msg={errors.maxPrice} />
                  </div>
                </div>

                {/* Market trend picker */}
                <div>
                  <Label className="text-sm font-medium">Market Trend</Label>
                  <div className="flex gap-2 mt-1.5">
                    {(["up", "stable", "down"] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("trend", t)}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-all",
                          form.trend === t
                            ? t === "up" ? "border-green-500 bg-green-50 text-green-700"
                              : t === "down" ? "border-red-400 bg-red-50 text-red-600"
                              : "border-yellow-400 bg-yellow-50 text-yellow-700"
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {t === "up" ? "📈 Rising" : t === "down" ? "📉 Falling" : "➖ Stable"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price preview */}
                {form.minPrice && form.maxPrice && !errors.minPrice && !errors.maxPrice && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-sm text-green-700 font-medium">Your price range:</span>
                    <span className="font-bold text-green-800">₹{Number(form.minPrice).toLocaleString()} – ₹{Number(form.maxPrice).toLocaleString()}/{form.unit}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              size="lg"
              className="w-full gap-2 text-base h-12"
              onClick={handleSubmit}
              disabled={createListing.isPending || authLoading}
            >
              {authLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Loading your account...</>
              ) : createListing.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Posting to Marketplace...</>
              ) : (
                <><Package className="w-4 h-4" /> Post Crop to Marketplace <ChevronRight className="w-4 h-4" /></>
              )}
            </Button>
          </div>

          {/* ── Right: AI Assistant panel (2 cols) ── */}
          <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-4">

            {/* AI Price Panel */}
            <Card className="border border-amber-200 bg-gradient-to-b from-amber-50 to-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> AI Price Advisor
                </CardTitle>
                <p className="text-xs text-muted-foreground">AI suggestions only — you decide the final price</p>
              </CardHeader>
              <CardContent>
                {!priceQuery ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-amber-500" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Type a crop name and click <span className="font-medium text-foreground">"AI Price"</span> to get market-based price suggestions.
                    </p>
                  </div>
                ) : aiLoading ? (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    <p className="text-sm text-muted-foreground">Analyzing market prices…</p>
                  </div>
                ) : aiPrice ? (
                  <div className="space-y-3">
                    <div className="bg-white border border-amber-100 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Suggested Price</span>
                        <TrendBadge trend={aiPrice.trend} />
                      </div>
                      <p className="text-2xl font-bold text-amber-700">
                        ₹{aiPrice.suggestedMinPrice} – ₹{aiPrice.suggestedMaxPrice}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/{aiPrice.unit}</span>
                      </p>
                      {aiPrice.note && (
                        <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-2">
                          {aiPrice.note}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 border-amber-300 hover:bg-amber-50 text-amber-700"
                      onClick={applyAiPrice}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Apply Suggestion to Form
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center flex items-center gap-1 justify-center">
                      <Info className="w-3 h-3" /> AI suggestion only — verify with local mandi rates
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Crop name suggestions chips */}
            {cropSuggestions && cropSuggestions.suggestions.length > 0 && (
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sprout className="w-3.5 h-3.5 text-green-600" /> Crop Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {cropSuggestions.suggestions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => selectSuggestion(s)}
                        className="px-2.5 py-1 text-xs font-medium rounded-full border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="border border-border shadow-sm bg-card">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs font-semibold text-foreground mb-2">📋 Listing Tips</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span> Use a clear daylight photo of your crop</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span> Set a realistic price range — buyers compare listings</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span> Add your district/village for faster local matches</li>
                  <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span> Keep quantity accurate — update when stock reduces</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
