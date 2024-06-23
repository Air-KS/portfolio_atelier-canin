<template>
	<div class="login-contener">
		<Login @login="login" :errorMessage="errorMessage" />
	</div>
</template>

<script>
import axios from 'axios';
import Login from '../components/login.vue';

export default {
	name: 'LoginPage',
	components: {
		Login,
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
.login-contener {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 80px;
	background-color: #f0f0f0;
}

.login-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 8px var(--color-border-shadow);
}

.error-message {
	color: red;
	font-weight: bold;
}
</style>
