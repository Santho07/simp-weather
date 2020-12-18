//input and output selector
const weatherForm = document.querySelector("#weather-form-1")
const search = document.querySelector("#search-text-1")

//current time and date function
const timeFormat = { hour: "2-digit", minute: "2-digit" }
const dateFormat = { year: "numeric", month: "long", day: "numeric" }
let time = new Date().toLocaleTimeString("en-US", timeFormat)
let date = new Date().toLocaleDateString("en-US", dateFormat)

//Selector
let timeSelector = document.querySelector(".time")
let locationBar = document.querySelector(".location-bar")
let main = document.querySelector(".weather")

timeSelector.innerHTML = `<p>Time: ${time}</p>
                          <p>Date: ${date}</p>`
main.innerHTML = ""

//event listener
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()

  locationBar.innerHTML = `<p>Loading: please wait.......</p>`

  main.innerHTML = ""
  fetch(`/weather?address=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        timeSelector.innerHTML = `<p>Time: ${time}</p>
                         <p>Date: ${date}</p>`
        locationBar.innerHTML = `</p>Location: Location not found!</p>`
        main.innerHTML = `<div class="error">
                                  <p>${data.error}</p>
                                  <p> Please try again! </p> </div>`
      } else {
        let { time, date, location, latitude, longitude } = data
        let { condition, forecast, sunset, sunrise, current, daily } = data
        
        let place = location.split(",")[0]
        let imageUrl = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`

        timeSelector.innerHTML = `<p>Time: ${time}</p>
                         <p>Date: ${date}</p>`
        locationBar.innerHTML = `<p>Location: ${location}</p>
                        <p>Latitude: ${latitude}</p>
                        <p>Longitude: ${longitude}</p>`

        let html = ` <section class="current">
                <section class="current-weather">
                    <div class="current-location">
                        <h2><b id="place">${place}</b></h2>
                        <h2>Weather</h2>
                    </div>

                    <div class="current-icon">
                        <img id="image1" src=${imageUrl}>
                    </div>

                    <div class="current-condition">
                        <div class="temp">${current.temp}\u2103</div>
                        <div class="summary">${condition}</div>
                    </div>
                </section>
                <section class="current-info">
                    <ul class="info-list">
                        <li>Feels Like: ${current.feels_like}\u2103</li>
                        <li>humidity: ${current.humidity}%</li>
                        <li>wind: ${current.wind_speed}m/s</li>
                        <li>cloud cover: ${current.clouds}%</li>
                        <li>visibility: ${current.visibility / 1000}km</li>
                    
                    </ul>
                </section>
            </section>
            <section class="summary">
                <div class="forecast-summary">
                    <h2>Next 24 hours:</h2>
                    <p>&nbsp;${forecast}</p>
                </div>
                <div class="other-info">
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                    <p>Day Max: ${daily[0].temp.max}\u2103</p>
                    <p>Day Min: ${daily[0].temp.min}\u2103</p>
                </div>
            </section>`
        main.innerHTML = html
      }
    })
})
