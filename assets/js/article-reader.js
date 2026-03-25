async function loadArticle() {
    // 1. Get the NASA ID from the URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('articleContent');

    if (!id) {
        container.innerHTML = "<h2>No research ID found.</h2>";
        return;
    }

    try {
        // 2. Fetch specific item data
        const response = await fetch(`https://nasa.gov{id}`);
        const data = await response.json();
        const item = data.collection.items[0].data[0];
        const image = data.collection.items[0].links[0].href;

        // 3. Update the page with full content
        document.title = `${item.title} | ARPASIT Research`;
        document.getElementById('articleTitle').innerText = item.title;
        document.getElementById('articleImage').src = image;
        document.getElementById('articleText').innerText = item.description;
        document.getElementById('articleMeta').innerText = `Source: ${item.center} | Date: ${new Date(item.date_created).toLocaleDateString()}`;

    } catch (error) {
        container.innerHTML = "<h2>Error loading research paper.</h2>";
    }
}

// Run when the page loads
window.onload = loadArticle;
