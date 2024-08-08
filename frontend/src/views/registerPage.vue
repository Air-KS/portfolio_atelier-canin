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

		try {
		  await axios.post('http://localhost:3000/api/users/register', {
			email,
			password,
		  });
		  this.$router.push({ name: 'VerifyCode', params: { email: this.email } });
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
