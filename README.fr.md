# Form to mail

![Image logo](src/assets/form-to-mail-logo-medium.png "Form to mail").

English version [here](README.md)

## Description

Cette API permet de recevoir des emails via un formulaire de contact. Elle utilise Express pour le serveur, Nodemailer pour l'envoi d'emails, Jest pour les tests et inclut des fonctionnalités de validation et de limitation des requêtes.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

### 1. Cloner le dépôt

```sh
git clone https://github.com/GuilhemJoly/form-to-mail.git
cd form-to-mail 
```

### 2. Installer les dépendances

Avec npm:

```sh
npm install
npm install express nodemailer jest cors @babel/core @babel/preset-env @babel/preset-typescript
```

Avec Yarn:

```sh
yarn 
yarn add express nodemailer jest cors @babel/core @babel/preset-env @babel/preset-typescript
```

### 3. Créer un fichier .env

 Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :

```sh
EMAIL=votre-adresse-email@example.com
EMAIL_PASSWORD=votre-mot-de-passe-email
PORT=3001
```

### 4. Démarrer le serveur

```sh
npm start
```

Avec Yarn:

```sh
yarn start
```

### Utilisation

L'API expose une route POST /api/send pour envoyer des emails. Voici un exemple de requête avec curl :

```sh
curl -X POST http://localhost:3001/api/send \
-H "Content-Type: application/json" \
-d '{
  "firstname": "Tom",
  "lastname": "Pote",
  "email": "tom.pote@example.com",
  "subject": "Test Subject",
  "message": "This is a test message."
}'
```

### Structure du projet

- src/: Contient le code source de l'application.
  - config/: Configuration pour CORS, rate limiting, et Nodemailer.
  - middlewares/: Middlewares pour la validation des requêtes.
  - routes/: Définition des routes de l'API.
  - utils/: Utilitaires comme le logger.
- tests/: Contient les tests d'intégration pour l'API.
  
## Configuration

### Modifier l'URL d'origine dans `cors.ts`

Pour permettre les requêtes CORS depuis votre domaine, vous devez modifier l'URL d'origine dans le fichier `cors.ts`. Ouvrez le fichier `src/config/cors.ts` et remplacez l'URL d'origine par celle de votre domaine.

Exemple :

```typescript
const corsOptions = {
  credentials: true,
  origin: "https://votre-nom-de-domaine", //remplacer cette partie
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  ......
```

Attention : si vous laissez `*` dans `origin` , vous accepterez les requêtes depuis toutes les origines, ce qui rend l'utilisation des CORS inefficace et représente un danger potentiel.

### Modifier l'URL d'origine dans `vercel.json`

Si vous utilisez Vercel pour le deploiement, un fichier vercel.json est déjà présent. Pour permettre les requêtes CORS depuis votre domaine, vous devez modifier l'URL d'origine à l'endroit indiqué :

```typescript
"headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "https://votre-nom-de-domaine" },  //remplacer cette partie
        ......
```

Attention : si vous laissez `*` dans `value` , vous accepterez les requêtes depuis toutes les origines, ce qui rend l'utilisation des CORS inefficace et représente un danger potentiel.

### Scripts npm

- npm start: Démarre le serveur en utilisant les fichiers compilés.
- npm test: Exécute les tests avec Jest.

### Scripts Yarn

- yarn start: Démarre le serveur en utilisant les fichiers compilés.
- yarn test: Exécute les tests avec Jest.
  
### Tests

### Pour exécuter les tests, suivez ces étapes

1. Installation de Jest: si ça n'est pas déjà fait, installez Jest en tant que dépendance.

Avec npm:

```sh
npm install --save-dev jest
```

Avec Yarn:

```sh
yarn add --dev jest
```

2. Configuration de Jest : Ajoutez ou modifiez la section `scripts` pour inclure Jest dans votre fichier `package.json` :

```sh
{
  "scripts": {
    "test": "jest"
  }
}
```

3. Exécution des tests : Utilisez la commande suivante pour exécuter les tests avec Jest.

Avec npm:

```sh
npm test
```

Avec Yarn:

```sh
yarn test
```

### Déploiement

N'oubliez pas de configurer les variables d'environnement (comme EMAIL, EMAIL_PASSWORD, et PORT) dans les paramètres de votre serveur ou service de déploiement.

## Licence

Ce projet est sous licence CC BY-NC 4.0. Voir le fichier [LICENSE](licence.fr.md) pour plus de détails.
