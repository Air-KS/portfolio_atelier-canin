/*
  backend/routes/usersctrl.js
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Register, UsersInfo, Role } = require('../models');
const { sendVerificationEmail } = require('../emails/emailService');  // Import du service d'email
require('dotenv').config();

// Validation des données avec regex
const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = {
  // Fonction pour enregistrer un nouvel utilisateur
  register: async function (req, res) {
    console.log('Session avant génération du code:', req.session);
    try {
      const { email, password } = req.body;

      // Vérifie que tous les champs obligatoires sont remplis
      if (!email || !password) {
        return res.status(400).json({ error: "Required fields are missing." });
      }

      // Valide le format de l'e-mail
      if (!emailREGEX.test(email)) {
        return res.status(400).json({ error: "Invalid email" });
      }

      // Valide le format du mot de passe
      if (!passwordREGEX.test(password)) {
        return res.status(400).json({
          error: "Your password must contain:\n\nAt least 8 characters,\nOne uppercase letter,\nOne lowercase letter,\nOne number,\nOne special character",
        });
      }

      // Vérifie si l'email existe déjà dans la table `UsersInfo`
      const userFound = await UsersInfo.findOne({
        attributes: ["email"],
        where: { email: email },
      });
      if (userFound) {
        return res.status(400).json({ error: "This email address is already in use." });
      }

      // Génération du code de vérification
      const verificationCode = crypto.randomInt(100000, 999999).toString(); // Code de 6 chiffres
      const verificationCodeExpiry = Date.now() + 60 * 1000; // 60 secondes à partir de maintenant

      // Envoi de l'e-mail de vérification
      await sendVerificationEmail(email, verificationCode);

      // Stocker les informations nécessaires dans la session
      req.session.verificationCode = verificationCode;
      req.session.verificationCodeExpiry = verificationCodeExpiry;
      req.session.email = email;
      req.session.password = password; // Stocker le mot de passe non haché temporairement

      console.log('Session après génération du code:', req.session);

      // Sauvegarder la session
      req.session.save(err => {
        if (err) {
          console.error('Erreur lors de la sauvegarde de la session:', err);
          return res.status(500).json({ error: "Internal server error." });
        }

        // Log des informations de vérification
        console.log(`Code de vérification généré pour ${email}: ${verificationCode}`);
        console.log('Session après génération du code :', req.session);

        console.log('Session sauvegardée avec succès:', req.session);
        return res.status(201).json({
          message: "A verification email has been sent."
        });
      });

    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
      return res.status(500).json({ error: "Unable to add this user." });
    }
  },

  // Fonction pour vérifier le code de vérification
  verifyCode: async function (req, res) {
    const { email, code } = req.body;

    // Vérifie si le code a expiré
    if (Date.now() > req.session.verificationCodeExpiry) {
      return res.status(400).json({ error: "The verification code has expired. Please request a new code." });
    }

    console.log(`Vérification du code pour ${email}: code reçu ${code}, code attendu ${req.session.verificationCode}`);
    console.log('Session lors de la vérification :', req.session);

    if (req.session.email !== email || req.session.verificationCode !== code) {
      return res.status(400).json({ error: "Incorrect verification code." });
    }

    // Code de vérification correct
    req.session.verificationCode = null; // Effacer le code de vérification
    req.session.verificationCodeExpiry = null; // Effacer la date d'expiration

    try {
      const bcryptedPassword = await bcrypt.hash(req.session.password, 5);
      const newRegister = await Register.create({
        email: req.session.email,
        password: bcryptedPassword,
        role_id: 1 // Par défaut, 'client'
      });

      await UsersInfo.create({
        register_id: newRegister.id,
        email: req.session.email,
        role_id: 1 // Par défaut, 'client'
      });

      const token = jwt.sign({ userId: newRegister.id }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

      console.log(`Vérification réussie pour ${email}`);

      return res.status(200).json({
        message: "Verification successful.",
        token: token,
        user: { id: newRegister.id, email: newRegister.email },
        role: "client"
      });
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur :", error);
      return res.status(500).json({ error: "Unable to verify this user." });
    }
  },

  // Fonction pour renvoyer le code de vérification
  resendCode: async function (req, res) {
    const { email } = req.body;

    // Vérifier si l'email dans la session correspond à celui dans la requête
    if (!req.session.email || req.session.email !== email) {
      return res.status(400).json({ error: "Invalid email or session expired. Please restart the registration." });
    }

    let newCode;
    if (Date.now() > req.session.verificationCodeExpiry) {
      newCode = crypto.randomInt(100000, 999999).toString(); // Code de 6 chiffres
      req.session.verificationCode = newCode;
      req.session.verificationCodeExpiry = Date.now() + 60 * 1000; // 60 secondes supplémentaires
    } else {
      newCode = req.session.verificationCode; // Utilise le code existant
    }

    await sendVerificationEmail(req.session.email, newCode);

    // Sauvegarder la session
    req.session.save(err => {
      if (err) {
        console.error('Erreur lors de la sauvegarde de la session:', err);
        return res.status(500).json({ error: "Internal server error." });
      }

      console.log(`Code de vérification envoyé pour ${req.session.email}: ${newCode}`);
      return res.status(200).json({ message: "Code successfully resent." });
    });
  },

  // Ajout de la méthode completeRegistration dans usersctrl.js
  completeRegistration: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Récupération de l'utilisateur via l'email
      const userFound = await UsersInfo.findOne({ where: { email: email } });
      if (!userFound) {
        return res.status(400).json({ error: "User not found." });
      }

      // Mise à jour du mot de passe et création du token
      const bcryptedPassword = await bcrypt.hash(password, 5);
      userFound.password = bcryptedPassword;
      await userFound.save();

      const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

      return res.status(200).json({
        userId: userFound.id,
        token: token,
        role: userFound.role_id
      });
    } catch (error) {
      console.error("Erreur lors de la complétion de l'inscription :", error);
      return res.status(500).json({ error: "Unable to complete the registration." });
    }
  },

  // Fonction pour connecter un utilisateur
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Vérifie que tous les champs sont remplis
      if (!email || !password) {
        return res.status(400).json({ error: "Parameters are missing." });
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
        return res.status(400).json({ error: "User does not exist." });
      }

      // Comparaison du mot de passe pour authentification
      const passwordMatch = await bcrypt.compare(password, userInfoFound.Register.password);

      // Gestion des cas où le mot de passe ne correspond pas
      if (!passwordMatch) {
        return res.status(400).json({ error: "Incorrect password." });
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
      return res.status(500).json({ error: "Unable to log in." });
    }
  },

  // Fonction pour supprimer un utilisateur
  userdelete: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await Register.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const email = user.email;
      await user.destroy();

      // Logs de suppression réussie
      console.log('Utilisateur supprimé de la base de données:');
      console.log('ID :', userId);
      console.log('Email :', email);

      return res.status(200).json({ message: "User successfully deleted." });

    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      return res.status(500).json({ error: "Unable to delete the user." });
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
