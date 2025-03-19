const weatherInfo = document.getElementById('weather-info');

const apiKey = '7a9b5a6ed79073c7cf5103aa7e45c370';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=-3.72&lon=-38.52&units=metric&appid=${apiKey}`;

async function getWeatherData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do clima:', error);
  }
}

function displayWeather(data) {
  const current = data.list[0];
  const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

  weatherInfo.innerHTML = `
    <p>Current Temperature: ${Math.round(current.main.temp)}°C</p>
    <p>Weather: ${current.weather[0].description}</p>
    <h3>3-Day Forecast</h3>
    <ul>
      ${forecast.map(day => `
        <li>${new Date(day.dt * 1000).toLocaleDateString()}: ${Math.round(day.main.temp)}°C</li>
      `).join('')}
    </ul>
  `;
}

getWeatherData();