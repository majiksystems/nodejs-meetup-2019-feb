require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const {
  mergeSchemas
} = require('graphql-tools');
const createPlaceSearchServiceSchema = require('./schemas/places_schema');
const createYelpJsServiceSchema = require('./schemas/yelp_schema');

/**
 * Stitches together multiple graphql interfaces into a single unified interface
 */
const createSchema = async () => {
  const placeSearchServiceSchema = await createPlaceSearchServiceSchema();
  const yelpServiceSchema = await createYelpJsServiceSchema();

  const yelpAndPlaceSearchStitch = `
    extend type Business {
      storeStats: Store
    }
  `;

  // Merge the schemas together to create a single unified interface
  return mergeSchemas({
    schemas: [
      yelpServiceSchema,
      placeSearchServiceSchema,
      yelpAndPlaceSearchStitch
    ],
    resolvers: {
      Business: {
        storeStats: {
          fragment: `... on Business {
            name
            location { formatted_address }
          }`,
          resolve(business, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: placeSearchServiceSchema,
              operation: 'query',
              fieldName: 'store',
              args: {
                search: `${business.name} ${business.location.formatted_address.replace('\n', ' ')}`,
              },
              context,
              info,
            });
          },
        },
      },
    },
  });
}

async function start() {
  const schema = await createSchema();

  // start server with the new schema
  const apolloServer = new ApolloServer({
    schema,
    tracing: true
  });

  const server = await apolloServer.listen(4001);
  console.log(`Running stitch server at ${server.url}`);
}

start().catch(err => console.error(err));