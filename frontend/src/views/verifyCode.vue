<!--
	./frontend/src/components/popup/verifymail.vue.vue
-->

<template>
	<div>
	  <h3>Vérification de l'email</h3>
	  <p>Un code de vérification a été envoyé à votre adresse email. Veuillez entrer le code ci-dessous :</p>
	  <input v-model="verificationCode" type="text" placeholder="Code de vérification" @input="validateInput" />
	  <button @click="verifyCode">Vérifier</button>
	  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'VerifyCode',
	props: {
	  email: {
		type: String,
		required: true,
	  },
	},
	data() {
	  return {
		verificationCode: '',
		errorMessage: '',
	  };
	},
	methods: {
	  validateInput(event) {
		const value = event.target.value;
		this.verificationCode = value.replace(/\D/g, ''); // Garde uniquement les chiffres
	  },
	  async verifyCode() {
		if (this.verificationCode.length === 4) {
		  try {
			const response = await axios.post('http://localhost:3000/api/users/verify', {
			  email: this.email,
			  code: this.verificationCode,
			});

			if (response.status === 200) {
			  this.$router.push({ name: 'Accueil' });
			}
		  } catch (error) {
			this.errorMessage = error.response?.data?.error || 'Code de vérification incorrect.';
		  }
		} else {
		  this.errorMessage = 'Le code de vérification doit comporter 6 chiffres.';
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
