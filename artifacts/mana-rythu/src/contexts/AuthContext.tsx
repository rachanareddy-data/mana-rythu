import React, { createContext, useContext, useState, useEffect } from "react";
import { User, setAuthTokenGetter } from "@workspace/api-client-react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

function safeLocalStorageGet(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    // ignore — storage unavailable (private mode, cross-origin iframe, etc.)
  }
}

function safeLocalStorageRemove(key: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = safeLocalStorageGet("mana_rythu_user");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    return safeLocalStorageGet("mana_rythu_token");
  });

  useEffect(() => {
    setAuthTokenGetter(() => safeLocalStorageGet("mana_rythu_token"));
  }, []);

  const login = (newToken: string, newUser: User) => {
    safeLocalStorageSet("mana_rythu_token", newToken);
    safeLocalStorageSet("mana_rythu_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    safeLocalStorageRemove("mana_rythu_token");
    safeLocalStorageRemove("mana_rythu_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
