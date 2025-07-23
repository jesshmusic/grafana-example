import "./styles.css";
import { css } from "@emotion/css";
import { Table, useTheme2 } from "@grafana/ui";
import "./normalize.css";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY, buildData, buildGraphData } from "./api";
import Plot, { PlotParams } from "react-plotly.js";

const App = () => {
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

  const container = css`
    width: 100%;
    height: 100%;
    padding: 32px;
    background: ${theme.colors.background.canvas};
  `;
  const section = css`
    margin-top: 32px;
  `;

  return (
    <div className={container}>
      <h1>Visualization and Grafana Examples</h1>
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
    </div>
  );
};

export default App;
