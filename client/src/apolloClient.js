import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";

const client = new ApolloClient({
    link: new HttpLink(),
    cache: new InMemoryCache({
        dataIdFromObject: o => o.id
    }),
    connectToDevTools: process.env.NODE_ENV !== "production"
});

export default client;
