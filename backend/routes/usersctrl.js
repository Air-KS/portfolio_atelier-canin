/*
  backend/routes/usersctrl.js
*/

// Import des modules nécessaires
const bcrypt = require('bcrypt');
const jwtUtils = require("../utils/jwt");
const { Register, UsersInfo, Role } = require('../models'); // Assurez-vous que Role est inclus ici

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
        role_id: 1 // Par défaut, 'client'
      });

      // Création des informations de base dans `UsersInfo`
      await UsersInfo.create({
        register_id: newRegister.id,
        email: email,
        role_id: 1 // Par défaut, 'client'
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
        include: [
          { model: Register, include: [{ model: Role }] }
        ]
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
        role: userInfoFound.Register.Role.role,
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
        role: userInfoFound.Register.Role.role
      });
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible de se connecter" });
    }
  },

  // Fonction pour récupérer tous les utilisateurs avec leur rôle
getAllUsers: async function (req, res) {
  try {
    const users = await UsersInfo.findAll({
      include: [
        {
          model: Register,
          include: [{ model: Role }] // Assurez-vous que Role est inclus ici
        }
      ],
      order: [['last_name', 'ASC']]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
  }
},

  // Fonction pour mettre à jour le rôle d'un utilisateur
  updateUserRole: async function (req, res) {
    try {
      const { role } = req.body;
      const { id } = req.params;

      // Recherche de l'utilisateur dans la base de données par id
      const user = await UsersInfo.findOne({
        where: { id },
        include: [{ model: Register }]
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      // Recherche du rôle dans la base de données
      const roleInstance = await Role.findOne({
        where: { role }
      });

      if (!roleInstance) {
        return res.status(404).json({ error: "Rôle non trouvé" });
      }

      // Mise à jour du rôle
      user.Register.role_id = roleInstance.id;
      await user.Register.save();

      res.status(200).json({ message: "Rôle mis à jour avec succès" });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle de l'utilisateur :", error);
      res.status(500).json({ error: "Impossible de mettre à jour le rôle de l'utilisateur" });
    }
  },

  userdelete: async (req, res) => {
    // Implémentez la logique de suppression ici
    try {
      const userId = req.params.id;

      const user = await Register.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      await user.destroy();

      return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible de supprimer l'utilisateur" });
    }
  },

  resetpassword: async (req, res) => {
    // Implémentez la logique de réinitialisation du mot de passe ici
  },

  UserLogout: async (req, res) => {
    // Implémentez la logique de déconnexion ici
  }
};
