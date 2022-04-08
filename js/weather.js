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
    //logger resultatet av all denne jävla koden
    console.log(currentTemperature);

    const temperaturElement = document.querySelector('.p-temperature');
    temperaturElement.textContent = currentTemperature;
};

// promise = await

/*try {
    console.log(response);
    if(response.status >= 200 && response.status < 300) {
        const result = await response.json();
        const mainEl = document.getElementById('app');
    
        const temperatureEl = document.createElement('p');
        temperatureEl.textContent = result.temperature;
        const windEl = document.createElement('p');
       // windEl.textContent = result.wind;
    
        mainEl.append(temperatureEl);
        mainEl.append(windEl); 
    } else if(response.status === 404){
            throw new Error('Url ikke funnet');
        } else if(response.status === 401){
            throw new Error('Ikke authorisert');
    } else {
        throw new Error ('Noe gikk galt');
    }
    
} catch (error) {
    const errorBox = document.querySelector('.error');
    errorBox.textContent = error.message;
    errorBox.classList.toggle('hide-error');
};
*/