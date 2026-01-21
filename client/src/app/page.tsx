"use client";

import { useEffect, useState } from "react";
import { DashboardFilters as Filters } from "@/components/DashboardFilters";
import { KPICards } from "@/components/KPICards";
import { DashboardCharts } from "@/components/DashboardCharts";
import { DashboardFilters as FilterType, KPIData } from "@/lib/types";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterType>({
    start_date: "1996-01-01",
    end_date: "1998-12-31",
    country: "",
    category: "",
  });

  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (filters.start_date) queryParams.append("start_date", filters.start_date);
        if (filters.end_date) queryParams.append("end_date", filters.end_date);
        if (filters.country) queryParams.append("country", filters.country);
        if (filters.category) queryParams.append("category", filters.category);

        const response = await fetch(`/api/kpis?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data. Please ensure the backend API is running.");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Analysez vos performances commerciales en temps réel
            </p>
          </div>

          <Filters filters={filters} setFilters={setFilters} />

          {error && (
            <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-primary/20"></div>
                <Loader2 className="h-12 w-12 animate-spin text-primary absolute top-0 left-0" />
              </div>
              <p className="text-muted-foreground font-medium">Chargement des données...</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <KPICards data={data} />
              <DashboardCharts data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
