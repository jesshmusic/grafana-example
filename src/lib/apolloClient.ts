"use client";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const DEBUG_API = false;

const isBrowser = typeof window !== "undefined";

const API_ENDPOINT =
  isBrowser && window.location.hostname.includes("localhost") && DEBUG_API
    ? "http://localhost:8081/graphql"
    : "https://grafana-example-api.existentialmusic.com/graphql";

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
