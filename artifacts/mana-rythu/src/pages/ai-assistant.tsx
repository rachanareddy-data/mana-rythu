import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChat, useNasaWeather } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Bot, Send, CloudRain, ThermometerSun, AlertTriangle,
  Sprout, Sparkles, User as UserIcon, Zap, Leaf,
  TrendingUp, Bug, Droplets, ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PROMPTS = [
  { icon: Sprout,    label: "Best crops for July",      text: "What crops should I plant in July in Andhra Pradesh for maximum yield?" },
  { icon: TrendingUp,label: "Price forecast",           text: "What is the expected market price for tomatoes next month?" },
  { icon: Bug,       label: "Pest control tips",        text: "How do I protect my rice crop from brown planthopper?" },
  { icon: Droplets,  label: "Irrigation advice",        text: "What is the optimal drip irrigation schedule for cotton in hot dry weather?" },
  { icon: Leaf,      label: "Organic certification",    text: "How can I get my farm certified as organic in India?" },
  { icon: CloudRain, label: "Monsoon preparation",      text: "How should I prepare my soil and crops for the upcoming monsoon season?" },
];

const weatherSchema = z.object({
  lat:   z.coerce.number().min(-90).max(90),
  lon:   z.coerce.number().min(-180).max(180),
  month: z.coerce.number().min(1).max(12),
  crop:  z.string().min(1),
});

