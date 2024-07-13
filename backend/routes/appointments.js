const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', async (req, res) => {
  try {
    console.log('Création d\'un rendez-vous avec les données :', req.body);

    let appointmentData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      appointment_time: req.body.appointment_time,
      status: req.body.status,
    };

    // Vérifier si user_id est spécifié
    if (req.body.user_id) {
      // Récupérer les informations de l'utilisateur connecté
      const userInfo = await db.UsersInfo.findOne({
        where: { register_id: req.body.user_id },
        attributes: ['first_name', 'last_name', 'email', 'phone']
      });

      if (!userInfo) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Ajouter les noms, prénoms, email et numéro de téléphone à la requête, s'ils existent
      if (userInfo.first_name) {
        appointmentData.first_name = userInfo.first_name;
      }
      if (userInfo.last_name) {
        appointmentData.last_name = userInfo.last_name;
      }
      if (userInfo.email) {
        appointmentData.email = userInfo.email;
      }
      if (userInfo.phone) {
        appointmentData.phone = userInfo.phone;
      }
      appointmentData.user_id = req.body.user_id;
    } else {
      // Si user_id n'est pas spécifié, vérifier les champs requis pour les non-enregistrés
      if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone) {
        return res.status(400).json({ error: 'First name, last name, email and phone number are required for non-registered users' });
      }

      // Définir user_id à null si non spécifié
      appointmentData.user_id = null;
    }

    // Créer le rendez-vous en utilisant les données préparées
    const appointment = await db.Appointment.create(appointmentData);
    console.log('Rendez-vous créé :', appointment);
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour obtenir un rendez-vous par ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Récupération du rendez-vous avec ID :', req.params.id);
    const appointment = await db.Appointment.findByPk(req.params.id);
    if (appointment) {
      console.log('Rendez-vous trouvé :', appointment);
      res.status(200).json(appointment);
    } else {
      console.log('Rendez-vous non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du rendez-vous :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour mettre à jour un rendez-vous
router.put('/:id', async (req, res) => {
  try {
    console.log('Mise à jour du rendez-vous avec ID :', req.params.id);
    const appointment = await db.Appointment.findByPk(req.params.id);
    if (appointment) {
      await appointment.update(req.body);
      console.log('Rendez-vous mis à jour :', appointment);
      res.status(200).json(appointment);
    } else {
      console.log('Rendez-vous non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rendez-vous :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
  try {
    console.log('Suppression du rendez-vous avec ID :', req.params.id);
    const appointment = await db.Appointment.findByPk(req.params.id);
    if (appointment) {
      await appointment.destroy();
      console.log('Rendez-vous supprimé avec ID :', req.params.id);
      res.status(204).end();
    } else {
      console.log('Rendez-vous non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du rendez-vous :', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
