"use client";

import dynamic from "next/dynamic";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIData } from "@/lib/types";
import { TrendingUp, Globe, Package, Users, ShoppingCart } from "lucide-react";

const WorldMapChart = dynamic(
  () => import("./WorldMapChart").then((mod) => mod.WorldMapChart),
  { ssr: false }
);

interface DashboardChartsProps {
  data: KPIData | null;
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  if (!data) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const revenueOverTime = Object.entries(data.charts.ca_par_mois)
    .map(([month, revenue]) => ({ month, revenue }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const ordersOverTime = Object.entries(data.charts.commandes_par_mois)
    .map(([month, orders]) => ({ month, orders }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const revenueByCountry = Object.entries(data.charts.ca_par_pays)
    .map(([country, revenue]) => ({ country, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const topProducts = Object.entries(data.charts.top_10_produits)
    .map(([product_name, revenue]) => ({ product_name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const topClients = Object.entries(data.charts.top_5_clients)
    .map(([client_name, revenue]) => ({ client_name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Évolution du CA</CardTitle>
                <p className="text-sm text-muted-foreground">Par mois</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[320px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueOverTime}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "CA"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Évolution des Commandes</CardTitle>
                <p className="text-sm text-muted-foreground">Par mois</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[320px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ordersOverTime}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  formatter={(value: number) => [value, "Commandes"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <CardTitle className="text-lg">CA par Pays</CardTitle>
                <p className="text-sm text-muted-foreground">Répartition géographique</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] pt-4">
            <WorldMapChart data={revenueByCountry} formatCurrency={formatCurrency} />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Top 10 Produits</CardTitle>
                <p className="text-sm text-muted-foreground">Meilleurs vendeurs</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={formatCurrency}
                />
                <YAxis
                  dataKey="product_name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  width={120}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "CA"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="revenue" radius={[0, 8, 8, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Top 5 Clients</CardTitle>
              <p className="text-sm text-muted-foreground">Par chiffre d&apos;affaires</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[280px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topClients}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="client_name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={formatCurrency}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "CA"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderRadius: "12px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
