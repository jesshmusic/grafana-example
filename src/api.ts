import {applyFieldOverrides, FieldType, MutableDataFrame, ThresholdsMode} from '@grafana/data';
import {Product, products} from './products';

const defaultThresholds = {
  steps: [
    {
      color: 'blue',
      value: 0,
    },
    {
      color: 'green',
      value: 2.5,
    },
  ],
  mode: ThresholdsMode.Absolute,
};

const prepData = (data: any, theme: any) => {
  return applyFieldOverrides({
    data: data,
    fieldConfig: {
      overrides: [],
      defaults: {},
    },
    theme,
    replaceVariables: (value: any) => value,
  });
}

export const buildData = (theme: any) => {
  const data = new MutableDataFrame({
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
          decimals: 2,
          min: 0,
          max: 5,
          custom: {
            width: 300,
            displayMode: 'gradient-gauge',
          },
          thresholds: defaultThresholds,
        }
      }
    ]
  });

  products.forEach((product: Product) => {
    data.appendRow([
      product.title,
      product.description,
      product.price,
      product.discountPercentage,
      product.brand,
      product.category,
      product.stock,
      product.rating
    ]);
  });

  return prepData([data], theme);
}
