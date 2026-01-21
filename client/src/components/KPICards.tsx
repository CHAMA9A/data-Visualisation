"use client";

import { Card, CardContent } from "@/components/ui/card";
import { KPIData } from "@/lib/types";
import { Euro, Package, Users, ShoppingCart, Hash } from "lucide-react";

interface KPICardsProps {
  data: KPIData | null;
}

export function KPICards({ data }: KPICardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("de-DE").format(value);
  };

  const kpis = [
    {
      title: "Chiffre d'Affaires",
      value: data ? formatCurrency(data.kpis.ca_total) : "€0,00",
      icon: Euro,
      color: "from-sky-500 to-cyan-400",
      bgColor: "bg-sky-500/10",
      textColor: "text-sky-500",
    },
    {
      title: "Commandes",
      value: data ? formatNumber(data.kpis.nb_commandes) : "0",
      icon: Package,
      color: "from-violet-500 to-purple-400",
      bgColor: "bg-violet-500/10",
      textColor: "text-violet-500",
    },
    {
      title: "Clients Uniques",
      value: data ? formatNumber(data.kpis.clients_uniques) : "0",
      icon: Users,
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      title: "Panier Moyen",
      value: data ? formatCurrency(data.kpis.panier_moyen) : "€0,00",
      icon: ShoppingCart,
      color: "from-amber-500 to-orange-400",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
    {
      title: "Qté Moy. / Commande",
      value: data ? formatNumber(data.kpis.quantite_moyenne_par_commande) : "0",
      icon: Hash,
      color: "from-rose-500 to-pink-400",
      bgColor: "bg-rose-500/10",
      textColor: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card 
            key={index} 
            className="relative overflow-hidden border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${kpi.color}`}></div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-xl ${kpi.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-5 w-5 ${kpi.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
