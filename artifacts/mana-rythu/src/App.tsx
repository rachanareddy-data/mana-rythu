import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth";
import { LanguageProvider } from "@/contexts/language";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import ListingDetail from "@/pages/ListingDetail";
import FarmerDashboard from "@/pages/FarmerDashboard";
import BuyerDashboard from "@/pages/BuyerDashboard";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddCrop from "@/pages/AddCrop";
import UserProfile from "@/pages/UserProfile";
import FairPriceCalculator from "@/pages/FairPriceCalculator";
import NotFound from "@/pages/not-found";

export { useAuth } from "@/contexts/auth";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/listing/:id" component={ListingDetail} />
      <Route path="/farmer" component={FarmerDashboard} />
      <Route path="/farmer-dashboard" component={FarmerDashboard} />
      <Route path="/add-crop" component={AddCrop} />
      <Route path="/buyer" component={BuyerDashboard} />
      <Route path="/buyer-dashboard" component={BuyerDashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile/:id" component={UserProfile} />
      <Route path="/fair-price" component={FairPriceCalculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AuthProvider>
              <Layout>
                <Router />
              </Layout>
              <Toaster />
            </AuthProvider>
          </WouterRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
