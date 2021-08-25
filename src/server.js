const { GraphQLServer } = require('graphql-yoga'),
  path = require('path'),
  dotenv = require('dotenv');

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const options = {
  port: process.env.PORT,
  endpoint: '/graphql'
};

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'graphql/schema.graphql'),
  resolvers: require('./graphql/resolvers'),
  context: ({ request }) => {
    return request;
  }
});

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  ),
);