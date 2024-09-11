/*
  ./backend/routes/store.js
*/

const express = require('express');
const router = express.Router();
const { Store } = require('../models');

// Route pour créer un nouveau store
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Création d'un nouveau store
    const newStore = await Store.create({ name, description, price, image });
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du store.', error: error.message });
  }
});

// Route pour obtenir tous les stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des stores.', error: error.message });
  }
});

// Route pour obtenir un store par son ID
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store non trouvé.' });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du store.', error: error.message });
  }
});

// Route pour mettre à jour un store par son ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Mise à jour du store
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store non trouvé.' });
    }

    // Mise à jour des champs
    await store.update({ name, description, price, image });
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du store.', error: error.message });
  }
});

// Route pour supprimer un store par son ID
router.delete('/:id', async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store non trouvé.' });
    }

    // Suppression du store
    await store.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du store.', error: error.message });
  }
});

module.exports = router;
