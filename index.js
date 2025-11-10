// index.js

const https = require('https');

const city = process.argv[2];

if (!city) {
  console.error('Please provide a city name.');
  process.exit(1);
}

async function getWeather(city) {
  return new Promise((resolve, reject) => {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(new Error('Error parsing weather data'));
        }
      });
    }).on('error', err => reject(err));
  });
}

(async () => {
  try {
    const weatherData = await getWeather(city);
    const current = weatherData.current_condition[0];
    const tempC = current.temp_C;
    const desc = current.weatherDesc[0].value;

    console.log(`Weather in ${city}: ${tempC}°C, ${desc}`);
  } catch (err) {
    console.error('Error fetching weather:', err.message);
  }
})();
node_modules
