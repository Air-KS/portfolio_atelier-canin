<!--
	./frontend/src/views/dashbord.vue
-->

<template>
	<div class="admin-container">
		<h1>Dashboard</h1>

		<!-- Bar de Recherche -->
		<researchBar v-model="searchQuery" placeholder="Search for a user..." />

		<!-- Table des utilisateurs avec le rôle "admin" -->
		<UserTable
			title="Admins"
			:users="filteredUsers('admin')"
			role="admin"
			:userRole="userRole"
			@change-role="changeUserRole"
			@delete-user="deleteUser"
		/>
		<!-- Table des utilisateurs avec le rôle "responsable" -->
		<UserTable
			title="Manager"
			:users="filteredUsers('manager')"
			role="manager"
			:userRole="userRole"
			@change-role="changeUserRole"
			@delete-user="deleteUser"
		/>
		<!-- Table des utilisateurs avec le rôle "client" -->
		<UserTable
			title="Clients"
			:users="filteredUsers('client')"
			role="client"
			:userRole="userRole"
			@change-role="changeUserRole"
			@delete-user="deleteUser"
		/>
	</div>
</template>

<script>
import axios from 'axios';
import UserTable from '../components/userTable.vue';
import researchBar from '../components/researchBar.vue';

export default {
	name: 'Dashbord',
	created() {
		document.title = 'AtlCanin - Dashboard';
	},
	components: {
		UserTable,
		researchBar,
	},
	data() {
		return {
			users: [], // Liste des utilisateurs
			userRole: '', // Rôle de l'utilisateur connecté
			searchQuery: '', // Requête de recherche
		};
	},
	// Récupère les utilisateurs et initialise le rôle
	async mounted() {
		await this.refreshUsers();
		this.userRole = localStorage.getItem('role');
	},
	computed: {
		// Filtre les utilisateurs par rôle
		filteredUsers() {
			return role => {
				return this.filterUsers(this.filterUsersByRole(role));
			};
		},
	},

	methods: {
		// Méthode pour changer le rôle d'un utilisateur
		async changeUserRole(userId, newRole) {
			try {
				await axios.put(
					`http://localhost:3000/api/user/role/${userId}`,
					{
						role: newRole,
					}
				);
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

		// Méthode pour filtrer les utilisateurs par rôle
		filterUsersByRole(role) {
			return this.users.filter(user => user.Role && user.Role.role === role);
		},

		// Méthode pour filtrer les utilisateurs par requête de recherche
		filterUsers(users) {
			return users.filter(user => {
				const fullName =
					`${user.last_name} ${user.first_name} ${user.email} ${user.phone}`.toLowerCase();
				return fullName.includes(this.searchQuery.toLowerCase());
			});
		},
	},
};
</script>

<style scoped>
/* Styles pour le conteneur admin */
.admin-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
}
</style>
