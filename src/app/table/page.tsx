"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTheme2, Table as GrafanaTable } from "@grafana/ui";
import { buildData, PRODUCTS_QUERY } from "@/lib/api";

const Table = GrafanaTable as unknown as React.FC<any>;

export default function TablePage() {
  const theme = useTheme2();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products!</div>;

  const tableData = buildData(data.products, theme);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Table</h2>
      <Table
        data={tableData[0]}
        height={800}
        width={1500}
        columnMinWidth={200}
      />
    </div>
  );
}
