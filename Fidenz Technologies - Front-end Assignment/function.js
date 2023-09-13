// Define an array of class names
const colorClasses = [
  'card-color-1',
  'card-color-2',
  'card-color-3',
  'card-color-4',
  'card-color-5',
  'card-color-6',
  'card-color-7',
  'card-color-8'
];

// Shuffle the array to randomize the order of colors
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(colorClasses);



fetch("./cities.json")
  .then(response => {
    return response.json();
  })

  .then(data => {
    const cityList = data.List;

    // Iterate through each city and fetch weather data for it
    cityList.forEach(city => {

      const cityCode = city.CityCode;

      // Check if cached weather data is available
      const cachedWeatherData = getCachedWeatherData(cityCode);

      if (cachedWeatherData) {
        // If cached data exists, use it and create a card
        const cityCard = createCityCard(cachedWeatherData);

        // Add a click event listener to each city card
        cityCard.addEventListener('click', () => {
          // Redirect to the separate page with the city data as a URL parameter
          sessionStorage.setItem('clickedCityData', JSON.stringify(cachedWeatherData));
          window.location.href = 'details.html';
        });

        // Append the city card to the container
        const container = document.getElementById('city-cards');
        container.appendChild(cityCard);
      } 
      else {
        // If no cached data exists, fetch data from the API
        fetchWeatherData(cityCode)
          .then(weatherData => {

            if (weatherData) {
              // Create an HTML card for the city using the weather data
              const cityCard = createCityCard(weatherData);

              // Add a click event listener to each city card
              cityCard.addEventListener('click', () => {
                // Redirect to the separate page with the city data as a URL parameter
                sessionStorage.setItem('clickedCityData', JSON.stringify(weatherData));
                window.location.href = 'details.html';
              });

              // Append the city card to the container
              const container = document.getElementById('city-cards');
              container.appendChild(cityCard);

              // Cache the weather data
              cacheWeatherData(cityCode, weatherData);
            }
          })
          .catch(error => {
            console.error("Error fetching weather data for city: ", error);
          });
      }
    });
  })
  .catch(error => {
    console.error("Error reading JSON file: ", error);
  });


// Function to fetch weather data for a city
async function fetchWeatherData(cityCode) {
  const apiKey = '6b99ec48a42acce23c47f1308144547b'; 
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=${apiKey}`;
  try {

    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } 
    else {
      console.error("Error fetching weather data for city: ", error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather data for city: ", error);
    return null;
  }
}


// Function to create a city card based on weather data
function createCityCard(weatherData) {
  // Create an HTML card element for the city and populate it with weather information
  const card = document.createElement('div');
  card.classList.add('city-card'); 
    // Create HTML content to display the city data
    card.innerHTML = `
    <div id="city-card" class="city-card-content">
    <div class="card-top">
        <div id="top-left">
            <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
            <p>${new Date(weatherData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},
            ${new Date(weatherData.dt * 1000).toLocaleString('default', { month: 'short' })} ${new Date(weatherData.dt * 1000).getDate()}</p>
            <p> <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png"> &nbsp&nbsp<span class="weatherDesc">${weatherData.weather[0].description}</span></p>
        </div>
        <div id="top-mid">
            <h1 id="head1">${weatherData.main.temp}°</h1>
            <h1 id="head2">C</h1>
            <p>Temp Min: ${weatherData.main.temp_min}°C</p>
            <p>Temp Max: ${weatherData.main.temp_max}°C</p>
        </div>
        <div id="top-right">
            <span class="close">&times;</span>
        </div>
    </div>
    <div class="card-bottom">
        <div id="bottom-left">
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Visibility: ${(weatherData.visibility/1000).toFixed(2)} km</p>
        </div>
        <div id="bottom-mid">
            <span class="arrowHead">&#10148;</span>
            <p>${weatherData.wind.speed} m/s ${weatherData.wind.deg} Degrees</p>
        </div>
        <div id="bottom-right">
            <p>Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>           
    </div>
    </div>
    `;
    
    const cardTop = card.querySelector('.card-top');

    // Pop a color class from the shuffled array
    const randomColorClass = colorClasses.pop();
    cardTop.classList.add(randomColorClass); // Add the selected color class 
    sessionStorage.setItem('cardColorClass', JSON.stringify(randomColorClass));
    
    return card;
}



// Function to cache weather data in session storage
function cacheWeatherData(cityCode, weatherData) {
  sessionStorage.setItem(`weatherData_${cityCode}`, JSON.stringify(weatherData));
}



// Function to retrieve cached weather data from session storage
function getCachedWeatherData(cityCode) {
  const cachedData = sessionStorage.getItem(`weatherData_${cityCode}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
}

