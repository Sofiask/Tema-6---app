import { getWeather } from './weather.js';
import { showMenu } from './menu.js';
showMenu();
getWeather();

const mapbox_key = 'pk.eyJ1Ijoic29maWFza2EiLCJhIjoiY2wxYnYyZjZuMDFpbDNkczltZ3Ywd2Y0cSJ9.j8Bz11OkdDq2188Buy9dGw';

async function getMap(){
    mapboxgl.accessToken = mapbox_key;

    const bikeStations = await getStations();

    const bikeStatus = await getStatus();


    const getAvailabilityDocks = id => {
        const currentStation = bikeStatus.filter(station => {
            return station.station_id === id
        });
        return currentStation[0].num_docks_available;
    }

    const getAvailableBykes = id => {
        const currentStation = bikeStatus.filter(station => {
            return station.station_id === id
        });
        return currentStation[0].num_bikes_available;
    }


    const featuresBikes = bikeStations.map(station => {

        return {
            type: 'Feature',
            properties: {
                station: station.name,
                address: station.address,
                availableBikes: getAvailableBykes(station.station_id),
                availableDocks: getAvailabilityDocks(station.station_id)
                },
            geometry: {
                type: 'Point',
                coordinates: [station.lon, station.lat]
                }
            }
    });

    const geoStations = {
        type: 'FeatureCollection',
        features: featuresBikes
    }

    const map = new mapboxgl.Map(
        {
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [10.75, 59.91], // starting position [lng, lat]
            zoom: 15, // starting zoom
        }
    );

    geoStations.features.forEach(station => {
        const markerEl = document.createElement('div');
        const weatherEl = document.querySelector('.weather');
        const popupEl = document.querySelector('.popUp');
        markerEl.classList.add('marker');
        markerEl.setAttribute('availability', station.properties.availableBikes);
        markerEl.addEventListener('click', () => {
            // forEach för att nollställa alla markers som blir markerade. Ligger här och i funktionen
            const allMarkers = document.querySelectorAll('.marker');
            allMarkers.forEach((item) => {
                item.classList.remove('markerActive');
            });

            map.flyTo({
                center: [
                    station.geometry.coordinates[0],
                    station.geometry.coordinates[1]
                ],
                essential: true,
                zoom: 16
            });

            popUpMessage(
                station.properties.station,
                station.properties.address,
                station.properties.availableBikes,
                station.properties.availableDocks,
                station.geometry.coordinates[0],
                station.geometry.coordinates[1],
                map
                //new mapboxgl.Popup({ offset: 25 }).setText(
                    //station.properties.station
            );

            popUp(
                station.properties.station,
            );

            // her skal jeg add en class til weather i html, trenger ikke å ha classen 
            weatherEl.classList.add('hiddenWeather');
            markerEl.classList.add('markerActive');
            popupEl.classList.remove('popUpHide');

            });

           //const el = document.createElement('div');
            //el.id = 'marker';

        // Add markers to the map.
        new mapboxgl.Marker(markerEl)
        .setLngLat(station.geometry.coordinates)
        .addTo(map)
        //.setPopup(popup);
    });
 };


 function popUpMessage(station, address, bikes, docks, lat, lon, map) {
     const allMarkers = document.querySelectorAll('.marker');
     const weatherEl = document.querySelector('.weather');
     const markerEl = document.querySelector('.marker')
     const popupEl = document.querySelector('.popUp');
     const bikeContainerEl = document.querySelector('.bikeContainer');
     bikeContainerEl.classList.remove('detailsHidden');
     const closeDetails = document.querySelector('.bikeContainer .top img');
     closeDetails.addEventListener('click', () => {
        allMarkers.forEach((item) => {
            item.classList.remove('markerActive');
        })
        bikeContainerEl.classList.add('detailsHidden');
        weatherEl.classList.remove('hiddenWeather');
        popupEl.classList.add('popUpHide');
        map.flyTo({
            center: [
               lat, lon
            ],
            essential: true,
            zoom: 15
        });
});

     const stationTitle = document.querySelector('.bikeContainer h2');
     stationTitle.textContent = station;
     const stationAddress = document.querySelector('.bikeContainer .address');
     stationAddress.textContent = address;
     const bikesAvilability = document.querySelector('.bikeContainer .avilability .available-bikes p');
     bikesAvilability.textContent = `${bikes} tilgjengelig`;
     const docksAvilability = document.querySelector('.bikeContainer .avilability .available-docks p');
     docksAvilability.textContent = `${docks} parkeringer`;
 };

 function popUp(station) {
    const popupEl = document.querySelector('.popUp p');
    popupEl.textContent = station;
    
 }


/*async function getStations() {
   // const url = 'https://data-legacy.urbansharing.com/legacy-api/stations.json';
    const corsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://data-legacy.urbansharing.com/legacy-api/stations.json')}`
    const response = await fetch(corsUrl);
    const result = await response.json();
    const stations = JSON.parse(result.contents);
    return stations.stations;

}; */

async function getStations() {
    // const url = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
    // we need a proxy because the api is blocked from public access
    const corsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json')}`
    const response = await fetch(corsUrl);
    const result = await response.json();
    const stations = JSON.parse(result.contents);
    return stations.data.stations;
};

async function getStatus() {
    const corsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json')}`
    const response = await fetch(corsUrl);
    const result = await response.json();
    const status = JSON.parse(result.contents);
    return status.data.stations;
}


getMap();


/* // Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat([10.77, 59.92])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: 'black' })
.setLngLat([10.76, 59.91])
.addTo(map); */




