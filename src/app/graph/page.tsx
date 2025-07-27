"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client";
import { buildGraphData, PRODUCTS_QUERY } from "@/lib/api";
import { PlotParams } from "react-plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function GraphPage() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return <div>Loading graph...</div>;
  if (error) return <div>Error loading graph!</div>;

  const graphData = buildGraphData(data.products);

  const plotlyData = graphData.map((df) => ({
    x: df.fields.find((f) => f.name === "time")!.values.toArray(),
    y: df.fields.find((f) => f.name === "price")!.values.toArray(),
    type: "scatter",
    mode: "lines+markers",
    name: df.name,
  }));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Price History (30 days)</h2>
      <Plot
        data={plotlyData as PlotParams["data"]}
        layout={{
          width: 1500,
          height: 800,
          title: {
            text: "Product Price History (30 days)",
            font: { color: "#fff" },
          },
          xaxis: {
            title: { text: "Date", font: { color: "#fff" } },
            tickfont: { color: "#fff" },
          },
          yaxis: {
            title: { text: "Price (USD)", font: { color: "#fff" } },
            tickfont: { color: "#fff" },
          },
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
          legend: { bgcolor: "rgba(0,0,0,0)", font: { color: "#fff" } },
        }}
      />
    </div>
  );
}
