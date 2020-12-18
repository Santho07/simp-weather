const request = require('request')

const weather = function weatherHandler(lat, lon, callback) {
  const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily&appid=a914e84824e3adbafcdfc73e8b8889e4`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.cod) {
      callback(response.body.message, undefined)
    } else {
      callback(undefined, response)
    }
  })
}
module.exports = weather
