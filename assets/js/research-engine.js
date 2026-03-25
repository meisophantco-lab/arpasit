/**
 * Renders the NASA data into cards with links to full articles
 */
function displayResults(items) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = ""; 

    items.slice(0, 12).forEach(item => {
        const info = item.data[0]; 
        const img = item.links[0].href; 
        
        // This NASA ID is used to open the specific article
        const nasaId = info.nasa_id;

        const card = document.createElement('div');
        card.className = 'research-card';
        card.innerHTML = `
            <img src="${img}" alt="${info.title}" loading="lazy">
            <div class="card-content">
                <!-- Clickable Title for Reading -->
                <h3><a href="article.html?id=${nasaId}" style="text-decoration:none; color:inherit;">${info.title}</a></h3>
                <p>${info.description ? info.description.substring(0, 120) + '...' : 'Data description unavailable.'}</p>
                <div class="card-meta">
                    <span>Center: ${info.center || 'NASA'}</span>
                    <span>${new Date(info.date_created).getFullYear()}</span>
                </div>
                <!-- New Read More Button -->
                <a href="article.html?id=${nasaId}" class="submit" style="display:block; margin-top:10px; text-decoration:none; padding:8px; font-size:0.8rem; border-radius:8px;">Read Full Article</a>
            </div>`;
        resultsGrid.appendChild(card);
    });
}
