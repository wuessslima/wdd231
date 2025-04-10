import { fetchData } from './main.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [books, movies] = await Promise.all([
      fetchData('data/books.json'),
      fetchData('data/movies.json')
    ]);

    const catalog = [...books, ...movies];
    localStorage.setItem('catalog', JSON.stringify(catalog));
    
    renderCatalog(catalog);
    setupFilters(catalog);
  } catch (error) {
    console.error('Failed to load catalog:', error);
    document.getElementById('catalog').innerHTML = 
      '<p class="error">Unable to load catalog. Please try again later.</p>';
  }
});

function renderCatalog(items) {
  const container = document.getElementById('catalog');
  container.innerHTML = items.map(item => `
    <article class="card" data-type="${item.type}">
      <img src="images/${item.image}" 
           alt="${item.title}" 
           loading="lazy"
           onerror="this.src='images/placeholder.webp'">
      <h3>${item.title}</h3>
      <p>${item.year} • ${item.genre}</p>
      <button class="details-btn" 
              data-id="${item.id}" 
              aria-label="View details for ${item.title}">
        Details
      </button>
    </article>
  `).join('');

  // Add event listeners to detail buttons
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', showItemDetails);
  });
}

function showItemDetails(e) {
  const modal = document.getElementById('details-modal');
  const catalog = JSON.parse(localStorage.getItem('catalog'));
  const item = catalog.find(i => i.id === e.target.dataset.id);

  document.getElementById('modal-content').innerHTML = `
    <h2>${item.title}</h2>
    <p><strong>Type:</strong> ${item.type === 'book' ? 'Book' : 'Movie'}</p>
    <p><strong>Author/Director:</strong> ${item.creator}</p>
    <p>${item.description}</p>
    ${item.rating ? `<p><strong>Rating:</strong> ${item.rating}/5</p>` : ''}
  `;

  modal.showModal();
}