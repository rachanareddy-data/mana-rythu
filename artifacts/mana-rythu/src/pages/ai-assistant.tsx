import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChat, useNasaWeather } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, CloudRain, ThermometerSun, AlertTriangle, Sprout, Sparkles, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const weatherSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  month: z.coerce.number().min(1).max(12),
  crop: z.string().min(1)
});

export default function AIAssistant() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Hello! I am Mana Rythu AI, powered by agronomy models. How can I help you with your crop planning or market analysis today?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useChat();
  const weatherMutation = useNasaWeather();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput("");

    chatMutation.mutate({ data: { message: userMessage } }, {
      onSuccess: (res) => {
        setMessages(prev => [...prev, { role: 'ai', content: res.reply }]);
      },
      onError: () => {
        setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting right now." }]);
      }
    });
  };

  const weatherForm = useForm<z.infer<typeof weatherSchema>>({
    resolver: zodResolver(weatherSchema),
    defaultValues: { lat: 17.3850, lon: 78.4867, month: 6, crop: "Rice" }
  });

  const onWeatherSubmit = (data: z.infer<typeof weatherSchema>) => {
    weatherMutation.mutate({ data });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary/5 border-b border-border/50 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container relative z-10 px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Bot className="w-8 h-8" /></div>
            Mana Rythu Intelligence
          </h1>
          <p className="text-muted-foreground mt-2 ml-14">Data-driven insights for modern farming</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chat Interface (Perplexity style) */}
          <div className="lg:col-span-7 flex flex-col h-[700px] bg-card rounded-3xl border border-border/50 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border/50 bg-muted/20">
              <h2 className="font-display font-bold text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Agronomy Copilot
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/20 text-primary'
                    }`}>
                      {msg.role === 'user' ? <UserIcon className="w-4 h-4"/> : <Bot className="w-4 h-4"/>}
                    </div>
                    <div className={`px-5 py-4 rounded-2xl max-w-[85%] text-[15px] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-muted text-foreground rounded-tr-sm' 
                        : 'bg-primary/5 border border-primary/10 text-foreground rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4"/>
                    </div>
                    <div className="px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 rounded-tl-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-muted/20 border-t border-border/50">
              <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative">
                <Input 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)} 
                  placeholder="Ask about soil health, crop pricing, or pest control..." 
                  className="w-full h-14 pl-6 pr-14 rounded-full bg-background border-border/50 shadow-sm text-base focus-visible:ring-primary/50"
                  disabled={chatMutation.isPending}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="absolute right-2 top-2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-colors"
                  disabled={chatMutation.isPending || !chatInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* NASA Panel */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-border/50 shadow-xl rounded-3xl overflow-hidden bg-card">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white">
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <CloudRain className="w-5 h-5" /> NASA Climatology Data
                </CardTitle>
                <CardDescription className="text-blue-100/80 mt-1">Predict yield risks based on satellite telemetry</CardDescription>
              </div>
              <CardContent className="p-6">
                <Form {...weatherForm}>
                  <form onSubmit={weatherForm.handleSubmit(onWeatherSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={weatherForm.control} name="lat" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Latitude</FormLabel>
                          <FormControl><Input type="number" step="any" className="bg-muted/50 rounded-xl" {...field} /></FormControl>
                        </FormItem>
                      )}/>
                      <FormField control={weatherForm.control} name="lon" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Longitude</FormLabel>
                          <FormControl><Input type="number" step="any" className="bg-muted/50 rounded-xl" {...field} /></FormControl>
                        </FormItem>
                      )}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={weatherForm.control} name="month" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Month (1-12)</FormLabel>
                          <FormControl><Input type="number" className="bg-muted/50 rounded-xl" {...field} /></FormControl>
                        </FormItem>
                      )}/>
                      <FormField control={weatherForm.control} name="crop" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Crop</FormLabel>
                          <FormControl><Input placeholder="e.g. Rice" className="bg-muted/50 rounded-xl" {...field} /></FormControl>
                        </FormItem>
                      )}/>
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" disabled={weatherMutation.isPending}>
                      {weatherMutation.isPending ? "Running Models..." : "Run Prediction Model"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <AnimatePresence>
              {weatherMutation.data && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <Card className="border-primary/20 shadow-xl shadow-primary/5 rounded-3xl overflow-hidden bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary"/> Analysis Results
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-background rounded-2xl p-4 border border-border/50 flex flex-col items-center justify-center text-center">
                          <CloudRain className="w-6 h-6 text-blue-500 mb-2" />
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Exp. Rainfall</span>
                          <span className="text-2xl font-display font-bold mt-1">{weatherMutation.data.rainfall} <span className="text-sm">mm</span></span>
                        </div>
                        <div className="bg-background rounded-2xl p-4 border border-border/50 flex flex-col items-center justify-center text-center">
                          <ThermometerSun className="w-6 h-6 text-orange-500 mb-2" />
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Avg. Temp</span>
                          <span className="text-2xl font-display font-bold mt-1">{weatherMutation.data.temperature}°C</span>
                        </div>
                      </div>

                      <div className="space-y-4 bg-background rounded-2xl p-5 border border-border/50">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Sprout className="w-4 h-4 text-green-600" />
                            <span className="font-bold text-sm">Yield Projection</span>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed pl-6">{weatherMutation.data.yieldPrediction}</p>
                        </div>
                        <div className="h-px w-full bg-border/50"></div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className={`w-4 h-4 ${
                              weatherMutation.data.riskLevel === 'High' ? 'text-red-500' :
                              weatherMutation.data.riskLevel === 'Medium' ? 'text-amber-500' : 'text-green-500'
                            }`} />
                            <span className="font-bold text-sm">Risk Level: {weatherMutation.data.riskLevel}</span>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed pl-6">{weatherMutation.data.recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
