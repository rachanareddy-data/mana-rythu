import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Leaf, Map, Bot, User as UserIcon, LogOut, ChevronRight,
  Menu, X, ShoppingBasket, LayoutDashboard, ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBasket },
  { href: "/maps",        label: "Crop Map",    icon: Map },
  { href: "/ai-assistant",label: "Agri AI",     icon: Bot },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }
    return () => { if (typeof document !== "undefined") document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const dashboardHref =
    user?.role === "farmer" ? "/farmer/dashboard" :
    user?.role === "admin"  ? "/admin" :
    "/buyer/dashboard";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              Mana Rythu
            </span>
          </Link>

          {/* Desktop centre links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <Link href={dashboardHref}>
                  <Button variant="ghost" className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2 border-border/50 bg-background/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-sm font-medium hover:bg-primary/5">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="gap-1 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Join Now
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: right side = auth shortcut + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {!user && (
              <Link href="/login">
                <Button size="sm" variant="ghost" className="text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-xl text-foreground hover:bg-muted/60 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay + panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background border-l border-border/50 shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <span className="font-display font-bold text-foreground">Mana Rythu</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {NAV_LINKS.map(({ href, label, icon: Icon }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-primary/8 hover:text-primary transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      {label}
                    </Link>
                  </motion.div>
                ))}

                {/* Dashboard link (logged in) */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_LINKS.length * 0.06 + 0.05 }}
                  >
                    <Link
                      href={dashboardHref}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-primary/8 hover:text-primary transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                      Dashboard
                    </Link>
                  </motion.div>
                )}

                {/* Admin shortcut */}
                {user?.role === "admin" && (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (NAV_LINKS.length + 1) * 0.06 + 0.05 }}
                  >
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-primary/8 hover:text-primary transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      Admin Panel
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Drawer footer — auth actions */}
              <div className="px-4 py-6 border-t border-border/30 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
                      <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm uppercase">
                        {user.name?.[0] ?? "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                      onClick={() => { setMenuOpen(false); handleLogout(); }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setMenuOpen(false)}>
                      <Button className="w-full gap-1 rounded-full shadow-lg shadow-primary/20">
                        Join Now <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
