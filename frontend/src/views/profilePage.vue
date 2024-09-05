<!--
	./frontend/src/views/ProfilePage.vue
-->

<template>
	<div class="profile-container">
		<h1>{{ user.first_name }} {{ user.last_name }}</h1>

		<ProfTabs
			:tabs="tabs"
			:selectedTab="selectedTab"
			@tab-selected="selectedTab = $event"
		/>

		<ProfProfile
			v-if="selectedTab === 'Profile'"
			:user="user"
			@update-profile="updateProfile"
		/>
		<ProfBook
			v-if="selectedTab === 'Rendez-vous'"
			:appointments="user.appointments"
		/>
	</div>
</template>

<script>
import axios from 'axios';
import ProfTabs from '../components/profile/profTabs.vue';
import ProfProfile from '../components/profile/profProfile.vue';
import ProfBook from '../components/profile/profBook.vue';

export default {
	name: 'ProfilePage',
	components: { ProfTabs, ProfProfile, ProfBook },
	data() {
		return {
			user: {
				first_name: '',
				last_name: '',
				date_of_birth: '',
				email: '',
				phone: '',
				appointments: [],
			},
			tabs: ['Profile', 'Rendez-vous'],
			selectedTab: 'Profile',
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
					`http://localhost:3000/api/user/profile/${userId}`
				);
				this.user = response.data;
			} catch (error) {
				console.error(
					'Erreur lors de la récupération du profil utilisateur:',
					error
				);
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

				// Rafraîchit la page après la mise à jour
				location.reload();
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
	width: 100%;
}
</style>
