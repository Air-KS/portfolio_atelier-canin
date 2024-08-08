/*
  ./backend/api/apirouter.js
*/

const express = require("express");
const usersctrl = require('../routes/usersctrl'); // Chemin corrigé
const usersinfoctrl = require('../routes/usersinfoctrl');
const services = require('../routes/services');
const appointments = require('../routes/appointments');

exports.router = (function () {
  // Création du routeur
  var apiRouter = express.Router();

  // Définition des routes liées aux utilisateurs
  apiRouter.route("/users/register").post(usersctrl.register);
  apiRouter.route("/users/login").post(usersctrl.login);
  apiRouter.route("/users/:id").delete(usersctrl.userdelete);
  apiRouter.route("/users/reset").put(usersctrl.resetpassword);
  apiRouter.route("/users/logout").post(usersctrl.UserLogout);

  // Routes pour les informations utilisateur
  apiRouter.route("/users/:id").get(usersinfoctrl.getUserProfile);
  apiRouter.route("/users/:id").put(usersinfoctrl.updateUserProfile);
  apiRouter.route('/users/:id/role').put(usersinfoctrl.updateUserRole);
  apiRouter.route("/users").get(usersinfoctrl.getAllUsers);

  apiRouter.route("/users/verify").post(usersctrl.verifyCode);
  apiRouter.route("/users/complete-registration").post(usersctrl.completeRegistration);

  // Routes pour les services
  apiRouter.use('/services', services);

  // Routes pour les rendez-vous
  apiRouter.use('/appointments', appointments);

  return apiRouter;
})();
