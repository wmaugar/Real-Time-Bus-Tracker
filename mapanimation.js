// This function printa a map on the screen
mapboxgl.accessToken = 'pk.eyJ1Ijoid21nYXJjaWFwIiwiYSI6ImNsNmp4dW5tNzE5ZXIzYm56Z2h5cjd0cGUifQ.M0KA92E62nUw3yFeySTn9g';
var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.092761, 42.357575],
        zoom: 13
    })

// This function adds a first marker to map

var marker = new mapboxgl.Marker()
   .setLngLat([-71.092761, 42.357575])
   .addTo(map);

var busStops = [];

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

var buses;
var busesInfo = [];

async function getBusesInfo(){
buses = await getBusLocations();

    for(let i=0; i< buses.length; i++){
      let busInfo = {};      
      busInfo.busNumber = buses[i].attributes.label;
      busInfo.Status = buses[i].attributes.current_status;
      busesInfo.push(busInfo);
    }
    console.log(buses);
    console.log(busesInfo);


}

getBusesInfo();


// This is the move function, its called every 1 second.

var counter = 0;


async function run(){
    // get bus data    
	const locations = await getBusLocations();
	// Its a good practice when you are trying to track, show how frequently something is being used
  console.log(new Date());
	console.log(locations);
	let newLocation = [];

    newLocation.push(locations[0].attributes.longitude);
    newLocation.push(locations[0].attributes.latitude);  
    console.log(newLocation);
    marker.setLngLat(newLocation); 

  
	setTimeout(run, 15000);
}
