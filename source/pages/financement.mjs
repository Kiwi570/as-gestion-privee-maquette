/* Financement : grand titre puis bandeau photo, simulateurs, rôle du cabinet, étapes jusqu'au notaire
   (le trait qui finit en paraphe), règles des banques, mensualité et courbe, FAQ légale, mentions crédit. */
import { html, brut } from '../../outils/gabarit.mjs';
import { tete, listes, simuCapacite, simuMensualite, faq, appel, titreOuv, fleche } from '../gabarits/blocs.mjs';

export const page = { cle: 'financement', fichier: 'financement', imagePartage: 'grok/financement-ouverture-1280.webp' };

const icones = [
  '<path d="M4 19h16M6 16V9m4 7V5m4 11v-6m4 6V8"/>',
  '<path d="M4 12h6l2-3 2 6 2-3h4"/><circle cx="12" cy="12" r="9"/>',
  '<path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"/>',
  '<path d="M4 20c4-1 6-5 8-9s4-7 8-7M4 20h16"/>',
];

export default (c) => html`
<section class="ouv ouv--bandeau" id="debut">
  <div class="conteneur ouv-grille">
    <div class="ouv-col-titre">
      <p class="surtitre ouv-suite" data-anime="gsap">${c.t('financement.ouverture.surtitre')}</p>
      ${titreOuv(c, 'financement.ouverture.titre')}
    </div>
    <div class="ouv-col-texte">
      <p class="ouv-texte ouv-suite" data-anime="gsap">${c.t('financement.ouverture.texte')}</p>
      <p class="ouv-actions ouv-suite" data-anime="gsap">
        ${c.lien('contact', { ancre: 'rendez-vous', params: 'sujet=financement', classe: 'bouton', texte: c.t('financement.ouverture.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <a class="lien-fleche" href="#simulateurs">${c.t('simu.ongletCapacite')}${fleche}</a>
      </p>
      <p class="ouv-info ouv-suite" data-info-cle data-anime="gsap">${c.t('financement.ouverture.info')}</p>
    </div>
  </div>
  <div class="conteneur">
    ${c.media({ nom: 'grok/financement-ouverture', alt: c.s('financement.ouverture.alt'), cadrage: '50% 88%', priorite: true, classe: 'ouv-bandeau', sizes: '(max-width: 1240px) 100vw, 1240px', attrs: 'data-iris-centre data-effet="bandeau"' })}
  </div>
</section>

<section class="simulateur theme-sombre" id="simulateurs">
  <div class="conteneur simu-grille">
    <div class="simu-tete">${tete(c, 'financement.simulateurs', { texte: true })}</div>
    ${simuCapacite(c, 'fcap')}
  </div>
  <div class="conteneur simu-mentions">
    <p>${c.t('simu.avertissement')}</p>
    <p><strong>${c.t('commun.creditEngage')}</strong></p>
  </div>
</section>

<section class="role conteneur" id="role">
  ${tete(c, 'financement.role', { classe: 'tete-section--large' })}
  <ol class="role-grille" data-anime="cascade">
    ${listes(c, 'financement.role.items').map((r, i) => html`<li class="role-carte" data-fx="vitesse" data-fx-force="1.5">
      <svg class="role-icone" viewBox="0 0 24 24" aria-hidden="true">${brut(icones[i])}</svg>
      <h3>${r.titre}</h3><p>${r.texte}</p>
    </li>`)}
  </ol>
</section>

<section class="etapes" id="etapes">
  <div class="conteneur etapes-grille">
    <div class="etapes-tete">${tete(c, 'financement.etapes')}</div>
    <div class="etapes-corps" data-effet="signature">
      <span class="sig-fil" aria-hidden="true"></span>
      <ol class="etapes-liste">
        ${listes(c, 'financement.etapes.items').map((e, i) => html`<li class="etape"><span class="etape-num" aria-hidden="true">${String(i + 1)}</span><h3>${e.titre}</h3><p>${e.texte}</p></li>`)}
      </ol>
      <svg class="sig-paraphe" viewBox="0 0 420 120" aria-hidden="true" data-visuel><path d="M8 88c26-6 44-40 58-62 8-12 14-6 9 8-9 26-20 52-14 58 8 8 30-40 42-48 9-6 7 12 3 22-4 12 2 18 12 8 14-14 22-36 36-38 12-2 6 22 16 24 14 2 28-24 44-22 14 2 6 22 22 22 22 0 48-24 74-22 30 2 58 12 102 4" pathLength="1"/></svg>
    </div>
  </div>
</section>

<section class="regles theme-sombre" id="regles">
  <div class="conteneur">
    ${tete(c, 'financement.regles', { classe: 'tete-section--large' })}
    <div class="regles-grille" data-anime="cascade">
      <div class="regle"><p class="regle-chiffre"><span data-compteur="35">35</span>&nbsp;%</p><p>${c.t('financement.regles.effort')}</p></div>
      <div class="regle"><p class="regle-chiffre"><span data-compteur="25">25</span>&nbsp;ans</p><p>${c.t('financement.regles.duree')}</p></div>
    </div>
    <p class="regles-note" data-anime>${c.t('financement.regles.note')}</p>
  </div>
</section>

<section class="mensualite" id="mensualite">
  <div class="conteneur simu-grille">
    <div class="simu-tete">${tete(c, 'financement.mensualite', { texte: true })}</div>
    ${simuMensualite(c, 'fmen')}
  </div>
</section>

${faq(c, 'financement.faq', listes(c, 'financement.faq.items'))}

<section class="mentions conteneur" id="mentions" data-sans-effet data-sans-visuel>
  <p data-anime>${c.t('financement.mentions')} ${c.t('commun.aucunVersement')}</p>
</section>

${appel(c)}
`;

