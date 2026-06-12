import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "@/lib/translations";
import { safeGetItem, safeSetItem } from "@/lib/storage";

export type { Lang };

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mana_rythu_lang";

function detectInitialLang(): Lang {
  const stored = safeGetItem(STORAGE_KEY) as Lang | null;
  if (stored === "en" || stored === "te" || stored === "hi") return stored;
  try {
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("te")) return "te";
    if (browser.startsWith("hi")) return "hi";
  } catch {
    // navigator.language unavailable (rare edge case)
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    safeSetItem(STORAGE_KEY, l);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
