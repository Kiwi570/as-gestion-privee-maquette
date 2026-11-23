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
  const profils = [
    ['premier', c.s('simu.profilPremier'), { revenus: 2600, charges: 0, apport: 15000, duree: 25 }],
    ['couple', c.s('simu.profilCouple'), { revenus: 5200, charges: 300, apport: 40000, duree: 20 }],
    ['locatif', c.s('simu.profilLocatif'), { revenus: 6500, charges: 900, apport: 30000, duree: 20 }],
  ];
  return html`<form class="simu simu--capacite" data-simu="capacite" data-effet="simulateur" novalidate>
  <div class="simu-profils" role="group" aria-label="${c.s('simu.profils')}">
    <span class="simu-profils-titre">${c.t('simu.profils')}</span>
    ${profils.map(([id, nom, v]) => html`<button type="button" class="simu-profil" data-profil='${brut(JSON.stringify(v))}' aria-pressed="false">${nom}</button>`)}
    <span class="simu-profils-note">${c.t('simu.profilsNote')}</span>
  </div>
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
      <div class="courbe-zone" tabindex="0" role="slider" aria-label="${c.s('simu.courbeAide')}" aria-valuemin="1" aria-valuemax="25" aria-valuenow="1">
        <svg viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden="true"><g class="courbe-barres"></g><line class="courbe-axe" x1="0" y1="239" x2="600" y2="239"/></svg>
      </div>
      <p class="courbe-info" aria-live="polite"><span class="ci-annee"></span><span class="ci-cap"></span><span class="ci-int"></span></p>
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

/* Plan schématique de Nantes : la Loire et son île, l'Erdre, des îlots, deux jardins, et le bureau.
   Sans précision cartographique : il situe le bureau dans la ville, il ne remplace pas un vrai plan. */
export function carteNantes(c, cleTitre, { effet = 'carte', centre = false } = {}) {
  const ilots = [[60,40,120,70],[200,30,90,80],[310,60,70,50],[400,30,130,70],[40,140,110,60],[170,150,80,50],[440,130,110,60],[60,330,140,60],[230,340,120,50],[390,320,150,70],[110,400,90,30],[470,400,90,30]];
  return html`<figure class="carte-nantes" data-effet="${effet}" data-boucle-css data-visuel${centre ? brut(' data-iris-centre') : ''}>
  <svg viewBox="0 0 600 440" role="img" aria-label="${c.s(cleTitre)}">
    <rect class="carte-fond" width="600" height="440" rx="8"/>
    <g class="carte-ilots">${ilots.map(([x, y, w, h]) => brut(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`))}</g>
    <g class="carte-jardins"><ellipse cx="520" cy="210" rx="44" ry="26"/><ellipse cx="96" cy="250" rx="34" ry="20"/></g>
    <g class="carte-rues"><path d="M0 118 C 150 112, 300 128, 600 108"/><path d="M0 222 C 180 214, 380 230, 600 214"/><path d="M160 0 C 170 120, 150 260, 176 440"/><path d="M386 0 C 380 140, 392 300, 372 440"/></g>
    <path class="carte-rive" d="M-10 268 C 120 250, 210 292, 300 276 S 470 236, 610 256 L 610 318 C 470 300, 380 334, 300 330 S 120 306, -10 322 Z"/>
    <path class="carte-ile" d="M190 296 C 240 284, 330 288, 420 284 C 440 292, 430 306, 410 308 C 330 314, 250 316, 196 310 C 182 306, 182 300, 190 296 Z"/>
    <path class="carte-eau carte-loire" d="M-10 272 C 120 254, 210 296, 300 280 S 470 240, 610 260" pathLength="1"/>
    <path class="carte-eau carte-erdre" d="M300 -10 C 290 50, 318 110, 300 160 S 272 230, 288 262" pathLength="1"/>
    <text class="carte-nom" x="520" y="296">Loire</text>
    <text class="carte-nom" x="312" y="56">Erdre</text>
    <g class="carte-nord" transform="translate(556 52)"><circle r="20"/><path d="M0 -13 L5 4 L0 0 L-5 4 Z"/><text y="17" x="0">N</text></g>
    <g transform="translate(238 196)"><circle class="carte-halo" r="22"/><g class="carte-pin"><path d="M0 -38 C -16 -38 -24 -26 -24 -16 C -24 0 0 18 0 18 C 0 18 24 0 24 -16 C 24 -26 16 -38 0 -38 Z"/><circle cx="0" cy="-16" r="8"/></g></g>
    <g class="carte-etiquette" transform="translate(268 156)"><rect width="150" height="34" rx="17"/><text x="75" y="22">5 rue Le Nôtre</text></g>
  </svg>
  <figcaption>${c.t(cleTitre)} · <a class="lien-carte" href="https://www.google.com/maps/search/?api=1&amp;query=5%20rue%20Le%20N%C3%B4tre%2044000%20Nantes" target="_blank" rel="noopener">${c.t('commun.googleMaps')}</a></figcaption>
</figure>`;
}
