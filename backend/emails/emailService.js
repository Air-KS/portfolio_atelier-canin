/*
  ./backend/emails/emailService.js
*/

const fs = require('fs').promises; // Utilisation de la version promesse de fs
const path = require('path');
const nodemailer = require('nodemailer');

// Fonction pour envoyer un e-mail de vérification
async function sendVerificationEmail(email, code) {
  console.log('Envoi d’un e-mail à :', email);

  // Configuration du transporteur d'e-mail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // Chemin vers le template HTML
  const filePath = path.join(__dirname, 'template', 'email_templates.html');

  try {
    // Lecture et traitement du fichier HTML
    let htmlContent = await fs.readFile(filePath, 'utf8');
    htmlContent = htmlContent.replace('{{code}}', code);

    // Options de l'email
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verification Code',
      html: htmlContent
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

module.exports = {
  sendVerificationEmail
};

