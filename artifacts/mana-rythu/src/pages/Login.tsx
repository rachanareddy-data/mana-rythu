import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Eye, EyeOff, ArrowRight, Leaf, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  { icon: Leaf, title: "Direct from Farm", desc: "Fresh produce straight from verified farmers" },
  { icon: Shield, title: "Verified Farmers", desc: "Every farmer on our platform is verified" },
  { icon: TrendingUp, title: "Real-time Prices", desc: "Live mandi prices and market intelligence" },
];

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const mutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (data: any) => {
          login(data.token, data.user);
          toast({ title: "Welcome back!", description: `Signed in as ${data.user.name}` });
          const role = data.user?.role;
          if (role === "farmer") navigate("/farmer-dashboard");
          else if (role === "buyer") navigate("/buyer-dashboard");
          else if (role === "admin") navigate("/admin");
          else navigate("/");
        },
        onError: () => {
          toast({ title: "Sign in failed", description: "Invalid email or password", variant: "destructive" });
        },
      }
    );
  };

  const fillDemo = (role: "farmer" | "buyer") => {
    setEmail(role === "farmer" ? "farmer@demo.com" : "buyer@demo.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] gradient-primary relative overflow-hidden flex-col justify-between p-14">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-16 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20"
        >
          <Sprout className="w-7 h-7 text-white" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-48 right-24 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/15"
        >
          <Leaf className="w-5 h-5 text-white/80" />
        </motion.div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Mana Rythu</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 live-dot" />
              Trusted by 12,000+ farmers
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Grow more,<br />earn more.
            </h2>
            <p className="text-green-100/90 text-lg leading-relaxed max-w-sm">
              Telangana & AP's premium direct-to-buyer agriculture marketplace.
            </p>
          </div>

          <div className="space-y-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-green-100/70 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Farmers", value: "2,400+" },
              { label: "Buyers", value: "8,900+" },
              { label: "Listings", value: "15K+" },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <p className="text-white font-bold text-2xl">{s.value}</p>
                <p className="text-green-100/70 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-green-200/60 text-xs">© 2024 Mana Rythu. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-green">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Mana Rythu</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground mb-8 text-sm">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 pr-12 text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg"
                  onClick={() => setShowPw(v => !v)}
                >
                  {showPw ? <EyeOff className="w-4.5 h-4.5 w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold rounded-xl gradient-primary shadow-green border-0 gap-2 mt-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-5 p-4 bg-muted/60 rounded-2xl border border-border/60">
            <p className="text-xs font-semibold text-foreground mb-2.5">Try demo accounts</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo("farmer")}
                className="flex-1 text-xs py-2 px-3 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/30 text-foreground font-medium transition-all"
              >
                🌾 Farmer demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo("buyer")}
                className="flex-1 text-xs py-2 px-3 rounded-xl border border-border bg-card hover:bg-primary/5 hover:border-primary/30 text-foreground font-medium transition-all"
              >
                🛒 Buyer demo
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Password: <span className="font-mono font-medium">demo123</span></p>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Mana Rythu?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
