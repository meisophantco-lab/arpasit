const NASA_KEY = 'DEMO_KEY'; // Replace with your key from api.nasa.gov later

async function searchNASA(query, type) {
    resultsGrid.innerHTML = `<p>Accessing NASA ${type} Database...</p>`;
    let url = '';

    switch(type) {
        case 'images': // NASA Image and Video Library
            url = `https://nasa.gov{query}&media_type=image`;
            fetchImages(url);
            break;
            
        case 'asteroids': // NeoWs (Near Earth Objects)
            // Fetches asteroids closest to Earth today
            const today = new Date().toISOString().split('T')[0];
            url = `https://nasa.gov{today}&api_key=${NASA_KEY}`;
            fetchAsteroids(url);
            break;

        case 'mars': // Mars Rover Photos
            // Fetches recent photos from the Curiosity Rover
            url = `https://nasa.gov{NASA_KEY}`;
            fetchMars(url);
            break;
    }
}

// Handler for Asteroid Data (NeoWs)
async function fetchAsteroids(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const date = Object.keys(data.near_earth_objects)[0];
        const list = data.near_earth_objects[date];

        resultsGrid.innerHTML = "";
        list.slice(0, 10).forEach(obj => {
            const card = document.createElement('div');
            card.className = 'research-card warning';
            card.innerHTML = `
                <h3>☄️ Asteroid: ${obj.name}</h3>
                <p>Hazardous: ${obj.is_potentially_hazardous_asteroid ? "YES" : "No"}</p>
                <p>Speed: ${Math.round(obj.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h</p>
                <span class="date">Miss Distance: ${Math.round(obj.close_approach_data[0].miss_distance.kilometers)} km</span>
            `;
            resultsGrid.appendChild(card);
        });
    } catch (e) { resultsGrid.innerHTML = "<p>Error tracking asteroids.</p>"; }
}

// Handler for Mars Rover Photos
async function fetchMars(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        resultsGrid.innerHTML = "";
        data.photos.slice(0, 12).forEach(photo => {
            const card = document.createElement('div');
            card.className = 'research-card';
            card.innerHTML = `
                <img src="${photo.img_src}" alt="Mars">
                <h3>Rover: ${photo.rover.name}</h3>
                <p>Camera: ${photo.camera.full_name}</p>
                <span class="date">Earth Date: ${photo.earth_date}</span>
            `;
            resultsGrid.appendChild(card);
        });
    } catch (e) { resultsGrid.innerHTML = "<p>Error retrieving Mars images.</p>"; }
}
