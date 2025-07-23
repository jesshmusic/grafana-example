# Grafana Example Frontend

![TypeScript](https://img.shields.io/badge/code-typescript-blue?logo=typescript)
![React](https://img.shields.io/badge/framework-react-61DAFB?logo=react)
![Yarn](https://img.shields.io/badge/package%20manager-yarn-2C8EBB?logo=yarn)
![Build](https://github.com/jesshmusic/grafana-example/actions/workflows/master.yml/badge.svg)


A React + TypeScript frontend for visualizing product data from a Node.js GraphQL API.

## Features

- Product table powered by Grafana UI components
- Time series price history graph powered by Plotly (30-day price trend for each product)
- Data fetched live from a backend GraphQL API (local or AWS)
- Prettier code formatting
- Unit testing with Jest and React Testing Library

## Local Setup

1. **Clone the repo and cd into the folder:**

    ```bash
    git clone <your-repo-url>
    cd grafana-example-frontend
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Run the development server:**

    ```bash
    yarn start
    ```
   - The frontend connects to `http://localhost:4000/` by default if you open it on localhost.
   - For production, it uses your AWS Elastic Beanstalk API endpoint.

4. **Run tests:**

    ```bash
    yarn test
    ```

5. **Format code:**

    ```bash
    yarn format
    ```

---

## Project Structure

- `src/` — React components and app code
- `src/api.ts` — API queries and helpers
- `src/products.ts` — TypeScript `Product` type definition

---

## Requirements

- Node.js >= 16.x
- Yarn (recommended)

---

## License

MIT
