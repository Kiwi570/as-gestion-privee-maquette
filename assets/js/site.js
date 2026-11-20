/* AS Gestion Privée : effets propres au client. Le socle gère l'ouverture, les transitions, l'en-tête,
   le menu, les mesures et la bibliothèque d'effets (posés par attributs dans les pages).
   Effets du plan : jonction, deux-traits, simulateur, courbe, signature, frise, devise, interrogation, credit-impot, carte. */
import { demarrer, versObjet, quand, rafraichir } from './socle/index.js?v=1';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const euros = (v) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(v))).replace(/\s/g, ' ') + ' €';
const pourcent = (v) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(v) + ' %';

/* ---------- Modules de la bibliothèque ---------- */
async function modules() {
  const tep = $('.tep');
  if (tep) (await import('./modules/temoignages-en-pile/module.js?v=1')).init(tep, { textes: { precedent: 'Avis précédent', suivant: 'Avis suivant' } });
  const ofr = $('.ofr');
  if (ofr) {
    const api = await (await import('./modules/offre-a-tiroirs/module.js?v=1')).init(ofr, { visuels: false, unSeul: false });
    /* Arrivée sur un tiroir par l'adresse (#courtage) : le premier reste ouvert, comme avant le module,
       pour que rien ne bouge au-dessus du tiroir visé. */
    const vise = location.hash.length > 1 && ofr.querySelector(`.ofr__tiroir[id="${CSS.escape(decodeURIComponent(location.hash.slice(1)))}"]`);
    if (vise && vise !== ofr.querySelector('.ofr__tiroir') && api && api.ouvrir) api.ouvrir(0);
  }
  const fpe = $('.fpe');
  if (fpe) {
    (await import('./modules/formulaire-par-etapes/module.js?v=1')).init(fpe, { sujet: 'Demande de rendez-vous' });
    fpe.addEventListener('formulaire:envoye', () => {
      const fin = $('.fpe__fin', fpe);
      if (fin) setTimeout(() => fin.scrollIntoView({ block: 'center' }), 60);
    });
    /* Choix déjà fait selon la page d'où l'on vient (?sujet=financement). */
    const sujet = new URLSearchParams(location.search).get('sujet');
    const choix = sujet && fpe.querySelector(`input[name="projet"][value="${CSS.escape(sujet)}"]`);
    if (choix) { choix.checked = true; choix.dispatchEvent(new Event('change', { bubbles: true })); }
  }
}

