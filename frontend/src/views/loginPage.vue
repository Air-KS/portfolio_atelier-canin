<!--
	./frontend/src/views/loginPage.vue
-->

<template>
	<div>
		<AuthForm
			ref="authForm"
			:isRegister="false"
			:errorMessage="errorMessage"
			:isResending="isResending"
			@login="login"
		/>
	</div>
</template>

  <script>
import AuthForm from '@/components/authForm.vue';
import axios from 'axios';

export default {
	name: 'LoginPage',
	mounted() {
		document.title = 'AtlCanin - Login';
	},
	components: {
		AuthForm,
	},
	data() {
		return {
			errorMessage: '',
			isResending: false, // Ajoute isResending dans le data
		};
	},
	methods: {
		async login({ email, password }) {
			this.isResending = true; // Désactiver le bouton avant de commencer

			try {
				const response = await axios.post(
					'http://localhost:3000/api/users/login',
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

				if (role === 'admin' || role === 'responsable') {
					this.$router.push({ name: 'Admin' });
				} else if (role === 'client') {
					this.$router.push({ name: 'Accueil' });
				} else {
					this.$router.push('/');
				}
			} catch (error) {
				if (!error.response) {
					this.errorMessage = 'An error occurred, please try again later.';
				} else if (error.response.status === 400) {
					this.errorMessage = error.response.data.error;
				} else {
					this.errorMessage = 'An error occurred, please try again later.';
				}
				console.error('Login failed:', error);
			} finally {
				this.isResending = false; // Réactiver le bouton après la requête
			}
		},
	},
};
</script>

  <style scoped>
</style>
