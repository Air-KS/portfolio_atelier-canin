/*
  backend/routes/usersctrl.js
*/

// Import des modules nécessaires
const bcrypt = require('bcrypt');
const jwtUtils = require("../utils/jwt");
const { Register, UsersInfo } = require('../models');

// Validation des données avec regex
const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = {
  // Fonction pour enregistrer un nouvel utilisateur
  register: async function (req, res) {
    console.log("Fonction register appelée");
    try {
      console.log("Vérification des champs - S'inscrire");
      const { email, password } = req.body;

      // Affichage des données reçues dans la console
      console.log("Données reçues :", req.body);
      console.log("Email:", email);
      console.log("Mot de passe:", password);

      // Vérifie que tous les champs obligatoires sont remplis
      if (!email || !password) {
        return res.status(400).json({ error: "Les champs obligatoires sont manquants" });
      }

      // Valide le format de l'e-mail
      if (!emailREGEX.test(email)) {
        return res.status(400).json({ error: "Email non valide" });
      }

      // Valide le format du mot de passe
      if (!passwordREGEX.test(password)) {
        return res.status(400).json({
          error: "Votre mot de passe doit contenir :\n\n8 caractères minimum,\nune majuscule,\nune minuscule,\nun chiffre,\nun caractère spécial",
        });
      }

      // Vérifie si l'email existe déjà dans la table `UsersInfo`
      const userFound = await UsersInfo.findOne({
        attributes: ["email"],
        where: { email: email },
      });
      if (userFound) {
        return res.status(400).json({ error: "Cette adresse e-mail est déjà utilisée" });
      }

      // Hashage du mot de passe et création de l'utilisateur
      const bcryptedPassword = await bcrypt.hash(password, 5);
      const newRegister = await Register.create({
        email: email,
        password: bcryptedPassword,
        is_admin: false
      });

      // Création des informations de base dans `UsersInfo`
      await UsersInfo.create({
        register_id: newRegister.id,
        email: email,
      });

      // Vérification de la création de l'utilisateur et envoi de la réponse
      if (newRegister) {
        console.log("Nouvel utilisateur créé avec succès");
        return res.status(201).json({ register_id: newRegister.id });
      } else {
        console.log("Échec de la création de l'utilisateur");
        return res.status(400).json({ error: "Échec de l'enregistrement" });
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible d'ajouter cet utilisateur" });
    }
  },

  // Fonction pour connecter un utilisateur
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Vérifie que tous les champs sont remplis
      if (!email || !password) {
        return res.status(400).json({ error: "Les paramètres sont manquants" });
      }

      // Recherche de l'utilisateur dans la base de données par email
      const userInfoFound = await UsersInfo.findOne({
        where: { email: email },
        include: [{ model: Register }]
      });

      // Vérification si l'utilisateur existe ou non
      if (!userInfoFound) {
        console.log("L'utilisateur n'existe pas");
        return res.status(400).json({ error: "Utilisateur n'existe pas" });
      }

      // Comparaison du mot de passe pour authentification
      const passwordMatch = await bcrypt.compare(password, userInfoFound.Register.password);

      // Gestion des cas où le mot de passe ne correspond pas
      if (!passwordMatch) {
        console.log("Mot de passe incorrect");
        return res.status(400).json({ error: "Mot de passe incorrect" });
      }

      // Envoi du token après authentification réussie
      const token = jwtUtils.generateTokenForUser(userInfoFound);

      // Affichage des informations de connexion dans le terminal
      console.log({
        userId: userInfoFound.Register.id,
        token: token,
        isAdmin: userInfoFound.Register.is_admin,
        register_id: userInfoFound.register_id,
        last_name: userInfoFound.last_name,
        first_name: userInfoFound.first_name,
        date_of_birth: userInfoFound.date_of_birth,
        email: userInfoFound.email,
        phone: userInfoFound.phone,
        address_one: userInfoFound.address_one,
        address_two: userInfoFound.address_two,
        city: userInfoFound.city,
        zip_code: userInfoFound.zip_code,
        country: userInfoFound.country,
        created_at: userInfoFound.created_at,
        updated_at: userInfoFound.updated_at
      });

      return res.status(200).json({
        userId: userInfoFound.Register.id,
        token: token,
        isAdmin: userInfoFound.Register.is_admin
      });
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible de se connecter" });
    }
  },

  userdelete: async (req, res) => {
    // Implémentez la logique de suppression ici
  },

  resetpassword: async (req, res) => {
    // Implémentez la logique de réinitialisation du mot de passe ici
  },

  UserLogout: async (req, res) => {
    // Implémentez la logique de déconnexion ici
  }
};
