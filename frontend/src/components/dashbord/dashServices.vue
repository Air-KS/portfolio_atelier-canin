<!--
	./frontend/src/components/dashbord/dashSetting.vue
-->

<template>
	<div class="settings-container">
	  <p class="title">Services...</p>
	  <button @click="showForm = !showForm" class="toggle-form-btn">
		{{ showForm ? 'Annuler' : 'Ajouter un service' }}
	  </button>

	  <!-- Formulaire pour ajouter un service -->
	  <div v-if="showForm" class="form-container">
		<form @submit.prevent="addService" class="settings-form">
		  <div class="form-group">
			<label for="name">Nom du service:</label>
			<input type="text" v-model="service.name" id="name" required class="form-control" />
		  </div>
		  <div class="form-group">
			<label for="description">Description:</label>
			<textarea v-model="service.description" id="description" class="form-control"></textarea>
		  </div>
		  <div class="form-group">
			<label for="price">Prix:</label>
			<input type="number" v-model.number="service.price" id="price" step="0.01" required class="form-control" />
		  </div>
		  <button type="submit" class="submit-btn">Enregistrer</button>
		</form>
	  </div>

	  <!-- Liste des services -->
	  <div v-if="services.length">
		<h3 class="settings-title">Services disponibles :</h3>
		<ul class="settings-list">
		  <li v-for="(service, index) in services" :key="index" class="settings-item">
			<div class="settings-header">
			  <strong>{{ service.name }}</strong>
			  <span class="settings-price">{{ service.price }} €</span>
			</div>
			<p>{{ service.description }}</p>
			<!-- Boutons de modification et suppression -->
			<div class="settings-actions">
			  <button @click="editService(service)" class="edit-btn">Modifier</button>
			  <button @click="deleteService(service.id)" class="delete-btn">Supprimer</button>
			</div>
		  </li>
		</ul>
	  </div>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'DashSetting',
	data() {
	  return {
		showForm: false,
		service: {
		  name: '',
		  description: '',
		  price: ''
		},
		services: [],
		isEditing: false, // Indique si l'utilisateur modifie un service
		editingServiceId: null // ID du service en cours de modification
	  };
	},
	methods: {
	  async addService() {
		try {
		  if (this.isEditing) {
			// Mise à jour d'un service existant
			await axios.put(`http://localhost:3000/api/services/${this.editingServiceId}`, this.service);
			this.fetchServices(); // Rafraîchit la liste des services
			this.resetForm();
			alert('Service mis à jour avec succès !');
		  } else {
			// Ajout d'un nouveau service
			const response = await axios.post('http://localhost:3000/api/services', this.service);
			this.services.push(response.data);
			this.resetForm();
			alert('Service ajouté avec succès !');
		  }
		} catch (error) {
		  console.error('Erreur lors de la création ou de la mise à jour du service :', error);
		}
	  },
	  async fetchServices() {
		try {
		  const response = await axios.get('http://localhost:3000/api/services');
		  this.services = response.data;
		} catch (error) {
		  console.error('Erreur lors de la récupération des services :', error);
		}
	  },
	  async deleteService(serviceId) {
		try {
		  await axios.delete(`http://localhost:3000/api/services/${serviceId}`);
		  this.fetchServices(); // Rafraîchit la liste des services après suppression
		  alert('Service supprimé avec succès !');
		} catch (error) {
		  console.error('Erreur lors de la suppression du service :', error);
		}
	  },
	  editService(service) {
		this.service = { ...service }; // Remplit le formulaire avec les données du service
		this.isEditing = true;
		this.editingServiceId = service.id;
		this.showForm = true; // Affiche le formulaire pour modification
	  },
	  resetForm() {
		this.service = { name: '', description: '', price: '' };
		this.showForm = false;
		this.isEditing = false;
		this.editingServiceId = null;
	  }
	},
	created() {
	  this.fetchServices();
	}
  };
  </script>
