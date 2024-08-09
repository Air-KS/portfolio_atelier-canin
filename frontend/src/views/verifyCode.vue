<!--
	./frontend/src/components/popup/verifymail.vue.vue
-->

<template>
	<div class="auth-container">
	<div class="auth-form">
	  <h3>Email Verification</h3>
	  <div class="separator"></div>
	  <p>A verification code has been sent to your address:<br>
		<span class="text-mail">{{ email }} </span><br> Please enter the code below:</p>
	  <input v-model="verificationCode" type="text" placeholder="Verification Code" @input="validateInput" /><br>
	  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
	  <button class="button" @click="verifyCode">Send</button>
	  <div class="separator"></div>
	  <p>In case of technical issues, contact us.</p>
	  <p>06.07.08.09.10<br>atlcanin@gmail.com</p>
	</div>
</div>
  </template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

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
	...mapActions(['login']),
    validateInput(event) {
      const value = event.target.value;
      this.verificationCode = value.replace(/\D/g, ''); // Garde uniquement les chiffres
    },
    async verifyCode() {
      if (this.verificationCode.length === 4) { // Assure que cette longueur est correcte (4)
        try {
          const response = await axios.post('http://localhost:3000/api/users/verify', {
            email: this.email, // Utilise l'email récupéré
            code: this.verificationCode,
		}, { withCredentials: true });

          if (response.status === 200) {
			// Stocke le token et l'utilisateur dans le localStorage et Vuex
			const { token, user, role } = response.data;
			await this.login({ user, token, role });

			// Redirige vers la page d'accueil
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
    console.log('Email reçu:', this.email);
  },
};
</script>

<style scoped>

.text-mail {
    color: var(--color-hover);
    font-weight: bold;
}

.separator {
	width: 70%;
	margin-bottom: 20px;
}

input {
	width: 50%;
}

.button {
	margin-top: 20px;
	margin-bottom: 30px;
}

@media (max-width: 600px) {
	.auth-form {
		width: 80%;
	}
}

</style>
