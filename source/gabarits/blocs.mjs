/* Composants partagés par les pages : tête de section, deux traits qui se rejoignent, simulateurs,
   FAQ, appel final. Un seul système pour tout le site. */
import { html, brut } from '../../outils/gabarit.mjs';

export const listes = (c, cle) => c.donnees.listes[cle];

/* Tête de section : surtitre, titre découpé en lignes (un mot en italique), texte. */
export function tete(c, base, { niveau = 2, classe = '', texte = false, apres = '' } = {}) {
  return html`<div class="tete-section ${classe}">
  <p class="surtitre">${c.t(`${base}.surtitre`)}</p>
  ${brut(`<h${niveau} class="titre-section" data-anime="lignes">`)}${c.tb(`${base}.titre`)}${brut(`</h${niveau}>`)}
  ${texte ? html`<p class="tete-texte" data-anime>${c.t(`${base}.texte`)}</p>` : ''}
  ${apres}
</div>`;
}

/* Deux traits qui partent des bords et se rejoignent en un point : l'idée d'Affectio societatis. */
export function deuxTraits({ classe = '', effet = 'deux-traits', nulle = false } = {}) {
  return html`<svg class="deux-traits ${classe}" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true" data-effet="${effet}" data-visuel${nulle ? brut(' data-nulle') : ''}>
  <path class="dt-a" d="M0 40 C 260 40, 420 196, 600 110" pathLength="1"/>
  <path class="dt-b" d="M1200 190 C 940 190, 780 24, 600 110" pathLength="1"/>
  <circle class="dt-point" cx="600" cy="110" r="11"/>
  <circle class="dt-halo" cx="600" cy="110" r="26"/>
</svg>`;
}

const plage = (id, libelle, { min, max, pas, valeur, unite = '€', aide = '' }) => html`<div class="simu-champ">
  <label for="${id}">${libelle}</label>
  <output for="${id}" class="simu-valeur" data-valeur-de="${id}" data-unite="${unite}">${valeur}</output>
  <input type="range" id="${id}" name="${id}" min="${min}" max="${max}" step="${pas}" value="${valeur}">
  ${aide ? html`<p class="simu-aide">${aide}</p>` : ''}
</div>`;

const durees = (c, id, choix = 20) => html`<fieldset class="simu-champ simu-durees">
  <legend>${c.t('simu.duree')}</legend>
  <div class="simu-puces">${[10, 15, 20, 25].map((d) => html`<label class="simu-puce"><input type="radio" name="${id}" value="${d}"${d === choix ? brut(' checked') : ''}><span>${d} ${c.t('simu.ans')}</span></label>`)}</div>
</fieldset>`;

/* Simulateur de capacité d'emprunt (norme : 35 % des revenus, assurance comprise). */
export function simuCapacite(c, p = 'cap') {
  return html`<form class="simu simu--capacite" data-simu="capacite" data-effet="simulateur" novalidate>
  <div class="simu-entrees">
    ${plage(`${p}-revenus`, c.t('simu.revenus'), { min: 1500, max: 15000, pas: 100, valeur: 4200 })}
    ${plage(`${p}-charges`, c.t('simu.charges'), { min: 0, max: 3000, pas: 50, valeur: 0 })}
    ${plage(`${p}-apport`, c.t('simu.apport'), { min: 0, max: 200000, pas: 1000, valeur: 20000 })}
    ${durees(c, `${p}-duree`, 20)}
    ${plage(`${p}-taux`, c.t('simu.taux'), { min: 1, max: 7, pas: 0.05, valeur: 3.8, unite: '%', aide: c.s('simu.tauxAide') })}
  </div>
  <div class="simu-resultats" aria-live="polite">
    <div class="jauge" data-visuel>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle class="jauge-fond" cx="100" cy="100" r="84" pathLength="100"/>
        <circle class="jauge-charges" cx="100" cy="100" r="84" pathLength="100"/>
        <circle class="jauge-neuf" cx="100" cy="100" r="84" pathLength="100"/>
      </svg>
      <p class="jauge-texte"><span class="jauge-chiffre" data-sortie="effort">35 %</span><span>${c.t('simu.effortAide')}</span></p>
    </div>
    <dl class="simu-chiffres">
      <div class="simu-principal"><dt>${c.t('simu.capacite')}</dt><dd data-sortie="capacite" data-prix>0 €</dd></div>
      <div><dt>${c.t('simu.mensualiteMax')}</dt><dd data-sortie="mensualite" data-prix>0 €</dd></div>
      <div><dt>${c.t('simu.budget')} <small>${c.t('simu.budgetAide')}</small></dt><dd data-sortie="budget" data-prix>0 €</dd></div>
    </dl>
  </div>
</form>`;
}

/* Simulateur de mensualité et courbe capital / intérêts. */
export function simuMensualite(c, p = 'men') {
  return html`<form class="simu simu--mensualite" data-simu="mensualite" novalidate>
  <div class="simu-entrees">
    ${plage(`${p}-montant`, c.t('simu.montant'), { min: 20000, max: 800000, pas: 5000, valeur: 220000 })}
    ${durees(c, `${p}-duree`, 20)}
    ${plage(`${p}-taux`, c.t('simu.taux'), { min: 1, max: 7, pas: 0.05, valeur: 3.8, unite: '%', aide: c.s('simu.tauxAide') })}
  </div>
  <div class="simu-resultats" aria-live="polite">
    <dl class="simu-chiffres">
      <div class="simu-principal"><dt>${c.t('simu.mensualite')}</dt><dd data-sortie="mensualite" data-prix>0 €</dd></div>
      <div><dt>${c.t('simu.interets')}</dt><dd data-sortie="interets" data-prix>0 €</dd></div>
      <div><dt>${c.t('simu.total')}</dt><dd data-sortie="total" data-prix>0 €</dd></div>
    </dl>
    <figure class="courbe" data-effet="courbe" data-visuel>
      <figcaption>${c.t('simu.courbeTitre')}</figcaption>
      <svg viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden="true"><g class="courbe-barres"></g><line class="courbe-axe" x1="0" y1="239" x2="600" y2="239"/></svg>
      <p class="courbe-legende"><span class="cl-capital">${c.t('simu.courbeCapital')}</span><span class="cl-interets">${c.t('simu.courbeInterets')}</span></p>
    </figure>
  </div>
</form>`;
}

