const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.91389&lon=10.75449&altitude=11';
// const url = 'https://goweather.herokuapp.com/weather/oslo';

export async function getWeather() {
    // hämtar data från extern källa
    const response = await fetch(url);
    // konverter response til json med funksjonen json()
    const result = await response.json(); 
    const mainEl = document.getElementById('app');

    //Hente ut nåvärende time fra to karakterer og kombinerer dem
    const currentDate = new Date();
    const hoursNow = `${currentDate.getHours()}:00`;
    const currentIndex = result.properties.timeseries.filter(serie => {
        return serie.time.includes(hoursNow);
    });

    const currentTemperature = currentIndex[0].data.instant.details.air_temperature;
    

    const temperaturElement = document.querySelector('.p-temperature');
    temperaturElement.textContent = currentTemperature;

    // endrer vær ikon etter API navn 
    const sky_situation = currentIndex[0].data.next_1_hours.summary.symbol_code;
    const weather_cont = document.querySelector('#weather');

    weather_cont.getElementsByClassName.backgroundImage = `url(../assets/icons/weather/${sky_situation}.jpg)`
};

// promise = await
