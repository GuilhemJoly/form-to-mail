# Form to mail

![Image logo](src/assets/form-to-mail-logo-medium.png "Form to mail").

Version française [ici](README.fr.md)

## Description

This API allows you to receive emails via a contact form. It uses Express for the server, Nodemailer for sending emails, Jest for testing, and includes validation and rate limiting features.

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or Yarn (version 1.22 or higher)

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/GuilhemJoly/form-to-mail.git
cd form-to-mail 
```

### 2. Install dependencies

With npm:

```sh
npm install
npm install express nodemailer jest cors @babel/core @babel/preset-env @babel/preset-typescript
```

With Yarn:

```sh
yarn 
yarn add express nodemailer jest cors @babel/core @babel/preset-env @babel/preset-typescript
```

### 3. Create a .env file

Create a .env file at the root of the project and add the following environment variables :

```sh
EMAIL=votre-adresse-email@example.com
EMAIL_PASSWORD=votre-mot-de-passe-email
PORT=3001
```

### 4.  Start the server

With npm:

```sh
npm start
```

With Yarn:

```sh
yarn start
```

### Usage

The API exposes a POST route /api/send to send emails. Here is an example request using curl:

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

### Project Structure

- src/: Contient le code source de l'application.
  - config/: Configuration pour CORS, rate limiting, et Nodemailer.
  - middlewares/: Middlewares pour la validation des requêtes.
  - routes/: Définition des routes de l'API.
  - utils/: Utilitaires comme le logger.
- tests/: Contient les tests d'intégration pour l'API.

## Configuration

### Modify the origin URL in `cors.ts`

To allow CORS requests from your domain, you need to modify the origin URL in the `cors.ts` file. Open the `src/config/cors.ts` file and replace the origin URL with your domain's URL.

Example:

```typescript
const corsOptions = {
  credentials: true,
  origin: "https://votre-nom-de-domaine", //Replace with your domain's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  ......
```

Warning: if you leave `*` in `origin`, you will accept requests from all origins, which makes the use of CORS ineffective and poses a potential danger.

### Modify the origin URL in `vercel.json`

If you are using Vercel for deployment, a vercel.json file is already present. To allow CORS requests from your domain, you need to modify the origin URL at the indicated place:

```typescript
"headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "https://your-domain-name" },  //replace this part
        ......
```

**Warning:** if you leave `*` in `value`, you will accept requests from all origins, which makes the use of CORS ineffective and poses a potential danger.

### npm Scripts

- npm start: Starts the server using the compiled files.
- npm test: Runs tests with Jest.

### Yarn Scripts

- yarn start: Starts the server using the compiled files.
- yarn test: Runs tests with Jest.

### Tests

#### To run the tests with Jest, follow these steps

1. Install Jest: If not already installed, install Jest as a development dependency.

With npm:

```sh
npm install --save-dev jest
```

With Yarn:

```sh
yarn add --dev jest
```

2. Configure Jest: Add or modify the `scripts` section to include Jest in your `package.json` file :

```sh
{
  "scripts": {
    "test": "jest"
  }
}
```

3. Run the tests: Use the following command to run the tests with Jest.

With npm:

```sh
npm test
```

With Yarn:

```sh
yarn test
```

### Deployment

Don't forget to configure the environment variables (such as EMAIL, EMAIL_PASSWORD, and PORT) in your server or deployment service settings.

### License

This project is licensed under the CC BY-NC 4.0. See the [LICENSE](licence.md) file for more details.