/* FAQ en éléments details. */
export function faq(c, base, items) {
  return html`<section class="faq conteneur" id="questions">
  <h2 class="titre-section" data-anime="lignes">${c.tb(`${base}.titre`)}</h2>
  <div class="faq-liste" data-anime="cascade">${items.map((f) => html`<details class="faq-item"><summary>${f.q}</summary><p>${f.r}</p></details>`)}</div>
</section>`;
}

/* Appel final : bande ardoise, avec une photo (accueil) ou les deux traits qui se rejoignent. */
export function appel(c, { image, alt, id = 'appel' } = {}) {
  return html`<section class="appel theme-sombre${image ? ' appel--photo' : ''}" id="${id}">
  <div class="conteneur appel-grille">
    <div class="appel-texte">
      <h2 class="titre-section" data-anime="lignes">${c.tb('commun.appelTitre')}</h2>
      <p data-anime>${c.t('commun.appelTexte')}</p>
      <p class="appel-actions" data-anime>
        ${c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton bouton--clair', texte: c.t('commun.appelAction'), attrs: 'data-survol="magnetique"' })}
        <span class="appel-ou">${c.t('commun.appelOu')} <a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></span>
      </p>
    </div>
    ${image ? c.media({ nom: image, alt, classe: 'appel-media', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-fx="parallaxe"' }) : html`<div class="appel-visuel" data-visuel>${deuxTraits({ classe: 'deux-traits--appel', effet: 'deux-traits' })}<img class="appel-mono" src="/assets/images/logo-clair.svg" alt="" width="170" height="100"></div>`}
  </div>
</section>`;
}

/* Titre d'ouverture des pages intérieures : deux lignes (la seconde en italique), montées par le projet.
   data-anime="gsap" sur le h1 seul, jamais sur les lignes (le contrôle des chevauchements les regroupe ainsi). */
export function titreOuv(c, cle, { classe = '' } = {}) {
  const brutTexte = c.s(cle);
  const [avant, apres = ''] = brutTexte.split('<em>');
  const em = apres.replace('</em>', '').trim();
  return html`<h1 class="${classe}" data-anime="gsap"><span class="ligne-masque"><span class="ouv-ligne">${avant.trim()}</span></span>${em ? html`<span class="ligne-masque"><span class="ouv-ligne"><em>${em}</em></span></span>` : ''}</h1>`;
}

export const fleche = brut('<svg class="fleche" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>');

/* Haut d'une ouverture : surtitre, titre, texte, actions, information clé. */
export function ouvTexte(c, base, { action, ancre = 'rendez-vous', params = '', secondaire = '' } = {}) {
  return html`<p class="surtitre ouv-suite" data-anime="gsap">${c.t(`${base}.surtitre`)}</p>
    ${titreOuv(c, `${base}.titre`)}
    <p class="ouv-texte ouv-suite" data-anime="gsap">${c.t(`${base}.texte`)}</p>
    <p class="ouv-actions ouv-suite" data-anime="gsap">${c.lien(action || 'contact', { ancre, params, classe: 'bouton', texte: c.t(`${base}.action`), attrs: 'data-action-principale data-survol="magnetique"' })}${secondaire}</p>
    <p class="ouv-info ouv-suite" data-info-cle data-anime="gsap">${c.t(`${base}.info`)}</p>`;
}

/* Plan schématique de Nantes : la Loire, l'Erdre, et le bureau (sans précision cartographique). */
export function carteNantes(c, cleTitre, { effet = 'carte', centre = false } = {}) {
  return html`<figure class="carte-nantes" data-effet="${effet}" data-visuel${centre ? brut(' data-iris-centre') : ''}>
  <svg viewBox="0 0 600 420" role="img" aria-label="${c.s(cleTitre)}">
    <rect class="carte-fond" width="600" height="420" rx="6"/>
    <g class="carte-rues"><path d="M40 120 L560 150"/><path d="M80 330 L520 290"/><path d="M150 40 L210 400"/><path d="M420 30 L380 400"/><path d="M60 220 L540 210"/><path d="M290 30 L300 400"/></g>
    <path class="carte-eau carte-loire" d="M-10 300 C 120 280, 200 320, 300 300 S 480 260, 610 280" pathLength="1"/>
    <path class="carte-eau carte-erdre" d="M330 -10 C 320 60, 350 120, 330 180 S 300 260, 310 296" pathLength="1"/>
    <text class="carte-nom" x="470" y="320">Loire</text>
    <text class="carte-nom" x="342" y="70">Erdre</text>
    <g transform="translate(262 196)"><g class="carte-pin"><path d="M0 -38 C -16 -38 -24 -26 -24 -16 C -24 0 0 18 0 18 C 0 18 24 0 24 -16 C 24 -26 16 -38 0 -38 Z"/><circle cx="0" cy="-16" r="8"/></g></g>
    <text class="carte-adresse" x="296" y="190">5 rue Le Nôtre</text>
  </svg>
  <figcaption>${c.t(cleTitre)}</figcaption>
</figure>`;
}
