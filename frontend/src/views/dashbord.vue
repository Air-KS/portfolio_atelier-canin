<!--
	./frontend/src/views/dashbord.vue
-->

<template>
	<div class="test">
		<div class="dashbord-container">
			<h1 style="text-align: center">Dashboard</h1>

			<!-- Utilisation du composant DashTabs avec v-model -->
			<DashTabs
				:tabs="['Membres', 'Booknow', 'Services','Store']"
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

			<div v-if="selectedTab === 'Services'">
				<DashServices />
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
import DashServices from '../components/dashbord/dashServices.vue';
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
		DashServices,
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


<style>
.settings-container {
  width: 900px;
  margin: 0px auto;
  padding: 20px 20px 0 20px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 0 8px var(--color-border-shadow);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.toggle-form-btn {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.toggle-form-btn:hover {
  background-color: #0056b3;
}

.form-container {
  margin-bottom: 20px;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}

.settings-title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.settings-list {
  list-style: none;
  padding: 20px;
}

.settings-item {
  border: 1px solid var(--color-hover);
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0px 30px 0px;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.settings-price {
  font-weight: bold;
  color: #333;
}

/* Boutons d'action */
.settings-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.edit-btn {
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  padding: 5px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
