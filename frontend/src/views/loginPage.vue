<template>
	<div class="login-container">
	  <h1>Login</h1>
	  <form @submit.prevent="login">
		<div>
		  <label for="email">Email:</label>
		  <input type="email" v-model="email" required />
		</div>
		<div>
		  <label for="password">Password:</label>
		  <input type="password" v-model="password" required />
		</div>
		<button type="submit">Login</button>
	  </form>
	  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
	  <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'LoginPage',
	data() {
	  return {
		email: '',
		password: '',
		errorMessage: ''
	  };
	},
	methods: {
	  async login() {
		try {
		  const response = await axios.post('http://localhost:3000/api/users/login', {
			email: this.email,
			password: this.password
		  });

		  const { isAdmin, email } = response.data;

		  if (isAdmin) {
			this.$router.push({ name: 'Admin' });
		  } else {
			this.$router.push({ name: 'Client', params: { email } });
		  }
		} catch (error) {
		  if (!error.response) {
			this.errorMessage = 'Une erreur est survenue, veuillez réessayer ultérieurement.';
		  } else if (error.response.status === 400) {
			this.errorMessage = error.response.data.error; // Afficher le message d'erreur renvoyé par le serveur
		  } else {
			this.errorMessage = 'Une erreur est survenue, veuillez réessayer ultérieurement.';
		  }
		  console.error('Login failed:', error);
		}
	  }
	}
  };
  </script>

  <style scoped>
  .login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
  }

  .error-message {
	color: red;
	margin-top: 10px;
  }
  </style>
