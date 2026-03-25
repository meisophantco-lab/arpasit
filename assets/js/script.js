const NASA_API_KEY = 'DEMO_KEY'; // Get your own at api.nasa.gov

// 1. Load Daily Discovery (APOD)
async function loadDailyHero() {
    try {
        const response = await fetch(`https://nasa.gov{NASA_API_KEY}`);
        const data = await response.json();
        
        document.getElementById('dailyHero').style.backgroundImage = `url('${data.url}')`;
        document.getElementById('apodTitle').innerText = data.title;
        document.getElementById('apodDate').innerText = `NASA Daily Discovery: ${data.date}`;
    } catch (error) {
        console.log("Hero load failed", error);
    }
}

// 2. Main Research Search
async function performResearch() {
    const query = document.getElementById('searchInput').value;
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (!query) return;
    resultsGrid.innerHTML = "<p class='loading'>Accessing NASA Archives...</p>";

    try {
        const response = await fetch(`https://nasa.gov{query}&media_type=image`);
        const data = await response.json();
        displayResults(data.collection.items);
    } catch (error) {
        resultsGrid.innerHTML = "<p>Database connection failed.</p>";
    }
}

function displayResults(items) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = "";

    items.slice(0, 9).forEach(item => {
        const details = item.data[0];
        const thumb = item.links[0].href;

        const card = document.createElement('div');
        card.className = 'research-card';
        card.innerHTML = `
            <img src="${thumb}" alt="Science Data">
            <div class="card-info">
                <h3>${details.title}</h3>
                <p>${details.description.substring(0, 120)}...</p>
                <small>Location: ${details.center || 'NASA'}</small>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

// Listeners
document.getElementById('searchBtn').addEventListener('click', performResearch);
document.addEventListener('DOMContentLoaded', loadDailyHero);
