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
				<!-- Conteneur pour la description et l'image -->
				<div class="settings-body">
					<div class="store-description">
					<p>{{ store.description }}</p>
					</div>
					<!-- Affichage de l'image si elle existe -->
					<div v-if="store.image" class="store-image">
					<img :src="store.image" alt="Image du store" class="store-img" />
					</div>
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

<style scoped>
/* Conteneur de chaque item de store */
.settings-item {
  padding: 10px; /* Espace intérieur */
  background-color: #fff; /* Fond blanc pour chaque item */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Ombre légère */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espace entre les différentes sections */
}

/* En-tête du store (nom et prix) */
.settings-header {
  display: flex; /* Utilise Flexbox pour aligner les éléments horizontalement */
  justify-content: space-between; /* Espace entre les éléments */
  align-items: flex-start; /* Aligne les éléments en haut */
  margin-bottom: 10px; /* Espace sous l'en-tête */
  width: 100%;
}

/* Conteneur pour la description et l'image */
.settings-body {
  display: flex; /* Utilise Flexbox pour aligner la description et l'image côte à côte */
  gap: 10px; /* Espace entre la description et l'image */
}

/* Description du store */
.store-description {
  flex: 1; /* Prend la moitié de l'espace disponible */
  text-align: left; /* Aligne le texte à gauche */
}

/* Conteneur de l'image */
.store-image {
  flex: 1; /* Prend la moitié de l'espace disponible */
  display: flex;
  justify-content: flex-end; /* Aligne l'image à droite horizontalement */
  align-items: flex-start; /* Aligne l'image en haut verticalement */
}

/* Image réactive */
.store-img {
  width: 240px; /* Taille fixe pour l'image */
  height: 240px; /* Taille fixe pour l'image */
  object-fit: cover; /* Assure que l'image garde une bonne qualité de rendu */
  border-radius: 8px; /* Arrondit les coins de l'image */
  border: 2px solid #ddd; /* Cadre autour de l'image */
}

</style>
