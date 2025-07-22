import "./styles.css";
import { css } from "@emotion/css";
import { Table, useTheme2 } from "@grafana/ui";
import "./normalize.css";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY, buildData } from "./api";

export default function App() {
  const theme = useTheme2();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products!</div>;

  // Pass products array from API to buildData
  const tableData = buildData(data.products, theme);

  const style = css`
    width: 100%;
    height: 100%;
    padding: 32px;
    background: ${theme.colors.background.canvas};
  `;

  return (
    <div className={style}>
      <Table
        data={tableData[0]}
        height={800}
        width={1500}
        columnMinWidth={200}
      />
    </div>
  );
}
