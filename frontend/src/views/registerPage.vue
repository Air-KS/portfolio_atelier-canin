<template>
	<AuthForm :isRegister="true" :errorMessage="errorMessage" @register="register"/>
  </template>

  <script>
  import AuthForm from '@/components/authForm.vue';
  import axios from 'axios';

  export default {
	name: 'RegisterPage',
	mounted() {
	  document.title = 'AtlCanin- Register';
	},
	components: {
	  AuthForm,
	},
	data() {
	  return {
		errorMessage: '',
	  };
	},
	methods: {
	  async register({ email, password, confirmPassword }) {
		console.log('Register method called with', email, password, confirmPassword);
		if (password !== confirmPassword) {
		  this.errorMessage = 'Passwords do not match';
		  return;
		}

		try {
		  const response = await axios.post(
			'http://localhost:3000/api/users/register',
			{
			  email,
			  password,
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

  .error-message {
	  color: red;
	  font-weight: bold;
  }
  </style>
