const clickedCityCardData = JSON.parse(sessionStorage.getItem('clickedCityData'));

// Function to populate the HTML elements with city data
function populateCityData(cityData) {

    // Get a reference to the HTML element to display the data
    const cityDetailsElement = document.getElementById('city-details-container');

    // Create HTML content to display the city data
    const cityHTML = `
        <div id="city-card" class="city-card-content">
            <div class="card-top">
                <div id="top-top">
                    <div id="top-top-left">
                        <span class="close" onclick="goToIndexPage()">&#8592;</span>
                    </div>
                    <div id="top-top-right">
                        <h2>${cityData.name}, ${cityData.sys.country}</h2>
                        <p>${new Date(cityData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},
                        ${new Date(cityData.dt * 1000).toLocaleString('default', { month: 'short' })} ${new Date(cityData.dt * 1000).getDate()}</p>
                    </div>
                </div>
                <div id="top-bottom">
                    <div id="top-bottom-left">
                        <img id="weather-image" src="http://openweathermap.org/img/w/${cityData.weather[0].icon}.png"> 
                        <p class="weatherDesc">${cityData.weather[0].description}</p>
                    </div>
                    <div id="top-bottom-right">
                        <h1 id="head1">${cityData.main.temp}°</h1>
                        <h1 id="head2">C</h1>
                        <p>Temp Min: ${cityData.main.temp_min}°C</p>
                        <p>Temp Max: ${cityData.main.temp_max}°C</p>
                    </div>
                </div>
            </div>
            <div class="card-bottom">
                <div id="bottom-left">
                    <p>Pressure: ${cityData.main.pressure} hPa</p>
                    <p>Humidity: ${cityData.main.humidity}%</p>
                    <p>Visibility: ${(cityData.visibility/1000).toFixed(2)} km</p>
                </div>
                <div id="bottom-mid">
                    <span class="arrowHead">&#10148;</span>
                    <p>${cityData.wind.speed} m/s ${cityData.wind.deg} Degrees</p>
                </div>
                <div id="bottom-right">
                    <p>Sunrise: ${new Date(cityData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Sunset: ${new Date(cityData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>           
            </div>
        </div>
    `;

    // Set the innerHTML of the cityDetailsContainer to the cityHTML content
    cityDetailsElement.innerHTML = cityHTML;
}

// Call the function to populate the HTML elements with city data
if (clickedCityCardData) {
    populateCityData(clickedCityCardData);
} else {
    // Handle the case where no city data is available
    console.error("No city data available.");
}


function goToIndexPage() {
    // Use window.location to navigate to the index.html file
    window.location.href = 'index.html'; 
}