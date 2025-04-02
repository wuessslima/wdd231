document.addEventListener('DOMContentLoaded', function() {
    // 1. Load attractions data
    fetch('./data/attractions.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load attractions data');
            return response.json();
        })
        .then(data => {
            const container = document.querySelector('.cards-container');
            if (!container) {
                console.error('Container element not found');
                return;
            }
            
            // Generate attraction cards
            container.innerHTML = data.attractions.map(attraction => `
                <article class="card">
                    <h2>${attraction.name}</h2>
                    <figure>
                        <img src="images/${attraction.image}" 
                             alt="${attraction.name}" 
                             loading="lazy"
                             onerror="this.src='images/placeholder.webp'">
                    </figure>
                    <div class="card-content">
                        <address>${attraction.address}</address>
                        <p>${attraction.description}</p>
                        <button aria-label="Learn more about ${attraction.name}">
                            Learn More
                        </button>
                    </div>
                </article>
            `).join('');
        })
        .catch(error => {
            console.error('Loading error:', error);
            const container = document.querySelector('.cards-container');
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <p>⚠️ Failed to load attractions data</p>
                        <button onclick="window.location.reload()">
                            Try Again
                        </button>
                    </div>
                `;
            }
        });

    // 2. Update footer information
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Updated: ${document.lastModified}`;
});