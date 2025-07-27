"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Table as GrafanaTable, useTheme2 } from "@grafana/ui";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import React from "react";
import { useQuery } from "@apollo/client";
import { buildData, buildGraphData, PRODUCTS_QUERY } from "@/lib/api";
import { css } from "@emotion/css";
import { PlotParams } from "react-plotly.js";

const Table = GrafanaTable as unknown as React.FC<any>;

export default function Home() {
  const theme = useTheme2();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products!</div>;

  // Pass products array from API to buildData
  const tableData = buildData(data.products, theme);
  const graphData = buildGraphData(data.products);

  const plotlyData = graphData.map((df) => ({
    x: df.fields.find((f) => f.name === "time")!.values.toArray(),
    y: df.fields.find((f) => f.name === "price")!.values.toArray(),
    type: "scatter",
    mode: "lines+markers",
    name: df.name,
  }));

  const section = css`
    margin-top: 32px;
  `;

  // @ts-ignore
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Visualization and Grafana Examples</h1>
        <div className={section}>
          <p>
            This demo visualizes a set of sample products, each with a 30-day
            simulated price history. Use the table below to explore product
            metadata, and the interactive graph to compare price trends over
            time. Click or double-click legend entries to focus on individual
            products. The data is randomly generated on the server for
            demonstration and testing of time series visualizations.
          </p>
          <ul style={{ padding: "0 16px" }}>
            <li>
              <strong>Products:</strong> Each includes title, brand, category,
              images, and rating
            </li>
            <li>
              <strong>Price History:</strong> 30 days of simulated price data
              per product
            </li>
            <li>
              <strong>Graph Features:</strong> Transparent background, bright
              text, interactive legend
            </li>
          </ul>
        </div>
        <div className={section}>
          <h2>Table</h2>
          <Table
            data={tableData[0]}
            height={800}
            width={1500}
            columnMinWidth={200}
          />
        </div>
        <div className={section}>
          <h2>Plotly Graph</h2>
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
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
