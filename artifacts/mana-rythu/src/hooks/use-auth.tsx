import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useGetMe, useLogout as useApiLogout } from "@workspace/api-client-react";
import type { User } from "@workspace/api-client-react";
import { getAuthToken, clearAuthToken, setAuthToken } from "../lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getAuthToken());

  const { data: user, isLoading, refetch } = useGetMe({
    query: {
      enabled: !!token,
      retry: false,
    },
  });

  const { mutate: apiLogout } = useApiLogout();

  const login = (newToken: string) => {
    setAuthToken(newToken);
    setTokenState(newToken);
    refetch();
  };

  const logout = () => {
    apiLogout(undefined, {
      onSettled: () => {
        clearAuthToken();
        setTokenState(null);
      }
    });
  };

  useEffect(() => {
    if (!token) {
      clearAuthToken();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading: !!token && isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}