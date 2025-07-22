import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const DEBUG_API = false;
const API_ENDPOINT =
  window.location.hostname.includes("localhost") && DEBUG_API
    ? "http://localhost:4000/"
    : "http://grafana-example-api-env.eba-ds8urzz2.us-east-1.elasticbeanstalk.com";

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
