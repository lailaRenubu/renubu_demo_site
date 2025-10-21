document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelector(".cards");
    if (!cards) return;
  
    // Clone cards for seamless looping
    const clone = cards.cloneNode(true);
  
    // Create the animated track
    const track = document.createElement("div");
    track.className = "carousel-track";
  
    // Merge both sets of cards (original + clone)
    track.append(...cards.children, ...clone.children);
  
    // Swap into the DOM
    cards.replaceWith(track);
  });
  

//   (() => {
//     const els = document.querySelectorAll('.reveal');
//     if (!('IntersectionObserver' in window) || !els.length) return;

//     const io = new IntersectionObserver((entries, obs) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('is-visible');
//           obs.unobserve(entry.target); // reveal once; remove this line to re-animate on every visit
//         }
//       });
//     }, { root: null, threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

//     els.forEach(el => io.observe(el));
//   })();