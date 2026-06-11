import { useLocation, Link } from "wouter";
import { useAuth } from "@/App";
import {
  Home, ShoppingBag, Sprout, Shield,
  Bell, Search, LogOut, Menu, X, ChevronRight,
  ShoppingCart, LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const PUBLIC_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
];

const FARMER_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/farmer", label: "My Farm", icon: Sprout },
];

const BUYER_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/buyer", label: "Browse Crops", icon: ShoppingCart },
  { href: "/marketplace", label: "All Listings", icon: ShoppingBag },
];

const ADMIN_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/farmer", label: "Farmer View", icon: Sprout },
  { href: "/buyer", label: "Buyer View", icon: ShoppingCart },
  { href: "/admin", label: "Admin Panel", icon: Shield },
];

function getNavItems(role?: string) {
  if (role === "farmer") return FARMER_NAV;
  if (role === "buyer") return BUYER_NAV;
  if (role === "admin") return ADMIN_NAV;
  return PUBLIC_NAV;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = getNavItems(user?.role);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const isPublicPage = location === "/login" || location === "/register";
  if (isPublicPage) return <>{children}</>;

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-40 h-full flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 lg:w-16",
          "lg:w-64 xl:w-64"
        )}
        style={{ minWidth: sidebarOpen ? 256 : undefined }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border h-16 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Sprout className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <span className="font-bold text-sidebar-foreground text-lg leading-none">Mana Rythu</span>
            <p className="text-xs text-muted-foreground">Agriculture Platform</p>
          </div>
        </div>

        {/* Role badge */}
        {user && (
          <div className="px-4 py-2 border-b border-sidebar-border/50">
            <Badge variant="outline" className={cn(
              "text-xs capitalize",
              user.role === "farmer" && "border-green-300 text-green-700 bg-green-50",
              user.role === "buyer" && "border-blue-300 text-blue-700 bg-blue-50",
              user.role === "admin" && "border-purple-300 text-purple-700 bg-purple-50",
            )}>
              {user.role}
              {user.verified && " ✓"}
            </Badge>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                isActive(href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="overflow-hidden whitespace-nowrap">{label}</span>
              {isActive(href) && <ChevronRight className="w-4 h-4 ml-auto shrink-0" />}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link href="/login" className="block text-center text-sm font-medium py-2 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Sign in
              </Link>
              <Link href="/register" className="block text-center text-sm font-medium py-2 px-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-16 bg-card border-b border-border flex items-center gap-4 px-4 lg:px-6 shrink-0">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(v => !v)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 flex items-center gap-3 bg-muted rounded-lg px-3 py-2 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="search"
              placeholder="Search crops, markets..."
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <Badge variant="outline" className="text-xs mt-0.5 capitalize">{user.role}</Badge>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="outline">Sign in</Button>
              </Link>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-green-50/40 to-emerald-50/60">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card border-t border-border z-20">
        <div className="flex">
          {navItems.slice(0, 4).map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors",
                isActive(href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
