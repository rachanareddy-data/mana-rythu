import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useSearchSuggestions, getSearchSuggestionsQueryKey, type SearchResult } from "@workspace/api-client-react";
import { DropdownPortal } from "@/components/ui/dropdown-portal";
import { Search, MapPin, Sprout, X, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/15 text-primary font-semibold rounded-sm px-0.5 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface SmartSearchProps {
  placeholder?: string;
}

export default function SmartSearch({ placeholder = "Search crops..." }: SmartSearchProps) {
  const [, navigate] = useLocation();
  const searchString = useSearch();

  const [query, setQuery] = useState(() => {
    const p = new URLSearchParams(searchString);
    return p.get("q") ?? "";
  });
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(searchString);
    const q = p.get("q") ?? "";
    setQuery(q);
    setDebouncedQuery(q);
  }, [searchString]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const searchParams = { q: debouncedQuery };
  const { data: suggestions = [] } = useSearchSuggestions(searchParams, {
    query: {
      queryKey: getSearchSuggestionsQueryKey(searchParams),
      enabled: debouncedQuery.trim().length > 0,
      staleTime: 15_000,
    },
  });

  const listings = suggestions.filter(s => s.type === "listing");
  const locations = suggestions.filter(s => s.type === "location");
  const showDropdown = open && debouncedQuery.trim().length > 0 && suggestions.length > 0;

  const pickResult = useCallback((s: SearchResult) => {
    setOpen(false);
    setActiveIndex(-1);
    if (s.type === "location") {
      navigate(`/marketplace?location=${encodeURIComponent(s.title)}`);
    } else {
      navigate(`/marketplace?q=${encodeURIComponent(s.title)}`);
    }
  }, [navigate]);

  const submit = useCallback((value: string) => {
    setOpen(false);
    setActiveIndex(-1);
    const q = value.trim();
    navigate(q ? `/marketplace?q=${encodeURIComponent(q)}` : "/marketplace");
  }, [navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        pickResult(suggestions[activeIndex]);
      } else {
        submit(query);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  };

  const clear = () => {
    setQuery("");
    setDebouncedQuery("");
    setOpen(false);
    navigate("/marketplace");
    inputRef.current?.focus();
  };

  return (
    <form
      ref={formRef}
      className="flex-1 min-w-0 flex items-center gap-2 bg-muted rounded-xl px-3 py-2 max-w-xs sm:max-w-md"
      onSubmit={e => { e.preventDefault(); submit(query); }}
    >
      <button type="submit" className="shrink-0 flex items-center" aria-label="Search">
        <Search className="w-4 h-4 text-muted-foreground" />
      </button>

      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
        autoComplete="off"
      />

      {query && (
        <button
          type="button"
          onClick={clear}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      <DropdownPortal
        anchorRef={formRef}
        open={showDropdown}
        onClose={() => { setOpen(false); setActiveIndex(-1); }}
        align="left"
        gap={6}
      >
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
          style={{
            minWidth: "min(400px, calc(100vw - 24px))",
            maxWidth: "min(520px, calc(100vw - 24px))",
          }}
        >
          {listings.length > 0 && (
            <section>
              <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Listings
              </p>
              {listings.map((s, i) => (
                <button
                  key={`listing-${s.id ?? s.title}`}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); pickResult(s); }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "w-full text-left flex items-center gap-3 px-3 py-2.5 transition-colors",
                    activeIndex === i ? "bg-primary/8" : "hover:bg-muted/60"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                    activeIndex === i ? "bg-primary/15" : "bg-muted"
                  )}>
                    <Sprout className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">
                      <Highlight text={s.title} query={debouncedQuery} />
                    </p>
                    {s.subtitle && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.subtitle}</p>
                    )}
                  </div>
                  {s.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                  {s.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                  {s.trend === "stable" && <Minus className="w-3.5 h-3.5 text-yellow-600 shrink-0" />}
                </button>
              ))}
            </section>
          )}

          {locations.length > 0 && (
            <section className={listings.length > 0 ? "border-t border-border/50" : ""}>
              <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Locations
              </p>
              {locations.map((s, i) => {
                const gi = listings.length + i;
                return (
                  <button
                    key={`location-${s.title}`}
                    type="button"
                    onMouseDown={e => { e.preventDefault(); pickResult(s); }}
                    onMouseEnter={() => setActiveIndex(gi)}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-3 py-2.5 transition-colors",
                      activeIndex === gi ? "bg-primary/8" : "hover:bg-muted/60"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                      activeIndex === gi ? "bg-primary/15" : "bg-muted"
                    )}>
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        <Highlight text={s.title} query={debouncedQuery} />
                      </p>
                      {s.subtitle && (
                        <p className="text-xs text-muted-foreground mt-0.5">{s.subtitle}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </section>
          )}

          <div className="px-3 py-2 border-t border-border/50 bg-muted/30 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground hidden sm:inline">↑↓ navigate · ↵ select · Esc close</span>
            <button
              type="button"
              onMouseDown={e => { e.preventDefault(); submit(query); }}
              className="text-[11px] text-primary font-medium hover:underline"
            >
              See all results →
            </button>
          </div>
        </motion.div>
      </DropdownPortal>
    </form>
  );
}
