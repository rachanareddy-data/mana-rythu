import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/auth";
import { useLanguage, type Lang } from "@/contexts/language";
import { type TranslationKey } from "@/lib/translations";
import {
  Home, ShoppingBag, Sprout, Shield,
  Bell, Search, LogOut, Menu, X, ChevronRight,
  ShoppingCart, Plus, Calculator, Globe, Check, CheckCheck,
  Package, MessageCircle,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AgriAIChat from "@/components/AgriAIChat";
import { DropdownPortal } from "@/components/ui/dropdown-portal";

const LANG_FLAGS: Record<Lang, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  te: { label: "తెలుగు", flag: "🇮🇳" },
  hi: { label: "हिंदी", flag: "🇮🇳" },
};

function getNavItems(role: string | undefined, t: (k: TranslationKey) => string) {
  const PUBLIC_NAV = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/marketplace", label: t("marketplace"), icon: ShoppingBag },
  ];

  const FARMER_NAV = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/farmer-dashboard", label: t("myFarm"), icon: Sprout },
    { href: "/orders", label: t("orders"), icon: Package },
    { href: "/chat", label: t("chat"), icon: MessageCircle },
    { href: "/add-crop", label: t("postCrop"), icon: Plus },
    { href: "/marketplace", label: t("marketplace"), icon: ShoppingBag },
    { href: "/fair-price", label: t("fairPrice"), icon: Calculator },
  ];

  const BUYER_NAV = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/marketplace", label: t("marketplace"), icon: ShoppingBag },
    { href: "/orders", label: t("orders"), icon: Package },
    { href: "/chat", label: t("chat"), icon: MessageCircle },
    { href: "/buyer-dashboard", label: t("browse"), icon: ShoppingCart },
    { href: "/fair-price", label: t("fairPrice"), icon: Calculator },
  ];

  const ADMIN_NAV = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/marketplace", label: t("marketplace"), icon: ShoppingBag },
    { href: "/farmer-dashboard", label: t("farmerView"), icon: Sprout },
    { href: "/buyer-dashboard", label: t("buyerView"), icon: ShoppingCart },
    { href: "/admin", label: t("adminPanel"), icon: Shield },
  ];

  if (role === "farmer") return FARMER_NAV;
  if (role === "buyer") return BUYER_NAV;
  if (role === "admin") return ADMIN_NAV;
  return PUBLIC_NAV;
}

