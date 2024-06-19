<!--
	./frontend/src/views/loginPage.vue
 -->

 <template>
	<div class="login-container">
		<h1>Login</h1>
		<!-- Formulaire de connexion -->
		<form @submit.prevent="login">
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
			<!-- Bouton de connexion -->
			<button type="submit">Login</button>
		</form>
		<!-- Message d'erreur affiché en cas de problème de connexion -->
		<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
		<p>
			<!-- Lien vers la page d'inscription -->
			Don't have an account?
			<router-link to="/register">Register here</router-link>
		</p>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'LoginPage',
	data() {
		return {
			// Stocke email, mot de passe et message d'erreur
			email: '',
			password: '',
			errorMessage: '',
		};
	},

	methods: {
		// Méthode pour gérer la connexion de l'utilisateur
		async login() {
			try {
				// Envoie une requête POST pour se connecter
				const response = await axios.post(
					'http://localhost:3000/api/users/login',
					{
						email: this.email,
						password: this.password,
					}
				);

				// Stock le token et le rôle de l'utilisateur
				const { token, role } = response.data;
				localStorage.setItem('user', token);
				localStorage.setItem('role', role);

				// Redirige l'utilisateur en fonction de son rôle
				if (role === 'admin' || role === 'responsable') {
					this.$router.push({ name: 'Admin' });
				} else if (role === 'client') {
					this.$router.push({ name: 'Client' });
				} else {
					this.$router.push('/');
				}
			} catch (error) {
				// Gère les erreurs
				if (!error.response) {
					this.errorMessage =
						'Une erreur est survenue, veuillez réessayer ultérieurement.';
				} else if (error.response.status === 400) {
					this.errorMessage = error.response.data.error;
				} else {
					this.errorMessage =
						'Une erreur est survenue, veuillez réessayer ultérieurement.';
				}
				console.error('Login failed:', error);
			}
		},
	},
};
</script>

<style scoped>
/* Styles pour le conteneur de connexion */
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

/* Styles pour le message d'erreur */
.error-message {
	color: red;
	margin-top: 10px;
}
</style>
