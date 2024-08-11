<!--
	./frontend/src/views/registerPage.vue
-->

<template>
	<div>
	  <AuthForm
		ref="authForm"
		:isRegister="true"
		:errorMessage="errorMessage"
		:isResending="isResending"
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
	created() {
		document.title = 'AtlCanin - Register';
	},
	data() {
	  return {
		errorMessage: '',
		email: '',
		password: '',
		isResending: false,
	  };
	},
	methods: {
  async register({ email, password, confirmPassword }) {
    // Le bouton est désactivé ici en passant isResending à true
    this.isResending = true;
    this.errorMessage = '';

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.isResending = false; // Réactiver en cas d'erreur
      return;
    }

    this.email = email;
    this.password = password;

    console.log('Email before redirect:', this.email);

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
      }, { withCredentials: true });
      this.$router.push({ name: 'VerifyCode', query: { email: this.email } });
      console.log('Route object:', this.$route);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error); // Log l'erreur complète
      this.errorMessage =
        error.response?.data?.error ||
        'An error occurred, please try again later.';
    } finally {
      // Réactiver le bouton dans tous les cas
      this.isResending = false;
    }
  },
},
  };
  </script>

  <style scoped>

  </style>
