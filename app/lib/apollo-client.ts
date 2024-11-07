/*
  Apollo Client docs
  https://www.apollographql.com/docs/react/performance/server-side-rendering
*/

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});

export const getClient = () => {
  return client;
};
