const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);

  document.getElementById('utah-born').addEventListener('click', () => filterProphets(data.prophets, 'utah'));
  document.getElementById('non-us-born').addEventListener('click', () => filterProphets(data.prophets, 'non-us'));
  document.getElementById('long-lived').addEventListener('click', () => filterProphets(data.prophets, 'long-lived'));
  document.getElementById('many-children').addEventListener('click', () => filterProphets(data.prophets, 'many-children'));
  document.getElementById('long-service').addEventListener('click', () => filterProphets(data.prophets, 'long-service'));
  document.getElementById('show-all').addEventListener('click', () => displayProphets(data.prophets));
}

const displayProphets = (prophets) => {
  cards.innerHTML = ''; 
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${prophet.order}th Latter-day President`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

const filterProphets = (prophets, filterType) => {
  let filteredProphets = prophets.filter((prophet) => {
    switch (filterType) {
      case 'utah':
        return prophet.birthplace.includes('Utah');
      case 'non-us':
        return !prophet.birthplace.includes('United States');
      case 'long-lived':
        return prophet.length >= 95;
      case 'many-children':
        return prophet.children >= 10;
      case 'long-service':
        return prophet.years >= 15;
      default:
        return true;
    }
  });
  displayProphets(filteredProphets);
}

getProphetData();