// 1. Configuration
const NASA_KEY = 'nACav5ebxmZCgFVz0fg8eLpZ8ZOduDi5SPU4hAIe'; // Replace 'DEMO_KEY' with your actual key later

/**
 * The "Brain" of ARPASIT
 * This connects to the real NASA Data Servers (not just the website)
 */
async function fetchNasaData(query, type = 'images') {
    let url = '';
    const today = new Date().toISOString().split('T')[0]; // Gets today's date YYYY-MM-DD

    // Pick the correct NASA API Server based on the research type
    if (type === 'images') {
        // Search the Image & Video Library (Science Facts & Photos)
        url = `https://nasa.gov{query}&media_type=image`;
    } 
    else if (type === 'asteroids') {
        // Track Near Earth Objects (Asteroid Radar)
        url = `https://nasa.gov{today}&end_date=${today}&api_key=$nACav5ebxmZCgFVz0fg8eLpZ8ZOduDi5SPU4hAIe`;
    } 
    else if (type === 'mars') {
        // Pull Live Mars Rover (Curiosity) Photos
        url = `https://nasa.govnACav5ebxmZCgFVz0fg8eLpZ8ZOduDi5SPU4hAIe`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("NASA Connection Failed");
        
        const data = await response.json();

        // Standardize the data so research-engine.js can read it
        if (type === 'images') return data.collection.items;
        if (type === 'mars') return data.photos;
        if (type === 'asteroids') {
            // Asteroid data is hidden inside the date object
            const asteroidList = data.near_earth_objects[today];
            return asteroidList;
        }

    } catch (error) {
        console.error("ARPASIT Logic Error:", error);
        return null;
    }
}
