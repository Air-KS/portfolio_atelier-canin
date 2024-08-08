/*
  backend/routes/usersctrl.js
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Register, UsersInfo, Role } = require('../models');
require('dotenv').config();

// Validation des données avec regex
const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Fonction pour envoyer un e-mail de vérification
async function sendVerificationEmail(email, code) {
  console.log('Envoyer un e-mail à:', email);
  console.log('Utilisateur Gmail:', process.env.GMAIL_USER);
  console.log('Mot de passe Gmail:', process.env.GMAIL_PASS);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Code de vérification',
    text: `Votre code de vérification est: ${code}`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  // Fonction pour enregistrer un nouvel utilisateur
  register: async function (req, res) {
    try {
      const { email, password } = req.body;

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

      // Génération du code de vérification
      const verificationCode = crypto.randomInt(1000, 9999).toString();

      // Envoi de l'e-mail de vérification
      await sendVerificationEmail(email, verificationCode);

      // Stocker le code de vérification dans une variable de session ou base de données
      req.session.verificationCode = verificationCode;
      req.session.email = email;
      req.session.userId = newRegister.id; // Stocker l'ID utilisateur dans la session

      return res.status(201).json({
        userId: newRegister.id,
        message: 'Un e-mail de vérification a été envoyé'
      });

    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible d'ajouter cet utilisateur" });
    }
  },

  // Fonction pour vérifier le code de vérification
  verifyCode: function (req, res) {
    const { email, code } = req.body;

    if (req.session.email !== email || req.session.verificationCode !== code) {
      return res.status(400).json({ error: "Code de vérification incorrect" });
    }

    // Code de vérification correct
    req.session.verificationCode = null; // Effacer le code de vérification

    // Générer un token JWT
    const token = jwt.sign({ userId: req.session.userId }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: "Vérification réussie",
      token: token
    });
  },

  // Fonction pour renvoyer le code de vérification
  resendCode: async function (req, res) {
    const { email } = req.body;

    if (req.session.email !== email) {
      return res.status(400).json({ error: "Email non valide" });
    }

    const newCode = crypto.randomInt(1000, 9999).toString();
    await sendVerificationEmail(email, newCode);

    req.session.verificationCode = newCode;

    return res.status(200).json({ message: "Code renvoyé avec succès" });
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
        return res.status(400).json({ error: "Utilisateur n'existe pas" });
      }

      // Comparaison du mot de passe pour authentification
      const passwordMatch = await bcrypt.compare(password, userInfoFound.Register.password);

      // Gestion des cas où le mot de passe ne correspond pas
      if (!passwordMatch) {
        return res.status(400).json({ error: "Mot de passe incorrect" });
      }

      // Envoi du token après authentification réussie
      const token = jwt.sign({ userId: userInfoFound.Register.id }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

      // Logs de connexion réussie
      console.log('Connexion réussie');
      console.log('Vous êtes connecté avec l\'adresse email:', userInfoFound.email);

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

  // Fonction pour supprimer un utilisateur
  userdelete: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await Register.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      const email = user.email;
      await user.destroy();

      // Logs de suppression réussie
      console.log('Utilisateur supprimé de la base de données:');
      console.log('ID :', userId);
      console.log('Email :', email);

      return res.status(200).json({ message: "Utilisateur supprimé avec succès" });

    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible de supprimer l'utilisateur" });
    }
  },

  // Fonction pour réinitialiser le mot de passe
  resetpassword: async (req, res) => {
    // Implémentez la logique de réinitialisation du mot de passe ici
  },

  // Fonction pour déconnecter un utilisateur
  UserLogout: async (req, res) => {
    // Implémentez la logique de déconnexion ici
  }
};
