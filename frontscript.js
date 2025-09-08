/* ====== Slideshow: slide in from right, pause 2s, slide out left, loop ====== */
const slides = Array.from(document.querySelectorAll('.slide'));
const STAY_MS = 2000;   // stay centered time
const TRANS_MS = 800;   // transition duration

let idx = 0;

// Initialize first slide
function initSlides() {
  slides.forEach(s => s.classList.remove('active','exit-left'));
  if (slides.length) slides[0].classList.add('active');
}
initSlides();

// One step of the carousel
function stepSlide() {
  if (!slides.length) return;

  const prev = slides[idx];
  const nextIndex = (idx + 1) % slides.length;
  const next = slides[nextIndex];

  // animate current out to left
  prev.classList.remove('active');
  prev.classList.add('exit-left');

  // bring next from right to center
  next.classList.remove('exit-left');
  next.classList.add('active');

  // after transition, reset prev back to right for future cycles
  setTimeout(() => {
    prev.classList.remove('exit-left');
  }, TRANS_MS + 20);

  idx = nextIndex;
}

// Run the loop: each tick triggers a transition (TRANS_MS) then the new slide rests (STAY_MS)
setInterval(stepSlide, STAY_MS + TRANS_MS);

// Make slideshow figures clickable (use data-link)
slides.forEach(slide => {
  const link = slide.getAttribute('data-link');
  if (link) {
    slide.style.cursor = 'pointer';
    slide.addEventListener('click', () => {
      window.open(link, '_blank'); // keep your original behavior (new tab)
    });
  }
});

/* ====== Horizontal scrollers for rows ====== */
document.querySelectorAll('.movie-row').forEach(row => {
  const container = row.querySelector('.movie-cards');
  const leftBtn = row.querySelector('.scroll-btn.left');
  const rightBtn = row.querySelector('.scroll-btn.right');

  rightBtn.addEventListener('click', () => {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  });
  leftBtn.addEventListener('click', () => {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  });
});

/* ====== Wire movie cards to movie.php?movie_id=... ======
   Works whether you set href yourself or only provide data-movie-id.
*/
document.querySelectorAll('a.card').forEach(card => {
  const id = card.dataset.movieId;
  if (id && !card.getAttribute('href')) {
    card.setAttribute('href', `movie.php?movie_id=${encodeURIComponent(id)}`);
  }
});
