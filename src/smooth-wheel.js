// Ease wheel input without changing touch, keyboard, or nested scrolling.
export function initSmoothWheel() {
  let frame = 0;
  let target = window.scrollY;
  let lastTime = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    target = window.scrollY;
    document.documentElement.classList.remove('wheel-gliding');
  };
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
  const tick = time => {
    const elapsed = Math.min(64, Math.max(1, time - lastTime));
    lastTime = time;
    target = Math.min(maxScroll(), Math.max(0, target));
    const current = window.scrollY;
    const distance = target - current;
    if (Math.abs(distance) < 1) {
      window.scrollTo({top: target, behavior: 'instant'});
      stop();
      return;
    }
    const step = distance * (1 - Math.exp(-elapsed / 125));
    const next = current + (Math.abs(step) < 1 ? Math.sign(distance) : step);
    window.scrollTo({top: next, behavior: 'instant'});
    frame = requestAnimationFrame(tick);
  };
  const hasNestedScroller = (node, delta) => {
    for (let el = node; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
      const style = getComputedStyle(el);
      if (!/(auto|scroll|overlay)/.test(style.overflowY) || el.scrollHeight <= el.clientHeight + 1) continue;
      if ((delta > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (delta < 0 && el.scrollTop > 0)) return true;
      if (style.overscrollBehaviorY === 'contain' || style.overscrollBehaviorY === 'none') return true;
    }
    return false;
  };
  window.addEventListener('wheel', event => {
    if (event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
    const element = event.target instanceof Element ? event.target : event.target.parentElement;
    if (element?.closest('input,textarea,select,[contenteditable="true"],dialog') || hasNestedScroller(element, event.deltaY)) { stop(); return; }
    const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? document.documentElement.clientHeight : 1;
    const delta = event.deltaY * multiplier;
    const currentTarget = frame ? target : window.scrollY;
    const nextTarget = Math.max(0, Math.min(maxScroll(), currentTarget + delta));
    if (nextTarget === currentTarget) return;
    event.preventDefault();
    target = nextTarget;
    if (!frame) {
      lastTime = performance.now();
      document.documentElement.classList.add('wheel-gliding');
      frame = requestAnimationFrame(tick);
    }
  }, {passive: false});
  window.addEventListener('keydown', event => {
    if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) stop();
  });
  window.addEventListener('pointerdown', stop, {passive:true});
  window.addEventListener('touchstart', stop, {passive:true});
  window.addEventListener('popstate', stop);
  document.addEventListener('click', stop, true);
  window.addEventListener('blur', stop);
}
