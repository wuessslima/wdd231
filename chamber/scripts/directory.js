const url = 'data/members.json';

const memberCards = document.getElementById('member-cards');

async function getMemberData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error to load the data of the members:', error);
  }
}

function displayMembers(members) {
  memberCards.innerHTML = '';
  members.forEach((member) => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
    `;

    memberCards.appendChild(card);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return 'Non-Profit';
    case 2:
      return 'Silver';
    case 3:
      return 'Gold';
    default:
      return 'Member';
  }
}

function toggleView(view) {
    const memberCards = document.getElementById('member-cards');
    if (view === 'grid') {
      memberCards.classList.remove('list-view');
      memberCards.classList.add('grid-view');
    } else {
      memberCards.classList.remove('grid-view');
      memberCards.classList.add('list-view');
    }
}

document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));
document.getElementById('list-view').addEventListener('click', () => toggleView('list'));

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

getMemberData();