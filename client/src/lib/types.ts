export interface KPIData {
  kpis: {
    ca_total: number;
    nb_commandes: number;
    clients_uniques: number;
    panier_moyen: number;
    quantite_moyenne_par_commande: number;
  };
  charts: {
    ca_par_mois: Record<string, number>;
    ca_par_pays: Record<string, number>;
    top_10_produits: Record<string, number>;
    top_5_clients: Record<string, number>;
    commandes_par_mois: Record<string, number>;
  };
}

export interface DashboardFilters {
  start_date: string;
  end_date: string;
  country: string;
  category: string;
}

export interface FiltersOptions {
  countries: string[];
  categories: string[];
}
