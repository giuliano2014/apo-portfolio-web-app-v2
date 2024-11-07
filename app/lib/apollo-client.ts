// import {
//   ApolloClient,
//   ApolloLink,
//   HttpLink,
//   InMemoryCache,
//   NormalizedCacheObject,
// } from "@apollo/client";

// let client: ApolloClient<NormalizedCacheObject> | undefined;

// export function getClient() {
//   // Ensure environment variables are defined
//   const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
//   const graphqlApiKey = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

//   if (!graphqlEndpoint || !graphqlApiKey) {
//     throw new Error("Missing environment variables for Apollo Client");
//   }

//   if (!client) {
//     const httpLink = new HttpLink({
//       uri: graphqlEndpoint,
//     });

//     const authLink = new ApolloLink((operation, forward) => {
//       operation.setContext({
//         headers: {
//           Authorization: `Bearer ${graphqlApiKey}`,
//         },
//       });
//       return forward(operation);
//     });

//     client = new ApolloClient({
//       link: authLink.concat(httpLink),
//       cache: new InMemoryCache(),
//       ssrMode: typeof window === 'undefined',
//     });
//   }

//   return client;
// }

// import {
//   ApolloClient,
//   ApolloLink,
//   HttpLink,
//   InMemoryCache,
//   NormalizedCacheObject,
// } from "@apollo/client";

// let client: ApolloClient<NormalizedCacheObject> | undefined;

// export function getClient() {
//   // Assurez-vous que les variables d'environnement sont définies
//   const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
//   const graphqlApiKey = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY;

//   if (!graphqlEndpoint || !graphqlApiKey) {
//     throw new Error("Missing environment variables for Apollo Client");
//   }

//   const httpLink = new HttpLink({
//     uri: graphqlEndpoint,
//   });

//   const authLink = new ApolloLink((operation, forward) => {
//     operation.setContext({
//       headers: {
//         Authorization: `Bearer ${graphqlApiKey}`,
//       },
//     });
//     return forward(operation);
//   });

//   if (!client) {
//     client = new ApolloClient({
//       link: authLink.concat(httpLink),
//       cache: new InMemoryCache(),
//     });
//   }

//   return client;
// }

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});

export const getClient = () => {
  return client;
}