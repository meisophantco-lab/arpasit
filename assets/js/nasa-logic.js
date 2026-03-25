const NASA_API_BASE = 'https://images-api.nasa.gov/search';

/**
 * Fetches research data from NASA's Image and Video Library
 */
async function fetchNasaData(query) {
    try {
        const response = await fetch(`${NASA_API_BASE}?q=${query}&media_type=image`);
        if (!response.ok) throw new Error("NASA API connection failed");
        
        const data = await response.json();
        // Return the items array to be processed by research-engine.js
        return data.collection.items; 
    } catch (error) {
        console.error("NASA Logic Error:", error);
        return null;
    }
}
