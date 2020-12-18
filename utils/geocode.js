const request = require('request')

const geocode = function geoCodeHandler(address, callback) {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?` +
    `access_token=pk.eyJ1Ijoic2FudGhvMDciLCJhIjoiY2thbnl0c3BhMTZ0NTJzcGtzaDB6eWZyMCJ9.D8Q1EiCH8UtZcLpLSWeKdg&limit=1`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      })
    }
  })
}
module.exports = geocode
