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
		<form @submit.prevent="addstore" class="store-form">
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
		  <button type="submit" class="submit-btn">Enregistrer</button>
		</form>
	  </div>

	  <!-- Liste des store -->
	  <div v-if="stores.length">
		<h3 class="store-title">store disponibles :</h3>
		<ul class="store-list">
		  <li v-for="(store, index) in stores" :key="index" class="store-item">
			<div class="store-header">
			  <strong>{{ store.name }}</strong>
			  <span class="store-price">{{ store.price }} €</span>
			</div>
			<p>{{ store.description }}</p>
			<!-- Boutons de modification et suppression -->
			<div class="store-actions">
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
		  price: ''
		},
		stores: [],
		isEditing: false, // Indique si l'utilisateur modifie un store
		editingstoreId: null // ID du store en cours de modification
	  };
	},
	methods: {
	  async addstore() {
		try {
		  if (this.isEditing) {
			// Mise à jour d'un store existant
			await axios.put(`http://localhost:3000/api/stores/${this.editingstoreId}`, this.store);
			this.fetchstore(); // Rafraîchit la liste des store
			this.resetForm();
			alert('store mis à jour avec succès !');
		  } else {
			// Ajout d'un nouveau store
			const response = await axios.post('http://localhost:3000/api/stores', this.store);
			this.stores.push(response.data);
			this.resetForm();
			alert('store ajouté avec succès !');
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
		  console.error('Erreur lors de la récupération des store :', error);
		}
	  },
	  async deletestore(storeId) {
		try {
		  await axios.delete(`http://localhost:3000/api/stores/${storeId}`);
		  this.fetchstore(); // Rafraîchit la liste des store après suppression
		  alert('store supprimé avec succès !');
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
		this.store = { name: '', description: '', price: '' };
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
