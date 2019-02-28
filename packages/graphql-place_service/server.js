
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server');

const getHours = require('./hours_info');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Store {
    placeId: String,
    name: String,
    formatted_address: String,
    status: String,
    week: [DayPopularity],
    now: HourPopularity
  }

  type DayPopularity {
    day: String,
    hours: [HourPopularity]
  }

  type HourPopularity {
    hour: Float,
    percentage: Float
  }

  type Query {
    store(
      search: String!
    ): Store
  }
`;

const resolvers = {
  Query: {
    store(parent, { search }, context, info) {
      return getHours(search);
    },
  },
};


async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true
  });

  const server = await apolloServer.listen(4000)

  console.log(`Running place search service at http://localhost:4000/graphql`)
}

start().catch(err => console.error(err));