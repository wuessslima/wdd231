// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
const modalLinks = document.querySelectorAll('.modal-link');
const modals = document.querySelectorAll('dialog');
const closeButtons = document.querySelectorAll('.close-modal');

modalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = link.getAttribute('href');
    const modal = document.querySelector(modalId);
    modal.showModal();
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('dialog');
    modal.close();
  });
});

// Close modal when clicking outside
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });
});

// Update footer
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;