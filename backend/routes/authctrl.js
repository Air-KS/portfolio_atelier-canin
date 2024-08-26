/*
  backend/routes/authctrl.js
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, Role } = require('../models');
const { sendVerificationEmail } = require('../emails/emailService');
require('dotenv').config();

// Validation des données avec regex
const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
  try {
    const { first_name, email, password } = req.body;

    if (!first_name || !email || !password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    if (!emailREGEX.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!passwordREGEX.test(password)) {
      return res.status(400).json({
        error: "Your password must contain:\n\nAt least 8 characters,\nOne uppercase letter,\nOne lowercase letter,\nOne number,\nOne special character",
      });
    }

    const userFound = await User.findOne({ where: { email: email } });

    if (userFound) {
      return res.status(400).json({ error: "This email address is already in use." });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpiry = Date.now() + 60 * 1000;

    await sendVerificationEmail(email, verificationCode);

    req.session.verificationCode = verificationCode;
    req.session.verificationCodeExpiry = verificationCodeExpiry;
    req.session.first_name = first_name
    req.session.email = email;
    req.session.password = password;

    req.session.save(err => {
      if (err) {
        console.error('Erreur lors de la sauvegarde de la session:', err);
        return res.status(500).json({ error: "Internal server error." });
      }

      return res.status(201).json({
        message: "A verification email has been sent."
      });
    });

  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return res.status(500).json({ error: "Unable to add this user." });
  }
});

// Vérification du code de vérification
router.post('/verifyCode', async (req, res) => {
  const { email, code } = req.body;

  // Vérifie que la session est valide et que le code correspond
  if (Date.now() > req.session.verificationCodeExpiry) {
      return res.status(400).json({ error: "Le code de vérification a expiré." });
  }

  if (req.session.email !== email || req.session.verificationCode !== code) {
      return res.status(400).json({ error: "Code de vérification incorrect." });
  }

  req.session.verificationCode = null;
  req.session.verificationCodeExpiry = null;

  try {
      const bcryptedPassword = await bcrypt.hash(req.session.password, 5);
      const newUser = await User.create({
          email: req.session.email,
          password: bcryptedPassword,
          first_name: req.session.first_name,
          role_id: 1 // Par défaut, 'client'
      });

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

      return res.status(200).json({
          message: "Vérification réussie.",
          token: token,
          user: { id: newUser.id, first_name: newUser.first_name, email: newUser.email },
          role: "client"
      });
  } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur :", error);
      return res.status(500).json({ error: "Impossible de vérifier cet utilisateur." });
  }
});

// Fonction pour renvoyer le code de vérification
router.post('/resend-code', async (req, res) => {
  const { email } = req.body;

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

  req.session.save(err => {
    if (err) {
      console.error('Erreur lors de la sauvegarde de la session:', err);
      return res.status(500).json({ error: "Internal server error." });
    }

    console.log(`Code de vérification envoyé pour ${req.session.email}: ${newCode}`);
    return res.status(200).json({ message: "Code successfully resent." });
  });
});

// Ajout de la méthode completeRegistrationq
router.post('/complete-registration', async (req, res) => {
  try {
    const { first_name, email, password } = req.body;

    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      return res.status(400).json({ error: "User not found." });
    }

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
});

// Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Parameters are missing." });
    }

    const userFound = await User.findOne({
      where: { email: email },
      include: [{ model: Role }]
    });

    if (!userFound) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      userId: userFound.id,
      token: token,
      role: userFound.Role.role
    });

  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    return res.status(500).json({ error: "Unable to log in." });
  }
});

// Réinitialisation du mot de passe (à implémenter)
router.post('/resetpassword', async (req, res) => {
  // Implémentez la logique de réinitialisation du mot de passe ici
});

// Autres routes d'authentification...

module.exports = router;
