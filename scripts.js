const api = '2569a0988f2d22b6178beaff0f31b911'; //the API key
const unsplashAccessKey = 'zG_X5dFIDe5NGOQy2xVndRnIOwSKOni5uyx71QU_wAY'; // Replace with your Unsplash API access key

const iconImg = document.getElementById('removed'); //not used
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c'); //not used, can be switched out with the Fahrenheit
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const cityInput = document.querySelector('#city-input'); // Input element for city

const setBackgroundByCity = (desc) => {
  // Make a request to Unsplash API to get a random image related to the city
  fetch(`https://api.unsplash.com/photos/random?query=${desc}&orientation=landscape&client_id=zG_X5dFIDe5NGOQy2xVndRnIOwSKOni5uyx71QU_wAY`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const backgroundImageUrl = data.urls.regular;
      console.log(backgroundImageUrl)

      // Set the background image of the body
      document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center center';
    })
    .catch((error) => {
      console.error('Error fetching background image:', error);
    });
};

const updateWeatherData = (lat, long) => {
  const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

  // Using fetch to get weather data
  fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp, feels_like } = data.main;
      const place = data.name;
      const { description, icon } = data.weather[0];
      const { sunrise, sunset } = data.sys;

      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const fahrenheit = (temp * 9) / 5 + 32;

      // Converting Epoch(Unix) time to GMT
      const sunriseGMT = new Date(sunrise * 1000);
      const sunsetGMT = new Date(sunset * 1000);

      // Interacting with DOM to show weather data
      iconImg.src = iconUrl;
      loc.textContent = `${place}`;
      desc.textContent = `${description}`;
      tempC.textContent = `${temp.toFixed(0)}° C`;
      tempF.textContent = `${fahrenheit.toFixed(0)}° F`;
      // sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
      // sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()}`;

      // Update background based on the city
      setBackgroundByCity(place.toLowerCase());
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
};

window.addEventListener('load', () => {
  let long;
  let lat;
  
  // Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // Update weather data based on geolocation
      updateWeatherData(lat, long);
    });
  }
});

// // Listen for changes in the city input and update the background accordingly
// cityInput.addEventListener('input', (event) => {
//   const city = event.target.value;
//   setBackgroundByCity(city.toLowerCase());
// });
