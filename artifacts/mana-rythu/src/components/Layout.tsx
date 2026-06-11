import { useLocation, Link } from "wouter";
import { useAuth } from "@/contexts/auth";
import { useLanguage, type Lang } from "@/contexts/language";
import {
  Home, ShoppingBag, Sprout, Shield,
  Bell, Search, LogOut, Menu, X, ChevronRight,
  ShoppingCart, Plus, Calculator, Globe,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AgriAIChat from "@/components/AgriAIChat";

const PUBLIC_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
];

const FARMER_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/farmer-dashboard", label: "My Farm", icon: Sprout },
  { href: "/add-crop", label: "Post Crop", icon: Plus },
  { href: "/fair-price", label: "Fair Price", icon: Calculator },
];

const BUYER_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/buyer-dashboard", label: "Browse", icon: ShoppingCart },
  { href: "/marketplace", label: "All Crops", icon: ShoppingBag },
  { href: "/fair-price", label: "Fair Price", icon: Calculator },
];

const ADMIN_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/farmer-dashboard", label: "Farmer View", icon: Sprout },
  { href: "/buyer-dashboard", label: "Buyer View", icon: ShoppingCart },
  { href: "/admin", label: "Admin Panel", icon: Shield },
];

const LANG_FLAGS: Record<Lang, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  te: { label: "తెలుగు", flag: "🇮🇳" },
  hi: { label: "हिंदी", flag: "🇮🇳" },
};

function getNavItems(role?: string) {
  if (role === "farmer") return FARMER_NAV;
  if (role === "buyer") return BUYER_NAV;
  if (role === "admin") return ADMIN_NAV;
  return PUBLIC_NAV;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { lang, setLang } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = getNavItems(user?.role);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href === "/farmer-dashboard") return location === "/farmer-dashboard" || location === "/farmer";
    if (href === "/buyer-dashboard") return location === "/buyer-dashboard" || location === "/buyer";
    return location.startsWith(href);
  };

  const isPublicPage = location === "/login" || location === "/register";
  if (isPublicPage) return <>{children}</>;

  // Bottom nav shows max 4 items
  const bottomNavItems = navItems.slice(0, 4);

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "fixed lg:relative z-40 h-full flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border h-16 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Sprout className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-bold text-sidebar-foreground text-lg leading-none block">Mana Rythu</span>
            <p className="text-xs text-muted-foreground">Agriculture Platform</p>
          </div>
        </div>

        {/* Role badge */}
        {user && (
          <div className="px-4 py-2.5 border-b border-sidebar-border/50">
            <Badge variant="outline" className={cn(
              "text-xs capitalize font-medium",
              user.role === "farmer" && "border-green-300 text-green-700 bg-green-50",
              user.role === "buyer"  && "border-blue-300 text-blue-700 bg-blue-50",
              user.role === "admin"  && "border-purple-300 text-purple-700 bg-purple-50",
            )}>
              {user.role}{user.verified && " ✓"}
            </Badge>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0 transition-transform", !active && "group-hover:scale-110")} />
                <span>{label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto shrink-0 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3 px-1">
              <Link href={`/profile/${user.id}`} onClick={() => setSidebarOpen(false)}>
                <Avatar className="w-9 h-9 shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/profile/${user.id}`} onClick={() => setSidebarOpen(false)}>
                  <p className="text-sm font-semibold text-sidebar-foreground truncate hover:underline cursor-pointer">{user.name}</p>
                </Link>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-1.5">
              <Link href="/login" className="flex items-center justify-center text-sm font-semibold py-2.5 px-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Sign in
              </Link>
              <Link href="/register" className="flex items-center justify-center text-sm font-medium py-2.5 px-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header className="h-14 bg-card border-b border-border flex items-center gap-3 px-3 sm:px-5 shrink-0 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors shrink-0"
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3 py-2 max-w-xs sm:max-w-md">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="search"
              placeholder="Search crops, markets..."
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium"
                title="Change language"
              >
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="hidden sm:inline text-xs">{LANG_FLAGS[lang].flag} {lang.toUpperCase()}</span>
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-10 z-20 w-40 bg-white border border-border rounded-xl shadow-lg overflow-hidden">
                    {(["en", "te", "hi"] as Lang[]).map(l => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className={cn(
                          "w-full text-left px-3 py-2.5 text-sm hover:bg-green-50 flex items-center gap-2 transition-colors",
                          lang === l && "bg-green-50 font-semibold text-green-700"
                        )}
                      >
                        <span>{LANG_FLAGS[l].flag}</span>
                        <span>{LANG_FLAGS[l].label}</span>
                        {lang === l && <span className="ml-auto text-green-600">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Notification bell */}
            <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
            </button>

            {/* User avatar */}
            {user ? (
              <Link href={`/profile/${user.id}`}>
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold leading-none">{user.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-muted-foreground capitalize mt-0.5">{user.role}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="outline" className="text-xs h-8">Sign in</Button>
              </Link>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-md border-t border-border z-20 safe-area-bottom">
        <div className="flex h-16">
          {bottomNavItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
                <div className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-xl transition-all",
                  active ? "bg-primary/10" : "hover:bg-muted"
                )}>
                  <Icon className={cn("w-5 h-5", active && "scale-110")} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium leading-none",
                  active && "font-semibold"
                )}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Agri AI Chat */}
      <AgriAIChat />
    </div>
  );
}
