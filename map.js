const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},


	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 15,
		});

	    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
	
	    const marker = L.marker(this.coordinates)
		marker.addTo(this.map).bindPopup('<p1><b>You are here</b><br></p1>').openPopup()
    },

	// add busines markers
}

async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}
// get foursquare busines
const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'fsq3cpo2f+6DF3C8nqmyBeWdgMga49Hc3ideGTUpD2YEN7A='
	}
  };
  
  fetch('https://api.foursquare.com/v3/places/nearby', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

// process fourquare array

// event handlers


window.onload = async () => {
	const coords = await getCoords()
    console.log(coords)
    myMap.coordinates = coords
    myMap.buildMap() 
}

document.getElementById('find').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
})