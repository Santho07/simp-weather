const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const weather = require("./utils/weather")
require("./utils/polyfills").default
const app = express()
const port = process.env.PORT || 9000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    details: "The app can show current and daily forecast",
    author: "Imam Hossain",
  })
})
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    author: "Imam Hossain",
  })
})
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Section",
    query: "Your Questions Goes Here",
    author: "Imam Hossain",
  })
})
app.get("/weather/?*", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address is not provided" })
  }
  geocode(req.query.address, function geoCodeCallback(error, response) {
    if (error) {
      return res.send({ error })
    }
    //console.log(data)
    let { latitude, longitude, location } = response

    weather(latitude, longitude, function weatherCallback(error, response) {
      if (error) {
        return res.send({ error })
      }

      let { body: weatherData } = response

      let { current, daily, timezone } = weatherData
      
      let myObject = {
        latitude,
        longitude,
        time: new Date().formatTime(timezone),
        date: new Date().formatDate(timezone),
        updateTime: new Date(current.dt * 1000).formatTime(timezone),
        location,
        sunrise: new Date(current.sunrise * 1000).formatTime(timezone),
        sunset: new Date(current.sunset * 1000).formatTime(timezone),
        condition: current.weather[0].description.toTitleCase(),
        forecast: daily[0].weather[0].description.toTitleCase(),
      }
      let result = { ...weatherData, ...myObject }

      res.send(result)
    })
  })
})
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found!",
    author: "Imam Hossain",
  })
})
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found!",
    author: "Imam Hossain",
  })
})

app.listen(port, () => {
  console.log("Server is up on port " + port)
})
