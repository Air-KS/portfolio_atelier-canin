<template>
	<div class="register-container">
	  <h1>Register</h1>
	  <form @submit.prevent="register">
		<div>
		  <label for="email">Email:</label>
		  <input type="email" v-model="email" required />
		</div>
		<div>
		  <label for="password">Password:</label>
		  <input type="password" v-model="password" required />
		</div>
		<div>
		  <label for="confirmPassword">Confirm Password:</label>
		  <input type="password" v-model="confirmPassword" required />
		</div>
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
		email: '',
		password: '',
		confirmPassword: ''
	  };
	},
	methods: {
	  async register() {
		if (this.password !== this.confirmPassword) {
		  alert("Passwords do not match");
		  return;
		}

		try {
		  const response = await axios.post('http://localhost:3000/api/users/register', {
			email: this.email,
			password: this.password
		  });

		  if (response.status === 201) {
			this.$router.push({ name: 'Client' });
		  }
		} catch (error) {
		  console.error('Registration failed:', error);
		  alert(error.response.data.error);
		}
	  }
	}
  };
  </script>

  <style scoped>
  .register-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
  }
  </style>
