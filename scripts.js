const api = '2569a0988f2d22b6178beaff0f31b911'; //the api key

const iconImg = document.getElementById('removed'); //not used
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c'); //not used, can be switched out with the farenheit. coming soon: automatic based on location.
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
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

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(0)}° C`;
          tempF.textContent = `${fahrenheit.toFixed(0)}° F`;
          // sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
          // sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()}`;

          // Code for the background
          var backgroundOption = desc.textContent.toLowerCase(); // Convert to lowercase for consistency
          console.log(backgroundOption);

          var backgroundOptions = {
            "clear sky": "url('clear.jpg')",
            "smoke": "url('smoke.jpg')",
            "light rain": "url('light-rain.jpg')",
            "heavy rain": "url('heavy-rain.jpg')",
            "rain": "url('rain.jpg')",
            "few clouds": "url('few-clouds.jpg')",
            "clouds": "url('some-clouds.jpg')",
            "many clouds": "url('many-clouds.jpg')",
          };

          document.body.style.background = backgroundOptions[backgroundOption] || "black"; // Default to black if the option is not found
          document.body.style.background = backgroundOptions[backgroundOption] || "black";
          document.body.style.backgroundSize = "cover"; // Adjust to your preference
          document.body.style.backgroundPosition = "center center"; // Adjust to your preference
        });
    });
  }
});
