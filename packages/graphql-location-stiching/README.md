## GraphQL Stitches Yelp's Graphql api with custom Google Places graphql api

This Project stitches together Yelps Graphql API with the google place api. When searching for a business with this service, you can access the placeStats api to find information about how busy a business currently is.

### How to use

Create an .env file at the root of this folder with the required env variables in this directory and execute `npm start`
* YELP_ACCESS_TOKEN - Login to the yelp developer console and create an app. Grab the App's Yelp API Key. https://www.yelp.com/developers/v3/manage_app
* GOOGLE_MAPS_TOKEN - Create a google maps api token with through the Google Cloud Platform api. https://console.cloud.google.com/google/maps-apis/overview

### More Information
* To explore the Yelp api see https://www.yelp.com/developers/graphiql
* To explore the custom Google Places api see `./packages/place_service`