/* ---------- Jonction : le filet le long du portrait, et le point qui descend au défilement ---------- */
function jonction() {
  const hero = $('.hero'), ligne = $('.hero-jonction'), point = $('.hero-point');
  if (!gsap || !ST || !hero || !ligne || !point) return;
  const horizontal = () => matchMedia('(max-width: 760px)').matches;
  gsap.to(point, {
    x: () => (horizontal() ? ligne.offsetWidth - 12 : 0),
    y: () => (horizontal() ? 0 : ligne.offsetHeight * 0.92),
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
  });
  gsap.to('.hero-media img', { yPercent: 6, scale: 1.04, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
}

/* ---------- Deux traits qui se rejoignent ---------- */
function deuxTraits() {
  if (!gsap || !ST) return;
  for (const svg of $$('svg.deux-traits')) {
    const nulle = svg.hasAttribute('data-nulle');
    const traits = $$('path', svg), pt = $('.dt-point', svg), halo = $('.dt-halo', svg);
    gsap.set(traits, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set([pt, halo], { scale: 0, transformOrigin: '50% 50%' });
    const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 92%', end: 'bottom 45%', scrub: 0.8 } });
    tl.to(traits, { strokeDashoffset: nulle ? 0.16 : 0, ease: 'none', duration: 1 });
    if (!nulle) tl.to(pt, { scale: 1, ease: 'back.out(3)', duration: 0.2 }).to(halo, { scale: 1, ease: 'power2.out', duration: 0.25 }, '<');
  }
}

/* ---------- Simulateurs ---------- */
const mensualiteDe = (capital, tauxAnnuel, annees) => {
  const n = annees * 12, t = tauxAnnuel / 100 / 12;
  return t ? capital * t / (1 - Math.pow(1 + t, -n)) : capital / n;
};
const capitalDe = (mensualite, tauxAnnuel, annees) => {
  const n = annees * 12, t = tauxAnnuel / 100 / 12;
  return t ? mensualite * (1 - Math.pow(1 + t, -n)) / t : mensualite * n;
};

function remplissage(input) {
  const p = ((+input.value - +input.min) / (+input.max - +input.min)) * 100;
  input.style.setProperty('--p', `${p}%`);
  const sortie = input.form && input.form.querySelector(`[data-valeur-de="${input.id}"]`);
  if (sortie) sortie.textContent = sortie.dataset.unite === '%' ? pourcent(+input.value) : euros(+input.value);
}

/* Chiffre qui roule jusqu'à sa nouvelle valeur (boîte de largeur fixe, chiffres à chasse fixe). */
function rouler(el, valeur, format = euros, duree = 0.6) {
  if (!el) return;
  const depart = +(el.dataset.v || 0);
  el.dataset.v = valeur;
  if (!gsap) { el.textContent = format(valeur); return; }
  const o = { v: depart };
  gsap.to(o, { v: valeur, duration: duree, ease: 'power2.out', overwrite: true, onUpdate: () => { el.textContent = format(o.v); } });
}

function simuCapacite(form) {
  const v = (n) => +form.querySelector(`[name$="-${n}"]:not([type="radio"])`)?.value || 0;
  const duree = () => +(form.querySelector('[type="radio"]:checked')?.value || 20);
  const jc = $('.jauge-charges', form), jn = $('.jauge-neuf', form);
  let vu = false;
  const calculer = (anime = true) => {
    const revenus = v('revenus'), charges = v('charges'), apport = v('apport'), taux = v('taux');
    const mens = Math.max(0, revenus * 0.35 - charges);
    const capacite = capitalDe(mens, taux, duree());
    const partCharges = Math.min(35, (charges / revenus) * 100), partNeuf = Math.max(0, 35 - partCharges);
    rouler($('[data-sortie="capacite"]', form), capacite, euros, anime ? 0.7 : 0);
    rouler($('[data-sortie="mensualite"]', form), mens, euros, anime ? 0.5 : 0);
    rouler($('[data-sortie="budget"]', form), capacite + apport, euros, anime ? 0.6 : 0);
    const effort = $('[data-sortie="effort"]', form);
    if (effort) effort.textContent = pourcent(Math.round(Math.min(100, ((charges + mens) / revenus) * 100)));
    if (gsap && vu) {
      gsap.to(jc, { strokeDasharray: `${partCharges} 100`, duration: anime ? 0.6 : 0, ease: 'power2.out' });
      gsap.to(jn, { strokeDasharray: `0 ${partCharges} ${partNeuf} 100`, duration: anime ? 0.6 : 0, ease: 'power2.out' });
    }
  };
  form.addEventListener('input', (e) => { if (e.target.type === 'range') remplissage(e.target); calculer(); });
  form.addEventListener('change', () => calculer());
  form.addEventListener('submit', (e) => e.preventDefault());
  $$('input[type="range"]', form).forEach(remplissage);
  calculer(false);
  /* La jauge se remplit quand le simulateur arrive à l'écran (et se vide si l'on remonte). */
  if (gsap && ST) {
    ST.create({
      trigger: form, start: 'top 80%', end: 'bottom 10%',
      onEnter: () => { vu = true; calculer(true); }, onEnterBack: () => { vu = true; calculer(true); },
      onLeaveBack: () => { vu = false; gsap.to([jc, jn], { strokeDasharray: '0 100', duration: 0.4 }); },
    });
  } else vu = true;
}

function simuMensualite(form) {
  const v = (n) => +form.querySelector(`[name$="-${n}"]:not([type="radio"])`)?.value || 0;
  const duree = () => +(form.querySelector('[type="radio"]:checked')?.value || 20);
  const groupe = $('.courbe-barres', form);
  const NS = 'http://www.w3.org/2000/svg';
  let vu = false;
  const dessiner = (anime) => {
    const capital = v('montant'), taux = v('taux'), ans = duree();
    const m = mensualiteDe(capital, taux, ans);
    const total = m * ans * 12;
    rouler($('[data-sortie="mensualite"]', form), m, euros, anime ? 0.6 : 0);
    rouler($('[data-sortie="interets"]', form), total - capital, euros, anime ? 0.6 : 0);
    rouler($('[data-sortie="total"]', form), total, euros, anime ? 0.6 : 0);
    if (!groupe) return;
    /* Année par année : capital remboursé et intérêts payés (barres empilées). */
    const t = taux / 100 / 12; let reste = capital; const annees = [];
    for (let a = 0; a < ans; a++) { let ci = 0, ii = 0; for (let k = 0; k < 12; k++) { const i = reste * t; ii += i; ci += m - i; reste -= m - i; } annees.push([ci, ii]); }
    const W = 600, H = 238, pas = W / ans, l = Math.max(2, pas * 0.68), max = m * 12;
    groupe.replaceChildren();
    annees.forEach(([ci, ii], a) => {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'cb-annee');
      const hc = (ci / max) * H, hi = (ii / max) * H, x = a * pas + (pas - l) / 2;
      for (const [cls, y, h] of [['cb-capital', H - hc, hc], ['cb-interets', H - hc - hi, hi]]) {
        const r = document.createElementNS(NS, 'rect');
        r.setAttribute('class', cls); r.setAttribute('x', x.toFixed(1)); r.setAttribute('y', y.toFixed(1)); r.setAttribute('width', l.toFixed(1)); r.setAttribute('height', Math.max(0, h).toFixed(1));
        g.appendChild(r);
      }
      groupe.appendChild(g);
    });
    if (gsap) {
      const barres = groupe.children;
      gsap.set(barres, { transformOrigin: '50% 100%', scaleY: vu ? 1 : 0 });
      if (vu && anime) gsap.from(barres, { scaleY: 0, duration: 0.5, stagger: 0.015, ease: 'power2.out' });
    }
  };
  form.addEventListener('input', (e) => { if (e.target.type === 'range') remplissage(e.target); dessiner(true); });
  form.addEventListener('change', () => dessiner(true));
  form.addEventListener('submit', (e) => e.preventDefault());
  $$('input[type="range"]', form).forEach(remplissage);
  dessiner(false);
  if (gsap && ST) {
    ST.create({ trigger: groupe.closest('svg'), start: 'top 88%', once: true, onEnter: () => { vu = true; gsap.to(groupe.children, { scaleY: 1, duration: 0.7, stagger: 0.025, ease: 'power3.out' }); } });
  } else vu = true;
}

/* Onglets des simulateurs (page Financement) */
function onglets() {
  for (const bloc of $$('[data-onglets]')) {
    const boutons = $$('[role="tab"]', bloc), panneaux = $$('[role="tabpanel"]', bloc);
    const choisir = (i, focus) => {
      boutons.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      panneaux.forEach((p, k) => { p.hidden = k !== i; });
      if (focus) boutons[i].focus();
      rafraichir();
    };
    boutons.forEach((b, i) => {
      b.addEventListener('click', () => choisir(i));
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); choisir((i + (e.key === 'ArrowRight' ? 1 : boutons.length - 1)) % boutons.length, true); }
      });
    });
    if (location.hash === '#mensualite') choisir(1);
  }
}

