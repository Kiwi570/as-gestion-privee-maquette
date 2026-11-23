/* Le cabinet : « Affectio societatis » en lettres géantes et le portrait dans une arche, le parcours,
   les engagements (bande ardoise), les avis, le registre ORIAS (bande ardoise), le bureau. */
import { html, brut } from '../../outils/gabarit.mjs';
import { tete, listes, appel, deuxTraits, carteNantes } from '../gabarits/blocs.mjs';

export const page = { cle: 'cabinet', fichier: 'cabinet', imagePartage: 'julien-couleur-560.webp' };

export default (c) => html`
<section class="ouv ouv-devise conteneur" id="debut">
  <div class="ouv-devise-texte">
    <p class="surtitre ouv-suite" data-anime="gsap">${c.t('cabinet.ouverture.surtitre')}</p>
    <h1 class="devise-titre" lang="la" data-anime="gsap"><span class="ligne-masque"><span class="ouv-ligne">${c.t('cabinet.ouverture.mot1')}</span></span><span class="ligne-masque"><span class="ouv-ligne"><em>${c.t('cabinet.ouverture.mot2')}</em></span></span></h1>
    <p class="ouv-texte ouv-suite" data-anime="gsap">${c.t('cabinet.ouverture.texte')}</p>
    <p class="ouv-actions ouv-suite" data-anime="gsap">${c.lien('contact', { ancre: 'rendez-vous', classe: 'bouton', texte: c.t('cabinet.ouverture.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
    <p class="ouv-info ouv-suite" data-info-cle data-anime="gsap">${c.t('cabinet.ouverture.info')}</p>
  </div>
  <div class="ouv-arche" data-effet="devise" data-iris-centre>
    ${c.media({ nom: 'julien-couleur', alt: c.s('cabinet.ouverture.alt'), cadrage: '50% 30%', priorite: true, classe: 'arche-media', sizes: '(max-width: 760px) 80vw, 34vw' })}
  </div>
</section>

<section class="parcours conteneur" id="parcours">
  ${tete(c, 'cabinet.parcours', { classe: 'tete-section--large' })}
  <div class="parcours-cadre" data-effet="parcours">
  <span class="parcours-fil" aria-hidden="true"></span>
  <ol class="parcours-liste">
    ${listes(c, 'cabinet.parcours.items').map((p) => html`<li class="parcours-item"><span class="parcours-point" aria-hidden="true"></span><p class="parcours-date">${p.date}</p><div><h3>${p.titre}</h3><p>${p.texte}</p></div></li>`)}
  </ol>
  </div>
</section>

<section class="engagements theme-sombre" id="engagements">
  <div class="conteneur">
    ${tete(c, 'cabinet.engagements', { classe: 'tete-section--large' })}
    <ul class="engagements-liste" data-anime="cascade">
      ${listes(c, 'cabinet.engagements.items').map((e) => html`<li><blockquote><p>${e.citation}</p></blockquote><p class="engagement-auteur">${e.auteur}</p></li>`)}
    </ul>
    ${deuxTraits({ classe: 'deux-traits--engagements' })}
    <p class="engagements-note" data-anime>${c.t('cabinet.engagements.remuneration')}</p>
  </div>
</section>

<section class="avis-grille-section conteneur" id="avis">
  ${tete(c, 'cabinet.avis', { classe: 'tete-section--large' })}
  <ul class="avis-mur" data-anime="cascade">
    ${listes(c, 'avis').map((a) => html`<li class="avis-carte" data-fx="vitesse" data-fx-force="1.5"><blockquote><p>${a.texte}</p></blockquote><p class="avis-nom">${a.nom}</p></li>`)}
  </ul>
  <p class="avis-source" data-anime>${c.t('accueil.avis.source')} · <a class="lien-fleche" href="https://www.google.com/search?q=as+gestion+priv%C3%A9e+nantes" target="_blank" rel="noopener">${c.t('accueil.avis.google')}</a></p>
</section>

<section class="registre theme-sombre" id="garanties">
  <div class="conteneur registre-grille">
    ${tete(c, 'cabinet.garanties', { texte: true, apres: html`<p data-anime><a class="lien-fleche" href="https://www.orias.fr/" target="_blank" rel="noopener">${c.t('accueil.garanties.verifier')}</a></p>` })}
    <dl class="registre-liste" data-anime="cascade">
      ${listes(c, 'cabinet.garanties.lignes').map((l) => html`<div><dt>${l.cle}</dt><dd>${l.valeur}</dd></div>`)}
    </dl>
  </div>
</section>

<section class="bureau conteneur" id="bureau">
  <div>${tete(c, 'cabinet.bureau', { texte: true })}</div>
  ${carteNantes(c, 'cabinet.bureau.plan')}
</section>

${appel(c)}
`;

