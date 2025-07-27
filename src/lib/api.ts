import { gql } from "@apollo/client";
import {
  applyFieldOverrides,
  DataFrame,
  FieldType,
  GrafanaTheme2,
  MutableDataFrame,
  ThresholdsMode,
} from "@grafana/data";
import type { Product } from "./products";

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      title
      description
      price
      discountPercentage
      rating
      stock
      brand
      category
      thumbnail
      images
      historicalPrices {
        date
        price
      }
    }
  }
`;

const defaultThresholds = {
  steps: [
    { color: "blue", value: 0 },
    { color: "green", value: 2.5 },
  ],
  mode: ThresholdsMode.Absolute,
};

export const prepData = (data: DataFrame[], theme: GrafanaTheme2) => {
  return applyFieldOverrides({
    data,
    fieldConfig: {
      overrides: [],
      defaults: {},
    },
    theme,
    replaceVariables: (value: string) => value,
  });
};

export function buildData(products: Product[], theme: GrafanaTheme2) {
  const dataFrame = new MutableDataFrame({
    fields: [
      { name: "Title", type: FieldType.string, values: [] },
      { name: "Description", type: FieldType.string, values: [] },
      {
        name: "Price",
        type: FieldType.number,
        values: [],
        config: {
          unit: "currencyUSD",
          decimals: 0,
          custom: { align: "center", width: 80 },
        },
      },
      {
        name: "Discount",
        type: FieldType.number,
        values: [],
        config: {
          unit: "percent",
          decimals: 2,
          custom: { align: "center", width: 80 },
        },
      },
      { name: "Brand", type: FieldType.string, values: [] },
      { name: "Category", type: FieldType.string, values: [] },
      {
        name: "Stock",
        type: FieldType.number,
        values: [],
        config: {
          decimals: 0,
          custom: { align: "center", width: 80 },
        },
      },
      {
        name: "Rating",
        type: FieldType.number,
        values: [],
        config: {
          decimals: 2,
          min: 0,
          max: 5,
          custom: { width: 300, displayMode: "gradient-gauge" },
          thresholds: defaultThresholds,
        },
      },
    ],
  });

  products.forEach((product) => {
    dataFrame.appendRow([
      product.title,
      product.description,
      product.price,
      product.discountPercentage,
      product.brand,
      product.category,
      product.stock,
      product.rating,
    ]);
  });

  return prepData([dataFrame], theme);
}

export function buildGraphData(products: Product[]): DataFrame[] {
  return products.map(
    (product) =>
      new MutableDataFrame({
        name: product.title,
        fields: [
          {
            name: "time",
            type: FieldType.time,
            values: product.historicalPrices.map((p) => p.date),
          },
          {
            name: "price",
            type: FieldType.number,
            values: product.historicalPrices.map((p) => p.price),
          },
        ],
      }),
  );
}
