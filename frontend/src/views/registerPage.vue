<template>
	<div>
	  <AuthForm
		:isRegister="true"
		:errorMessage="errorMessage"
		@register="register"
	  />
	</div>
  </template>

  <script>
  import AuthForm from '@/components/authForm.vue';
  import axios from 'axios';

  export default {
	name: 'RegisterPage',
	components: {
	  AuthForm,
	},
	data() {
	  return {
		errorMessage: '',
		email: '',
		password: '',
	  };
	},
	methods: {
	  async register({ email, password, confirmPassword }) {
		this.errorMessage = '';
		if (password !== confirmPassword) {
		  this.errorMessage = 'Passwords do not match';
		  return;
		}

		this.email = email;
		this.password = password;

		console.log('Email before redirect:', this.email);

		try {
		  await axios.post('http://localhost:3000/api/users/register', {
			email,
			password,
		  }, { withCredentials: true });
		  this.$router.push({ name: 'VerifyCode', query: { email: this.email } });
		  console.log('Route object:', this.$route);
		} catch (error) {
		  console.error('Erreur lors de l\'enregistrement:', error); // Log l'erreur complète
		  this.errorMessage =
			error.response?.data?.error ||
			'Une erreur est survenue, veuillez réessayer ultérieurement.';
		}
	  },
	},
  };
  </script>

  <style scoped>

  </style>
