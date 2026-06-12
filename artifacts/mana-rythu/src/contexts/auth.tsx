import { createContext, useContext, useState } from "react";
import { useLocation } from "wouter";
import { getAuthToken, clearAuthToken, setAuthToken } from "@/lib/auth";
import { useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export type AuthUser = {
  id: number; name: string; email: string; role: string;
  verified: boolean; rating?: number | null; ratingCount: number;
  phone?: string | null; location?: string | null; createdAt: string;
};

type AuthCtx = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData?: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthCtx>({
  user: null, token: null, isLoading: false, login: () => {}, logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getAuthToken);
  const qc = useQueryClient();
  const [, navigate] = useLocation();

  const { data: user, isLoading } = useGetMe({
    query: { queryKey: getGetMeQueryKey(), enabled: !!token, retry: false },
  });

  const login = (t: string, userData?: AuthUser) => {
    setAuthToken(t);
    setToken(t);
    if (userData) {
      qc.setQueryData(getGetMeQueryKey(), userData);
    }
  };

  const logout = () => {
    console.log("Logout clicked");
    clearAuthToken();
    setToken(null);
    qc.clear();
    console.log("Auth cleared — redirecting to /login");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{
      user: user ?? null,
      token,
      isLoading: !!token && isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
