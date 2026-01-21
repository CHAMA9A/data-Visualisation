"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronDown,
  LayoutDashboard,
  Moon,
  Sun,
  TrendingUp,
  Users,
  Package,
  Settings,
} from "lucide-react";

export function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg gradient-bg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Northwind<span className="text-primary">Analytics</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Vue d&apos;ensemble</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 cursor-pointer">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Performance</div>
                      <div className="text-xs text-muted-foreground">Indicateurs clés</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 cursor-pointer">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Ventes</div>
                      <div className="text-xs text-muted-foreground">Analyse des revenus</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Données</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 cursor-pointer">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Clients</div>
                      <div className="text-xs text-muted-foreground">Base clients</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 cursor-pointer">
                    <Package className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Produits</div>
                      <div className="text-xs text-muted-foreground">Catalogue</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 font-medium">
                    <BarChart3 className="h-4 w-4" />
                    Rapports
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem className="gap-3 cursor-pointer">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Mensuel</div>
                      <div className="text-xs text-muted-foreground">Rapport du mois</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 cursor-pointer">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Annuel</div>
                      <div className="text-xs text-muted-foreground">Bilan annuel</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-9 w-9 rounded-full gradient-bg flex items-center justify-center text-white font-semibold text-sm">
              AD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
