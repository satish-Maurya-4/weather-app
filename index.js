const weather_card = document.querySelector('.weather__card')
const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search__btn')
const loc = document.getElementById('location')
const tempValue = document.getElementById('weather__city--tempValue')
const climate = document.getElementById('weather__climate')
const weatherImage = document.getElementById('weather__image')
const weatherCountry = document.getElementById("weather__country");
console.log(weatherCountry);

searchBtn.addEventListener('click', (e) => {
  e.preventDefault()

  getWeather(searchInput.value)
  searchInput.value = ''
})

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f2a93afd68e7a9f5030052ef2360d9e`,
    )

    const weatherData = await response.json()
    console.log(weatherData)
    const { name } = weatherData
    const { feels_like } = weatherData.main
    const { id, main } = weatherData.weather[0]
    const { country } = weatherData.sys

    loc.textContent = name
    climate.textContent = main
    tempValue.textContent = Math.round(feels_like - 273)
    weatherCountry.textContent = country
    console.log(country)


    if (id < 300 && id >= 200) {
        weatherImage.src = './icons/weather_thunderStorm.png'
      } else if (id < 400 && id >=300) {
        weatherImage.src = './icons/cloudy.png'
      } else if (id < 600 && id >= 500) {
        weatherImage.src = './icons/weather_rain.png'
      } else if (id < 700 && id >= 600) {
        weatherImage.src = './icons/weather_snow.png'
      } 
       else if (id < 800 && id >= 700) {
        weatherImage.src = './icons/weather_haze.png'
      } 
      
      else if (id == 800) {
        weatherImage.src = './icons/clear weather.png'
      } else if(id > 800){
          weatherImage.src= './icons/cloudy.png';
      }
  } catch (error) {
    alert('city not found')
  }
}

window.addEventListener('load', () => {
  let long
  let lat

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3f2a93afd68e7a9f5030052ef2360d9e`

      fetch(api)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          const { name } = data
          const { feels_like } = data.main
          const { id, main } = data.weather[0]
          const { country } = data.sys

          loc.textContent = name
          climate.textContent = main
          tempValue.textContent = Math.round(feels_like - 273);
          weatherCountry.textContent = country;
          console.log(country)

          if (id < 300 && id >= 200) {
            weatherImage.src = './icons/weather_thunderStorm.png'
          } else if (id < 400 && id >=300) {
            weatherImage.src = './icons/cloudy.png'
          } else if (id < 600 && id >= 500) {
            weatherImage.src = './icons/weather_rain.png'
          } else if (id < 700 && id >= 600) {
            weatherImage.src = './icons/weather_snow.png'
          } 
           else if (id < 800 && id >= 700) {
            weatherImage.src = './icons/weather_haze.png'
          } 
          
          else if (id == 800) {
            weatherImage.src = './icons/clear weather.png'
          } else if(id > 800){
              weatherImage.src= './icons/cloudy.png';
          }

          console.log(data)
        })
    })
  }
})
