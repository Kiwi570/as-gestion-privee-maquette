/* Contact : téléphone en grand et plan de Nantes où la Loire se trace, puis la demande de rendez-vous
   en quatre étapes (module formulaire-par-etapes, envoi simulé). */
import { html, brut } from '../../outils/gabarit.mjs';
import { tete, carteNantes } from '../gabarits/blocs.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/accueil-appel-1280.webp' };

const ic = {
  financement: '<path d="M6 27V13l10-7 10 7v14M12 27v-8h8v8"/>',
  placements: '<path d="M5 25c6-2 8-10 12-14s7-5 10-5M5 25h22"/>',
  immobilier: '<path d="M6 27V9h12v18M18 15h8v12M10 13h4M10 18h4M10 23h4"/>',
  assurances: '<path d="M16 4l10 4v7c0 7-5 11-10 13C11 26 6 22 6 15V8z"/>',
  autre: '<path d="M6 9h20v13H13l-5 4v-4H6z"/>',
};

export default (c) => html`
<section class="ouv ouv-contact conteneur" id="debut">
  <div>
    <p class="surtitre ouv-suite" data-anime="gsap">${c.t('contact.ouverture.surtitre')}</p>
    <h1 data-anime="gsap"><span class="ligne-masque"><span class="ouv-ligne">Prenons</span></span><span class="ligne-masque"><span class="ouv-ligne"><em>rendez-vous.</em></span></span></h1>
    <p class="ouv-texte ouv-suite" data-anime="gsap">${c.t('contact.ouverture.texte')}</p>
    <p class="ouv-actions ouv-suite" data-anime="gsap"><a class="bouton" href="#rendez-vous" data-action-principale data-sans-transition>${c.t('contact.ouverture.action')}</a><a class="coord-tel" href="tel:${c.site.contact.telephoneLien}" data-info-cle>${c.site.contact.telephone}</a></p>
    <dl class="coordonnees ouv-suite" data-anime="gsap">
      <div><dt>${c.t('commun.email')}</dt><dd class="selectionnable">${c.site.contact.email}</dd></div>
      <div><dt>${c.t('commun.adresse')}</dt><dd>${c.site.contact.adresse}</dd></div>
    </dl>
  </div>
  ${carteNantes(c, 'contact.carte.plan', { centre: true })}
</section>

<section class="fpe demande theme-sombre" id="rendez-vous" data-module="formulaire-par-etapes" aria-labelledby="demande-titre">
  <div class="conteneur demande-grille">
    <div class="fpe__tete">
      <p class="surtitre">${c.t('contact.formulaire.surtitre')}</p>
      <h2 class="titre-section" id="demande-titre" data-anime="lignes">${c.tb('contact.formulaire.titre')}</h2>
      <p class="fpe__note">${c.t('contact.formulaire.simule')}</p>
    </div>
    <div class="fpe__carton">
      <form class="fpe__form" action="#" method="post" novalidate>
        <div class="fpe__progression">
          <ol class="fpe__reperes" aria-label="Progression"></ol>
          <div class="fpe__barre" aria-hidden="true"><span></span></div>
          <p class="fpe__etat" aria-live="polite"></p>
        </div>
        <fieldset class="fpe__etape" data-etape="Votre projet">
          <legend class="fpe__legende"><h3 class="fpe__titre">${'Quel est votre projet ?'}</h3></legend>
          <div class="fpe__groupe fpe__cartes" data-libelle="Projet">
            ${[['financement', 'Un financement', 'Achat, investissement, renégociation.'], ['placements', 'Des placements', 'Épargne, portefeuille, fiscalité.'], ['immobilier', 'De l’immobilier', 'Investissement locatif.'], ['assurances', 'Des assurances', 'Retraite, prévoyance, transmission.'], ['autre', 'Autre chose', 'Audit, SCI, donation, une question.']].map(([v, t, d], i) => html`<label class="fpe__carte"><input type="radio" name="projet" value="${v}"${i === 0 ? brut(' required') : ''}>
              <svg class="fpe__icone" viewBox="0 0 32 32" aria-hidden="true">${brut(ic[v])}</svg>
              <span class="fpe__carte-titre">${t}</span><span class="fpe__carte-texte">${d}</span></label>`)}
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="Précisions">
          <legend class="fpe__legende"><h3 class="fpe__titre">${'Quelques mots sur votre situation'}</h3></legend>
          <fieldset class="fpe__groupe" data-min="1">
            <legend class="fpe__groupe-titre">Votre horizon <i aria-hidden="true">*</i></legend>
            <div class="fpe__puces">
              <label class="fpe__puce"><input type="checkbox" name="horizon" value="3-mois"><span class="fpe__choix-texte">Dans les 3 mois</span></label>
              <label class="fpe__puce"><input type="checkbox" name="horizon" value="annee"><span class="fpe__choix-texte">Dans l'année</span></label>
              <label class="fpe__puce"><input type="checkbox" name="horizon" value="renseigne"><span class="fpe__choix-texte">Je me renseigne</span></label>
            </div>
          </fieldset>
          <div class="fpe__champ">
            <label for="fpe-message">Votre message <i aria-hidden="true">*</i></label>
            <textarea id="fpe-message" name="message" rows="5" minlength="10" required placeholder="Votre projet, votre calendrier, vos questions"></textarea>
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="Coordonnées">
          <legend class="fpe__legende"><h3 class="fpe__titre">${'Comment vous joindre ?'}</h3></legend>
          <div class="fpe__grille">
            <div class="fpe__champ"><label for="fpe-prenom">Prénom <i aria-hidden="true">*</i></label><input id="fpe-prenom" name="prenom" autocomplete="given-name" required></div>
            <div class="fpe__champ"><label for="fpe-nom">Nom <i aria-hidden="true">*</i></label><input id="fpe-nom" name="nom" autocomplete="family-name" required></div>
            <div class="fpe__champ"><label for="fpe-email">E-mail <i aria-hidden="true">*</i></label><input id="fpe-email" name="email" type="email" autocomplete="email" required></div>
            <div class="fpe__champ"><label for="fpe-tel">Téléphone</label><input id="fpe-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9 +().\\-]{8,20}"></div>
          </div>
          <label class="fpe__case"><input type="checkbox" name="accord" value="oui" required data-libelle="Accord" data-hors-recap><span class="fpe__choix-texte">J'accepte que ces informations servent uniquement à répondre à ma demande (politique de confidentialité : à compléter). <i aria-hidden="true">*</i></span></label>
          <p class="fpe__aide">Les champs marqués d'un astérisque sont obligatoires.</p>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="Récapitulatif" data-recap>
          <legend class="fpe__legende"><h3 class="fpe__titre">${'Tout est juste ?'}</h3></legend>
          <div class="fpe__recap"><p>Le récapitulatif de vos réponses s'affiche ici.</p></div>
        </fieldset>
        <div class="fpe__nav">
          <button class="fpe__bouton fpe__bouton--ligne" type="button" data-precedent>Retour</button>
          <button class="fpe__bouton" type="button" data-suivant data-retour="Revenir au récapitulatif">Continuer</button>
          <button class="fpe__bouton" type="submit">Envoyer la demande</button>
        </div>
      </form>
      <div class="fpe__fin" hidden>
        <svg class="fpe__coche" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28"/><path d="M20 33l8 8 16-17"/></svg>
        <h3>Merci, votre demande est prête.</h3>
        <p data-resume></p>
        <p>${"Maquette : rien n'a été envoyé. Sur le site en ligne, la demande serait transmise à Julien Morinière."}</p>
        <button class="fpe__bouton fpe__bouton--ligne" type="button" data-recommencer>Nouvelle demande</button>
      </div>
    </div>
  </div>
</section>
`;
