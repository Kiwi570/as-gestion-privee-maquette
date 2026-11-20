/* Patrimoine : ouverture plein cadre (le quai), frise des temps de la vie qui glisse, placements,
   immobilier (bande ardoise, spécialité du cabinet), assurances, missions de conseil, avertissement. */
import { html, brut } from '../../outils/gabarit.mjs';
import { tete, listes, appel, ouvTexte, fleche } from '../gabarits/blocs.mjs';

export const page = { cle: 'patrimoine', fichier: 'patrimoine', imagePartage: 'grok/patrimoine-ouverture-1280.webp' };

const bloc = (c, cle, image, alt, { inverse = false, sombre = false } = {}) => html`<section class="solution${inverse ? ' solution--inverse' : ''}${sombre ? ' theme-sombre' : ''}" id="${cle}">
  <div class="conteneur solution-grille">
    ${c.media({ nom: image, alt, classe: 'solution-media', sizes: '(max-width: 760px) 100vw, 42vw', ratio: '4 / 5', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
    <div class="solution-texte">
      ${tete(c, `patrimoine.${cle}`, { texte: true })}
      <ul class="solution-points" data-anime="cascade">${listes(c, `patrimoine.${cle}.points`).map((p) => html`<li>${p}</li>`)}</ul>
      <p data-anime>${c.lien('contact', { ancre: 'rendez-vous', params: `sujet=${cle}`, classe: 'lien-fleche', texte: html`${c.t('commun.appelAction')}${fleche}` })}</p>
    </div>
  </div>
</section>`;

const icones = [
  '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>',
  '<path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6"/>',
  '<path d="M7 3h7l4 4v14H7zM14 3v4h4M10 13l2 2 4-4"/>',
];

export default (c) => html`
<section class="ouv ouv-plein theme-sombre" id="debut">
  ${c.media({ nom: 'grok/patrimoine-ouverture', alt: c.s('patrimoine.ouverture.alt'), cadrage: '62% 50%', cadrageMobile: '50% 60%', priorite: true, classe: 'ouv-plein-media', sizes: '100vw', attrs: 'data-iris-centre data-effet="quai"' })}
  <div class="conteneur ouv-plein-texte">
    ${ouvTexte(c, 'patrimoine.ouverture', { params: 'sujet=patrimoine' })}
  </div>
</section>

<section class="temps" id="temps" data-effet="frise">
  <div class="conteneur">${tete(c, 'patrimoine.temps', { texte: true, classe: 'tete-section--large' })}</div>
  <div class="frise-fenetre" data-galerie>
    <ol class="frise-piste">
      ${listes(c, 'patrimoine.temps.items').map((t, i, l) => html`<li class="temps-carte temps"><span class="temps-rang" aria-hidden="true">${String(i + 1)} / ${String(l.length)}</span><h3>${t.titre}</h3><p>${t.texte}</p></li>`)}
    </ol>
  </div>
  <div class="conteneur frise-progres" aria-hidden="true"><span></span></div>
</section>

${bloc(c, 'placements', 'grok/mission-placements', "Carnet ouvert sur des courbes tracées à l'encre, un stylo plume en travers")}
${bloc(c, 'immobilier', 'grok/mission-immobilier', 'Façade d’un hôtel particulier en pierre claire aux balcons en fer forgé', { inverse: true, sombre: true })}
${bloc(c, 'assurances', 'grok/mission-assurances', 'Couple âgé marchant bras dessus bras dessous au bord d’un fleuve, vu de dos')}

<section class="conseil conteneur" id="conseil">
  ${tete(c, 'patrimoine.conseil', { classe: 'tete-section--large' })}
  <ul class="conseil-grille" data-anime="cascade">
    ${listes(c, 'patrimoine.conseil.items').map((m, i) => html`<li class="conseil-carte" data-survol="incline" data-survol-force="4"><svg class="role-icone" viewBox="0 0 24 24" aria-hidden="true">${brut(icones[i])}</svg><h3>${m.titre}</h3><p>${m.texte}</p></li>`)}
  </ul>
  <p data-anime>${c.lien('honoraires', { ancre: 'conseil', classe: 'lien-fleche', texte: html`${c.t('patrimoine.conseil.lien')}${fleche}` })}</p>
  <p class="risques" data-anime>${c.t('patrimoine.risques')}</p>
</section>

${appel(c)}
`;
