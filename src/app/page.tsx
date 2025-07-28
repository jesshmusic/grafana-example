'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import Card from '../components/Card';
import { FcDataSheet, FcStatistics } from 'react-icons/fc';
import { SAMPLE_PRODUCTS_QUERY } from "@/lib/api";
import { Product } from "@/lib/products";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Home() {
  const [showPalette, setShowPalette] = React.useState(false);

  const midnightNeon = [
    { name: 'Midnight Neon 900', bg: 'bg-midnight-neon-900', hex: '#111827' },
    { name: 'Midnight Neon 800', bg: 'bg-midnight-neon-800', hex: '#23367c' },
    { name: 'Midnight Neon 700', bg: 'bg-midnight-neon-700', hex: '#3f4d83' },
    { name: 'Midnight Neon 600', bg: 'bg-midnight-neon-600', hex: '#7C3AED' },
    { name: 'Midnight Neon 500', bg: 'bg-midnight-neon-500', hex: '#D946EF' },
    { name: 'Midnight Neon 400', bg: 'bg-midnight-neon-400', hex: '#2DD4BF' },
    { name: 'Midnight Neon 300', bg: 'bg-midnight-neon-300', hex: '#6EE7B7' },
  ];

  const visualizations = [
    { title: 'Table', description: 'View the product table.', CardIcon: FcDataSheet, url: '/table' },
    { title: 'Graph', description: 'View Price History Graph', CardIcon: FcStatistics, url: '/graph' },
  ];

  const { data, loading } = useQuery(SAMPLE_PRODUCTS_QUERY);

  return (
    <main className="text-center mt-10 space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {visualizations.map(({ title, description, CardIcon, url }) => (
            <Card key={url} title={title} description={description} CardIcon={CardIcon} url={url} />
          ))}
        </div>
      </section>
      {!loading && data?.products?.length > 0 && (
        <section className="mt-8 px-4 md:flex md:gap-4 items-stretch">
          {/* Sample Table */}
          <div className="md:w-1/2 dark:bg-midnight-neon-900/80 border border-midnight-neon-700 p-4 rounded shadow min-h-[300px] flex flex-col justify-start">
            <h2 className="text-lg font-semibold mb-2">Sample Table</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price (USD)</th>
              </tr>
              </thead>
              <tbody>
              {data.products.map((product: Product) => (
                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Sample Graph */}
          <div className="md:w-1/2 dark:bg-midnight-neon-900/80 border border-midnight-neon-700 p-4 rounded shadow min-h-[300px] flex flex-col justify-start mt-8 md:mt-0">
            <h2 className="text-lg font-semibold mb-2">Sample Graph</h2>
            <Plot
              data={(data.products as Product[]).map((product) => ({
                x: product.historicalPrices.map((h) => h.date),
                y: product.historicalPrices.map((h) => h.price),
                name: product.title,
                type: 'scatter',
                mode: 'lines+markers',
              }))}
              layout={{
                autosize: true,
                height: 300,
                legend: { orientation: 'h', bgcolor: 'rgba(0,0,0,0)', font: { color: '#fff' } },
                plot_bgcolor: 'rgba(0,0,0,0)',
                paper_bgcolor: 'rgba(0,0,0,0)',
                margin: { t: 30, b: 40, l: 40, r: 20 },
              }}
              config={{ responsive: true, displayModeBar: false }}
            />
          </div>
        </section>

      )}

      {/* Toggle Palette Button */}
      <button
        onClick={() => setShowPalette(!showPalette)}
        className="fixed bottom-6 left-6 z-50 px-6 py-3 rounded-full bg-midnight-neon-600 text-white font-semibold shadow-lg hover:bg-midnight-neon-500 transition-all duration-300"
      >
        {showPalette ? 'Hide Palette' : 'Show Palette'}
      </button>

      {/* Color Palette Panel */}
      <div
        className={`fixed bottom-0 left-0 w-full z-40 bg-midnight-neon-800 text-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          showPalette ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <section className="p-6 max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Midnight Neon Palette</h2>
          <div className="grid sm:grid-cols-3 md:grid-cols-7 gap-6 justify-items-center">
            {midnightNeon.map(({ name, bg, hex }) => (
              <div key={name} className="flex flex-col items-center">
                <div className={`${bg} rounded-lg border-2 border-white`} style={{ width: '6rem', height: '6rem', backgroundColor: hex }} />
                <div className="mt-2 text-sm text-white text-center">
                  <div className="font-medium">{name}</div>
                  <code className="block">{bg}</code>
                  <div>{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
