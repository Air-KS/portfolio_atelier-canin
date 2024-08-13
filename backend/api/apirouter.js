/*
  ./backend/api/apirouter.js
*/

const express = require("express");
const authctrl = require('../routes/authctrl');
const userctrl = require('../routes/userctrl');
const services = require('../routes/services');
const appointments = require('../routes/appointments');

exports.router = (function () {
  // Création du routeur
  var apiRouter = express.Router();

  // Définition des routes liées à l'authentification
  apiRouter.use('/auth', authctrl); // Montage direct des routes auth

  // Routes pour la gestion des utilisateurs
  apiRouter.use('/user', userctrl); // Montage direct des routes user

  // Routes pour les services
  apiRouter.use('/services', services);

  // Routes pour les rendez-vous
  apiRouter.use('/appointments', appointments);

  return apiRouter;
})();
