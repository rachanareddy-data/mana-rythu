import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, clearAuthToken, setAuthToken } from "@/lib/auth";
import { useGetMe, useLogout, getGetMeQueryKey } from "@workspace/api-client-react";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import ListingDetail from "@/pages/ListingDetail";
import FarmerDashboard from "@/pages/FarmerDashboard";
import BuyerDashboard from "@/pages/BuyerDashboard";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

type User = {
  id: number; name: string; email: string; role: string;
  verified: boolean; rating?: number | null; ratingCount: number;
  phone?: string | null; location?: string | null; createdAt: string;
};

type AuthCtx = {
  user: User | null; token: string | null;
  login: (token: string) => void; logout: () => void;
};

export const AuthContext = createContext<AuthCtx>({ user: null, token: null, login: () => {}, logout: () => {} });
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getAuthToken);
  const { data: user, refetch } = useGetMe({ query: { queryKey: getGetMeQueryKey(), enabled: !!token, retry: false } });

  const login = (t: string) => { setAuthToken(t); setToken(t); };
  const logout = () => { clearAuthToken(); setToken(null); queryClient.clear(); };

  return (
    <AuthContext.Provider value={{ user: user ?? null, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/listing/:id" component={ListingDetail} />
      <Route path="/farmer" component={FarmerDashboard} />
      <Route path="/buyer" component={BuyerDashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Layout>
              <Router />
            </Layout>
            <Toaster />
          </AuthProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