type Message = { role: "user" | "ai"; content: string };

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const chatMutation    = useChat();
  const weatherMutation = useNasaWeather();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, chatMutation.isPending]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || chatMutation.isPending) return;
    const userMsg: Message = { role: "user", content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    chatMutation.mutate({ data: { message: trimmed } }, {
      onSuccess: res  => setMessages(prev => [...prev, { role: "ai", content: res.reply }]),
      onError:   ()   => setMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't connect right now. Please try again." }]),
    });
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const weatherForm = useForm<z.infer<typeof weatherSchema>>({
    resolver: zodResolver(weatherSchema),
    defaultValues: { lat: 17.3850, lon: 78.4867, month: 6, crop: "Rice" },
  });

  const onWeatherSubmit = (data: z.infer<typeof weatherSchema>) => {
    weatherMutation.mutate({ data });
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0a0f0a] flex flex-col lg:flex-row">

      {/* ══════════════ CHAT PANEL ══════════════ */}
      <div className="flex-1 flex flex-col min-h-[calc(100vh-64px)] lg:border-r border-white/8">

        {/* Header */}
        <div className="shrink-0 px-6 py-5 border-b border-white/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-white text-lg">Agri Copilot</h1>
            <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online · Powered by GPT-4o
            </p>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          {isEmpty ? (
            /* ── Welcome state ── */
            <div className="flex flex-col items-center justify-center h-full px-6 py-16 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-display font-black text-white mb-2"
              >
                What can I help you grow?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-white/40 text-sm max-w-sm mb-10"
              >
                Ask me anything about crops, weather, pests, markets, or agronomy.
              </motion.p>

              {/* Prompt chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                {PROMPTS.map((p, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06 }}
                    onClick={() => sendMessage(p.text)}
                    className="flex items-center gap-3 text-left px-4 py-3 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 hover:border-emerald-500/30 text-white/60 hover:text-white transition-all group"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      <p.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium leading-tight">{p.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Conversation ── */
            <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-violet-500 to-purple-600"
                        : "bg-gradient-to-br from-emerald-500 to-teal-600"
                    } shadow-lg`}>
                      {msg.role === "user"
                        ? <UserIcon className="h-4 w-4 text-white" />
                        : <Bot className="h-4 w-4 text-white" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white/8 border border-white/10 text-white rounded-tr-sm"
                        : "bg-emerald-950/60 border border-emerald-800/30 text-white/90 rounded-tl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {chatMutation.isPending && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-emerald-950/60 border border-emerald-800/30 flex gap-1.5 items-center">
                    {[0,1,2].map(j => (
                      <motion.span
                        key={j}
                        animate={{ y: [0,-4,0] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay: j*0.15 }}
                        className="w-2 h-2 rounded-full bg-emerald-400/60 block"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* ── Input bar ── */}
        <div className="shrink-0 px-4 md:px-6 py-4 border-t border-white/8 bg-[#0a0f0a]">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about crops, weather, soil, pricing…"
                disabled={chatMutation.isPending}
                className="w-full h-14 pl-5 pr-5 rounded-2xl bg-white/6 border border-white/12 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/30 disabled:opacity-50 transition-all"
              />
            </div>
            <motion.button
              type="submit"
              disabled={!input.trim() || chatMutation.isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shrink-0"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </form>
          <p className="text-center text-xs text-white/20 mt-2">
            AI can make mistakes — always verify critical agricultural decisions
          </p>
        </div>
      </div>

      {/* ══════════════ NASA SIDEBAR ══════════════ */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0 border-t lg:border-t-0 border-white/8 flex flex-col overflow-y-auto bg-[#0a0f0a]">

        {/* Sidebar header */}
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-1.5 rounded-lg bg-blue-500/15">
              <CloudRain className="h-4 w-4 text-blue-400" />
            </div>
            <h2 className="font-display font-black text-white">NASA Climatology</h2>
          </div>
          <p className="text-xs text-white/35 ml-9">Satellite yield-risk prediction</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Form */}
          <Form {...weatherForm}>
            <form onSubmit={weatherForm.handleSubmit(onWeatherSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField control={weatherForm.control} name="lat" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-white/40 uppercase tracking-wider">Latitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field}
                        className="h-10 bg-white/5 border-white/10 text-white text-sm rounded-xl focus:border-emerald-500/40 focus:ring-emerald-500/20" />
                    </FormControl>
                  </FormItem>
                )}/>
                <FormField control={weatherForm.control} name="lon" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-white/40 uppercase tracking-wider">Longitude</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field}
                        className="h-10 bg-white/5 border-white/10 text-white text-sm rounded-xl focus:border-emerald-500/40 focus:ring-emerald-500/20" />
                    </FormControl>
                  </FormItem>
                )}/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField control={weatherForm.control} name="month" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-white/40 uppercase tracking-wider">Month</FormLabel>
                    <FormControl>
                      <Input type="number" {...field}
                        className="h-10 bg-white/5 border-white/10 text-white text-sm rounded-xl focus:border-emerald-500/40 focus:ring-emerald-500/20" />
                    </FormControl>
                  </FormItem>
                )}/>
                <FormField control={weatherForm.control} name="crop" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-white/40 uppercase tracking-wider">Crop</FormLabel>
                    <FormControl>
                      <Input placeholder="Rice" {...field}
                        className="h-10 bg-white/5 border-white/10 text-white text-sm rounded-xl focus:border-emerald-500/40 focus:ring-emerald-500/20 placeholder-white/20" />
                    </FormControl>
                  </FormItem>
                )}/>
              </div>
              <motion.button
                type="submit"
                disabled={weatherMutation.isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {weatherMutation.isPending
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Running…</>
                  : <><Zap className="h-4 w-4" /> Run Prediction</>
                }
              </motion.button>
            </form>
          </Form>

          {/* Results */}
          <AnimatePresence>
            {weatherMutation.data && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
                className="space-y-3"
              >
                <div className="h-px w-full bg-white/8" />
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Analysis Results
                </p>

                {/* Stat widgets */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-3.5 flex flex-col items-center text-center">
                    <CloudRain className="h-5 w-5 text-blue-400 mb-1.5" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Rainfall</p>
                    <p className="text-2xl font-black text-white font-display">{weatherMutation.data.rainfall}</p>
                    <p className="text-xs text-white/30">mm</p>
                  </div>
                  <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-3.5 flex flex-col items-center text-center">
                    <ThermometerSun className="h-5 w-5 text-orange-400 mb-1.5" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Temperature</p>
                    <p className="text-2xl font-black text-white font-display">{weatherMutation.data.temperature}</p>
                    <p className="text-xs text-white/30">°C avg</p>
                  </div>
                </div>

                {/* Risk badge */}
                <div className={`rounded-2xl border p-3.5 flex items-start gap-3 ${
                  weatherMutation.data.riskLevel === "High"   ? "bg-red-500/10 border-red-500/25" :
                  weatherMutation.data.riskLevel === "Medium" ? "bg-amber-500/10 border-amber-500/25" :
                                                                "bg-green-500/10 border-green-500/25"
                }`}>
                  <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${
                    weatherMutation.data.riskLevel === "High"   ? "text-red-400" :
                    weatherMutation.data.riskLevel === "Medium" ? "text-amber-400" : "text-green-400"
                  }`} />
                  <div>
                    <p className="text-xs font-black text-white mb-0.5">
                      {weatherMutation.data.riskLevel} Risk
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {weatherMutation.data.recommendation}
                    </p>
                  </div>
                </div>

                {/* Yield */}
                <div className="rounded-2xl bg-emerald-500/8 border border-emerald-500/20 p-3.5 flex items-start gap-3">
                  <Sprout className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-white mb-0.5">Yield Projection</p>
                    <p className="text-xs text-white/50 leading-relaxed">{weatherMutation.data.yieldPrediction}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tip */}
          <div className="rounded-2xl bg-white/3 border border-white/8 p-4">
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2">Pro tip</p>
            <p className="text-xs text-white/40 leading-relaxed">
              Enter your field's exact coordinates from Google Maps to get the most accurate satellite climate analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
