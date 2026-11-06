// Progressive enhancement only: without this script every section is fully visible
// (the `.js` class that hides `.rv` elements is set only when motion is allowed).
const root = document.documentElement;
const animate = root.classList.contains('js');

// Reveal sections as they scroll into view.
const items = document.querySelectorAll<HTMLElement>('.rv');
if (animate && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Architecture diagrams: run the flowing-packet animation only while a diagram is on screen.
const diagrams = document.querySelectorAll<SVGSVGElement>('svg.dia');
if (animate && 'IntersectionObserver' in window) {
  const dio = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('live', e.isIntersecting);
  });
  diagrams.forEach((d) => dio.observe(d));
}

// Count up the hero stats once.
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
counters.forEach((el) => {
  const target = Number(el.dataset.count) || 0;
  if (!animate || target === 0) {
    el.textContent = String(target);
    return;
  }
  let start: number | undefined;
  const step = (ts: number) => {
    start ??= ts;
    const p = Math.min((ts - start) / 900, 1);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  el.textContent = '0';
  setTimeout(() => requestAnimationFrame(step), 300);
});

// Theme toggle: flips between light and dark and remembers the choice.
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const current =
      root.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
  });
});
