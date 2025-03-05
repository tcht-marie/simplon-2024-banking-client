# Rapport suite au visionnage des vidéos

- Page d'accueil == login

  - Modifier le bouton "need to register" pour qu'il soit plus visible
  - Mettre un message d'erreur clair si user non connu en BDD
  - Mettre messages d'erreurs clairs si username ou password non remplis

- Page Payment Methods

  - Modifier l'emplacement du bouton +

- Page Transaction

  - Modifier l'emplacement du bouton +
  - Les transactions ne s'affichent pas dans l'ordre des dates
  - Problème de propositions lors du remplissage du premier champ ?
  - Mettre un message pour dire qu'il faut enregistrer un moyen de paiement avant d'enregistrer une transaction
  - Messages d'erreurs dans le formulaire

- Page Categories

  - Lors de la suppression d'un item, il ne se supprime pas tout de suite (obligé de recharger la page)

- Bouton Logout : manque le cursor (on ne le voit pas comme un bouton)

- Mode Mobile :
  - problème de responsive !!

### Lien

[Rapport lighthouse](./LIGHTHOUSECI.md)

### Corrections

- Page Home -> Login et Register :

  - changement de la couleur sur les boutons (bleu plus foncé)
  - changement des couleurs du hover
  - ajout de marges entre les deux boutons pour plus de visibilité
  - responsive pour mobile ok
  - ajout messages d'erreurs pour les inputs
  - ajout aria-label : à la div + au deuxième input

- Page Transactions :

  - ajout message pour dire qu'il faut ajouter un moyen de paiement avant d'ajouter une transaction + click sur message pour accès direct à la page payment methods
  - déplacement du bouton d'ajout de transactions pour qu'il soit plus visible et accessible au user
  - changement couleur du bouton et du hover
  -
