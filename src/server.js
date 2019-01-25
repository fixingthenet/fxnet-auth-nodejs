import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import { resolver } from 'graphql-sequelize';
import models from './models';
const {ApolloServer, gql } = require('apollo-server-express');
import sessionLogin from './api/session_login.js'
import signup from './api/signup.js'
import changePassword from './api/changePassword.js'
import tokenHandler from './lib/tokenHandler'

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    signup(login: String!, password: String!): Success
    sessionLogin(login: String!, password: String!): AuthPayload
    changePassword(
           login: String!,
           currentPassword: String!,
           newPassword: String!,
           newPasswordConfirmation: String!
          ): Success
  }

  type User {
    id: ID!
    login: String
  }

  type Success {
    success: Boolean,
    errors: InputError
  }

  type AuthPayload {
    token: String
    errors: InputError
  }

  type InputError {
    base: String
    fields: [FieldError]
  }
  type FieldError {
    name: String!
    errors: [String!]
  }
`;

const resolvers = {
    Query: {
        user: resolver(models.User),
        users: resolver(models.User)
    },
    Mutation: {
        sessionLogin(_root, {login, password}, _ctx) {
            console.log("sessionLogin:", login)
            return sessionLogin(_root, _ctx, login, password)
        },
        signup(_root, {login, password}, _ctx) {
            console.log("signup:", login)
            return signup(_root, _ctx, login, password)
        },
        changePassword(_root, {login, currentPassword, newPassword, newPasswordConfirmation}, _ctx) {
            return changePassword(_root, _ctx,
                                  login,
                                  currentPassword,
                                  newPassword,
                                  newPasswordConfirmation
                                 )
        },
    }
};

resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY };


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    debug: true,
    tracing: true,
    context: async ({req}) => {
        var userId;
        var user;
        try {
            var token = req.headers['access-token']
            var decoded = tokenHandler.verify(token)
            userId=decoded.user.id
            user = await models.User.findByPk(userId)
        } catch (e) {
            user=models.User.guest
            userId=models.User.guest.id //
        }
        console.log("secCtx", user.id, token)
        return { models: models,
                 secCtx: { user: user }
               }
  //   // For each request, create a DataLoader context for Sequelize to use
  //   const dataloaderContext = createContext(models.sequelize);

  //   // Using the same EXPECTED_OPTIONS_KEY, store the DataLoader context
  //   // in the global request context
  //   return {
  //     [EXPECTED_OPTIONS_KEY]: dataloaderContext,
  //   };
   },
});

export default server;
