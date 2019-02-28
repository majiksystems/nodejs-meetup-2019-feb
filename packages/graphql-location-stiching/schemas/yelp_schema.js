
const {
  introspectSchema,
  makeRemoteExecutableSchema,
} = require('graphql-tools');
const { createHttpLink } = require('apollo-link-http');
const { setContext } = require('apollo-link-context');
const fetch = require('node-fetch');

const yelpAuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.YELP_ACCESS_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const createYelpJsServiceSchema = async () => {
  const serviceLink = createHttpLink({
    uri: `https://api.yelp.com/v3/graphql`,
    fetch
  });

  const authenticatedYelpLink = yelpAuthLink.concat(serviceLink);

  const schema = await introspectSchema(authenticatedYelpLink);
  return makeRemoteExecutableSchema({
    schema,
    link: authenticatedYelpLink
  });
}

module.exports = createYelpJsServiceSchema;