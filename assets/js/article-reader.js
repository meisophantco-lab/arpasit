/**
 * ARPASIT Article Reader
 * This script runs ONLY on article.html
 */
async function loadArticle() {
    // 1. Get the unique NASA ID from the URL (e.g., article.html?id=PIA12345)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const textContainer = document.getElementById('articleText');

    if (!id) {
        textContainer.innerHTML = "<h2>Error: No Research ID found. Please go back to the search page.</h2>";
        return;
    }

    try {
        // 2. Ask NASA for the data tied to this specific ID
        const response = await fetch(`https://nasa.gov{id}`);
        const data = await response.json();
        
        // 3. Get the first item from the results
        const item = data.collection.items[0].data[0];
        const image = data.collection.items[0].links[0].href;

        // 4. Update the article.html page with the real data
        document.title = `${item.title} | ARPASIT Research`;
        document.getElementById('articleTitle').innerText = item.title;
        document.getElementById('articleImage').src = image;
        document.getElementById('articleText').innerText = item.description;
        document.getElementById('articleMeta').innerText = `Agency Center: ${item.center} | Publication Date: ${new Date(item.date_created).toLocaleDateString()}`;

    } catch (error) {
        console.error("Reader Error:", error);
        textContainer.innerHTML = "<h2>Database connection lost. Could not retrieve the full report.</h2>";
    }
}

// Automatically start the reader when the page opens
window.onload = loadArticle;
