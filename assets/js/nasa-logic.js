// 1. Configuration
const NASA_KEY = 'nACav5ebxmZCgFVz0fg8eLpZ8ZOduDi5SPU4hAIe'; 

/**
 * The "Brain" of ARPASIT
 */
async function fetchNasaData(query, type = 'images') {
    let url = '';
    // Fix: Ensure today's date is formatted correctly for the API
    const today = new Date().toISOString().split('T')[0]; 

    // FIXED URLS: Points to the actual API servers, not the main website
    if (type === 'images') {
        // Image Library uses a different base URL
        url = `https://nasa.gov{query}&media_type=image`;
    } 
    else if (type === 'asteroids') {
        // NeoWs API - Track Near Earth Objects
        url = `https://nasa.gov{today}&end_date=${today}&api_key=${NASA_KEY}`;
    } 
    else if (type === 'mars') {
        // Mars Rover API - Curiosity Photos
        url = `https://nasa.gov{NASA_KEY}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("NASA Connection Failed: " + response.status);
        
        const data = await response.json();

        // Standardize the data for research-engine.js
        if (type === 'images') return data.collection.items;
        if (type === 'mars') return data.photos;
        if (type === 'asteroids') {
            return data.near_earth_objects[today];
        }

    } catch (error) {
        console.error("ARPASIT Logic Error:", error);
        return null;
    }
}
