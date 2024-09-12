<!--
	./frontend/src/components/dashbord/dashStore.vue
-->

<template>
	<div class="settings-container">
	  <p class="title">Store...</p>
	  <button @click="showForm = !showForm" class="toggle-form-btn">
		{{ showForm ? 'Annuler' : 'Ajouter un store' }}
	  </button>

	  <!-- Formulaire pour ajouter un store -->
	  <div v-if="showForm" class="form-container">
		<form @submit.prevent="addstore" class="settings-form">
		  <div class="form-group">
			<label for="name">Nom du store:</label>
			<input type="text" v-model="store.name" id="name" required class="form-control" />
		  </div>
		  <div class="form-group">
			<label for="description">Description:</label>
			<textarea v-model="store.description" id="description" class="form-control"></textarea>
		  </div>
		  <div class="form-group">
			<label for="price">Prix:</label>
			<input type="number" v-model.number="store.price" id="price" step="0.01" required class="form-control" />
		  </div>
		  <div class="form-group">
			<label for="image">URL de l'image:</label>
			<input type="url" v-model="store.image" id="image" class="form-control" placeholder="Entrez l'URL de l'image" />
		  </div>
		  <button type="submit" class="submit-btn">Enregistrer</button>
		</form>
	  </div>

	  <!-- Liste des stores -->
	  <div v-if="stores.length">
		<h3 class="settings-title">Stores disponibles :</h3>
		<ul class="settings-list">
		  <li v-for="(store, index) in stores" :key="index" class="settings-item">
			<div class="settings-header">
			  <strong>{{ store.name }}</strong>
			  <span class="settings-price">{{ store.price }} €</span>
			</div>
			<p>{{ store.description }}</p>
			<!-- Affichage de l'image si elle existe -->
			<div v-if="store.image" class="store-image">
			  <img :src="store.image" alt="Image du store" class="store-img" />
			</div>
			<!-- Boutons de modification et suppression -->
			<div class="settings-actions">
			  <button @click="editstore(store)" class="edit-btn">Modifier</button>
			  <button @click="deletestore(store.id)" class="delete-btn">Supprimer</button>
			</div>
		  </li>
		</ul>
	  </div>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'DashStore',
	data() {
	  return {
		showForm: false,
		store: {
		  name: '',
		  description: '',
		  price: '',
		  image: '' // Champ ajouté pour l'URL de l'image
		},
		stores: [],
		isEditing: false, // Indique si l'utilisateur modifie un store
		editingstoreId: null // ID du store en cours de modification
	  };
	},
	methods: {
	  async addstore() {
		try {
		  // Retirer le champ image s'il est vide
		  const storeData = { ...this.store };
		  if (!storeData.image) {
			delete storeData.image; // On retire l'image si elle est vide
		  }

		  if (this.isEditing) {
			// Mise à jour d'un store existant
			await axios.put(`http://localhost:3000/api/stores/${this.editingstoreId}`, storeData);
			this.fetchstore(); // Rafraîchit la liste des stores
			this.resetForm();
			alert('Store mis à jour avec succès !');
		  } else {
			// Ajout d'un nouveau store
			const response = await axios.post('http://localhost:3000/api/stores', storeData);
			this.stores.push(response.data);
			this.resetForm();
			alert('Store ajouté avec succès !');
		  }
		} catch (error) {
		  console.error('Erreur lors de la création ou de la mise à jour du store :', error);
		}
	  },
	  async fetchstore() {
		try {
		  const response = await axios.get('http://localhost:3000/api/stores');
		  this.stores = response.data;
		} catch (error) {
		  console.error('Erreur lors de la récupération des stores :', error);
		}
	  },
	  async deletestore(storeId) {
		try {
		  await axios.delete(`http://localhost:3000/api/stores/${storeId}`);
		  this.fetchstore(); // Rafraîchit la liste des stores après suppression
		  alert('Store supprimé avec succès !');
		} catch (error) {
		  console.error('Erreur lors de la suppression du store :', error);
		}
	  },
	  editstore(store) {
		this.store = { ...store }; // Remplit le formulaire avec les données du store
		this.isEditing = true;
		this.editingstoreId = store.id;
		this.showForm = true; // Affiche le formulaire pour modification
	  },
	  resetForm() {
		this.store = { name: '', description: '', price: '', image: '' }; // Réinitialisation avec le champ image
		this.showForm = false;
		this.isEditing = false;
		this.editingstoreId = null;
	  }
	},
	created() {
	  this.fetchstore();
	}
  };
  </script>

<style>
/* Conteneur de l'image */
.store-image {
  text-align: center; /* Centre l'image */
  margin-top: 10px;
}

/* Image réactive */
.store-img {
  width: 100%;           /* L'image prend 100% de la largeur du conteneur */
  max-width: 240px;      /* Taille max pour les grands écrans */
  height: auto;          /* Garde les proportions de l'image */
  border-radius: 8px;    /* Ajoute un léger arrondi aux coins */
  object-fit: cover;     /* Assure que l'image garde une bonne qualité de rendu */
}

</style>
