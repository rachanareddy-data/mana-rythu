import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, Link } from "wouter";
import { useRegister } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Leaf, ArrowRight, Store, Tractor } from "lucide-react";
import { motion } from "framer-motion";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "buyer"]),
});

export default function Register() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const registerMutation = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", role: "buyer" },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    registerMutation.mutate({ data }, {
      onSuccess: (res) => {
        login(res.token, res.user);
        toast({ title: "Account created successfully!" });
        if (res.user.role === "farmer") setLocation("/farmer/dashboard");
        else setLocation("/buyer/dashboard");
      },
      onError: (err: any) => {
        toast({ 
          title: "Registration failed", 
          description: err.data?.error || "Could not create account",
          variant: "destructive" 
        });
      }
    });
  };

  const selectedRole = form.watch("role");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Brand Side */}
      <div className="hidden lg:flex w-1/2 relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary via-secondary/80 to-primary/80 mix-blend-multiply z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1593113565694-c6aa988225ea?q=80&w=2000&auto=format&fit=crop" 
          alt="Agriculture Fields" 
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
            <h2 className="text-4xl font-display font-bold mb-4 leading-tight">Join the network powering India's harvests.</h2>
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4 bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <Tractor className="h-8 w-8" />
                <div>
                  <h4 className="font-bold">For Farmers</h4>
                  <p className="text-sm text-white/80">Direct access to buyers. 100% value retention.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <Store className="h-8 w-8" />
                <div>
                  <h4 className="font-bold">For Buyers</h4>
                  <p className="text-sm text-white/80">Verified organic produce. Honest sourcing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 py-12 lg:py-0 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 text-primary w-fit">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-display font-bold">Mana Rythu</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Create an account</h1>
            <p className="text-muted-foreground mb-8">Join the Mana Rythu marketplace today</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Role Selection Cards */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground">I want to join as a...</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${selectedRole === 'farmer' ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-border/50 bg-muted/30 hover:border-primary/30 hover:bg-muted'}`}
                          onClick={() => field.onChange('farmer')}
                        >
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${selectedRole === 'farmer' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}>
                            <Tractor className="h-6 w-6" />
                          </div>
                          <span className={`font-semibold ${selectedRole === 'farmer' ? 'text-primary' : 'text-foreground'}`}>Farmer</span>
                        </div>
                        <div 
                          className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${selectedRole === 'buyer' ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-border/50 bg-muted/30 hover:border-primary/30 hover:bg-muted'}`}
                          onClick={() => field.onChange('buyer')}
                        >
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${selectedRole === 'buyer' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}>
                            <Store className="h-6 w-6" />
                          </div>
                          <span className={`font-semibold ${selectedRole === 'buyer' ? 'text-primary' : 'text-foreground'}`}>Buyer</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4 pt-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" className="h-12 rounded-xl bg-muted/50 border-border/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a secure password" className="h-12 rounded-xl bg-muted/50 border-border/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 mt-4 group"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Creating account..." : "Create Account"}
                  {!registerMutation.isPending && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>
            </Form>

            <p className="text-center mt-8 text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
