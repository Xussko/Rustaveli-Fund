const header = document.querySelector(".site-header");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalImage = document.querySelector(".modal__image");
const closeButton = document.querySelector(".modal__close");

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
  if (modalTitle) {
    modalTitle.textContent = title;
  }
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

// Poster zoom disabled.

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

const sliders = document.querySelectorAll(".presentation-slider");

sliders.forEach((slider) => {
  const track = slider.querySelector(".presentation-slider__track");
  const counter = slider.querySelector(".presentation-slider__counter");
  const dotsContainer = slider.querySelector(".presentation-slider__dots");
  const prevButton = slider.querySelector('[data-action="prev"]');
  const nextButton = slider.querySelector('[data-action="next"]');
  const folder = slider.dataset.folder;
  const extension = slider.dataset.extension || "jpg";
  const slideCount = Number.parseInt(slider.dataset.count || "0", 10);

  if (!track || !counter || !dotsContainer || !slideCount || !folder) {
    return;
  }

  let currentIndex = 0;

  const slides = Array.from({ length: slideCount }, (_, index) => {
    const slide = document.createElement("div");
    slide.className = "presentation-slider__slide";

    const image = document.createElement("img");
    const slideNumber = index + 1;
    image.src = `${folder}/${slideNumber}.${extension}`;
    image.alt = `სლაიდი ${slideNumber}`;
    image.loading = slideNumber === 1 ? "eager" : "lazy";

    slide.appendChild(image);
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "presentation-slider__dot";
    dot.setAttribute("aria-label", `გადასვლა სლაიდზე ${slideNumber}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
    dotsContainer.appendChild(dot);

    return slide;
  });

  const dots = Array.from(dotsContainer.querySelectorAll(".presentation-slider__dot"));

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    counter.textContent = `${currentIndex + 1} / ${slideCount}`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index === currentIndex ? "false" : "true");
    });
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    });
  }

  updateSlider();
});
