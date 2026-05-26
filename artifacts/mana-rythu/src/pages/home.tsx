import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetDashboardStats } from "@workspace/api-client-react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  Leaf, ShieldCheck, ArrowRight, TrendingUp, Bot, MapPin,
  Sprout, Star, Users, Zap, Globe, ChevronRight, Play,
  BarChart3, CloudSun, IndianRupee,
} from "lucide-react";

/* ─── Animated counter hook ─────────────────────────────────────────────── */
function useCountUp(end: number, duration = 1800, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const triggered = useRef(false);

  const trigger = () => {
    if (triggered.current) return;
    triggered.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  return { count, trigger };
}

/* ─── Stat card ─────────────────────────────────────────────────────────── */
function StatCard({
  value, suffix, label, icon: Icon, gradient, delay,
}: {
  value: number; suffix: string; label: string;
  icon: React.ElementType; gradient: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { count, trigger } = useCountUp(value);

  useEffect(() => { if (inView) trigger(); }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-xl shadow-black/10 overflow-hidden cursor-default"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient} rounded-3xl`} />
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${gradient} mb-5 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <p className="text-4xl font-display font-black text-white tracking-tight">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="mt-1 text-sm font-medium text-white/60">{label}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function Home() {
  const { data: stats } = useGetDashboardStats();

  const statItems = [
    { value: stats?.totalFarmers || 2400,      suffix: "+", label: "Verified Farmers",       icon: Users,       gradient: "from-emerald-500 to-teal-600",   delay: 0 },
    { value: stats?.totalCrops   || 12800,     suffix: "+", label: "Active Listings",        icon: Sprout,      gradient: "from-lime-500 to-emerald-600",    delay: 0.08 },
    { value: Math.round((stats?.totalRevenue || 25000000) / 100000), suffix: "L+", label: "₹ Value Generated", icon: IndianRupee, gradient: "from-amber-500 to-orange-600",  delay: 0.16 },
    { value: stats?.organicCrops || 3200,      suffix: "+", label: "Organic Certifications", icon: ShieldCheck, gradient: "from-green-500 to-emerald-700",   delay: 0.24 },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Government-Grade Verification",
      desc: "Every farmer, every listing — triple-verified against APMC records and biometric IDs. Zero fraudulent produce.",
      gradient: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
      span: "md:col-span-2",
      big: true,
    },
    {
      icon: IndianRupee,
      title: "Zero Middlemen",
      desc: "100% of payment goes direct to the farmer via UPI in seconds.",
      gradient: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
      span: "",
      big: false,
    },
    {
      icon: Bot,
      title: "AI Agronomy Assistant",
      desc: "GPT-4o powered chat with real NASA weather data — crop advice personalised to your field's coordinates.",
      gradient: "from-blue-500/20 to-violet-500/10",
      accent: "text-blue-400",
      span: "",
      big: false,
    },
    {
      icon: CloudSun,
      title: "NASA Climate Intelligence",
      desc: "Yield predictions and weather-risk scoring from NASA POWER satellite data — months ahead.",
      gradient: "from-sky-500/20 to-cyan-500/10",
      accent: "text-sky-400",
      span: "",
      big: false,
    },
    {
      icon: Globe,
      title: "Pan-India Crop Atlas",
      desc: "Live map of every verified listing plotted by GPS coordinates across all 28 states.",
      gradient: "from-violet-500/20 to-purple-500/10",
      accent: "text-violet-400",
      span: "md:col-span-2",
      big: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f0a]">

      {/* ═══════════════════════ HERO ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=90&w=3000&auto=format&fit=crop"
            alt="Lush farm fields"
            className="w-full h-full object-cover object-center scale-105"
            style={{ filter: "brightness(0.35) saturate(1.2)" }}
          />
          {/* Multi-stop gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/95 via-[#0a0f0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-[#0a0f0a]/30" />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-8 lg:px-12 py-24 lg:py-0">
          <div className="max-w-4xl">

            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-8 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" />
              <span className="text-sm font-semibold text-emerald-300 tracking-wide">India's Premier Agri-Tech Marketplace</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[0.95] mb-6"
            >
              Fair prices.
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
                Direct from soil.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
            >
              Mana Rythu eliminates every middleman between Indian farmers and buyers — 
              delivering transparent prices, AI-powered crop intelligence, and instant UPI payments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link href="/marketplace">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-0 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow group"
                  >
                    Browse Marketplace
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 rounded-full text-base font-bold border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    Join as Farmer
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Mini trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/40"
            >
              {[
                { icon: ShieldCheck, text: "APMC Verified" },
                { icon: Zap, text: "Instant UPI Payments" },
                { icon: CloudSun, text: "NASA Weather Data" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-400/70" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating glassmorphism income card */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-12 right-8 lg:bottom-16 lg:right-16 z-20 hidden sm:block"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 shadow-2xl w-64">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-white/50 font-medium">Farmer Income Increase</p>
                <p className="text-2xl font-black text-white font-display">+42.5%</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              {[60, 72, 58, 85, 78, 95, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
                  style={{ height: `${h * 0.4}px`, originY: 1 }}
                  className={`flex-1 rounded-sm ${i === 5 ? "bg-emerald-400" : "bg-white/15"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating AI assistant card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/3 right-8 lg:right-24 z-20 hidden lg:block"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 shadow-2xl w-56">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-500/20">
                <Bot className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-white/70">Agri AI</span>
              <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              "Rain in 3 days. Plant Sona Masuri now for 18% better yield."
            </p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════ STATS ══════════════════════════════════════ */}
      <section className="relative py-20 bg-[#0a0f0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0d1a10] to-[#0a0f0a]" />
        <div className="container relative px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">By the numbers</p>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white">
              The marketplace that's{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent">
                actually working
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {statItems.map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ BENTO FEATURES ═════════════════════════════ */}
      <section className="relative py-24 bg-[#0a0f0a]">
        <div className="container px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Platform</p>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-5">
              Built for scale.{" "}
              <span className="bg-gradient-to-r from-lime-300 to-emerald-300 bg-clip-text text-transparent">
                Rooted in trust.
              </span>
            </h2>
            <p className="text-lg text-white/50">
              Every feature engineered to empower farmers and guarantee quality for buyers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative group rounded-3xl border border-white/8 overflow-hidden cursor-default ${f.span}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-[#0f1a10]/80 group-hover:bg-[#0f1a10]/60 transition-colors duration-500" />
                <div className="relative z-10 p-8">
                  <div className={`inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 ${f.accent}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-xl font-display font-black text-white mb-3 ${f.big ? "text-2xl md:text-3xl" : ""}`}>
                    {f.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{f.desc}</p>
                </div>
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/0 group-hover:ring-white/10 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SOCIAL PROOF ═══════════════════════════════ */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0f0a] to-[#0d1a10]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-transparent" />
        <div className="container relative px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">Farmer Stories</p>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
                The future of Indian agriculture{" "}
                <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  is already here
                </span>
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Thousands of farmers across Andhra Pradesh, Maharashtra, Punjab and beyond 
                are earning 40% more — just by cutting out the middlemen.
              </p>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Button className="h-12 px-7 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-shadow">
                    Start Selling Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {[
                { name: "Ramu Naidu", role: "Rice Farmer, Guntur", quote: "Before Mana Rythu I earned ₹24/kg. Now I get ₹38/kg directly. My daughter's college fees are paid.", rating: 5 },
                { name: "Lakshmi Devi", role: "Organic Farmer, Vizag", quote: "The AI assistant told me exactly when to harvest. My yield increased by 22% this season.", rating: 5 },
                { name: "Suresh Reddy", role: "Vegetable Farmer, Hyderabad", quote: "UPI payment in my account the same day. No waiting, no commission agents, no haggling.", rating: 5 },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-5"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FINAL CTA ══════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-[#0a0f0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-transparent to-amber-950/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container relative px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-5">Get started free</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6 leading-tight">
              Ready to grow{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
                without limits?
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Join 2,400+ farmers already earning more. No commission. No middlemen. No waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="h-14 px-10 rounded-full text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-0 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow group">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-base font-bold border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all">
                    Register as Farmer
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ══════════════════════════════════════ */}
      <footer className="border-t border-white/8 py-12 bg-[#080d08]">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="font-display font-black text-lg text-white">Mana Rythu</span>
            </div>
            <p className="text-sm text-white/30">
              © {new Date().getFullYear()} Mana Rythu. Empowering Indian Agriculture.
            </p>
            <div className="flex gap-6 text-sm text-white/30">
              <Link href="/marketplace" className="hover:text-white/60 transition-colors">Marketplace</Link>
              <Link href="/ai-assistant" className="hover:text-white/60 transition-colors">Agri AI</Link>
              <Link href="/maps" className="hover:text-white/60 transition-colors">Crop Map</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
