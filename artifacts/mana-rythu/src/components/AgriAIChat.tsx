import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sprout, Loader2, ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  error?: boolean;
};

const SUGGESTED = [
  "Tomato leaves turning yellow — what to do?",
  "వరి పంటకి ఎప్పుడు నీరు పెట్టాలి?",
  "Cotton mein keetnaashak kab daalein?",
  "Best fertilizer for chili crop?",
];

export default function AgriAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const nextId = () => {
    setIdCounter(c => c + 1);
    return idCounter;
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: nextId(), role: "user", text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages(prev => [...prev, {
          id: nextId(), role: "ai",
          text: data.error ?? "Something went wrong. Please try again.",
          error: true,
        }]);
      } else {
        setMessages(prev => [...prev, { id: nextId(), role: "ai", text: data.reply }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: nextId(), role: "ai",
        text: "Network error. Please check your connection and try again.",
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50",
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
          "transition-all duration-200 hover:scale-105 active:scale-95",
          open
            ? "bg-gray-800 text-white"
            : "bg-gradient-to-br from-green-600 to-emerald-500 text-white"
        )}
        aria-label="Open Agri AI Chat"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white text-[8px] font-bold text-gray-800 flex items-center justify-center">
            AI
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className={cn(
          "fixed z-50 shadow-2xl flex flex-col",
          "bottom-36 right-4 lg:bottom-24 lg:right-6",
          "w-[calc(100vw-2rem)] max-w-sm",
          "h-[70vh] max-h-[520px]",
          "rounded-2xl border border-border overflow-hidden",
          "bg-white",
        )}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-700 to-emerald-600 text-white shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">Agri AI Assistant</p>
              <p className="text-green-100 text-[11px]">Ask in Telugu · Hindi · English</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-white/20 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gradient-to-b from-green-50/40 to-white">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Sprout className="w-4 h-4 text-green-700" />
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-foreground shadow-sm max-w-[85%]">
                    <p className="font-medium text-green-800 mb-1">నమస్కారం! 🌾 Hello! नमस्ते!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      I'm your Agri AI. Ask me anything about crops, fertilizers, pests, weather, or farming. I reply in your language!
                    </p>
                  </div>
                </div>

                {/* Suggested questions */}
                <div className="pl-9">
                  <p className="text-[10px] text-muted-foreground font-medium mb-2 uppercase tracking-wide">Try asking:</p>
                  <div className="space-y-1.5">
                    {SUGGESTED.map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white border border-green-100 text-green-800 hover:bg-green-50 hover:border-green-300 transition-colors shadow-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map(m => (
              <div key={m.id} className={cn("flex gap-2 items-end", m.role === "user" && "flex-row-reverse")}>
                {m.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    {m.error ? <AlertCircle className="w-4 h-4 text-red-500" /> : <Sprout className="w-4 h-4 text-green-700" />}
                  </div>
                )}
                <div className={cn(
                  "px-3 py-2 rounded-2xl text-sm max-w-[82%] shadow-sm",
                  m.role === "user"
                    ? "bg-green-600 text-white rounded-br-sm"
                    : m.error
                    ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
                    : "bg-white border border-border text-foreground rounded-bl-sm"
                )}>
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-green-700" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-green-600 animate-spin" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                  <div className="flex gap-1 mt-1.5">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 px-3 py-2 border-t border-border bg-white">
            <div className="flex items-center gap-2 bg-gray-50 border border-border rounded-xl px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about crops, pests, weather..."
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground min-w-0"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  input.trim() && !loading
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5">
              Agriculture questions only · Telugu · Hindi · English
            </p>
          </div>
        </div>
      )}
    </>
  );
}
