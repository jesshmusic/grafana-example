"use client";

import React from "react";
import Card from "../components/Card";
import { FcDataSheet, FcStatistics } from "react-icons/fc";

export default function Home() {
  const midnightNeon = [
    { name: "Midnight Neon 900", bg: "bg-midnight-neon-900", hex: "#111827" },
    { name: "Midnight Neon 800", bg: "bg-midnight-neon-800", hex: "#23367c" },
    { name: "Midnight Neon 600", bg: "bg-midnight-neon-600", hex: "#7C3AED" },
    { name: "Midnight Neon 500", bg: "bg-midnight-neon-500", hex: "#D946EF" },
    { name: "Midnight Neon 400", bg: "bg-midnight-neon-400", hex: "#2DD4BF" },
    { name: "Midnight Neon 300", bg: "bg-midnight-neon-300", hex: "#6EE7B7" },
  ];

  return (
    <main className="text-center mt-10 space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          <Card
            title={"Table"}
            description={"View the product table."}
            CardIcon={FcDataSheet}
            url={"/table"}
          />
          <Card
            title={"Graph"}
            description={"View Price History Graph"}
            CardIcon={FcStatistics}
            url={"/graph"}
          />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Midnight Neon Palette</h2>
        <div className="grid grid-cols-1 sm: grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {midnightNeon.map(({ name, bg, hex }) => (
            <div key={name} className="flex flex-col items-center">
              <div
                className={`${bg} rounded-lg border-2 border-white`}
                style={{
                  backgroundColor: hex,
                  width: "6rem",
                  height: "6rem",
                }}
              />
              <div className="mt-2 text-sm">
                <div className="font-medium">{name}</div>
                <code className="block">{bg}</code>
                <div>{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
