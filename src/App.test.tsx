import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { MockedProvider } from "@apollo/client/testing";
import { PRODUCTS_QUERY } from "./api";

jest.mock("@grafana/ui", () => ({
  Table: (props: any) => {
    const rows =
      props.data && props.data.first && Array.isArray(props.data.first.buffer)
        ? props.data.first.buffer
        : [];
    console.log(rows);
    return (
      <table>
        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i}>
              <td>{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  useTheme2: () => ({
    colors: {
      background: { canvas: "#fff" },
    },
  }),
}));

const mockProducts = [
  {
    id: 1,
    title: "Test Product",
    description: "A test product",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    brand: "TestBrand",
    category: "TestCategory",
    thumbnail: "https://example.com/test.jpg",
    images: ["https://example.com/test.jpg"],
    __typename: "Product",
  },
];

const mocks = [
  {
    request: {
      query: PRODUCTS_QUERY,
    },
    result: {
      data: {
        products: mockProducts,
      },
    },
  },
];

test("shows loading state", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("shows error state", async () => {
  const errorMocks = [
    {
      request: { query: PRODUCTS_QUERY },
      error: new Error("Test error"),
    },
  ];
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test("renders product table", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  await waitFor(() =>
    expect(screen.getByText("Test Product")).toBeInTheDocument(),
  );
  await waitFor(() => expect(screen.getByRole("table")).toBeInTheDocument());
});
