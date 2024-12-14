// script.js
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherDisplay = document.getElementById('weather-display');
const fetchWeatherBtn = document.getElementById('fetch-weather-btn');
const locationInput = document.getElementById('location-input');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weather-condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Get weather data from API
async function fetchWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Location not found');
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Display weather data
function displayWeather(data) {
  weatherDisplay.classList.remove('hidden');
  locationName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Get user's location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => alert('Unable to get location. Please enter manually.')
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Error fetching location data');
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Event listener for fetching weather
fetchWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    getUserLocation();
  }
});
