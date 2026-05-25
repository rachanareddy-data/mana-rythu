import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetDashboardStats } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, ArrowRight, TrendingUp, Users, MapPin, Bot } from "lucide-react";

export default function Home() {
  const { data: stats } = useGetDashboardStats();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"></div>
          
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col space-y-8"
              >
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  India's Premier Agri-Tech Marketplace
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none text-foreground">
                    Fair prices.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                      Direct from soil.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                    Mana Rythu bypasses middlemen to connect verified farmers directly with buyers. Transparent pricing, organic verification, and seamless UPI payments.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/marketplace">
                    <Button size="lg" className="h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg group">
                      Browse Marketplace
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-border/50 bg-background/50 backdrop-blur-sm text-lg hover:bg-primary/5">
                      Join as Farmer
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop" 
                    alt="Indian Farmer in Field" 
                    className="object-cover w-full h-full"
                  />
                  {/* Floating glass card */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/20 p-6 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500/20 p-3 rounded-xl text-green-600 dark:text-green-400">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Average Farmer Income Increase</p>
                        <p className="text-2xl font-bold font-display text-foreground">+42.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border/40 bg-muted/30 py-12 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-display font-bold text-primary">{stats?.totalFarmers || "500"}+</h3>
                <p className="text-sm text-muted-foreground font-medium">Verified Farmers</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-display font-bold text-foreground">{stats?.totalCrops || "1,200"}+</h3>
                <p className="text-sm text-muted-foreground font-medium">Active Listings</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-display font-bold text-foreground">₹{(stats?.totalRevenue || 2500000) / 100000}L+</h3>
                <p className="text-sm text-muted-foreground font-medium">Value Generated</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-display font-bold text-secondary">{stats?.organicCrops || "300"}+</h3>
                <p className="text-sm text-muted-foreground font-medium">Organic Certifications</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">Built for scale. Rooted in trust.</h2>
              <p className="text-lg text-muted-foreground">Every feature is designed to empower farmers and guarantee quality for buyers.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ShieldCheck className="h-8 w-8 text-primary" />,
                  title: "Verified Authenticity",
                  desc: "Every farmer and organic listing undergoes strict multi-step verification before appearing on our marketplace."
                },
                {
                  icon: <TrendingUp className="h-8 w-8 text-secondary" />,
                  title: "Transparent Pricing",
                  desc: "Real-time market rates and direct UPI payments mean 100% of the transaction value goes straight to the farmer."
                },
                {
                  icon: <Bot className="h-8 w-8 text-blue-500" />,
                  title: "AI & Climatology",
                  desc: "Integrated NASA weather data and AI agronomy assistant to optimize yields and reduce crop failure risk."
                }
              ].map((feat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50 ring-1 ring-border/50">
                    {feat.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-display font-bold">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container px-4 md:px-6 text-center text-muted-foreground">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-xl text-foreground">Mana Rythu</span>
          </div>
          <p>© {new Date().getFullYear()} Mana Rythu. Empowering Indian Agriculture.</p>
        </div>
      </footer>
    </div>
  );
}
