import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import { resolver } from 'graphql-sequelize';
import models from './models';
const {ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    signup(login: String!, password: String!): AuthPayload
    login(login: String!, password: String!): AuthPayload
  }

 type User {
    id: ID!
    login: String
  }

  type AuthPayload {
    token: String!
    user: User
  }

`;

const resolvers = {
    Query: {
        user: resolver(models.User),
        users: resolver(models.User)
    },
};

resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    debug: true,
    tracing: true,
  // context(req) {
  //   // For each request, create a DataLoader context for Sequelize to use
  //   const dataloaderContext = createContext(models.sequelize);

  //   // Using the same EXPECTED_OPTIONS_KEY, store the DataLoader context
  //   // in the global request context
  //   return {
  //     [EXPECTED_OPTIONS_KEY]: dataloaderContext,
  //   };
  // },
});

export default server;
