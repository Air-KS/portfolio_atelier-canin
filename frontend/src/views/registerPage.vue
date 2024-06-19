<!--
	./frontend/src/views/registerPage.vue
 -->

<template>
	<!-- Formulaire d'inscription -->
	<div class="register-container">
		<h1>Register</h1>
		<form @submit.prevent="register">
			<div>
				<!-- Champ email -->
				<label for="email">Email:</label>
				<input type="email" v-model="email" required />
			</div>
			<div>
				<!-- Champ mot de passe -->
				<label for="password">Password:</label>
				<input type="password" v-model="password" required />
			</div>
			<div>
				<!-- Champ confirmation du mot de passe -->
				<label for="confirmPassword">Confirm Password:</label>
				<input type="password" v-model="confirmPassword" required />
			</div>
			<!-- Bouton de d'inscription -->
			<button type="submit">Register</button>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'RegisterPage',
		data() {
			return {
				// Stock l'email, password, confirmation
				email: '',
				password: '',
				confirmPassword: '',
			};
		},

		methods: {
			// Méthode pour gérer l'inscription de l'utilisateur
			async register() {
				if (this.password !== this.confirmPassword) {
					alert('Passwords do not match');
					return;
				}

				try {
					// Envoie une requête POST pour enregistrer l'utilisateur
					const response = await axios.post(
						'http://localhost:3000/api/users/register',
						{
							email: this.email,
							password: this.password,
						}
					);

					// Si l'inscription est réussie, redirige vers la page "Client"
					if (response.status === 201) {
						this.$router.push({ name: 'Client' });
					}
				} catch (error) {
					// Gère les erreurs d'inscription
					console.error('Registration failed:', error);
					alert(error.response.data.error);
				}
			},
		},
	};
</script>

<style scoped>
	/* Styles pour le conteneur d'inscription */
	.register-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
