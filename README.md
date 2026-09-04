# Mémé TODO — v2 : cadre + menu

**Statut : nouvelle version, à tester en ligne avant mise en production.**
**Créée le 3 septembre 2026.**

## Ce que fait cette version

Le site reste sur une seule page (`index.html`). Une barre est désormais
fixée en haut de l'écran en permanence, avec :
- le nom « Mémé TODO » à gauche, qui ramène à l'accueil ;
- un bouton à trois barres horizontales à droite, qui ouvre un petit
  menu (Accueil / Législation / Jurisprudence / Doctrine).

Quand on clique sur une carte (ou un lien du menu), le site **ne quitte
plus la page** : l'accueil est masqué et l'application choisie s'affiche
dans un cadre (`iframe`) qui occupe toute la hauteur disponible sous la
barre — c'est exactement l'effet « fenêtre légèrement plus petite »
avec menu que vous décriviez. Le bouton menu reste accessible en
permanence pour changer d'assistant ou revenir à l'accueil.

La navigation utilise l'adresse de la page (`#legislation`,
`#jurisprudence`, `#doctrine`, `#accueil`) : le bouton « Précédent » du
navigateur fonctionne, et un lien direct vers `...#doctrine` ouvre
la page directement sur l'assistant Doctrine.

## Bannière (mise à jour du 4 septembre 2026)

Le titre « Mémé TODO » et l'accroche ne sont plus incrustés dans
l'image : ce sont désormais de vrais textes HTML posés sur une photo
sans texte. Ils gardent donc une taille lisible quelle que soit la
largeur de l'écran, et deviennent accessibles aux lecteurs d'écran et
aux moteurs de recherche.

Le comportement s'adapte à la largeur :
- **au-delà de 720 px** (bureau, tablette) : le texte est superposé à
  gauche, sur la zone sombre et floue de la photo (`banniere.jpg`) ;
- **en dessous de 720 px** (smartphone) : la photo devient un bandeau
  recadré sur le personnage (`banniere-mobile.jpg`, format 3:2) et le
  texte passe dessous, centré, à taille fixe.

Pour modifier le texte de la bannière, éditer le bloc
`<div class="hero__texte">` dans `index.html` — plus besoin de
retoucher une image.

## Structure

```
index.html                    page unique : accueil + cadre applicatif
assets/css/style.css          styles (palette v1 + barre/menu/cadre + bannière)
assets/js/app.js              logique du menu et du chargement dans le cadre
assets/img/banniere.jpg       bannière sans texte (bureau et tablette)
assets/img/banniere-mobile.jpg  recadrage 3:2 sur le personnage (smartphone)
assets/img/bibliotheque.jpg   fond de la section des 3 sources
```

Les 3 URL des applications sont centralisées en un seul endroit, tout
en haut de `assets/js/app.js` (`var routes = {...}`) — c'est là qu'il
faudra modifier une adresse le jour où une application change d'URL.

## ⚠️ À tester une fois en ligne

Cette version repose sur l'affichage des 3 applications **dans un
cadre**, alors qu'elles vivent sur un autre domaine
(`ilemineur-prog.github.io`) que le site principal (à terme,
`mememtodo.be`). La grande majorité des sites GitHub Pages acceptent
d'être affichés en cadre, mais ce n'est vérifiable qu'une fois les deux
sites réellement en ligne — je n'ai pas pu le tester depuis mon
environnement de travail, qui n'a pas accès à ces adresses.

**Comment vérifier :** une fois le site déployé, cliquez sur chaque
carte. Si l'assistant s'affiche normalement dans le cadre : tout va
bien. Si le cadre reste vide ou affiche un message de refus
(« refused to connect », page blanche persistante) : l'application
concernée bloque son affichage en cadre, et il faudra revenir à un
lien classique pour elle (comme en v1) plutôt que de forcer le cadre.

## Autres points de vigilance

- **Mobile** : la hauteur du cadre suit la fenêtre du navigateur ; sur
  certains mobiles, la barre d'adresse qui apparaît/disparaît au
  défilement peut légèrement décaler la mesure. À vérifier sur un
  téléphone réel une fois en ligne — un ajustement est facile à faire
  si besoin.
- **Sans JavaScript** : un message avec les 3 liens directs s'affiche
  en secours (balise `noscript`), au cas où.

## Si la v2 pose problème en production

La v1 (`../v1-liens-simples/`) reste disponible et fonctionnelle : il
suffit de la redéployer à la place le temps de résoudre le souci.

## Déploiement GitHub Pages

Identique à la v1 : pousser le contenu de ce dossier sur un dépôt
GitHub, activer GitHub Pages, puis associer le nom de domaine une fois
acheté (fichier `CNAME` + DNS chez le registrar).
