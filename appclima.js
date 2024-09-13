let weatherData = null; // Variable global para almacenar los datos de la API

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '9a5a4e37cemsh6f570f6ba998f0cp1c72abjsn2cb15098a9db',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    }
};

function fetchWeatherData(city) {
    fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${encodeURIComponent(city)}&format=json&u=f`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            weatherData = data;
            document.getElementById('ciudad').innerText = data.location.city;
            document.getElementById('temperatura').innerText = `${Celsius(data.current_observation.condition.temperature).toFixed(1)} °C`;
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

function refrescar() {
    window.location.reload();
}

function buscar() {
    const input = document.getElementById('ciudad-input').value.trim();
    if (input) {
        fetchWeatherData(input);
    } else {
        alert('Por favor, ingresa una ciudad.');
    }
}

function Celsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

fetchWeatherData('Teziutlan');