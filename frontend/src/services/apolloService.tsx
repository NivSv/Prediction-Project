import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const BASE_URL = import.meta.env.DEV ?
    'http://localhost:3000'
    : 'http//localhost:3001';

export const client = new ApolloClient({
    uri: `${BASE_URL}/graphql`,
    cache: new InMemoryCache(),
});