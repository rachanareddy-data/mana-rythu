import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "@/components/layout/navbar";
import { ProtectedRoute } from "@/components/layout/protected-route";

// Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Marketplace from "@/pages/marketplace";
import CropDetail from "@/pages/crop-detail";
import FarmerDashboard from "@/pages/farmer-dashboard";
import NewCrop from "@/pages/new-crop";
import BuyerDashboard from "@/pages/buyer-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import AIAssistant from "@/pages/ai-assistant";
import Maps from "@/pages/maps";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/crop/:id" component={CropDetail} />
        <Route path="/maps" component={Maps} />
        <Route path="/ai-assistant" component={AIAssistant} />
        
        <ProtectedRoute path="/farmer/dashboard" roles={["farmer"]} component={FarmerDashboard} />
        <ProtectedRoute path="/farmer/crops/new" roles={["farmer"]} component={NewCrop} />
        <ProtectedRoute path="/buyer/dashboard" roles={["buyer"]} component={BuyerDashboard} />
        <ProtectedRoute path="/admin" roles={["admin"]} component={AdminDashboard} />
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
