import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, Sprout, Loader2, ChevronDown, AlertCircle, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  error?: boolean;
  lang?: string;
};

const SUGGESTED = [
  "Tomato leaves turning yellow — what to do?",
  "వరి పంటకి ఎప్పుడు నీరు పెట్టాలి?",
  "Cotton mein keetnaashak kab daalein?",
  "Best fertilizer for chili crop?",
];

// Detect script to pick recognition language
function detectLang(text: string): string {
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  return "en-IN";
}

// Safe browser feature detection — never access APIs at module load time
function getSpeechRecognition(): (new () => any) | null {
  try {
    if (typeof window === "undefined") return null;
    const w = window as any;
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
  } catch {
    return null;
  }
}

function isSpeechSynthesisAvailable(): boolean {
  try {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  } catch {
    return false;
  }
}

export default function AgriAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceLang, setVoiceLang] = useState("en-IN");
  // Lazily computed so SSR / non-browser envs never throw
  const [speechRecognitionAvailable, setSpeechRecognitionAvailable] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Detect capabilities after mount (client-only)
  useEffect(() => {
    setSpeechRecognitionAvailable(getSpeechRecognition() !== null);
    setSpeechSynthesisAvailable(isSpeechSynthesisAvailable());
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const nextId = useCallback(() => {
    let id = 0;
    setIdCounter(c => { id = c; return c + 1; });
    return id;
  }, []);

  const speakText = useCallback((text: string, lang: string) => {
    if (!voiceEnabled || !speechSynthesisAvailable) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = 0.9;
      utter.pitch = 1;
      // iOS Safari requires speak() to be called in a user-gesture context.
      // We use setTimeout 0 to avoid "operation is insecure" when called from async code.
      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utter);
        } catch {
          // Silently ignore — e.g. iOS background tab restriction
        }
      }, 0);
    } catch {
      // Silently disable voice if not supported
    }
  }, [voiceEnabled, speechSynthesisAvailable]);

  const sendMessage = useCallback(async (text: string, detectedLang?: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const lang = detectedLang ?? detectLang(trimmed);
    const userMsg: Message = { id: nextId(), role: "user", text: trimmed, lang };
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
        const errMsg: Message = {
          id: nextId(), role: "ai",
          text: data.error ?? "Something went wrong. Please try again.",
          error: true, lang,
        };
        setMessages(prev => [...prev, errMsg]);
      } else {
        const aiMsg: Message = { id: nextId(), role: "ai", text: data.reply, lang };
        setMessages(prev => [...prev, aiMsg]);
        speakText(data.reply, lang);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: nextId(), role: "ai",
        text: "Network error. Please check your connection.",
        error: true, lang,
      }]);
    } finally {
      setLoading(false);
    }
  }, [loading, nextId, speakText]);

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = getSpeechRecognition();
    if (!SpeechRecognitionAPI || isListening) return;

    try {
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = voiceLang;
      (recognition as any).maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results as any[])
          .map((r: any) => r[0].transcript)
          .join("");
        setInput(transcript);

        if (event.results[event.results.length - 1].isFinal) {
          const finalLang = detectLang(transcript) !== "en-IN" ? detectLang(transcript) : voiceLang;
          sendMessage(transcript, finalLang);
          setIsListening(false);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      // Speech recognition may throw if mic permission is denied or not HTTPS
      setIsListening(false);
    }
  }, [isListening, voiceLang, sendMessage]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
    setIsListening(false);
  }, []);

  const toggleVoice = () => {
    if (voiceEnabled && speechSynthesisAvailable) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }
    setVoiceEnabled(v => !v);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const handleClose = () => {
    setOpen(false);
    if (speechSynthesisAvailable) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }
    if (isListening) stopListening();
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => open ? handleClose() : setOpen(true)}
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
          "h-[70vh] max-h-[540px]",
          "rounded-2xl border border-border overflow-hidden bg-white",
        )}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-700 to-emerald-600 text-white shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">Agri AI Assistant</p>
              <p className="text-green-100 text-[11px]">Telugu · Hindi · English</p>
            </div>

            {/* Voice language selector */}
            <select
              value={voiceLang}
              onChange={e => setVoiceLang(e.target.value)}
              className="text-[10px] bg-white/20 border border-white/30 text-white rounded-md px-1.5 py-1 mr-1 cursor-pointer"
              title="Voice language"
            >
              <option value="te-IN">తెలుగు</option>
              <option value="hi-IN">हिंदी</option>
              <option value="en-IN">English</option>
            </select>

            {/* Voice output toggle — only show if synthesis is available */}
            {speechSynthesisAvailable && (
              <button
                onClick={toggleVoice}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  voiceEnabled ? "bg-white/30 text-white" : "hover:bg-white/20 text-white/60"
                )}
                title={voiceEnabled ? "Disable voice output" : "Enable voice output"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            <button onClick={handleClose} className="p-1 rounded-md hover:bg-white/20 transition-colors">
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
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3 py-2 text-sm shadow-sm max-w-[85%]">
                    <p className="font-medium text-green-800 mb-1">నమస్కారం! 🌾 Hello! नमस्ते!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Ask me anything about crops, fertilizers, pests, or farming.
                      {speechRecognitionAvailable && " Use the 🎤 mic button to speak!"}
                    </p>
                  </div>
                </div>
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
                  {m.role === "ai" && !m.error && voiceEnabled && speechSynthesisAvailable && (
                    <button
                      onClick={() => speakText(m.text, m.lang ?? "en-IN")}
                      className="mt-1 text-[10px] text-green-600 hover:underline flex items-center gap-0.5"
                    >
                      <Volume2 className="w-2.5 h-2.5" /> Listen again
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-green-700" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div className="shrink-0 px-3 py-2 border-t border-border bg-white">
            {isListening && (
              <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-red-50 rounded-xl border border-red-100">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-red-600 font-medium">Listening... speak now</span>
                <button onClick={stopListening} className="ml-auto text-xs text-red-500 hover:underline">Stop</button>
              </div>
            )}
            <div className="flex items-center gap-2 bg-gray-50 border border-border rounded-xl px-3 py-2">
              {speechRecognitionAvailable && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={cn(
                    "shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "text-muted-foreground hover:text-green-600 hover:bg-green-50"
                  )}
                  title={isListening ? "Stop listening" : "Voice input"}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              )}

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isListening ? "Listening..." : "Ask about crops, pests, prices..."}
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground min-w-0"
                disabled={loading || isListening}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading || isListening}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  input.trim() && !loading && !isListening
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5">
              {speechRecognitionAvailable ? "🎤 Voice · " : ""}Agriculture questions · Telugu · Hindi · English
            </p>
          </div>
        </div>
      )}
    </>
  );
}
