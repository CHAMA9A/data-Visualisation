"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryNameMapping: Record<string, string> = {
  "USA": "United States of America",
  "UK": "United Kingdom",
  "Germany": "Germany",
  "France": "France",
  "Brazil": "Brazil",
  "Mexico": "Mexico",
  "Canada": "Canada",
  "Argentina": "Argentina",
  "Austria": "Austria",
  "Belgium": "Belgium",
  "Denmark": "Denmark",
  "Finland": "Finland",
  "Ireland": "Ireland",
  "Italy": "Italy",
  "Norway": "Norway",
  "Poland": "Poland",
  "Portugal": "Portugal",
  "Spain": "Spain",
  "Sweden": "Sweden",
  "Switzerland": "Switzerland",
  "Venezuela": "Venezuela",
};

interface WorldMapChartProps {
  data: { country: string; revenue: number }[];
  formatCurrency: (value: number) => string;
}

export function WorldMapChart({ data, formatCurrency }: WorldMapChartProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; revenue: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  const getColor = (countryName: string) => {
    const countryData = data.find((d) => {
      const mappedName = countryNameMapping[d.country] || d.country;
      return mappedName === countryName || d.country === countryName;
    });

    if (!countryData) return "#e2e8f0";

    const intensity = countryData.revenue / maxRevenue;
    if (intensity > 0.8) return "#0ea5e9";
    if (intensity > 0.6) return "#38bdf8";
    if (intensity > 0.4) return "#7dd3fc";
    if (intensity > 0.2) return "#bae6fd";
    return "#e0f2fe";
  };

  const getCountryRevenue = (countryName: string) => {
    return data.find((d) => {
      const mappedName = countryNameMapping[d.country] || d.country;
      return mappedName === countryName || d.country === countryName;
    });
  };

  if (!mounted) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement de la carte...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 140,
          center: [10, 20],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties?.name;
              const countryData = getCountryRevenue(countryName);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if (countryData) {
                      setHoveredCountry({ name: countryData.country, revenue: countryData.revenue });
                    }
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{
                    default: {
                      fill: getColor(countryName),
                      stroke: "#94a3b8",
                      strokeWidth: 0.3,
                      outline: "none",
                    },
                    hover: {
                      fill: countryData ? "#0284c7" : "#cbd5e1",
                      stroke: "#64748b",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: countryData ? "pointer" : "default",
                    },
                    pressed: {
                      fill: "#0369a1",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {hoveredCountry && (
        <div className="absolute top-4 right-4 px-4 py-3 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl">
          <p className="font-semibold text-foreground">{hoveredCountry.name}</p>
          <p className="text-primary font-bold text-lg">{formatCurrency(hoveredCountry.revenue)}</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
        <p className="text-xs font-medium mb-2 text-muted-foreground">Chiffre d&apos;Affaires</p>
        <div className="flex items-center gap-1">
          <div className="w-5 h-3 rounded-sm bg-[#e0f2fe]"></div>
          <div className="w-5 h-3 rounded-sm bg-[#bae6fd]"></div>
          <div className="w-5 h-3 rounded-sm bg-[#7dd3fc]"></div>
          <div className="w-5 h-3 rounded-sm bg-[#38bdf8]"></div>
          <div className="w-5 h-3 rounded-sm bg-[#0ea5e9]"></div>
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>Faible</span>
          <span>Élevé</span>
        </div>
      </div>
    </div>
  );
}
