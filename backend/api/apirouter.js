/*
  ./backend/api/apirouter.js
*/

const express = require("express");
const usersctrl = require('../routes/usersctrl'); // Chemin corrigé


exports.router = (function () {
  // Création du routeur
  var apiRouter = express.Router();

  // Définition des routes liées aux utilisateurs
  apiRouter.route("/users/register").post(usersctrl.register);
  apiRouter.route("/users/login").post(usersctrl.login);
  apiRouter.route("/users").get(usersctrl.getAllUsers);
  apiRouter.route('/users/:id/role').put(usersctrl.updateUserRole);
  apiRouter.route("/users/delete").delete(usersctrl.userdelete);
  apiRouter.route("/users/:id").delete(usersctrl.userdelete);
  apiRouter.route("/users/reset").put(usersctrl.resetpassword);
  apiRouter.route("/users/logout").post(usersctrl.UserLogout);

  return apiRouter;
})();
