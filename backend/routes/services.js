/*
  ./backend/routes/services.js
*/

const express = require('express');
const router = express.Router();
const db = require('../models');

// Route pour créer un service
router.post('/', async (req, res) => {
  try {
    console.log('Création d\'un service avec les données :', req.body);
    const service = await db.Service.create(req.body);
    console.log('Service créé :', service);
    res.status(201).json(service);
  } catch (error) {
    console.error('Erreur lors de la création du service :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour obtenir tous les services
router.get('/', async (req, res) => {
  try {
    console.log('Récupération de tous les services');
    const services = await db.Service.findAll();
    console.log('Services récupérés :', services);
    res.status(200).json(services);
  } catch (error) {
    console.error('Erreur lors de la récupération des services :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour obtenir un service par ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Récupération du service avec ID :', req.params.id);
    const service = await db.Service.findByPk(req.params.id);
    if (service) {
      console.log('Service trouvé :', service);
      res.status(200).json(service);
    } else {
      console.log('Service non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du service :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour mettre à jour un service
router.put('/:id', async (req, res) => {
  try {
    console.log('Mise à jour du service avec ID :', req.params.id);
    const service = await db.Service.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      console.log('Service mis à jour :', service);
      res.status(200).json(service);
    } else {
      console.log('Service non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du service :', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un service
router.delete('/:id', async (req, res) => {
  try {
    console.log('Suppression du service avec ID :', req.params.id);
    const service = await db.Service.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      console.log('Service supprimé avec ID :', req.params.id);
      res.status(204).end();
    } else {
      console.log('Service non trouvé avec ID :', req.params.id);
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du service :', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
