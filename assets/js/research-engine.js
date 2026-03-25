/**
 * Main function triggered by search or filters
 */
async function performResearch() {
    const query = document.getElementById('searchInput').value;
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (!query) return;
    resultsGrid.innerHTML = `<p class='status-msg'>Retrieving ARPASIT Data for: ${query}...</p>`;

    // Call the function from nasa-logic.js
    const items = await fetchNasaData(query);

    if (!items || items.length === 0) {
        resultsGrid.innerHTML = "<p class='status-msg'>No research found in the archives.</p>";
        return;
    }

    displayResults(items);
}

/**
 * Renders the NASA data into cards
 */
function displayResults(items) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = ""; 

    items.slice(0, 12).forEach(item => {
        // NASA API stores info in arrays: data[0] and links[0]
        const info = item.data[0]; 
        const img = item.links[0].href; 

        const card = document.createElement('div');
        card.className = 'research-card';
        card.innerHTML = `
            <img src="${img}" alt="${info.title}" loading="lazy">
            <div class="card-content">
                <h3>${info.title}</h3>
                <p>${info.description ? info.description.substring(0, 120) + '...' : 'Data description unavailable.'}</p>
                <div class="card-meta">
                    <span>Center: ${info.center || 'NASA'}</span>
                    <span>Date: ${new Date(info.date_created).getFullYear()}</span>
                </div>
            </div>`;
        resultsGrid.appendChild(card);
    });
}

/**
 * Quick search for the category buttons
 */
function quickSearch(category) {
    document.getElementById('searchInput').value = category;
    performResearch();
}

// Global Event Listeners
document.getElementById('searchBtn').addEventListener('click', performResearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performResearch();
});
