import "./styles.css";
import { Table } from "@grafana/ui";
import { merge, isNumber, cloneDeep } from "lodash";
import {
  applyFieldOverrides,
  FieldType,
  GrafanaTheme2,
  MutableDataFrame
} from "@grafana/data";
import { products } from "./products";

export default function App() {
  const theme = GrafanaTheme2;
  const data = new MutableDataFrame({
    fields: [
      { name: "Title", type: FieldType.string, values: [] },
      { name: "Description", type: FieldType.string, values: [] },
      {
        name: "Price",
        type: FieldType.number,
        values: [],
        config: {
          unit: "currency",
          decimals: 0,
          custom: {
            align: "center",
            width: 80
          }
        }
      },
      {
        name: "Discount",
        type: FieldType.number,
        values: [],
        config: {
          unit: "percent",
          decimals: 2,
          custom: {
            align: "center",
            width: 80
          }
        }
      },
      { name: "Brand", type: FieldType.string, values: [] },
      { name: "Category", type: FieldType.string, values: [] },
      {
        name: "Stock",
        type: FieldType.number,
        values: [],
        config: {
          decimals: 0,
          custom: {
            align: "center",
            width: 80
          }
        }
      },
      {
        name: "Rating",
        type: FieldType.number,
        values: [],
        config: {
          min: 0,
          max: 100,
          custom: {
            width: 150
          }
        }
      }
    ]
  });

  products.forEach((product) => {
    data.appendRow([
      product.title,
      product.description,
      product.price,
      product.discount,
      product.brand,
      product.category,
      product.stock,
      product.rating
    ]);
  });
  console.log(data);
  return (
    <div className="App">
      <div className="pageContainer">
        <Table data={data} height={800} width={800} />
      </div>
    </div>
  );
}
