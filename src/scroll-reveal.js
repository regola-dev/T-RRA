let observer;
let pendingFrame;
document.addEventListener('focusin', event => {
  event.target.closest?.('.scroll-reveal')?.classList.add('is-visible');
});
export function initScrollReveals() {
  observer?.disconnect();
  cancelAnimationFrame(pendingFrame);
  pendingFrame = requestAnimationFrame(() => {
    if (!('IntersectionObserver' in window)) return;
    const selectors = [
      'main h1', 'main h2', 'main h3', 'main p', 'main figure',
      'main .hero-brand', 'main .drink-card', 'main .product-photo',
      'main .chapter-image', 'main .ritual-editorial > img',
      'main .story-grid article', 'main .article-body > img',
      'main details', 'main .button', 'main .text-link',
      'main .cart-row', 'main .contact-links', 'main .price',
      'main .purchase', 'main .ritual-editorial li', 'footer > div'
    ];
    const candidates = [...document.querySelectorAll(selectors.join(','))];
    const candidateSet = new Set(candidates);
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    let index = 0;
    for (const el of candidates) {
      let parent = el.parentElement;
      let nested = false;
      while (parent) {
        if (candidateSet.has(parent)) { nested = true; break; }
        parent = parent.parentElement;
      }
      const rect = el.getBoundingClientRect();
      // Include the initial screen; leave collapsed and already passed content alone.
      if (nested || !rect.height || rect.bottom < 0) continue;
      el.style.setProperty('--reveal-delay', `${(index++ % 3) * 140}ms`);
      el.classList.add('scroll-reveal');
      observer.observe(el);
    }
  });
}
