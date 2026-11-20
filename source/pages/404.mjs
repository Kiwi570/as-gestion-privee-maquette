/* Page 404 : le bureau vide, et deux traits qui ne se rejoignent pas. */
import { html } from '../../outils/gabarit.mjs';
import { deuxTraits } from '../gabarits/blocs.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="ouv introuvable conteneur" id="debut">
  <div>
    <p class="surtitre ouv-suite" data-anime="gsap">${c.t('introuvable.surtitre')}</p>
    <h1 data-anime="gsap"><span class="ligne-masque"><span class="ouv-ligne">${c.tb('introuvable.titre')}</span></span></h1>
    <p class="ouv-texte ouv-suite" data-anime="gsap">${c.t('introuvable.texte')}</p>
    <p class="ouv-actions ouv-suite" data-anime="gsap">${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
    <p class="ouv-info ouv-suite" data-info-cle data-anime="gsap">${c.site.contact.telephone}</p>
    ${deuxTraits({ classe: 'deux-traits--404', effet: 'deux-traits', nulle: true })}
  </div>
  ${c.media({ nom: 'grok/page-404', alt: c.s('introuvable.alt'), priorite: true, classe: 'introuvable-media', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-iris-centre' })}
</section>
`;