/* ---------- Signature : le trait descend d'étape en étape et finit en paraphe ---------- */
function signature() {
  const bloc = $('[data-effet="signature"]');
  if (!gsap || !ST || !bloc) return;
  const fil = $('.sig-fil', bloc), paraphe = $('.sig-paraphe path', bloc), etapes = $$('.etape', bloc);
  if (fil) {
    gsap.fromTo(fil, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: bloc, start: 'top 70%', end: 'bottom 75%', scrub: 0.6 } });
  }
  etapes.forEach((e) => ST.create({ trigger: e, start: 'top 72%', onEnter: () => e.classList.add('etape--atteinte'), onLeaveBack: () => e.classList.remove('etape--atteinte') }));
  if (paraphe) {
    gsap.set(paraphe, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.to(paraphe, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: paraphe.closest('svg'), start: 'top 90%', end: 'bottom 60%', scrub: 0.6 } });
  }
}

/* ---------- Frise du patrimoine : la piste glisse à l'horizontale pendant que la section passe (sans épinglage) ---------- */
function frise() {
  const section = $('[data-effet="frise"]');
  if (!gsap || !ST || !section) return;
  const piste = $('.frise-piste', section), fenetre = $('.frise-fenetre', section);
  if (!piste || !fenetre) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 761px)', () => {
    gsap.fromTo(piste, { x: 0 }, {
      x: () => -Math.max(0, piste.scrollWidth - fenetre.clientWidth), ease: 'none',
      scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom 25%', scrub: 0.6, invalidateOnRefresh: true },
    });
    const barre = $('.frise-progres span', section);
    if (barre) gsap.fromTo(barre, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom 25%', scrub: 0.6 } });
  });
  mm.add('(max-width: 760px)', () => {
    gsap.from($$('.temps', piste), { y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: piste, start: 'top 80%' } });
  });
}

