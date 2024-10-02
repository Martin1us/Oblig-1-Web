const weatherLocations = [
    { name: 'Tokyo, Japan', latitude: 35.6895, longitude: 139.6917 },
    { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London, UK', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093 },
    { name: 'Paris, France', latitude: 48.8566, longitude: 2.3522 },
    { name: 'Mumbai, India', latitude: 19.0760, longitude: 72.8777 }
];

const apiEndpoint = 'https://api.open-meteo.com/v1/forecast';

function fetchWeatherData() {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = ''; // Clear old data

    weatherLocations.forEach(location => {
        const url = `${apiEndpoint}?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                const weather = data.current_weather;
                const weatherCard = createWeatherCard(location.name, weather);
                weatherContainer.appendChild(weatherCard);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}

function createWeatherCard(locationName, weather) {
    const card = document.createElement('div');
    card.classList.add('weather-card');

    const location = document.createElement('h2');
    location.textContent = locationName;

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${weather.temperature}°C`;

    const windspeed = document.createElement('p');
    windspeed.textContent = `Wind Speed: ${weather.windspeed} km/h`;

    const time = document.createElement('p');
    time.textContent = `Time: ${new Date(weather.time).toLocaleTimeString()}`;

    card.appendChild(location);
    card.appendChild(temperature);
    card.appendChild(windspeed);
    card.appendChild(time);

    return card;
}

// Fetch weather data on page load
fetchWeatherData();

// Refresh weather data every 10 minutes
setInterval(fetchWeatherData, 600000); 
