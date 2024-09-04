<!--
	./frontend/src/components/dashbord/dashSetting.vue
-->

<template>
	<div class="settings-container">
	  <p class="title">Settings...</p>
	  <button @click="showForm = !showForm" class="toggle-form-btn">
		{{ showForm ? 'Annuler' : 'Ajouter un service' }}
	  </button>

	  <!-- Formulaire pour ajouter un service -->
	  <div v-if="showForm" class="form-container">
		<form @submit.prevent="addService" class="service-form">
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
		<h3 class="services-title">Services disponibles :</h3>
		<ul class="services-list">
		  <li v-for="(service, index) in services" :key="index" class="service-item">
			<div class="service-header">
			  <strong>{{ service.name }}</strong>
			  <span class="service-price">{{ service.price }} €</span>
			</div>
			<p>{{ service.description }}</p>
			<!-- Boutons de modification et suppression -->
			<div class="service-actions">
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

  <style scoped>
  .settings-container {
	width: 900px;
	margin: 0px auto;
	padding: 20px 20px 0 20px;
	border: 1px solid var(--color-border);
	border-radius: 10px;
	box-shadow: 0 0 8px var(--color-border-shadow);
  }

  .title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 20px;
	color: #333;
  }

  .toggle-form-btn {
	display: block;
	margin: 0 auto 20px;
	padding: 10px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s ease;
  }

  .toggle-form-btn:hover {
	background-color: #0056b3;
  }

  .form-container {
	margin-bottom: 20px;
  }

  .service-form {
	display: flex;
	flex-direction: column;
	gap: 15px;
  }

  .form-group {
	display: flex;
	flex-direction: column;
  }

  .form-control {
	padding: 8px;
	font-size: 16px;
	border: 1px solid #ddd;
	border-radius: 4px;
	margin-top: 5px;
  }

  .submit-btn {
	padding: 10px 20px;
	background-color: #28a745;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
	background-color: #218838;
  }

  .services-title {
	font-size: 20px;
	text-align: center;
	margin-bottom: 15px;
	color: #333;
  }

  .services-list {
	list-style: none;
	padding: 20px;
  }

  .service-item {
	border: 1px solid var(--color-hover);
	background-color: #ffffff;
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin: 10px 0px 30px 0px;
  }

  .service-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
  }

  .service-price {
	font-weight: bold;
	color: #333;
  }

  /* Boutons d'action */
  .service-actions {
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 10px;
  }

  .edit-btn {
	padding: 5px 15px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
  }

  .edit-btn:hover {
	background-color: #0056b3;
  }

  .delete-btn {
	padding: 5px 15px;
	background-color: #dc3545;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
  }

  .delete-btn:hover {
	background-color: #c82333;
  }
  </style>
