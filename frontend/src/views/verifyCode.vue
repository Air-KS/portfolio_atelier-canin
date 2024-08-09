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
  data() {
    return {
      verificationCode: '',
      errorMessage: '',
      email: this.$route.query.email || '', // Récupère l'email depuis query
    };
  },
  methods: {
    validateInput(event) {
      const value = event.target.value;
      this.verificationCode = value.replace(/\D/g, ''); // Garde uniquement les chiffres
    },
    async verifyCode() {
      if (this.verificationCode.length === 4) { // Assure-toi que cette longueur est correcte (4 ou 6)
        try {
          const response = await axios.post('http://localhost:3000/api/users/verify', {
            email: this.email, // Utilise l'email récupéré
            code: this.verificationCode,
		}, { withCredentials: true });

          if (response.status === 200) {
            this.$router.push({ name: 'Accueil' });
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du code:', error); // Log l'erreur complète
          this.errorMessage = error.response?.data?.error || 'Code de vérification incorrect.';
        }
      } else {
        this.errorMessage = 'Le code de vérification doit comporter 4 chiffres.';
      }
    },
  },
  mounted() {
    console.log('Email reçu:', this.email); // Assure-toi que cet email est correct
  },
};
</script>

  <style scoped>
  .error-message {
	color: red;
	font-weight: bold;
  }
  </style>
