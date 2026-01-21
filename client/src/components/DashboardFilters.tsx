"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardFilters as FilterType, FiltersOptions } from "@/lib/types";
import { Calendar, Filter, Globe, Tag } from "lucide-react";

interface FiltersProps {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
}

export function DashboardFilters({ filters, setFilters }: FiltersProps) {
  const [options, setOptions] = useState<FiltersOptions>({ countries: [], categories: [] });

  useEffect(() => {
    fetch("/api/filters")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch(() => {});
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-lg shadow-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5"></div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Filter className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground">Filtres</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="space-y-2">
            <Label htmlFor="start_date" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              Date de début
            </Label>
            <Input
              id="start_date"
              type="date"
              value={filters.start_date}
              onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
              className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              Date de fin
            </Label>
            <Input
              id="end_date"
              type="date"
              value={filters.end_date}
              onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
              className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              Pays
            </Label>
            <Select
              value={filters.country || "all"}
              onValueChange={(value) => setFilters({ ...filters, country: value === "all" ? "" : value })}
            >
              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20">
                <SelectValue placeholder="Sélectionner un pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les pays</SelectItem>
                {options.countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              Catégorie
            </Label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) => setFilters({ ...filters, category: value === "all" ? "" : value })}
            >
              <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {options.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
