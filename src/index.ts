import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const port = 3000;

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
});

