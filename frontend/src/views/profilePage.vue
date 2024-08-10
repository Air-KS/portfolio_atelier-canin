<!--
	./frontend/src/views/profilePage.vue
-->

<template>
	<div class="profile-container">
		<h1>Profile of {{ user.first_name }} {{ user.last_name }}</h1>
		<form @submit.prevent="updateProfile">
			<div>
				<label for="first_name">First Name:</label>
				<input
					id="first_name"
					type="text"
					v-model="user.first_name"
					title="Enter your first name"
					placeholder="Jérôme Example"
				/>
			</div>
			<div>
				<label for="last_name">Last Name:</label>
				<input
					id="last_name"
					type="text"
					v-model="user.last_name"
					title="Enter your last name"
					placeholder="Bernard Example"
				/>
			</div>
			<div>
				<label for="date_of_birth">Date of Birth:</label>
				<input
					id="date_of_birth"
					type="date"
					v-model="user.date_of_birth"
					title="Enter your date of birth"
				/>
			</div>
			<div>
				<label for="email">Email:</label>
				<input
					id="email"
					type="email"
					v-model="user.email"
					required
					title="Enter your email address"
					placeholder="example@mail.com"
				/>
			</div>
			<div>
				<label for="phone">Phone:</label>
				<input
					id="phone"
					type="text"
					v-model="user.phone"
					title="Enter your phone number"
					placeholder="0607080910"
				/>
			</div>
			<div>
				<label for="address_one">Address:</label>
				<input
					id="address_one"
					type="text"
					v-model="user.address_one"
					title="Enter your address"
					placeholder="123 Rue Example"
				/>
			</div>
			<div>
				<label for="address_two">Secondary Address:</label>
				<input
					id="address_two"
					type="text"
					v-model="user.address_two"
					title="Enter your secondary address (if applicable)"
					placeholder="Apartment 4B"
				/>
			</div>
			<div>
				<label for="zip_code">Zip Code:</label>
				<input
					id="zip_code"
					type="text"
					v-model="user.zip_code"
					title="Enter your zip code"
					placeholder="75001"
				/>
			</div>
			<div>
				<label for="city">City:</label>
				<input
					id="city"
					type="text"
					v-model="user.city"
					title="Enter your city"
					placeholder="Paris"
				/>
			</div>
			<div>
				<label for="country">Country:</label>
				<input
					id="country"
					type="text"
					v-model="user.country"
					title="Enter your country"
					placeholder="France"
				/>
			</div>
			<button class="button" type="submit">Save</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'ProfilePage',
	mounted() {
		document.title = 'AtlCanin - Profile';
	},
	data() {
		return {
			user: {
				first_name: '',
				last_name: '',
				date_of_birth: '',
				email: '',
				phone: '',
				address_one: '',
				address_two: '',
				zip_code: '',
				city: '',
				country: '',
			},
		};
	},
	created() {
		this.fetchUserProfile();
	},
	methods: {
		async fetchUserProfile() {
			const userId = this.$route.params.id;
			try {
				const response = await axios.get(
					`http://localhost:3000/api/users/${userId}`
				);
				console.log('API response:', response.data);
				this.user = response.data;
			} catch (error) {
				console.error(
					'Error fetching user profile:',
					error
				);
			}
		},
		async updateProfile() {
			const userId = this.$route.params.id;
			try {
				const response = await axios.put(
					`http://localhost:3000/api/users/${userId}`,
					this.user
				);
				alert('Profile updated successfully');
			} catch (error) {
				console.error(
					'Error updating user profile:',
					error
				);
			}
		},
	},
};
</script>

<style scoped>
.profile-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
}

form {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
}

form div {
	margin-bottom: 10px;
}

label {
	margin-bottom: 5px;
}

input {
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;
	border: 1px solid #ccc;
}


</style>
