import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useRegister } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Tractor, ShoppingCart, ArrowRight, Check, Leaf, Users, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FARMER_PERKS = [
  "List unlimited crops for free",
  "Direct connection to 8,900+ buyers",
  "Real-time mandi price intelligence",
  "Verified badge for trust signals",
];

const BUYER_PERKS = [
  "Browse 15,000+ fresh listings",
  "Direct chat with verified farmers",
  "Best prices — no middlemen",
  "Order tracking & history",
];

export default function Register() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", password: "",
    role: "buyer" as "farmer" | "buyer",
    phone: "", location: "",
  });
  const mutation = useRegister();

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      {
        data: {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          phone: form.phone || null,
          location: form.location || null,
        },
      },
      {
        onSuccess: (data: any) => {
          login(data.token, data.user);
          toast({ title: "Account created!", description: `Welcome, ${data.user.name}!` });
          if (form.role === "farmer") navigate("/farmer-dashboard");
          else if (form.role === "buyer") navigate("/buyer-dashboard");
          else navigate("/");
        },
        onError: (err: any) => {
          toast({ title: "Registration failed", description: err?.message || "Please try again", variant: "destructive" });
        },
      }
    );
  };

  const isFarmer = form.role === "farmer";
  const perks = isFarmer ? FARMER_PERKS : BUYER_PERKS;

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] gradient-primary relative overflow-hidden flex-col justify-between p-14">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Mana Rythu</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <motion.div
              key={form.role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-5"
            >
              {isFarmer ? <Tractor className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
              {isFarmer ? "Farmer Account" : "Buyer Account"}
            </motion.div>
            <motion.h2
              key={`title-${form.role}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white leading-tight mb-3"
            >
              {isFarmer ? "Sell directly\nto buyers." : "Buy directly\nfrom farms."}
            </motion.h2>
            <p className="text-green-100/80 text-base leading-relaxed">
              {isFarmer
                ? "Join 2,400+ farmers already earning better prices with Mana Rythu."
                : "Access 15,000+ listings from verified farmers across Telangana & AP."}
            </p>
          </div>

          <div className="space-y-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/90 text-sm">{perk}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Leaf, label: "Farmers", value: "2,400+" },
              { icon: Users, label: "Buyers", value: "8,900+" },
              { icon: BarChart2, label: "Listings", value: "15K+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-green-100/70 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-green-200/50 text-xs">© 2024 Mana Rythu. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-start justify-center p-6 py-10 bg-background overflow-y-auto">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-green">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Mana Rythu</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-1">Create account</h1>
          <p className="text-muted-foreground mb-6 text-sm">Join thousands of farmers and buyers</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {([
              { value: "farmer" as const, label: "I'm a Farmer", icon: Tractor, desc: "List & sell your crops" },
              { value: "buyer" as const, label: "I'm a Buyer", icon: ShoppingCart, desc: "Browse & purchase crops" },
            ]).map(({ value, label, icon: Icon, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm(f => ({ ...f, role: value }))}
                className={cn(
                  "flex flex-col items-start gap-2 p-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden",
                  form.role === value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                )}
              >
                {form.role === value && (
                  <motion.div
                    layoutId="role-bg"
                    className="absolute inset-0 bg-primary/5 rounded-2xl"
                  />
                )}
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center relative z-10",
                  form.role === value ? "bg-primary/15" : "bg-muted"
                )}>
                  <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                </div>
                <div className="relative z-10">
                  <p className="font-semibold text-sm leading-none mb-0.5">{label}</p>
                  <p className="text-xs opacity-60">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm font-semibold text-foreground">Full name</Label>
              <Input
                value={form.name}
                onChange={set("name")}
                placeholder="Ravi Kumar"
                required
                className="mt-2 h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-foreground">Email address</Label>
              <Input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                required
                className="mt-2 h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-foreground">Password</Label>
              <Input
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder="Min. 6 characters"
                required
                minLength={6}
                className="mt-2 h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-semibold text-foreground">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765..."
                  className="mt-2 h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-foreground">Location <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input
                  value={form.location}
                  onChange={set("location")}
                  placeholder="Hyderabad"
                  className="mt-2 h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold mt-1 rounded-xl gradient-primary shadow-green border-0 gap-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create {form.role} account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
