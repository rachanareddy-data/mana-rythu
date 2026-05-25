import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf, Map, Bot, User as UserIcon, LogOut, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Mana Rythu
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/marketplace" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Marketplace
          </Link>
          <Link href="/maps" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <Map className="h-4 w-4" />
            Crop Map
          </Link>
          <Link href="/ai-assistant" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <Bot className="h-4 w-4" />
            Agri AI
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link 
                href={user.role === "farmer" ? "/farmer/dashboard" : user.role === "admin" ? "/admin" : "/buyer/dashboard"} 
              >
                <Button variant="ghost" className="hidden md:flex gap-2">
                  <UserIcon className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 border-border/50 bg-background/50 backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
