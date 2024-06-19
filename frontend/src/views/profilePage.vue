<!--
	./frontend/src/views/profilePage.vue
 -->

<!-- ./frontend/src/views/profilePage.vue -->

<template>
	<div class="profile-container">
	  <h1>Profile de {{ user.first_name }} {{ user.last_name }}</h1>
	  <form @submit.prevent="updateProfile">
		<div>
		  <label for="first_name">Prénom:</label>
		  <input type="text" v-model="user.first_name" />
		</div>
		<div>
		  <label for="last_name">Nom:</label>
		  <input type="text" v-model="user.last_name" />
		</div>
		<div>
		  <label for="date_of_birth">Date de Naissance:</label>
		  <input type="date" v-model="user.date_of_birth" />
		</div>
		<div>
		  <label for="email">Email:</label>
		  <input type="email" v-model="user.email" required />
		</div>
		<div>
		  <label for="phone">Téléphone:</label>
		  <input type="text" v-model="user.phone" />
		</div>
		<div>
		  <label for="address_one">Adresse:</label>
		  <input type="text" v-model="user.address_one" />
		</div>
		<div>
		  <label for="address_two">Adresse secondaire:</label>
		  <input type="text" v-model="user.address_two" />
		</div>
		<div>
		  <label for="zip_code">Code Postal:</label>
		  <input type="text" v-model="user.zip_code" />
		</div>
		<div>
		  <label for="city">Ville:</label>
		  <input type="text" v-model="user.city" />
		</div>
		<div>
		  <label for="country">Pays:</label>
		  <input type="text" v-model="user.country" />
		</div>
		<button type="submit">Sauvegarder</button>
	  </form>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'ProfilePage',
	data() {
	  return {
		user: {
		  first_name: '',
		  last_name: '',
		  date_of_birth: '',
		  email: '',
		  phone: '',
		  address_one: '',
		  address_two: '',
		  zip_code: '',
		  city: '',
		  country: ''
		}
	  };
	},
	created() {
	  this.fetchUserProfile();
	},
	methods: {
	  async fetchUserProfile() {
		const userId = this.$route.params.id;
		try {
		  const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
		  console.log('API response:', response.data);
		  this.user = response.data;
		} catch (error) {
		  console.error('Erreur lors de la récupération du profil utilisateur:', error);
		}
	  },
	  async updateProfile() {
		const userId = this.$route.params.id;
		try {
		  await axios.put(`http://localhost:3000/api/users/${userId}`, this.user);
		  alert('Profil mis à jour avec succès');
		} catch (error) {
		  console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
		}
	  }
	}
  };
  </script>

  <style scoped>
  .profile-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
  }

  form {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
  }

  form div {
	margin-bottom: 10px;
  }

  label {
	margin-bottom: 5px;
  }

  input {
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;
	border: 1px solid #ccc;
  }

  button {
	padding: 10px;
	font-size: 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
  }

  button:hover {
	background-color: #0056b3;
  }
  </style>
