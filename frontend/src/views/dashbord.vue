<!--
	./frontend/src/views/dashbord.vue
-->

<template>
	<div class="test">
		<div class="dashbord-container">
			<h1 style="text-align: center">Dashboard</h1>

			<!-- Utilisation du composant DashTabs avec v-model -->
			<DashTabs
				:tabs="['Membres', 'Booknow', 'Settings','Store']"
				v-model="selectedTab"
			/>

			<!-- Affichage dynamique basé sur l'onglet sélectionné -->
			<div v-if="selectedTab === 'Membres'">
				<DashMembers
					:users="users"
					:userRole="userRole"
					@change-role="changeUserRole"
					@delete-user="deleteUser"
				/>
			</div>

			<div v-if="selectedTab === 'Booknow'">
				<dashBook title="Liste des Rendez-vous" />
			</div>

			<div v-if="selectedTab === 'Settings'">
				<DashSetting />
			</div>

			<div v-if="selectedTab === 'Store'">
				<DashStore />
			</div>

		</div>
	</div>
</template>

  <script>
import axios from 'axios';
import DashTabs from '../components/dashbord/dashTabs.vue';
import DashMembers from '../components/dashbord/dashMembers.vue';
import DashBook from '../components/dashbord/dashBook.vue';
import DashSetting from '../components/dashbord/dashSetting.vue';
import researchBar from '../components/researchBar.vue';
import DashStore from '@/components/dashbord/dashStore.vue';

export default {
	name: 'Dashbord',
	created() {
		document.title = 'AtlCanin - Dashboard';
	},
	components: {
		DashTabs,
		DashMembers,
		DashBook,
		DashSetting,
		DashStore,
		researchBar,
	},
	data() {
		return {
			users: [], // Liste des utilisateurs
			userRole: '', // Rôle de l'utilisateur connecté
			searchQuery: '', // Requête de recherche pour Booknow
			selectedTab: 'Membres',
		};
	},
	async mounted() {
		await this.refreshUsers();
		this.userRole = localStorage.getItem('role');
	},
	methods: {
		// Méthode pour changer le rôle d'un utilisateur
		async changeUserRole(userId, newRole) {
			try {
				await axios.put(`http://localhost:3000/api/user/role/${userId}`, {
					role: newRole,
				});
				alert(`Utilisateur mis à jour avec succès vers ${newRole}`);
				this.refreshUsers();
			} catch (error) {
				console.error(`Error updating user:`, error);
			}
		},
		// Méthode pour supprimer un utilisateur
		async deleteUser(userId) {
			try {
				await axios.delete(`http://localhost:3000/api/user/delete/${userId}`);
				alert('User successfully deleted');
				this.refreshUsers();
			} catch (error) {
				console.error('Error deleting user:', error);
			}
		},
		// Méthode pour récupérer et initialiser les utilisateurs
		async refreshUsers() {
			try {
				const response = await axios.get('http://localhost:3000/api/user/all');
				this.users = response.data;
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		},
	},
};
</script>
