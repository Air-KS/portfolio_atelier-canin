/*
  backend/server.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const apirouter = require('./api/apirouter').router;
const errorHandler = require('./config/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

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

// Middleware pour parser les corps de requête JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware pour les logs
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Middleware pour les routes
app.use("/api", apirouter);

// Middleware pour gérer les erreurs
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
