const contactModal = document.getElementById("contactModal");
const openModalButtons = document.querySelectorAll(".open-contact-modal");
const closeModalButton = document.getElementById("closeModal");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactModal) {
  openModalButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      if (navLinks) navLinks.classList.remove("open");
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

// Active Scroll-Linked Slide Animation
const animatedSections = document.querySelectorAll(".reveal-left, .reveal-right");

if (animatedSections.length > 0) {
  let isTicking = false;

  const updateScrollSlide = () => {
    const viewportHeight = window.innerHeight;

    animatedSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const startPoint = viewportHeight * 0.95; // Starts sliding near bottom of screen
      const endPoint = viewportHeight * 0.45;   // Finishes sliding near center of screen

      const rawProgress = (startPoint - rect.top) / (startPoint - endPoint);
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      const direction = section.classList.contains("reveal-left") ? -1 : 1;
      const offsetX = direction * 80 * (1 - progress);

      section.style.opacity = progress;
      section.style.transform = `translateX(${offsetX}px)`;
    });

    isTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateScrollSlide);
        isTicking = true;
      }
    },
    { passive: true }
  );

  updateScrollSlide();
}


// Mobile Menu & Footer Year
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const yearSpan = document.getElementById("currentYear");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
}
if (yearSpan) yearSpan.textContent = new Date().getFullYear();