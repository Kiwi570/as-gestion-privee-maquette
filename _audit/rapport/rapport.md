# Rapport d’audit

Projet : `as-gestion-privee-maquette` · 20/11/2026 22:03:41 · 1 min · 1 page(s) · audit complet ciblé sur / (étapes : fichiers, mesures)

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261120-210235-complet-cible-partiel` · version ?v=1
- Échecs : **0**
- À regarder : **10**
- Non lancé : **0**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), mesures (39), balayage (1)

## Passes de cette version (?v=1)

Chaque passe garde son rapport dans `_audit/passes/` : une relance ciblée ne fait pas disparaître la preuve d’une passe plus large.

| Passe | Niveau | Pages | Étapes | Échecs | À regarder | Non lancé | Statut |
|---|---|---|---|---:|---:|---:|---|
| 20261120-200106-rapide-cible | rapide | /financement,/patrimoine,/cabinet,/honoraires,/contact | toutes | 47 | 34 | 1 | échecs |
| 20261120-201855-standard | standard | toutes | toutes | 11 | 58 | 1 | échecs |
| 20261120-204117-standard-partiel | standard | toutes | fichiers, mesures, parcours | 2 | 32 | 0 | échecs |
| 20261120-204811-complet-partiel | complet | toutes | mesures, ecran | 2 | 27 | 0 | échecs |
| 20261120-205536-standard-cible-partiel | standard | /,/honoraires,/contact | fichiers, mesures, parcours | 0 | 16 | 0 | complet |
| 20261120-205954-complet-cible-partiel | complet | /contact,/ | mesures | 1 | 9 | 0 | échecs |
| **20261120-210235-complet-cible-partiel** (celle-ci) | complet | / | fichiers, mesures | 0 | 10 | 0 | complet |

## Échecs

Aucun.

## À regarder

### « à compléter » visible (1)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### clearProps « all » (1)

- **clearProps « all »** — assets/js/modules/formulaire-par-etapes/module.js : efface aussi les variables CSS posées dans le HTML ; nommer les propriétés (clearProps: 'transform,opacity')

### section sans visuel (3)

- **section sans visuel** — `/` — section#avis « AVIS Ce qu'en disent les clients. Six avis publiés » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(390×844 normal, 375×667 normal, 320×568 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_
- **section sans visuel** — `/` — section#honoraires « HONORAIRES Combien ça coûte ? Trois modes de rémun » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(390×844 normal, 375×667 normal, 320×568 normal, 844×390 normal, 768×1024 normal, 1024×768 normal, +33)_
- **section sans visuel** — `/` — section#affectio « Affectio societatis POURQUOI « AS » ? locution lat » — une belle photo ou un visuel animé quand le contenu s’y prête ; une section de texte peut rester typographique (v11) _(320×568 normal, 320×568 sansJs, 320×568 sansWebgl)_

### texte de contenu sous 13 px (ordinateur) (5)

- **texte de contenu sous 13 px (ordinateur)** — `/` — li.mission-cellule:nth-of-type(1) > a.mission > figure.media.mission-media > figcaption.mention-ia « Illustration générée » — 12.0 px : surtitres et légendes à 13 px au moins, textes de cartes à 15 px _(1024×768 normal, 1280×720 normal, 1366×768 normal, 1440×900 normal, 1728×1000 normal, 1920×1080 normal, +15)_
- **texte de contenu sous 13 px (ordinateur)** — `/` — li.mission-cellule:nth-of-type(2) > a.mission > figure.media.mission-media > figcaption.mention-ia « Illustration générée » — 12.0 px : surtitres et légendes à 13 px au moins, textes de cartes à 15 px _(1024×768 normal, 1280×720 normal, 1366×768 normal, 1440×900 normal, 1728×1000 normal, 1920×1080 normal, +15)_
- **texte de contenu sous 13 px (ordinateur)** — `/` — li.mission-cellule:nth-of-type(3) > a.mission > figure.media.mission-media > figcaption.mention-ia « Illustration générée » — 12.0 px : surtitres et légendes à 13 px au moins, textes de cartes à 15 px _(1024×768 normal, 1280×720 normal, 1366×768 normal, 1440×900 normal, 1728×1000 normal, 1920×1080 normal, +15)_
- **texte de contenu sous 13 px (ordinateur)** — `/` — li.mission-cellule:nth-of-type(4) > a.mission > figure.media.mission-media > figcaption.mention-ia « Illustration générée » — 12.0 px : surtitres et légendes à 13 px au moins, textes de cartes à 15 px _(1024×768 normal, 1280×720 normal, 1366×768 normal, 1440×900 normal, 1728×1000 normal, 1920×1080 normal, +15)_
- **texte de contenu sous 13 px (ordinateur)** — `/` — section#rendez-vous > div.conteneur.appel-grille > figure.media.appel-media > figcaption.mention-ia « Illustration générée » — 12.0 px : surtitres et légendes à 13 px au moins, textes de cartes à 15 px _(1024×768 normal, 1280×720 normal, 1366×768 normal, 1440×900 normal, 1728×1000 normal, 1920×1080 normal, +15)_

## Non lancé

Tout a été lancé.


## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 5 étape(s) notée(s), 62 min de travail pour 115 min de budget, 18 min d’attente de l’utilisateur.
- Journal : « aperçu de l'accueil en films » 9 min pour 5 prévues.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