/* ---------- Arche du cabinet : le portrait se découvre, puis glisse au défilement ---------- */
function devise() {
  const arche = $('[data-effet="devise"]');
  if (!gsap || !ST || !arche) return;
  gsap.to(arche, { y: -36, ease: 'none', scrollTrigger: { trigger: arche.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to($('img', arche), { scale: 1.06, ease: 'none', scrollTrigger: { trigger: arche.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
}

/* ---------- Ouvertures : le bandeau et le quai continuent de bouger au défilement ---------- */
function ouvDefilement() {
  if (!gsap || !ST) return;
  const bandeau = $('.ouv-bandeau');
  if (bandeau) gsap.to($('img', bandeau), { yPercent: 7, ease: 'none', scrollTrigger: { trigger: bandeau, start: 'top 80%', end: 'bottom top', scrub: true } });
  const quai = $('.ouv-plein-media');
  if (quai) gsap.fromTo(quai, { scale: 1 }, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: quai.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
}

/* ---------- Calculette du crédit d'impôt ---------- */
function creditImpot() {
  const form = $('[data-effet="credit-impot"]');
  if (!form) return;
  const input = $('input[type="range"]', form), barreC = $('.ci-credit', form), barreR = $('.ci-reste', form);
  const maj = (anime) => {
    remplissage(input);
    const m = +input.value;
    rouler($('[data-sortie="credit"]', form), m / 2, euros, anime ? 0.5 : 0);
    rouler($('[data-sortie="reste"]', form), m / 2, euros, anime ? 0.5 : 0);
  };
  input.addEventListener('input', () => maj(true));
  form.addEventListener('submit', (e) => e.preventDefault());
  maj(false);
  if (gsap && ST) {
    gsap.fromTo([barreR, barreC], { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 50%', stagger: 0.15, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: form, start: 'top 80%', toggleActions: 'play none none reverse' } });
  }
}

/* ---------- Carte : l'épingle tombe quand la Loire est tracée ---------- */
function carte() {
  const c = $('[data-effet="carte"]');
  if (!gsap || !ST || !c) return;
  const pin = $('.carte-pin', c);
  if (pin) gsap.fromTo(pin, { y: -60, opacity: 0 }, { y: 0, opacity: 1, ease: 'bounce.out', duration: 0.9, scrollTrigger: { trigger: c, start: 'top 70%', toggleActions: 'play none none reverse' } });
  const loire = $$('.carte-eau', c);
  gsap.set(loire, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.to(loire, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top 90%', end: 'center 50%', scrub: 0.6 } });
}

/* ---------- Ouverture propre à chaque page (voile ou intro) ---------- */
function ouvertureTimeline(tl, a) {
  /* Accueil : les lignes du titre montent, le reste arrive, puis le filet de la jonction se trace. */
  if ($('.hero-ligne')) {
    tl.set('.hero-titre', { opacity: 1 }, a)
      .fromTo('.hero-ligne', { yPercent: 115 }, { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, a)
      .fromTo('.hero-surtitre, .hero-intro, .hero-actions, .hero-info', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, a + 0.2)
      .fromTo('.hero-jonction', { scaleY: 0, scaleX: 0 }, { scaleY: 1, scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, a)
      .fromTo('.hero-legende', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4 }, a + 0.3);
  }
  /* Pages intérieures : les lignes du titre montent, le texte suit. */
  if ($('.ouv-ligne')) {
    tl.set('.ouv h1[data-anime="gsap"]', { opacity: 1 }, a)
      .fromTo('.ouv-ligne', { yPercent: 115 }, { yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, a)
      .fromTo('.ouv-suite', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, a + 0.2);
  }
  /* Bandeau de Financement : il s'ouvre du centre. */
  if ($('.ouv-bandeau')) tl.fromTo('.ouv-bandeau', { clipPath: 'inset(0 18% 0 18% round 4px)' }, { clipPath: 'inset(0 0% 0 0% round 4px)', duration: 1.1, ease: 'power3.inOut' }, a + 0.15);
  /* Plein cadre du Patrimoine : la photo se resserre. */
  if ($('.ouv-plein .media img')) tl.fromTo('.ouv-plein .media img', { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'power3.out' }, a - 0.1);
  /* Arche du cabinet : elle s'ouvre de bas en haut. */
  if ($('.ouv-arche')) tl.fromTo('.ouv-arche', { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }, { clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)', duration: 1.1, ease: 'power3.inOut' }, a + 0.1);
  /* Point d'interrogation des honoraires : il se trace. */
  const q = $('.ouv-question path');
  if (q) { tl.set(q, { strokeDasharray: 1 }, a).fromTo(q, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, a); tl.fromTo('.ouv-question circle', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }, a + 1.1); }
  return tl;
}

function etatFinalOuverture() {
  if (!gsap) return;
  gsap.set('.hero-titre, .hero-surtitre, .hero-intro, .hero-actions, .hero-info, .hero-legende, .ouv [data-anime="gsap"], .ouv-suite', { opacity: 1, y: 0, x: 0 });
  gsap.set('.hero-ligne, .ouv-ligne', { yPercent: 0 });
  gsap.set('.hero-jonction', { scaleX: 1, scaleY: 1 });
  gsap.set('.ouv-bandeau, .ouv-arche', { clipPath: 'none' });
  gsap.set('.ouv-plein .media img', { scale: 1 });
  gsap.set('.ouv-question path', { strokeDashoffset: 0 });
  gsap.set('.ouv-question circle', { scale: 1 });
}

demarrer({
  preparer() {
    modules();
    jonction();
    deuxTraits();
    $$('[data-simu="capacite"]').forEach(simuCapacite);
    $$('[data-simu="mensualite"]').forEach(simuMensualite);
    onglets();
    signature();
    frise();
    devise();
    ouvDefilement();
    creditImpot();
    carte();
  },
  /* Intro (moins de 3 s) : le A et le S se rejoignent, un filet se trace, le monogramme glisse jusqu'à l'objet
     d'ouverture de la page et le panneau s'ouvre en cercle depuis lui ; le titre monte pendant ce temps. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.intro-a', { x: -900, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, ease: 'power4.out' }, 0.05)
      .fromTo('.intro-s', { x: 900, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, ease: 'power4.out' }, 0.05)
      .fromTo('.ouverture-trait', { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.45)
      .fromTo('.ouverture-ligne', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, 0.55)
      .to('.ouverture-trait, .ouverture-ligne', { opacity: 0, duration: 0.25 }, 1.0);
    versObjet(tl, { a: 0.95 });
    ouvertureTimeline(tl, 1.4);
    return tl;
  },
  etatFinal() { etatFinalOuverture(); },
  /* Arrivée par un lien interne : la même ouverture, pendant que le voile se retire. */
  arrivee() {
    if (!gsap) return;
    ouvertureTimeline(gsap.timeline({ defaults: { ease: 'power3.out' } }), 0.1);
  },
});

quand('pret', () => rafraichir());
