<!--
	./frontend/src/views/registerPage.vue
-->

<template>
	<div class="register-contener">
	  <Register @register="register" :errorMessage="errorMessage" />
	</div>
  </template>

  <script>
  import axios from 'axios';
  import Register from '../components/register.vue'; // Vérifie que ce chemin est correct

  export default {
	name: 'RegisterPage',
	mounted() {
		document.title = 'AtlCanin- Register';
	},
	components: {
	  Register,
	},
	data() {
	  return {
		email: '',
		password: '',
		confirmPassword: '',
		errorMessage: '',
	  };
	},
	methods: {
	  async register({ email, password, confirmPassword }) {
		if (password !== confirmPassword) {
		  this.errorMessage = 'Passwords do not match';
		  return;
		}

		try {
		  const response = await axios.post(
			'http://localhost:3000/api/users/register',
			{
			  email: email,
			  password: password,
			}
		  );

		  const { userId, token, role } = response.data;

		  const user = {
			id: userId,
			email: email,
			role: role,
		  };

		  localStorage.setItem('user', JSON.stringify(user));
		  localStorage.setItem('token', token);
		  localStorage.setItem('role', role);

		  this.$store.dispatch('login', { user, token, role });
		  this.$store.commit('setLoginState', { isLoggedIn: true, user });

		  if (response.status === 201) {
			this.$router.push({ name: 'Accueil' });
		  }
		} catch (error) {
		  this.errorMessage =
			error.response?.data?.error ||
			'Une erreur est survenue, veuillez réessayer ultérieurement.';
		}
	  },
	},
  };
  </script>

  <style scoped>
  .register-contener {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 80px;
	background-color: #f0f0f0;
  }

  .register-container {
	width: 100%;
	max-width: 400px;
	margin: auto;
	padding: 20px;
	border: 1px solid var(--color-border);
	border-radius: 10px;
	text-align: center;
	box-shadow: 0 0 8px var(--color-border-shadow);
  }

  .error-message {
	color: red;
	font-weight: bold;
  }
  </style>
