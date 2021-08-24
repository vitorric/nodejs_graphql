const { GraphQLServer } = require('graphql-yoga'),
  path = require('path'),
  resolvers = require('./graphql/resolvers'),
  dotenv = require('dotenv'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session);

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const options = {
  port: process.env.PORT,
  endpoint: '/graphql'
};

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'graphql/schema.graphql'),
  resolvers,
  context: req => ({
    user: req.request.isAuthenticated() ? req.request.user : null
  })
});

// server.express.use(passport.initialize());
// server.express.use(passport.session());

server.express.use(
  session({
    secret: process.env.JWT_SECRET,
    sameSite: true,
    httpOnly: true,
    store: new FileStore(),
    saveUninitialized: true,
    resave: true
  })
);

server.express.use(server.express.bodyParser.json());

require('./src/routes')(server.express);

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  ),
);