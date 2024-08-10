/*
  ./backend/routes/appointment.js
*/

const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require('sequelize');

// Route pour obtenir les créneaux horaires disponibles
router.get('/available-timeslots', async (req, res) => {
  try {
    const date = req.query.date;

    if (!date) {
      console.error('Date non fournie');
      return res.status(400).json({ error: 'Date is required' });
    }

    const timeslots = [
      '09:00', '10:00', '11:00',
      '14:00', '15:00', '16:00',
    ];

    const appointments = await db.Appointment.findAll({
      where: {
        appointment_time: {
          [Op.between]: [`${date}T00:00:00`, `${date}T23:59:59`]
        }
      }
    });

    const bookedTimeslots = appointments.map(app => {
      const time = new Date(app.appointment_time).toISOString().split('T')[1].substring(0, 5);
      return time;
    });
    const availableTimeslots = timeslots.filter(timeslot => !bookedTimeslots.includes(timeslot));

    console.log(`Créneaux horaires disponibles pour le ${date}:`, availableTimeslots);

    res.json({ timeslots: availableTimeslots });
  } catch (error) {
    console.error('Erreur lors de la récupération des créneaux horaires disponibles:', error);
    res.status(500).json({ error: 'An error occurred while fetching available timeslots' });
  }
});

// Route pour obtenir tous les rendez-vous
router.get('/', async (req, res) => {
  try {
    console.log('Récupération de tous les rendez-vous');
    const appointments = await db.Appointment.findAll();
    console.log('Rendez-vous trouvés :', appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour créer un rendez-vous (directement confirmé)
router.post('/', async (req, res) => {
  try {
    console.log('Création d\'un rendez-vous avec les données :', req.body);

    let appointmentData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      appointment_time: req.body.appointment_time,
      status: 'confirmed',
    };

    if (req.body.user_id) {
      const userInfo = await db.UsersInfo.findOne({
        where: { register_id: req.body.user_id },
        attributes: ['first_name', 'last_name', 'email', 'phone']
      });

      if (!userInfo) {
        return res.status(404).json({ error: 'User not found' });
      }

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
      if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone) {
        return res.status(400).json({ error: 'First name, last name, email and phone number are required for non-registered users' });
      }
      appointmentData.user_id = null;
    }

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

// Route pour annuler un rendez-vous
router.put('/:id/cancel', async (req, res) => {
  try {
    console.log('Annulation du rendez-vous avec ID :', req.params.id);
    const appointment = await db.Appointment.findByPk(req.params.id);
    if (appointment) {
      await appointment.update({ status: 'cancelled' });
      console.log('Rendez-vous annulé :', appointment);
      res.status(200).json(appointment);
    } else {
      console.log('Rendez-vous non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'annulation du rendez-vous :', error.message);
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
