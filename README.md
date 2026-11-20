# AS Gestion Privée · maquette

Maquette du site d'AS Gestion Privée (Julien Morinière, Nantes) : intermédiaire en crédit immobilier et conseiller en gestion de patrimoine.
Site actuel : https://www.asgestionprivee.fr · Maquette : https://as-gestion-privee-maquette.vercel.app

Direction « Affectio » : tuffeau, ardoise et lie-de-vin, titres Newsreader, texte Instrument Sans. L'idée du site vient du nom du cabinet : *affectio societatis*, la volonté de s'associer pour un objectif commun. Elle se retrouve dans l'intro (le A et le S qui se rejoignent), dans les deux traits qui convergent en un point et dans le voile entre les pages (un rideau à deux pans).

Pages : accueil, financement, patrimoine, le cabinet, honoraires, contact, 404.

## À fournir par le client (à compléter)

| Information | Où | État |
|---|---|---|
| Mentions légales complètes (capital social, siège, directeur de la publication) | pied de page | à compléter |
| Politique de confidentialité (RGPD) | pied de page, formulaire de contact | à compléter |
| Hébergeur du site définitif (maquette : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis, adresse vérifiée sur vercel.com le 20 novembre 2026) | mentions légales | à compléter |
| SIRET : 814 246 815 00017, RCS Nantes (relevé INSEE) | mentions légales | à confirmer |
| Assurance responsabilité civile professionnelle (assureur, numéro de contrat) | mentions légales | à compléter |
| Médiateur de la consommation | mentions légales | à compléter |
| Déclaration services à la personne (numéro), qui conditionne le crédit d'impôt de 50 % | page Honoraires | à confirmer |
| Logo en bonne définition (SVG ou PNG de 1 000 px au moins) | en-tête, pied, intro, voile | à fournir : un monogramme « AS » provisoire est en place |
| Horaires d'ouverture ou de rendez-vous | contact | retirés faute d'information |
| Montants ou barèmes des honoraires | page Honoraires | non affichés : le site actuel n'en donne pas |
| Note et nombre d'avis Google | accueil, cabinet | non affichés : seuls les 6 avis du site actuel sont repris |
| Photos réelles du bureau et de la ville (à la place des illustrations générées) | toutes les pages | conseillé |

## Points de conformité relevés (à vérifier par le cabinet)

- Le site actuel dit « Courtier en crédit ». Le registre ORIAS (n° 15006348, consulté le 20 novembre 2026) inscrit le cabinet comme **mandataire d'intermédiaire en opérations de banque et en services de paiement (MIOBSP)** depuis le 12 mars 2019 (courtier COBSP supprimé le 15 février 2019), plus courtier d'assurance (COA) et conseiller en investissements financiers (CIF) depuis le 27 novembre 2015. La maquette reprend le libellé de l'ORIAS.
- Le site actuel n'affiche ni le numéro ORIAS, ni les associations professionnelles (La Compagnie IOBSP, La Compagnie CIF, CNCEF Assurance), ni la mention « Aucun versement, de quelque nature que ce soit, ne peut être exigé d'un particulier avant l'obtention d'un ou plusieurs prêts d'argent ». La maquette les affiche dans le pied de page de chaque page.
- Le crédit d'impôt de 50 % sur l'assistance administrative suppose une déclaration comme organisme de services à la personne : affiché « sous réserve ».
- Code APE : 7022Z dans les mentions légales actuelles, 66.19B à l'INSEE et à l'ORIAS.
- « Rémunération directement liée aux performances obtenues » (site actuel) : formulation non reprise ; la maquette dit « liée au service rendu ».
- Simulateurs : norme du HCSF (35 % des revenus nets, assurance comprise, 25 ans au plus, 27 ans en cas d'entrée différée), maintenue en 2026. Les taux affichés par défaut sont des exemples à modifier, et chaque simulateur porte la mention « simulation indicative » et « Un crédit vous engage et doit être remboursé… ».
- Page Patrimoine : avertissement sur le risque de perte en capital.

## Crédits des images

- Portraits de Julien Morinière : site actuel du cabinet.
- Illustrations générées (Grok) : cartes des quatre métiers, appel final de l'accueil, bandeau Financement, quai de la page Patrimoine, page 404. Chacune porte la mention « Illustration générée » : **à garder sur le site définitif**.

## À retirer à la mise en ligne définitive

- `noindex` : balise robots dans `source/gabarits/commun.mjs` et en-tête `X-Robots-Tag` dans `vercel.json`.
- Formulaire de rendez-vous simulé (page Contact) : brancher un vrai envoi.
- Mentions « à compléter » du pied de page : remplacer par les vraies pages légales.
- Mention « Maquette de démonstration » du pied de page.

## Technique

- Pages générées depuis les données : `node outils/generer.mjs` (textes dans `donnees/textes/fr.json` et `donnees/listes.json`). Ne jamais modifier les `.html` à la main.
- Images : pipeline de la bibliothèque (`plan-images.json`, `produire.mjs`), images de partage par `partage.mjs`.
- Modules de la bibliothèque repris : témoignages en pile (accueil), offre à tiroirs (honoraires), formulaire par étapes (contact).
- Audit : `node _audit/audit.mjs` (standard), `--complet` pour la version finale. Rapport dans `_audit/rapport/rapport.md`.
