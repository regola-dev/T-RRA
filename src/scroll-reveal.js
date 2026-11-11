let observer;
let pendingFrame;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealAll = () => {
  observer?.disconnect();
  document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('is-visible'));
};
motionPreference.addEventListener('change', event => { if (event.matches) revealAll(); });
document.addEventListener('focusin', event => {
  event.target.closest?.('.scroll-reveal')?.classList.add('is-visible');
});
export function initScrollReveals() {
  observer?.disconnect();
  cancelAnimationFrame(pendingFrame);
  pendingFrame = requestAnimationFrame(() => {
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;
    const selectors = [
      'main h1', 'main h2', 'main h3', 'main p', 'main figure',
      'main .drink-card', 'main .product-photo', 'main .chapter-image',
      'main .ritual-editorial > img', 'main .story-grid article',
      'main .article-body > img', 'main details', 'main .button',
      'main .text-link', 'main .cart-row', 'main .contact-links',
      'main .ritual-editorial li', 'footer > div'
    ];
    const candidates = [...document.querySelectorAll(selectors.join(','))];
    const candidateSet = new Set(candidates);
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    for (const el of candidates) {
      let parent = el.parentElement;
      let nested = false;
      while (parent) {
        if (candidateSet.has(parent)) { nested = true; break; }
        parent = parent.parentElement;
      }
      const rect = el.getBoundingClientRect();
      // Keep the first viewport and collapsed content immediately available.
      if (nested || !rect.height || rect.top < window.innerHeight) continue;
      el.classList.add('scroll-reveal');
      observer.observe(el);
    }
  });
}