type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function notifTypeColor(type: string) {
  if (type === "alert") return "bg-red-100 text-red-600";
  if (type === "price") return "bg-amber-100 text-amber-600";
  if (type === "order") return "bg-blue-100 text-blue-600";
  return "bg-green-100 text-green-600";
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const notifBtnRef = useRef<HTMLButtonElement>(null);

  const navItems = getNavItems(user?.role, t);
  const unreadCount = notifications.filter(n => !n.read).length;

  const fetchNotifications = useCallback(async (uid: number) => {
    setNotifLoading(true);
    try {
      const res = await fetch(`/api/notifications?userId=${uid}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications ?? []);
      }
    } catch {
      // silent
    } finally {
      setNotifLoading(false);
    }
  }, []);

  const markRead = useCallback(async (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
    } catch {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: false } : n));
    }
  }, []);

  const markAllRead = useCallback(async () => {
    if (!user) return;
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await fetch(`/api/notifications/read-all?userId=${user.id}`, { method: "PATCH" });
    } catch {
      // best-effort
    }
  }, [user]);

  const openNotifs = useCallback(() => {
    setNotifOpen(v => {
      if (!v && user) fetchNotifications(user.id);
      return !v;
    });
    setLangOpen(false);
  }, [fetchNotifications, user]);

  useEffect(() => {
    if (user?.id) fetchNotifications(user.id);
    else setNotifications([]);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user?.id) return;
    const interval = setInterval(() => fetchNotifications(user.id), 30_000);
    return () => clearInterval(interval);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNotifOpen(false);
    setSidebarOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href === "/farmer-dashboard") return location === "/farmer-dashboard" || location === "/farmer";
    if (href === "/buyer-dashboard") return location === "/buyer-dashboard" || location === "/buyer";
    return location.startsWith(href);
  };

  const isPublicPage = location === "/login" || location === "/register";
  if (isPublicPage) return <>{children}</>;

  const bottomNavItems = navItems.slice(0, 4);

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "fixed lg:relative z-40 h-full flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 w-64 shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border shrink-0 hover:bg-sidebar-accent/40 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-green">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sidebar-foreground text-base leading-none block">Mana Rythu</span>
            <p className="text-[11px] text-muted-foreground mt-0.5">Agriculture Platform</p>
          </div>
        </Link>

        {/* Role badge */}
        {user && (
          <div className="px-4 py-2.5 border-b border-sidebar-border/50">
            <span className={cn(
              "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize",
              user.role === "farmer" && "border-green-200 text-green-700 bg-green-50",
              user.role === "buyer"  && "border-blue-200 text-blue-700 bg-blue-50",
              user.role === "admin"  && "border-purple-200 text-purple-700 bg-purple-50",
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                user.role === "farmer" && "bg-green-500",
                user.role === "buyer"  && "bg-blue-500",
                user.role === "admin"  && "bg-purple-500",
              )} />
              {user.role}{user.verified && " ✓"}
            </span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
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
                <Icon className={cn("w-4.5 h-4.5 shrink-0 w-[18px] h-[18px] transition-transform", !active && "group-hover:scale-110")} />
                <span>{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto shrink-0 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3 px-1">
              <Link href={`/profile/${user.id}`} onClick={() => setSidebarOpen(false)}>
                <Avatar className="w-9 h-9 shrink-0 cursor-pointer ring-2 ring-border hover:ring-primary/30 transition-all">
                  <AvatarFallback className="gradient-primary text-white text-xs font-bold">
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
                title={t("signOut")}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link href="/login" className="flex items-center justify-center text-sm font-semibold py-2.5 px-3 rounded-xl gradient-primary text-white hover:opacity-90 transition-opacity shadow-green">
                {t("signIn")}
              </Link>
              <Link href="/register" className="flex items-center justify-center text-sm font-medium py-2.5 px-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors">
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header className="h-14 bg-card/95 backdrop-blur border-b border-border flex items-center gap-3 px-3 sm:px-5 shrink-0 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors shrink-0"
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile logo — icon only on xs, icon + text on sm+ */}
          <Link href="/" className="lg:hidden flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block font-bold text-sm text-foreground whitespace-nowrap">Mana Rythu</span>
          </Link>

          {/* Search */}
          <div className="flex-1 min-w-0 flex items-center gap-2 bg-muted rounded-xl px-3 py-2 max-w-xs sm:max-w-md">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="search"
              placeholder={t("searchCrops")}
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
            />
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Language switcher */}
            <div>
              <button
                ref={langBtnRef}
                onClick={() => { setLangOpen(v => !v); setNotifOpen(false); }}
                className={cn(
                  "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all text-sm font-medium select-none cursor-pointer",
                  langOpen
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "border-border bg-muted/50 hover:bg-muted hover:border-border/80 text-foreground"
                )}
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline text-xs font-semibold tracking-wide">{lang.toUpperCase()}</span>
              </button>
              <DropdownPortal anchorRef={langBtnRef} open={langOpen} onClose={() => setLangOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-44 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                >
                  {(["en", "te", "hi"] as Lang[]).map(l => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm hover:bg-muted flex items-center gap-2.5 transition-colors cursor-pointer",
                        lang === l && "bg-primary/5 font-semibold text-primary"
                      )}
                    >
                      <span className="text-base leading-none">{LANG_FLAGS[l].flag}</span>
                      <span>{LANG_FLAGS[l].label}</span>
                      <span className="ml-auto text-[10px] font-mono text-muted-foreground">{l.toUpperCase()}</span>
                      {lang === l && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                    </button>
                  ))}
                </motion.div>
              </DropdownPortal>
            </div>

            {/* Notification bell */}
            <div>
              <button
                ref={notifBtnRef}
                onClick={openNotifs}
                className={cn(
                  "relative p-2 rounded-xl transition-all",
                  notifOpen ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                )}
                aria-label={t("notifications")}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 bg-red-500 rounded-full border-2 border-card text-[9px] font-bold text-white flex items-center justify-center leading-none"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                )}
              </button>

              <DropdownPortal anchorRef={notifBtnRef} open={notifOpen} onClose={() => setNotifOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.18 }}
                  className="w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bell className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-semibold text-sm">{t("notifications")}</span>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0 h-4 min-w-0 rounded-full flex items-center font-bold">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        <CheckCheck className="w-3 h-3" />
                        {t("markAllRead")}
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
                    {notifLoading ? (
                      <div className="flex items-center justify-center py-10 text-muted-foreground text-sm gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        {t("loading")}
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="py-12 flex flex-col items-center gap-3 text-muted-foreground">
                        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                          <Bell className="w-7 h-7 opacity-30" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{t("noNotifications")}</p>
                          <p className="text-xs mt-0.5 px-4 opacity-70">{t("noNotifDesc")}</p>
                        </div>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => !n.read && markRead(n.id)}
                          className={cn(
                            "flex gap-3 px-4 py-3 transition-colors cursor-pointer group",
                            n.read ? "bg-card hover:bg-muted/40" : "bg-primary/[0.03] hover:bg-primary/[0.06]"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5",
                            notifTypeColor(n.type)
                          )}>
                            {n.type === "price" ? "₹" : n.type === "order" ? "📦" : n.type === "alert" ? "!" : "✓"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <p className={cn("text-xs font-semibold leading-tight", !n.read && "text-foreground")}>{n.title}</p>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">{timeAgo(n.createdAt)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {!user && (
                    <div className="px-4 py-3 border-t border-border bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground">
                        <Link href="/login" className="text-primary font-medium hover:underline" onClick={() => setNotifOpen(false)}>{t("signIn")}</Link> to see your notifications
                      </p>
                    </div>
                  )}
                </motion.div>
              </DropdownPortal>
            </div>

            {/* User avatar */}
            {user ? (
              <Link href={`/profile/${user.id}`}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-8 h-8 ring-2 ring-border hover:ring-primary/30 transition-all">
                    <AvatarFallback className="gradient-primary text-white text-xs font-bold">
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
                <Button size="sm" className="text-xs h-8 gradient-primary shadow-green border-0">{t("signIn")}</Button>
              </Link>
            )}
          </div>
        </header>

        {/* Page content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location}
            className="flex-1 overflow-y-auto pb-20 lg:pb-0"
            style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom, 0px))" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>

      {/* ── Premium Mobile bottom nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/96 backdrop-blur-xl border-t border-border z-20" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="flex h-[60px] px-2 items-center">
          {bottomNavItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative py-1"
              >
                {/* Spring-animated pill indicator */}
                {active && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-x-1 inset-y-0 rounded-2xl bg-primary/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <motion.div
                  animate={active ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                  className="relative z-10"
                >
                  <Icon className={cn("w-[22px] h-[22px] transition-colors duration-200", active ? "text-primary" : "text-muted-foreground")} />
                </motion.div>
                <motion.span
                  animate={active ? { opacity: 1 } : { opacity: 0.6 }}
                  className={cn("text-[10px] font-medium relative z-10 leading-none", active && "font-semibold text-primary")}
                >
                  {label}
                </motion.span>
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
