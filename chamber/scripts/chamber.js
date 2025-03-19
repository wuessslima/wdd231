const spotlightCards = document.getElementById('spotlight-cards');

async function getMemberData() {
  const url = 'data/members.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySpotlights(data.members);
  } catch (error) {
    console.error('Erro ao carregar os dados dos membros:', error);
  }
}

function displaySpotlights(members) {
  const goldSilverMembers = members.filter(member => member.membershipLevel >= 2);
  const randomMembers = getRandomMembers(goldSilverMembers, 3);

  spotlightCards.innerHTML = '';
  randomMembers.forEach((member) => {
    const card = document.createElement('div');
    card.className = 'spotlight-card';

    card.innerHTML = `
      <img src="images/${member.image || 'default-business.jpg'}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
    `;

    spotlightCards.appendChild(card);
  });
}

function getRandomMembers(members, count) {
  const shuffled = members.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getMembershipLevel(level) {
  switch (level) {
    case 2:
      return 'Silver';
    case 3:
      return 'Gold';
    default:
      return 'Member';
  }
}

getMemberData();