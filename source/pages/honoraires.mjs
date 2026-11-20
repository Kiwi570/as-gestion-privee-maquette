/* Honoraires : « Combien ça coûte ? » et son grand point d'interrogation qui se trace, les trois modes en tiroirs
   (module offre-a-tiroirs), la calculette du crédit d'impôt (bande ardoise), la FAQ. */
import { html, brut } from '../../outils/gabarit.mjs';
import { tete, listes, appel, faq, ouvTexte, fleche } from '../gabarits/blocs.mjs';

export const page = { cle: 'honoraires', fichier: 'honoraires', imagePartage: 'grok/mission-financement-960.webp' };

export default (c) => html`
<section class="ouv ouv-question-section conteneur" id="debut">
  <div class="ouv-question-texte">${ouvTexte(c, 'honoraires.ouverture', { params: 'sujet=honoraires' })}</div>
  <div class="ouv-question-cadre" data-iris-centre data-effet="interrogation">
    <svg class="ouv-question" viewBox="0 0 300 420" aria-hidden="true" data-visuel>
      <path d="M70 120 C 70 50, 130 20, 170 22 C 225 25, 250 70, 248 110 C 245 160, 200 180, 175 205 C 155 225, 150 245, 150 290" pathLength="1"/>
      <circle cx="150" cy="355" r="18"/>
    </svg>
  </div>
</section>

<section class="ofr modes conteneur" id="modes" data-module="offre-a-tiroirs">
  <div class="ofr__tete">${tete(c, 'honoraires.modes', { classe: 'tete-section--large' })}</div>
  <div class="ofr__corps">
    <ol class="ofr__tiroirs">
      ${listes(c, 'honorairesModes').map((m) => html`<li class="ofr__tiroir" id="${m.id}" data-sujet="${m.nom}">
        <h3 class="ofr__titre"><button type="button" class="ofr__poignee">
          <span class="ofr__nom">${m.nom}</span><span class="ofr__resume">${m.resume}</span><span class="ofr__prix">${m.prix}</span>
        </button></h3>
        <div class="ofr__contenu"><div class="ofr__interieur">
          <p>${m.texte}</p>
          <ul>${m.points.map((p) => html`<li>${p}</li>`)}</ul>
          ${c.lien('contact', { ancre: 'rendez-vous', params: `sujet=${m.sujet}`, classe: 'bouton ofr__parler', texte: c.t('honoraires.modes.parler') })}
        </div></div>
      </li>`)}
    </ol>
  </div>
</section>

<section class="calcul theme-sombre" id="calcul">
  <div class="conteneur calcul-grille">
    ${tete(c, 'honoraires.calcul', { texte: true })}
    <form class="calcul-carte" data-effet="credit-impot" novalidate>
      <div class="simu-champ">
        <label for="ci-montant">${c.t('honoraires.calcul.montant')}</label>
        <output for="ci-montant" class="simu-valeur" data-valeur-de="ci-montant" data-unite="€">1 200 €</output>
        <input type="range" id="ci-montant" name="ci-montant" min="100" max="6000" step="100" value="1200">
      </div>
      <div class="ci-barres" data-visuel aria-hidden="true"><span class="ci-reste"></span><span class="ci-credit"></span></div>
      <dl class="simu-chiffres">
        <div><dt>${c.t('honoraires.calcul.credit')}</dt><dd data-sortie="credit" data-prix>0 €</dd></div>
        <div class="simu-principal"><dt>${c.t('honoraires.calcul.reste')}</dt><dd data-sortie="reste" data-prix>0 €</dd></div>
      </dl>
      <p class="simu-aide">${c.t('honoraires.calcul.reserve')}</p>
    </form>
  </div>
</section>

${faq(c, 'honoraires.faq', listes(c, 'honoraires.faq.items'))}

<section class="mentions conteneur" id="mentions" data-sans-effet data-sans-visuel>
  <p data-anime>${c.t('commun.aucunVersement')} ${c.t('commun.creditEngage')}</p>
</section>

${appel(c)}
`;
