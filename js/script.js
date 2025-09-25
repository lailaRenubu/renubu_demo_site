// --------------------------------------------------------------------------- smart slideshow
let currentSlide = 1;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(n) {
    if (n > slides.length) currentSlide = 1;
    if (n < 1) currentSlide = slides.length;

    slides.forEach((slide, i) =>
        slide.classList.toggle('active', i === currentSlide - 1)
    );
    indicators.forEach((dot, i) =>
        dot.classList.toggle('active', i === currentSlide - 1)
    );
}

function changeSlide(n) {
    showSlide((currentSlide += n));
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}


// --------------------------------------------------------------------------- testimonials
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".testimonial-dot");
    const prevBtn = document.querySelector(".testimonial-prev-btn");
    const nextBtn = document.querySelector(".testimonial-next-btn");
    const container = document.querySelector(".testimonial-container");

    let currentSlide = 0;
    let autoPlayInterval;

    // Show a slide by index
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
      });
      currentSlide = index;
    }

    // Change slides
    function changeSlide(direction) {
      let newIndex = currentSlide + direction;
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    }

    // Go directly to slide
    function goToSlide(index) {
      showSlide(index);
    }

    // Autoplay logic
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        changeSlide(1);
      }, 4000); // 6 seconds
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Event listeners
    prevBtn.addEventListener("click", () => changeSlide(-1));
    nextBtn.addEventListener("click", () => changeSlide(1));
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goToSlide(i));
    });

    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);

    // Init
    showSlide(currentSlide);
    startAutoPlay();
  });

//   legal

document.querySelectorAll('.legal-collapsible').forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.classList.toggle('active');
    });
  });