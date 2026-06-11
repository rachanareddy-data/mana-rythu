import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useRegister } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Tractor, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Register() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" as "farmer" | "buyer", phone: "", location: "" });
  const mutation = useRegister();

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone || null, location: form.location || null } },
      {
        onSuccess: (data: any) => {
          login(data.token);
          toast({ title: "Account created!", description: `Welcome, ${data.user.name}!` });
          const role = form.role;
          if (role === "farmer") navigate("/farmer-dashboard");
          else if (role === "buyer") navigate("/buyer-dashboard");
          else navigate("/");
        },
        onError: (err: any) => {
          toast({ title: "Registration failed", description: err?.message || "Please try again", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Sprout className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">Mana Rythu</span>
        </div>

        <h1 className="text-3xl font-bold mb-1">Create account</h1>
        <p className="text-muted-foreground mb-8">Join thousands of farmers and buyers on Mana Rythu</p>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {([
            { value: "farmer", label: "Farmer", icon: Tractor, desc: "List and manage your crops" },
            { value: "buyer", label: "Buyer", icon: ShoppingCart, desc: "Browse and purchase crops" },
          ] as const).map(({ value, label, icon: Icon, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm(f => ({ ...f, role: value }))}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
                form.role === value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="font-semibold text-sm">{label}</span>
              <span className="text-xs opacity-70">{desc}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Full name</Label>
            <Input value={form.name} onChange={set("name")} placeholder="Ravi Kumar" required className="mt-1.5 h-11" />
          </div>
          <div>
            <Label className="text-sm font-medium">Email address</Label>
            <Input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required className="mt-1.5 h-11" />
          </div>
          <div>
            <Label className="text-sm font-medium">Password</Label>
            <Input type="password" value={form.password} onChange={set("password")} placeholder="Min. 6 characters" required minLength={6} className="mt-1.5 h-11" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium">Phone (optional)</Label>
              <Input value={form.phone} onChange={set("phone")} placeholder="+91 98765..." className="mt-1.5 h-11" />
            </div>
            <div>
              <Label className="text-sm font-medium">Location (optional)</Label>
              <Input value={form.location} onChange={set("location")} placeholder="Hyderabad" className="mt-1.5 h-11" />
            </div>
          </div>

          <Button type="submit" className="w-full h-11 font-semibold mt-2" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating account..." : `Create ${form.role} account`}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
