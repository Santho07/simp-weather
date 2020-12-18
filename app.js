const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

//let  lat = 23.7104, lon = 90.4074; //Dhaka, BD

let address = process.argv[2]
if (!address) {
  return console.log('Please provide an address')
}
geocode(address, function geoCodeCallback(error, { latitude, longitude, location }) {
  if (error) {
    return console.log(error)
  }
  console.log({
    latitude,
    longitude,
    location,
  })

  weather(latitude, longitude, function weatherCallback(error, { body: weatherData }) {
    if (error) {
      return console.log(error)
    }

    let date = new Date(weatherData.current.dt * 1000)
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    console.log(
      date.toLocaleDateString('en-US', options),
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    )

    console.log(`It's currently ${weatherData.current.temp} in ${location}`)
  })
})
