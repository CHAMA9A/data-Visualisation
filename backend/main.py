from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(title="Northwind Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("northwind_gold.csv", parse_dates=["orderdate"])
df["orderdate"] = pd.to_datetime(df["orderdate"], errors="coerce")

@app.get("/api/kpis")
def get_kpis(
    start_date: str = Query(...),
    end_date: str = Query(...),
    country: str | None = None,
    category: str | None = None
):
    dff = df[
        (df["orderdate"] >= start_date) &
        (df["orderdate"] <= end_date)
    ]

    if country:
        dff = dff[dff["country"] == country]

    if category:
        dff = dff[dff["categoryname"] == category]

    ca_total = round(dff["ca"].sum(), 2)
    nb_commandes = int(dff["orderid"].nunique())
    clients_uniques = int(dff["customerid"].nunique())
    panier_moyen = round(ca_total / max(nb_commandes, 1), 2)
    quantite_moyenne_par_commande = round(
        dff.groupby("orderid")["quantity"].sum().mean(), 2
    )

    ca_par_mois = (
        dff.groupby(dff["orderdate"].dt.to_period("M"))["ca"]
        .sum()
        .sort_index()
        .astype(float)
        .to_dict()
    )
    ca_par_mois = {str(k): v for k, v in ca_par_mois.items()}

    top_10_produits = (
        dff.groupby("productname")["ca"]
        .sum()
        .nlargest(10)
        .astype(float)
        .to_dict()
    )

    ca_par_pays = (
        dff.groupby("country")["ca"]
        .sum()
        .astype(float)
        .to_dict()
    )

    top_5_clients = (
        dff.groupby("companyname")["ca"]
        .sum()
        .nlargest(5)
        .astype(float)
        .to_dict()
    )

    commandes_par_mois = (
        dff.groupby(dff["orderdate"].dt.to_period("M"))["orderid"]
        .nunique()
        .sort_index()
        .astype(int)
        .to_dict()
    )
    commandes_par_mois = {str(k): v for k, v in commandes_par_mois.items()}

    return {
        "kpis": {
            "ca_total": ca_total,
            "nb_commandes": nb_commandes,
            "clients_uniques": clients_uniques,
            "panier_moyen": panier_moyen,
            "quantite_moyenne_par_commande": quantite_moyenne_par_commande
        },
        "charts": {
            "ca_par_mois": ca_par_mois,
            "ca_par_pays": ca_par_pays,
            "top_10_produits": top_10_produits,
            "top_5_clients": top_5_clients,
            "commandes_par_mois": commandes_par_mois
        }
    }

@app.get("/api/filters")
def get_filters():
    return {
        "countries": sorted(df["country"].dropna().unique().tolist()),
        "categories": sorted(df["categoryname"].dropna().unique().tolist())
    }
