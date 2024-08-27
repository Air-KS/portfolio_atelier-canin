/*
  backend/routes/userctrl.js
*/

const express = require('express');
const router = express.Router();
const { User, Role } = require('../models'); // Utilisation du nouveau modèle User

// Fonction pour récupérer le profil de l'utilisateur connecté
router.get('/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        'first_name',
        'last_name',
        'date_of_birth',
        'email',
        'phone',
      ]
    });
    if (user) {
      console.log('User data:', user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fonction pour mettre à jour le profil de l'utilisateur
router.put('/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Updating user with ID:', userId);
    console.log('Request body:', req.body);

    const { first_name, last_name, date_of_birth, email, phone } = req.body;
    const updatedUser = await User.update(
      { first_name, last_name, date_of_birth, email, phone },
      { where: { id: userId } }
    );
    if (updatedUser[0] === 1) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fonction pour récupérer tous les utilisateurs avec leur rôle
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role }],
      order: [['last_name', 'ASC']]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Unable to retrieve users." });
  }
});

// Fonction pour mettre à jour le rôle d'un utilisateur
router.put('/role/:id', async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      include: [{ model: Role }]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const roleInstance = await Role.findOne({
      where: { role }
    });

    if (!roleInstance) {
      return res.status(404).json({ error: "Role not found." });
    }

    user.role_id = roleInstance.id;
    await user.save();

    res.status(200).json({ message: "Role successfully updated." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle de l'utilisateur :", error);
    res.status(500).json({ error: "Unable to update the user's role." });
  }
});

// Suppression d'un utilisateur
router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const email = user.email;
    await user.destroy();

    return res.status(200).json({ message: "User successfully deleted." });

  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return res.status(500).json({ error: "Unable to delete the user." });
  }
});

module.exports = router;
