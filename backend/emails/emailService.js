const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Fonction pour envoyer un e-mail de vérification
async function sendVerificationEmail(email, code) {
  console.log('Envoyer un e-mail à:', email);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const filePath = path.join(__dirname, 'template', 'email_templates.html');
  const htmlContent = await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier HTML:', err);
        reject(err);
      } else {
        resolve(data.replace('{{code}}', code));
      }
    });
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Code de vérification',
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

module.exports = {
  sendVerificationEmail
};
