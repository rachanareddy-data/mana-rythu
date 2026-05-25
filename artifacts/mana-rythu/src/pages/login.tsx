import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, Link } from "wouter";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data }, {
      onSuccess: (res) => {
        login(res.token, res.user);
        toast({ title: "Welcome back to Mana Rythu!" });
        if (res.user.role === "farmer") setLocation("/farmer/dashboard");
        else if (res.user.role === "admin") setLocation("/admin");
        else setLocation("/buyer/dashboard");
      },
      onError: (err: any) => {
        toast({ 
          title: "Login failed", 
          description: err.data?.error || "Invalid credentials",
          variant: "destructive" 
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Brand Side */}
      <div className="hidden lg:flex w-1/2 relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/80 mix-blend-multiply z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop" 
          alt="Indian farm fields" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 h-full text-white">
          <Link href="/" className="flex items-center gap-3 w-fit cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">Mana Rythu</span>
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-display font-bold mb-4 leading-tight">Welcome back to the future of farming.</h2>
            <p className="text-lg text-white/80">Connect directly. Trade fairly. Grow together.</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-12 text-primary w-fit">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-display font-bold">Mana Rythu</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Sign in to your account</h1>
            <p className="text-muted-foreground mb-8">Enter your details to access your dashboard</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" className="h-12 rounded-xl bg-muted/50 border-border/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/50 border-border/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-4 group"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  {!loginMutation.isPending && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>
            </Form>

            <p className="text-center mt-8 text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">Create one</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
