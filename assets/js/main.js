const header = document.querySelector(".site-header");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalImage = document.querySelector(".modal__image");
const closeButton = document.querySelector(".modal__close");
const posterButtons = document.querySelectorAll(".poster-card");

const toggleHeader = () => {
  if (!header) {
    return;
  }
  if (window.scrollY > 80) {
    header.classList.add("header--compact");
  } else {
    header.classList.remove("header--compact");
  }
};

toggleHeader();
window.addEventListener("scroll", toggleHeader);

const openModal = (title) => {
  if (!modal) {
    return;
  }
  modalTitle.textContent = title;
  modalImage.textContent = title;
  modal.classList.add("is-open");
  document.body.classList.add("no-scroll");
};

const closeModal = () => {
  if (!modal) {
    return;
  }
  modal.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
};

posterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.dataset.title || "პოსტერი";
    openModal(title);
  });
});

if (closeButton) {
  closeButton.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
