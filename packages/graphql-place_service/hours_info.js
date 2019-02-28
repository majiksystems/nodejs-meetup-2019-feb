const Maps = require('@google/maps');
const busy_hours = require('busy-hours');

async function getHours(search) {
  const googleMapsClient = Maps.createClient({
    key: process.env.GOOGLE_MAPS_TOKEN
  });

  let mapsSearch = await new Promise((resolve, reject) => googleMapsClient.findPlace({
    input: search,
    inputtype: 'textquery',
    fields: ['formatted_address', 'icon', 'photos', 'name', 'place_id'],
  }, cbToPromise(resolve, reject)))

  let placeId = mapsSearch.json.candidates[0].place_id;
  
  const busyHours = await busy_hours(placeId, process.env.GOOGLE_MAPS_TOKEN);
  
  return {
    placeId: placeId,
    ...busyHours
  };
}


module.exports = getHours


const cbToPromise = (resolve, reject) => (err, result) => {
  if (err) reject(err);
  
  resolve(result);
};
