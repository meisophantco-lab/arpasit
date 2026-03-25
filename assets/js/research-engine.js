// 1. Correct API Configuration
const NASA_SEARCH_URL = 'https://nasa.gov';

// 2. Main Research Function
async function performResearch() {
    const query = document.getElementById('searchInput').value;
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (!query) {
        resultsGrid.innerHTML = "<p class='status-msg'>Please enter a research topic.</p>";
        return;
    }

    resultsGrid.innerHTML = `<p class='status-msg'>Retrieving ${query} Research Data...</p>`;

    try {
        // Fetching from the actual NASA Image and Video Library API
        const response = await fetch(`${NASA_SEARCH_URL}?q=${query}&media_type=image`);
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        const items = data.collection.items;

        displayResearchItems(items);
    } catch (error) {
        console.error("Research failed:", error);
        resultsGrid.innerHTML = "<p class='status-msg'>Error: Could not connect to the science database.</p>";
    }
}

// 3. Function to display the results on the page
function displayResearchItems(items) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = ""; // Clear status message

    if (!items || items.length === 0) {
        resultsGrid.innerHTML = "<p class='status-msg'>No research data found for this query.</p>";
        return;
    }

    // Show top 12 results
    items.slice(0, 12).forEach(item => {
        // Correctly accessing the first item in data and links arrays
        const scienceData = item.data[0];
        const imageUrl = item.links[0].href;

        const card = document.createElement('div');
        card.className = 'research-card';
        card.innerHTML = `
            <div class="card-inner">
                <img src="${imageUrl}" alt="${scienceData.title}" loading="lazy">
                <div class="card-content">
                    <h3>${scienceData.title}</h3>
                    <p>${scienceData.description ? scienceData.description.substring(0, 150) + '...' : 'No description available.'}</p>
                    <div class="card-meta">
                        <span>Center: ${scienceData.center || 'NASA'}</span>
                        <span>ID: ${scienceData.nasa_id}</span>
                    </div>
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

// 4. Category Button Logic
function quickSearch(category) {
    document.getElementById('searchInput').value = category;
    performResearch(); 
}

// 5. Event Listeners
document.getElementById('searchBtn').addEventListener('click', performResearch);

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performResearch();
});
