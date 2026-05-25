import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChat, useNasaWeather } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, CloudRain, ThermometerSun, AlertTriangle, Sprout } from "lucide-react";

const weatherSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  month: z.coerce.number().min(1).max(12),
  crop: z.string().min(1)
});

export default function AIAssistant() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Hello! I am Mana Rythu AI. How can I help you with your farming or marketplace questions today?' }
  ]);
  const [chatInput, setChatInput] = useState("");
  
  const chatMutation = useChat();
  const weatherMutation = useNasaWeather();

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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-2">
        <Bot className="w-8 h-8 text-primary" />
        Agri AI Assistant
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Section */}
        <Card className="flex flex-col h-[600px]">
          <CardHeader>
            <CardTitle>Chat with Expert AI</CardTitle>
            <CardDescription>Ask about crop diseases, market prices, or farming techniques</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 flex items-center gap-2">
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)} 
                placeholder="Ask something..." 
                disabled={chatMutation.isPending}
              />
              <Button type="submit" disabled={chatMutation.isPending || !chatInput.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Weather/Yield Prediction Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weather & Yield Predictor</CardTitle>
              <CardDescription>Powered by NASA climatology data</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...weatherForm}>
                <form onSubmit={weatherForm.handleSubmit(onWeatherSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={weatherForm.control}
                      name="lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl><Input type="number" step="any" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={weatherForm.control}
                      name="lon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl><Input type="number" step="any" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={weatherForm.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Month (1-12)</FormLabel>
                          <FormControl><Input type="number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={weatherForm.control}
                      name="crop"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Crop Type</FormLabel>
                          <FormControl><Input placeholder="e.g. Rice, Wheat" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={weatherMutation.isPending}>
                    {weatherMutation.isPending ? "Analyzing Data..." : "Predict Yield & Weather"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          {weatherMutation.data && (
            <Card className="border-primary/50 shadow-md">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-xl">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg">
                    <CloudRain className="w-6 h-6 text-blue-500 mb-2" />
                    <span className="text-sm text-muted-foreground">Exp. Rainfall</span>
                    <span className="text-xl font-bold">{weatherMutation.data.rainfall} mm</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg">
                    <ThermometerSun className="w-6 h-6 text-orange-500 mb-2" />
                    <span className="text-sm text-muted-foreground">Avg. Temp</span>
                    <span className="text-xl font-bold">{weatherMutation.data.temperature}°C</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sprout className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Yield Prediction</span>
                      <span className="text-muted-foreground">{weatherMutation.data.yieldPrediction}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      weatherMutation.data.riskLevel === 'High' ? 'text-red-500' :
                      weatherMutation.data.riskLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <div>
                      <span className="font-semibold block">Risk Level: {weatherMutation.data.riskLevel}</span>
                      <span className="text-muted-foreground">{weatherMutation.data.recommendation}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
