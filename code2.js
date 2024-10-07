async function fetchWeather(url, id) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }

        const data = await response.json();
        console.log(data);
        
        const element = document.getElementById(id);

        // Oppdaterer elementet med værdata
        element.innerHTML = `
            Temperature: ${data.current_weather.temperature} ${data.current_weather_units.temperature}<br>
            Windspeed:   ${data.current_weather.windspeed} ${data.current_weather_units.windspeed}<br>
            Time:        ${data.current_weather.time} (${data.timezone})<br>
            It is currently: ${data.current_weather.is_day ? 'day' : 'night'}<br>
        `;
    } catch (error) {
        console.error("Failed to fetch weather data: ", error);
    }
}

// Funksjon for å oppdatere værdata
async function updateWeatherData() {
    const locations = [
        { url: 'https://api.open-meteo.com/v1/forecast?latitude=60.79618619060542&longitude=10.696580214664925&current_weather=true', id: 'gjøvikData' },
        { url: 'https://api.open-meteo.com/v1/forecast?latitude=46.66639155236215&longitude=2.1985923965054637&current_weather=true', id: 'frankrikeData' },
        { url: 'https://api.open-meteo.com/v1/forecast?latitude=-8.39303180895532&longitude=-56.065453981963394&current_weather=true', id: 'brasilData' },
        { url: 'https://api.open-meteo.com/v1/forecast?latitude=39.46116807567283&longitude=-100.31167807938327&current_weather=true', id: 'usaData' },
        { url: 'https://api.open-meteo.com/v1/forecast?latitude=-21.100885054518432&longitude=45.520293111079916&current_weather=true', id: 'madagaskarData' },
    ];

    for (const location of locations) {
        await fetchWeather(location.url, location.id);
    }
}

// Teller for å vise hvor mange ganger værdataen er oppdatert
let updateCount = 1;

window.onload = function() {
    // Fetcher og oppdaterer værdata
    updateWeatherData();

    // Setter opp en intervall for å oppdatere værdata hvert 10. sekund
    setInterval(() => {
        updateWeatherData();

        document.getElementById("counter").innerText = `Updated ${updateCount} time(s)`;
        console.log(`Updated! Total times updated: ${updateCount++}`);
    }, 10000);
}