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
      document.body.classList.add("modal-open");
    });
  });

  closeModalButton.addEventListener("click", () => contactModal.close());

  contactModal.addEventListener("click", event => {
    if (event.target === contactModal) contactModal.close();
  });

  contactModal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
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

// Gallery Filtering & Lightbox (Runs on gallery.html)
const galleryProjects = [
  {
    title: "Adobe Style Estate",
    category: "custom",
    badge: "Custom Build",
    summary: "3,600 sq ft • Ground-Up Residence",
    details: "Custom single-story adobe sylte home featuring natural stone accents and an open-concept great room.",
    images: [
      "./assets/pendley-house-front.webp",
      "./assets/pendley-house-backyard.jpg",
      "./assets/pendley-house-back.jpg",
      "./assets/pendley-house-front-1.jpg",
      "./assets/gencon-office.jpg",
    ]
  },
  {
    title: "Modern Farmhouse Kitchen",
    category: "remodel",
    badge: "Remodel",
    summary: "Full Interior & Cabinetry Renovation",
    details: "Complete structural wall removal to create a chef's kitchen with custom white oak cabinetry, quartz waterfall island, and brass fixtures.",
    images: ["https://unsplash.com"]
  },
  {
    title: "Modern Ranch Style Estate",
    category: "custom",
    badge: "Custom Build",
    summary: "2,500 sq ft • Ground-Up Residence",
    details: "Custom single-story modern ranch style home with open concept, 3 bedrooms, luxury master bathroom, and full back porch with custom fireplace",
    images: [
      "./assets/pendley-house-2-front.jpg",
      "./assets/pendley-house-2-in-progress-back.jpg",
      "./assets/pendley-house-2-foyer.jpg",
      "./assets/pendley-house-2-kitchen.jpg",
      "./assets/pendley-house-2-attached-garage-interior.jpg",
      "./assets/pendley-garage.jpg",
      "./assets/pendley-detached-garage.jpg",
    ]
  },
  {
    title: "Ridgeview Stone Residence",
    category: "custom",
    badge: "Custom Build",
    summary: "3,850 sq ft • Southwestern Craftsman",
    details: "Bespoke desert-modern residence designed for indoor-outdoor living with multi-slide glass doors and stucco-and-stone masonry.",
    images: ["https://unsplash.com"]
  }
];

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightboxModal = document.getElementById("lightboxModal");
const closeLightboxButton = document.getElementById("closeLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxPreviousButton = document.getElementById("lightboxPrevious");
const lightboxNextButton = document.getElementById("lightboxNext");
const lightboxImageCount = document.getElementById("lightboxImageCount");

if (galleryGrid) {
  let currentProjectImages = [];
  let currentImageIndex = 0;

  const updateLightboxImage = () => {
    lightboxImage.src = currentProjectImages[currentImageIndex];
    lightboxImage.alt = `${document.getElementById("lightboxTitle").textContent} - image ${currentImageIndex + 1}`;
    lightboxImageCount.textContent = `${currentImageIndex + 1} / ${currentProjectImages.length}`;
  };

  const renderGallery = (selectedCategory = "all") => {
    const filteredProjects = selectedCategory === "all"
      ? galleryProjects
      : galleryProjects.filter(project => project.category === selectedCategory);

    galleryGrid.innerHTML = filteredProjects
      .map(
        (project, index) => `
        <article class="featured-card featured-card--clickable" data-index="${index}">
          <div class="featured-card__image">
            <img src="${project.images[0]}" alt="${project.title}" />
            <span class="featured-card__badge">${project.badge}</span>
          </div>
          <div class="featured-card__body">
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
          </div>
        </article>
      `
      )
      .join("");

    galleryGrid.querySelectorAll(".featured-card").forEach((card, index) => {
      card.addEventListener("click", () => {
        const selectedProject = filteredProjects[index];
        currentProjectImages = selectedProject.images;
        currentImageIndex = 0;
        document.getElementById("lightboxCategory").textContent = selectedProject.badge;
        document.getElementById("lightboxTitle").textContent = selectedProject.title;
        document.getElementById("lightboxDetails").textContent = selectedProject.details;
        const hasMultipleImages = currentProjectImages.length > 1;
        lightboxPreviousButton.hidden = !hasMultipleImages;
        lightboxNextButton.hidden = !hasMultipleImages;
        lightboxImageCount.hidden = !hasMultipleImages;
        updateLightboxImage();
        lightboxModal.showModal();
        document.body.classList.add("modal-open");
      });
    });
  };

  lightboxPreviousButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    updateLightboxImage();
  });

  lightboxNextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    updateLightboxImage();
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      button.classList.add("active");
      renderGallery(button.dataset.category);
    });
  });

  if (closeLightboxButton && lightboxModal) {
    closeLightboxButton.addEventListener("click", () => lightboxModal.close());
    lightboxModal.addEventListener("click", event => {
      if (event.target === lightboxModal) lightboxModal.close();
    });
    lightboxModal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
    });
  }

  renderGallery();
}
