
const {
  introspectSchema,
  makeRemoteExecutableSchema,
} = require('graphql-tools');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const createPlaceSearchServiceSchema = async () => {
  //HACKFIX: Sleep to wait for the places search server to finish being setup
  await new Promise(r => setTimeout(r, 100));
  const serviceLink = createHttpLink({
    uri: `http://127.0.0.1:4000/graphql`,
    fetch
  });

  const schema = await introspectSchema(serviceLink);
  return makeRemoteExecutableSchema({
    schema,
    link: serviceLink
  });
}

module.exports = createPlaceSearchServiceSchema;