"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import type { DataFrame } from "@grafana/data";
import { useTheme2, Table as GrafanaTable } from "@grafana/ui";
import { buildData, PRODUCTS_QUERY } from "@/lib/api";

interface TableProps {
  data: DataFrame;
  height: number;
  width: number;
  columnMinWidth?: number;
}

const Table = GrafanaTable as unknown as React.FC<TableProps>;

export default function TablePage() {
  const theme = useTheme2();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error loading products!</div>;

  const [firstFrame] = buildData(data.products, theme);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Table</h2>
      <Table data={firstFrame} height={800} width={1500} columnMinWidth={200} />
    </div>
  );
}
