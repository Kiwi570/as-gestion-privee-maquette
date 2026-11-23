/* Accueil : l'ouverture en deux moitiés (texte et demi-visage de Julien), les quatre métiers,
   le simulateur, Affectio societatis, les garanties, les avis, les honoraires, l'appel final. */
import { html, brut } from '../../outils/gabarit.mjs';
import { tete, listes, deuxTraits, simuCapacite, appel } from '../gabarits/blocs.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'julien-nb-960.webp' };

const fleche = brut('<svg class="fleche" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>');

const icones = {
  conseil: '<path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0Zm10 0-3 7a3 3 0 0 0 6 0Z"/>',
  courtage: '<path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6"/>',
  assistance: '<path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"/>',
};

export default (c) => html`
<section class="hero" id="debut">
  <div class="hero-texte">
    <p class="surtitre hero-surtitre" data-anime="gsap">${c.t('accueil.hero.surtitre')}</p>
    <h1 class="hero-titre" data-anime="gsap"><span class="ligne-masque"><span class="hero-ligne">${c.t('accueil.hero.titre1')}</span></span><span class="ligne-masque"><span class="hero-ligne">${c.t('accueil.hero.titre2')}</span></span><span class="ligne-masque"><span class="hero-ligne"><em>${c.t('accueil.hero.titre3')}</em></span></span></h1>
    <p class="hero-intro" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
    <p class="hero-actions" data-anime="gsap">
      ${c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <a class="lien-fleche" href="#simulateur">${c.t('accueil.hero.simuler')}${fleche}</a>
    </p>
    <p class="hero-info" data-info-cle data-anime="gsap">${c.t('accueil.hero.info')}</p>
  </div>
  <div class="hero-portrait">
    ${c.media({ nom: 'julien-nb', alt: 'Julien Morinière, conseiller en gestion de patrimoine, portrait en noir et blanc', cadrage: '78% 30%', cadrageMobile: '72% 30%', priorite: true, classe: 'hero-media', sizes: '(max-width: 760px) 100vw, 46vw', attrs: 'data-iris-centre data-boucle-css' })}
    <span class="hero-jonction" aria-hidden="true"><span class="hero-point" data-effet="jonction"></span></span>
    <p class="hero-legende">${c.t('accueil.hero.legende')}</p>
    <span class="sceau" data-boucle-css data-effet="sceau" data-audit-ignorer aria-hidden="true">
      <svg viewBox="0 0 200 200"><defs><path id="sceau-cercle" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0"/></defs>
        <circle class="sceau-fond" cx="100" cy="100" r="97"/>
        <g class="sceau-texte"><text><textPath href="#sceau-cercle" textLength="452">${c.t('commun.sceau')}</textPath></text></g>
        <image href="/assets/images/logo.svg" x="62" y="76" width="76" height="45"/>
      </svg>
    </span>
  </div>
</section>

<section class="missions" id="metiers">
  <div class="conteneur">
    ${tete(c, 'accueil.missions', { texte: true, classe: 'tete-section--large' })}
  </div>
  <ul class="missions-grille conteneur" data-anime="cascade">
    ${listes(c, 'missions').map((m) => html`<li class="mission-cellule">
      <a class="mission" href="${c.url(m.page, m.ancre)}" data-libelle="${c.libelle(m.page)}" data-fx="vitesse" data-fx-force="2">
        ${c.media({ nom: m.image, alt: m.alt, classe: 'mission-media', sizes: '(max-width: 760px) 86vw, (max-width: 1100px) 45vw, 24vw', ratio: '4 / 5' })}
        <span class="mission-corps">
          <span class="mission-titre">${m.titre}</span>
          <span class="mission-texte">${m.texte}</span>
          <span class="mission-points">${m.points.map((p) => html`<span>${p}</span>`)}</span>
          <span class="mission-lien">${c.t('accueil.missions.lien')}${fleche}</span>
        </span>
      </a>
    </li>`)}
  </ul>
</section>

<section class="simulateur theme-sombre" id="simulateur">
  <div class="conteneur simu-grille">
    <div class="simu-tete">
      ${tete(c, 'accueil.simulateur', { texte: true })}
      <p class="simu-cta" data-anime>
        ${c.lien('contact', { ancre: 'rendez-vous', params: 'sujet=financement', classe: 'bouton bouton--clair', texte: c.t('accueil.simulateur.action'), attrs: 'data-survol="magnetique"' })}
        ${c.lien('financement', { ancre: 'simulateurs', classe: 'lien-fleche', texte: html`${c.t('accueil.simulateur.detail')}${fleche}` })}
      </p>
    </div>
    ${simuCapacite(c, 'cap')}
  </div>
  <div class="conteneur simu-mentions">
    <p>${c.t('simu.avertissement')}</p>
    <p><strong>${c.t('commun.creditEngage')}</strong></p>
  </div>
</section>

<section class="manifeste" id="affectio">
  <div class="conteneur manifeste-cadre">
    <h2 class="manifeste-latin" lang="la" data-anime="mots"><span>${c.t('accueil.manifeste.mot1')}</span> <em>${c.t('accueil.manifeste.mot2')}</em></h2>
    <div class="manifeste-definition">
      <p class="surtitre">${c.t('accueil.manifeste.surtitre')}</p>
      <p class="manifeste-nature" data-anime>${c.t('accueil.manifeste.nature')}</p>
      <p class="manifeste-texte" data-anime>${c.t('accueil.manifeste.texte')}</p>
      <p class="manifeste-devise" data-anime>${c.t('accueil.manifeste.devise')}</p>
      <p data-anime>${c.lien('cabinet', { classe: 'lien-fleche', texte: html`${c.t('accueil.manifeste.lien')}${fleche}` })}</p>
    </div>
  </div>
  <div class="conteneur">${deuxTraits({ classe: 'deux-traits--manifeste' })}</div>
</section>

<section class="garanties" id="garanties">
  <div class="conteneur garanties-grille-tete">
    ${tete(c, 'accueil.garanties', { texte: true, apres: html`<p data-anime><a class="lien-fleche" href="https://www.orias.fr/" target="_blank" rel="noopener">${c.t('accueil.garanties.verifier')}${fleche}</a></p>` })}
    <svg class="cachet" viewBox="0 0 220 220" aria-hidden="true" data-fx="trace" data-visuel>
      <circle cx="110" cy="110" r="96"/><circle cx="110" cy="110" r="80"/>
      <path d="M66 112l28 28 60-64"/>
      <path d="M40 110a70 70 0 0 1 140 0" data-fx-trait/>
    </svg>
  </div>
  <ul class="conteneur garanties-grille" data-anime="cascade">
    ${listes(c, 'garanties').map((g) => html`<li class="garantie"><p class="garantie-grand${g.petit ? ' garantie-grand--petit' : ''}">${g.petit ? g.grand.split(' · ').map((x) => html`<span>${x}</span>`) : g.grand}</p><h3>${g.titre}</h3><p>${g.texte}</p></li>`)}
  </ul>
</section>

<section class="avis theme-sombre" id="avis">
  <div class="conteneur avis-grille tep" data-module="temoignages-en-pile">
    <div class="tep__tete">
      ${tete(c, 'accueil.avis', { texte: true, apres: html`<p data-anime><a class="lien-fleche" href="https://www.google.com/search?q=as+gestion+priv%C3%A9e+nantes" target="_blank" rel="noopener">${c.t('accueil.avis.google')}${fleche}</a></p>` })}
    </div>
    <div class="tep__scene" data-effet="pile">
      <ol class="tep__pile">
        ${listes(c, 'avis').map((a) => html`<li class="tep__carte">
          <blockquote class="tep__citation"><p>${a.texte}</p></blockquote>
          <p class="tep__auteur"><span class="tep__nom">${a.nom}</span></p>
          <p class="tep__source">${c.t('accueil.avis.source')}</p>
        </li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="hono conteneur" id="honoraires">
  ${tete(c, 'accueil.honoraires', { texte: true, classe: 'tete-section--large' })}
  <ol class="hono-grille" data-anime="cascade">
    ${listes(c, 'honorairesModes').map((m) => html`<li>
      <a class="hono-carte" href="${c.url('honoraires', m.id)}" data-libelle="${c.libelle('honoraires')}" data-survol="incline" data-survol-force="4">
        <svg class="hono-icone" viewBox="0 0 24 24" aria-hidden="true">${brut(icones[m.id])}</svg>
        <span class="hono-nom">${m.nom}</span>
        <span class="hono-prix">${m.prix}</span>
        <span class="hono-resume">${m.resume}</span>
        <span class="hono-fleche">${fleche}</span>
      </a>
    </li>`)}
  </ol>
  <p data-anime>${c.lien('honoraires', { classe: 'lien-fleche', texte: html`${c.t('accueil.honoraires.lien')}${fleche}` })}</p>
</section>

${appel(c, { image: 'grok/accueil-appel', alt: c.s('accueil.appel.alt'), id: 'rendez-vous' })}
`;
