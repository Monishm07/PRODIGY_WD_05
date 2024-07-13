/document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '60ded78cf0c93941d11b77594859e385';
    // Replace with your OpenWeatherMap API key

    const showLoading = () => {
        document.getElementById('loading').style.display = 'block';
    };

    const hideLoading = () => {
        document.getElementById('loading').style.display = 'none';
    };

    const clearWeatherInfo = () => {
        document.getElementById('cityName').textContent = '';
        document.getElementById('temperature').textContent = '';
        document.getElementById('description').textContent = '';
        document.getElementById('humidity').textContent = '';
        document.getElementById('windSpeed').textContent = '';
    };

    const updateWeatherInfo = (cityName, temp, desc, humidity, windSpeed) => {
        document.getElementById('cityName').textContent = cityName;
        document.getElementById('temperature').textContent = temp;
        document.getElementById('description').textContent = desc;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('windSpeed').textContent = windSpeed;
        document.getElementById('errorMessage').textContent = '';
    };

    const fetchWeather = (location) => {
        showLoading();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    const cityName = data.name;
                    const temperature = `Temperature: ${data.main.temp} °C`;
                    const description = `Weather: ${data.weather[0].description}`;
                    const humidity = `Humidity: ${data.main.humidity}%`;
                    const windSpeed = `Wind Speed: ${data.wind.speed} m/s`;

                    updateWeatherInfo(cityName, temperature, description, humidity, windSpeed);
                } else {
                    document.getElementById('errorMessage').textContent = 'Location not found';
                    clearWeatherInfo();
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('errorMessage').textContent = `Error: ${error.message}`;
                clearWeatherInfo();
            })
            .finally(() => {
                hideLoading();
            });
    };

    const getWeatherByLocation = (lat, lon) => {
        showLoading();
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    const cityName = data.name;
                    const temperature = `Temperature: ${data.main.temp} °C`;
                    const description = `Weather: ${data.weather[0].description}`;
                    const humidity = `Humidity: ${data.main.humidity}%`;
                    const windSpeed = `Wind Speed: ${data.wind.speed} m/s`;

                    updateWeatherInfo(cityName, temperature, description, humidity, windSpeed);
                } else {
                    document.getElementById('errorMessage').textContent = 'Error fetching weather data';
                    clearWeatherInfo();
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('errorMessage').textContent = `Error: ${error.message}`;
                clearWeatherInfo();
            })
            .finally(() => {
                hideLoading();
            });
    };

    document.getElementById('weatherForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const location = document.getElementById('location').value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a location');
        }
    });

    document.getElementById('getLocation').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByLocation(lat, lon);
            }, () => {
                alert('Unable to retrieve your location');
            });
        } else {
            alert('Geolocation is not supported by this browser');
        }
    });
});
