// mapbox public access token
mapboxgl.accessToken = 'pk.eyJ1IjoiMTA3MDY3IiwiYSI6ImNsb21xNTJuaTJybzgya212MXVrZmp5aXIifQ.viY_1kvajG_skTOa-0YuIg';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [mapCentre[0], mapCentre[1]], // starting position [lng, lat]
    zoom: 10, // starting zoom
});

// marker default settings from the docs
const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 25;
const popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};

// the markers object will contain the marker for each restaurant
const markers = {};

// restaurants is a list of indexes where each one holds a restaurant object
for (let index in restaurants) {
    const restaurantDiv = document.getElementById(restaurants[index]["id"])

    const longitude = restaurants[index]["address"]["location"]["coordinates"][0];
    const latitude = restaurants[index]["address"]["location"]["coordinates"][1];


    restaurantDiv.addEventListener('mouseenter', () => {

        map.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            animation: true,
            duration: 1500
        });

        // For the Popup not to close, wait 1500 + 100ms buffer for the map movement to finish
        setTimeout(
            function() {
                markers[restaurants[index]["id"]].togglePopup();
            }, 1600);
    });

    restaurantDiv.addEventListener('mouseleave', () => {
        map.flyTo({
            center: [mapCentre[0], mapCentre[1]],
            zoom: 10,
            animation: true
        })
    });

    // build the stars' string
    let resStars = "";
    for (let i=0; i<= restaurants[index].rating.starRating-1; i++) {
        resStars += '<i class="fa-solid fa-star textc-orange"></i>';
    }
    if (restaurants[index].rating.starRating - Math.trunc(restaurants[index].rating.starRating) >= 0.5) {
        resStars += '<i class="fa fa-star-half-o textc-orange"></i>';
    }

    // add the restaurant marker under the restaurant's id key
    markers[restaurants[index]["id"]] = new mapboxgl.Marker(options={color: "#ff8000"})
        .setLngLat([longitude, latitude])
        .setPopup(
            new mapboxgl.Popup({offset: [0, -20], closeOnMove: true})
                .setHTML(`
                    <div class="card map-card">
                        <h6 class="card-header text-center text-white orange-bg">
                            ${restaurants[index].name}</h5><div class="card-body light-orange-bg">
                            <h5 class="card-title text-center" aria-label="restaurant-rating">
                                ${resStars} <span class="smaller-text">(${restaurants[index].rating.starRating}/5)</span>
                            </h5>
                            <p class="smaller-text">
                                <strong>Cuisines:</strong> ${restaurants[index].cuisines.map((c) => " " + c.name)}
                            </p>
                            <div class="border border-secondary">
                                <p class="smaller-text mb-0">
                                    ${restaurants[index].address.firstLine} <br>
                                    ${restaurants[index].address.city} ${restaurants[index].address.postalCode}
                                </p>
                            </div>
                            <p class="map-coordinates">
                                Coordinates: ${latitude}, ${longitude}
                            </p>
                        </div>
                    </div>`
                )
        )
        .addTo(map)
}

