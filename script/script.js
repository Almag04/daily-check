const apiKey = '5412089add32d20b87f8e02e489d7fdc';

document.getElementById('weatherForm').addEventListener('submit', function(event){
    event.preventDefault();
})

const city = document.getElementById('cityInput').ariaValueMax.trim();

if (city === '') {
    alert('Por favor digite o nome da cidade.');
    return;
}

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('Cidade não encontrada!');
    }
    return response.json();
})
.then(data => {
    const location = data.name + ', ' + data.sys.country;
    const temperature = data.main.temp + '°C';
    const condition = data.weather[0].description;

    const weatherCard = `
    <div class="col-md-4 ml-4">
    <div class="card">
        <div class="card-body">
            <h5 class="card-tittle">${location}</h5>
            <p class="card-text">${temperature}</p>
            <p class="card-text">${condition}</p>
            <p class="card-text">Umidade: ${data.main.humidity}%</p>
        </div>
    </div>
</div>
`;

document.getElementById('weatherCards').innerHtml = weatherCard;
})

.catch(error => {
    alert(error.message);
    console.error('Erro ao buscar dados:', error);
});