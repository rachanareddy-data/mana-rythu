import { createContext, useContext, useState } from "react";
import { getAuthToken, clearAuthToken, setAuthToken } from "@/lib/auth";
import { useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export type AuthUser = {
  id: number; name: string; email: string; role: string;
  verified: boolean; rating?: number | null; ratingCount: number;
  phone?: string | null; location?: string | null; createdAt: string;
};

type AuthCtx = {
  user: AuthUser | null; token: string | null;
  login: (token: string) => void; logout: () => void;
};

export const AuthContext = createContext<AuthCtx>({
  user: null, token: null, login: () => {}, logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getAuthToken);
  const qc = useQueryClient();

  const { data: user } = useGetMe({
    query: { queryKey: getGetMeQueryKey(), enabled: !!token, retry: false },
  });

  const login = (t: string) => { setAuthToken(t); setToken(t); };
  const logout = () => { clearAuthToken(); setToken(null); qc.clear(); };

  return (
    <AuthContext.Provider value={{ user: user ?? null, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
