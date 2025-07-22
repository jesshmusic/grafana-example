# Grafana Example Frontend

A React + TypeScript frontend for visualizing product data from a Node.js GraphQL API.

## Features

- Product table powered by Grafana UI components
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
