<template>
	<AuthForm :isRegister="false" :errorMessage="errorMessage" @login="login" />
</template>

  <script>
import AuthForm from '@/components/authForm.vue';
import axios from 'axios'; // Assure-toi d'importer axios

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
		};
	},
	methods: {
		async login({ email, password }) {
			console.log('Login method called with', email, password);
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

				console.log('User created:', user);

				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('token', token);
				localStorage.setItem('role', role);

				console.log(
					'User stored in localStorage:',
					localStorage.getItem('user')
				);

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

.error-message {
	color: red;
	font-weight: bold;
}
</style>
