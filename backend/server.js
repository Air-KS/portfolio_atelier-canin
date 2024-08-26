/*
  backend/server.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Ajout du cookie-parser

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const apirouter = require('./api/apirouter').router;
const errorHandler = require('./config/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

// Configurer Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Utiliser cookie-parser pour gérer les cookies
app.use(cookieParser('your_secret_key'));

// Configurer les sessions en mémoire (sans persistance dans la base de données)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Assure-toi que ce soit false en développement
    sameSite: 'lax', // ou 'strict' selon le besoin
    httpOnly: true,
    maxAge: 15 * 60 * 1000
  }
}));

// Logger l'état de la session avant chaque requête
app.use((req, res, next) => {
  console.log(`Session ID: ${req.sessionID}`); // Log de l'ID de session
  console.log(`Session avant la requête: ${JSON.stringify(req.session)}`);
  next();
});

// Sécuriser les en-têtes HTTP
app.use(helmet());
app.use(helmet({
  xssFilter: false,
  frameguard: false // Désactiver X-Frame-Options
}));

// Définir Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  next();
});

// Désactiver la mise en cache des réponses dynamiques
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Parser les corps de requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Activer CORS
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Cette ligne est cruciale pour permettre les cookies
  optionsSuccessStatus: 200 // Pour contourner les problèmes de compatibilité avec certains navigateurs
}));

// Logger les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Utiliser le routeur API
app.use("/api", apirouter);
app.use(errorHandler);

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route de test pour les sessions
app.get('/test-session', (req, res) => {
  if (req.session.test) {
    res.send(`Session active, valeur: ${req.session.test}`);
  } else {
    req.session.test = 'Bonjour';
    res.send('Nouvelle session initialisée.');
  }
});

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port http://0.0.0.0:${port}`);
});
