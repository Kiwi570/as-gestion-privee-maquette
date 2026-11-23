/* Pont entre les modules de la bibliothèque et le socle de la maquette.
   Les modules appellent pret([...]) et reçoivent un objet « socle » : ici, GSAP vient des scripts de la page,
   les recalculs passent par le recalcul regroupé du socle, et il n'y a ni Lenis ni mode calme. */
import { rafraichir } from '../socle/index.js?v=2';

export const socle = {
  gsap: null, ScrollTrigger: null, SplitText: null, Flip: null, OGL: null, lenis: null,
  get calme() { return false; },
  get souris() { return matchMedia('(hover: hover) and (pointer: fine)').matches; },
  get telephone() { return innerWidth < 700; },
  webgl() { return false; },
  rafraichir() { rafraichir(); },
  boucle(el, fn) {
    let visible = false, id = 0, avant = 0, fini = false;
    const tour = (t) => { if (!visible || fini || document.hidden) { id = 0; return; } const dt = avant ? Math.min(64, t - avant) : 16; avant = t; fn(t, dt); id = requestAnimationFrame(tour); };
    const relancer = () => { if (!id && visible && !document.hidden && !fini) { avant = 0; id = requestAnimationFrame(tour); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; relancer(); }, { rootMargin: '100px' });
    io.observe(el);
    document.addEventListener('visibilitychange', relancer);
    return { arreter() { fini = true; io.disconnect(); cancelAnimationFrame(id); document.removeEventListener('visibilitychange', relancer); } };
  },
  mesurer() {},
};

export async function pret() {
  const g = window.gsap || null;
  socle.gsap = g;
  if (g && window.ScrollTrigger) socle.ScrollTrigger = window.ScrollTrigger;
  if (g && window.SplitText) socle.SplitText = window.SplitText;
  return socle;
}
