<template>
	<div class="profile-container">
		<h1>Profile of {{ user.first_name }} {{ user.last_name }}</h1>

		<!-- Onglets de sélection de catégorie -->
		<div class="tabs form-group">
			<button class="button"
				v-for="tab in tabs"
				:key="tab"
				:class="{ active: selectedTab === tab }"
				@click="selectedTab = tab"
			>
				{{ tab }}
			</button>
		</div>

		<!-- Contenu de la catégorie sélectionnée -->
		<div class="tab-content">
			<!-- Section Profil -->
			<div v-if="selectedTab === 'Profil'">
				<form @submit.prevent="updateProfile">
					<!-- Conteneur pour first_name et last_name -->
					<div class="form-row">
						<div class="form-group">
							<label for="first_name">First Name:</label>
							<input
								id="first_name"
								type="text"
								v-model="user.first_name"
								title="Enter your first name"
								placeholder="Jérôme Example"
							/>
						</div>
						<div class="form-group">
							<label for="last_name">Last Name:</label>
							<input
								id="last_name"
								type="text"
								v-model="user.last_name"
								title="Enter your last name"
								placeholder="Bernard Example"
							/>
						</div>
					</div>

					<!-- Conteneur pour date_of_birth et phone -->
					<div class="form-row">
						<div class="form-group">
							<label for="date_of_birth">Date of Birth:</label>
							<input
								id="date_of_birth"
								type="date"
								v-model="user.date_of_birth"
								title="Enter your date of birth"
							/>
						</div>
						<div class="form-group">
							<label for="phone">Phone:</label>
							<input
								id="phone"
								type="text"
								v-model="user.phone"
								title="Enter your phone number"
								placeholder="0607080910"
							/>
						</div>
					</div>

					<!-- Email -->
					<div class="form-row">
						<div class="form-group full-width">
							<label for="email">Email:</label>
							<input class="email"
								id="email"
								type="email"
								v-model="user.email"
								required
								title="Enter your email address"
								placeholder="example@mail.com"
							/>
						</div>
					</div>

					<button class="button" type="submit">Save</button>
				</form>
			</div>

			<!-- Section Rendez-vous -->
			<div v-if="selectedTab === 'Rendez-vous'">
				<h2>Rendez-vous</h2>
				<div v-if="user.appointments && user.appointments.length">
					<div
						v-for="appointment in user.appointments"
						:key="appointment.id"
						class="appointment-item"
					>
						<p><strong>Date :</strong> {{ appointment.date }}</p>
						<p><strong>Détails :</strong> {{ appointment.details }}</p>
					</div>
				</div>
				<div v-else>
					<p>Aucun rendez-vous pour l'instant.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'ProfilePage',
	data() {
		return {
			user: {
				first_name: '',
				last_name: '',
				date_of_birth: '',
				email: '',
				phone: '',
				appointments: [], // Liste des rendez-vous
			},
			tabs: ['Profil', 'Rendez-vous'], // Onglets de la page
			selectedTab: 'Profil', // Onglet sélectionné par défaut
		};
	},
	created() {
		this.fetchUserProfile();
		document.title = 'AtlCanin - Profile';
	},
	methods: {
		async fetchUserProfile() {
			const userId = this.$route.params.id;
			try {
				const response = await axios.get(
					`http://localhost:3000/api/user/profile/${userId}`
				);
				this.user = response.data;
			} catch (error) {
				console.error('Erreur lors de la récupération du profil utilisateur:', error);
			}
		},
		async updateProfile() {
			const userId = this.$route.params.id;
			try {
				await axios.put(
					`http://localhost:3000/api/user/profile/${userId}`,
					this.user
				);
				alert('Profil mis à jour avec succès');
			} catch (error) {
				console.error('Erreur lors de la mise à jour du profil:', error);
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
	width: 100%;
}

.tabs {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

.tabs button {
	padding: 10px 20px;
	margin: 0 5px;
	background-color: #e0e0e0;
	color: #000;
	border: 1px solid #ccc;
	cursor: pointer;
}

.tabs button.active {
	background-color: #007bff;
	color: white;
	border-color: #007bff;
}

.tabs .button:not(.active):hover {
	background-color: #e0e0e0;
	color: #ff5252;
}

.tab-content {
	width: 100%;
	max-width: 600px;
	text-align: center;
}

form .form-row {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 10px;
}

.form-group {
	flex: 1;
	min-width: 45%;
	margin-bottom: 10px;
}


.form-group.full-width {
	min-width: 100%;
}

label {
    margin-bottom: 5px;
	margin-left: 10px;
    font-weight: bold;
    display: block;
    font-size: 18px;
    font-family: 'Arial', sans-serif;
}

/* Styles des inputs */
input {
	width: 80%;
}

input.email {
	width : 80%;
}
input::placeholder {
	font-style: italic;
	color: var(--color-placeholder);
}
input:focus {
	border-color: var(--color-border-input-focus);
	box-shadow: 0 0 8px var(--color-border-shadow);
	outline: none;
}

.appointment-item {
	margin-bottom: 15px;
	border-bottom: 1px solid #ddd;
	padding-bottom: 10px;
}

</style>
