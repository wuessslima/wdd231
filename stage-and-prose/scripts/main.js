// Configurações iniciais
document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
  
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('active');
    });
  
    // Atualizar footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Última atualização: ${document.lastModified}`;
  
    // Carregar destaque dinâmico
    loadSpotlight();
  });
  
  async function loadSpotlight() {
    try {
      const response = await fetch('data/spotlight.json');
      if (!response.ok) throw new Error('Falha ao carregar destaque');
      
      const data = await response.json();
      renderSpotlight(data);
    } catch (error) {
      console.error(error);
      document.querySelector('.spotlight-container').innerHTML = `
        <p class="error">Não foi possível carregar o destaque do mês.</p>
      `;
    }
  }
  
  function renderSpotlight(item) {
    const container = document.querySelector('.spotlight-container');
    container.innerHTML = `
      <article class="spotlight-card">
        <img src="images/${item.image}" alt="${item.title}" loading="lazy">
        <div class="spotlight-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" class="btn-primary">Know More</a>
        </div>
      </article>
    `;
  }