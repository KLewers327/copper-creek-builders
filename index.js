const contactModal = document.getElementById("contactModal");
const openModalButtons = document.querySelectorAll(".open-contact-modal");
const closeModalButton = document.getElementById("closeModal");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactModal) {
  openModalButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      contactModal.showModal();
    });
  });

  closeModalButton.addEventListener("click", () => contactModal.close());

  contactModal.addEventListener("click", event => {
    if (event.target === contactModal) contactModal.close();
  });

  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const clientName = document.getElementById("clientName").value;
    formFeedback.textContent = `Thank you, ${clientName}! Your consultation request has been received.`;
    contactForm.reset();

    setTimeout(() => {
      formFeedback.textContent = "";
      contactModal.close();
    }, 2200);
  });
}

// Mobile Menu & Footer Year
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const yearSpan = document.getElementById("currentYear");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
}
if (yearSpan) yearSpan.textContent = new Date().getFullYear();