import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Eye, EyeOff } from "lucide-react";

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
          login(data.token);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-700 to-emerald-600 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-2xl">Mana Rythu</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Connecting Farmers<br />with Buyers
          </h2>
          <p className="text-green-100 text-lg leading-relaxed">
            A premium platform trusted by thousands of farmers and buyers across Telangana and Andhra Pradesh.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "Farmers", value: "2,400+" },
              { label: "Buyers", value: "8,900+" },
              { label: "Listings", value: "15K+" },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-white font-bold text-2xl">{s.value}</p>
                <p className="text-green-100 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-green-200 text-sm">Powered by Mana Rythu Agriculture Platform</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Mana Rythu</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1.5 h-11"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-11 pr-11"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPw(v => !v)}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="text-xs text-muted-foreground font-medium mb-2">Demo accounts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">Farmer:</span> farmer@demo.com / demo123</p>
              <p><span className="font-medium text-foreground">Buyer:</span> buyer@demo.com / demo123</p>
              <p><span className="font-medium text-foreground">Admin:</span> admin@demo.com / demo123</p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Mana Rythu?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
