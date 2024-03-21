
const apiKey = '200a654187a40007607b414753e399e8';

const geoCall = (city) => `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid=' + apiKey;

const button = document.getElementById('btn')

const weatherIcon = document.getElementById('weather-icon')

button.addEventListener('click', async () => {
    try {
        const userInput = document.getElementById('userInput').value;
        
        
        const geoResponse = await fetch(geoCall(userInput));
        const geoData = await geoResponse.json();

        
        const { lat, lon } = geoData[0];

        
        const response = await fetch(weatherAPI.replace('{lat}', lat).replace('{lon}', lon));
        const data = await response.json();

        console.log(data);
        document.getElementById('city').textContent = data.name;
        document.getElementById('temp').textContent = Math.round(data.main.temp) + `°C`
        document.getElementById('humidity').textContent = data.main.humidity + `%`
        document.getElementById('windSpeed').textContent = data.wind.speed + ` km/h`
        document.getElementById('weather-description').textContent = data.weather.description

        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = 'images/clouds.png'
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'images/clear.png'
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'images/rain.png'
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png'
        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'images/mist.png'
        }

        document.querySelector('.weather').style.display = 'block'

    } catch (error) {
        console.log('There was an error', error);
    }
});


