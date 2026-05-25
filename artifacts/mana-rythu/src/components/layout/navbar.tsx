import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Mana Rythu</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            <Link href="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
              Marketplace
            </Link>
            <Link href="/maps" className="text-sm font-medium transition-colors hover:text-primary">
              Maps
            </Link>
            <Link href="/ai-assistant" className="text-sm font-medium transition-colors hover:text-primary">
              Agri AI
            </Link>
            {user ? (
              <>
                <Link 
                  href={user.role === "farmer" ? "/farmer/dashboard" : user.role === "admin" ? "/admin" : "/buyer/dashboard"} 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                  Login
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
