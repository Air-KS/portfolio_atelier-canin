<!--
	./frontend/src/components/dashbord/dashMembers.vue
-->

<template>
	<div>
	  <!-- Barre de recherche pour filtrer les utilisateurs -->
	  <researchBar v-model="searchQuery" placeholder="Search for a user..." />

	  <!-- Affichage des différents tableaux de membres -->
	  <div>
		<!-- Table des admins -->
		<h2>Admins</h2>
		<table style="align-items: center" class="custom-table">
		  <thead >
			<tr>
			  <th>Profil</th>
			  <th>Email</th>
			  <th>First name</th>
			  <th>Last name</th>
			  <th>Date of Birth</th>
			  <th v-if="userRole !== 'admin'">Phone</th>
			  <th>Inscription</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="user in filteredUsers('admin')" :key="user.id">
			  <td align="center">
				<router-link :to="{ name: 'Profile', params: { id: user.id } }">
				  <i class="fas fa-user profile-icon"></i>
				</router-link>
			  </td>
			  <td>{{ user.email }}</td>
			  <td>{{ user.first_name }}</td>
			  <td>{{ user.last_name ? user.last_name : 'N/A' }}</td>
			  <td>{{ user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('fr-FR') : 'N/A' }}</td>
			  <td v-if="userRole !== 'admin'">{{ user.phone ? user.phone : 'N/A' }}</td>
			  <td>{{ new Date(user.created_at).toLocaleDateString('fr-FR') }}</td>
			  <td>
				<div v-if="userRole === 'admin'">
				  <div
					v-if="!['jerome@gmail.com', 'kevin@gmail.com'].includes(user.email) && user.Role.role === 'manager'"
				  >
					<button @click="changeUserRole(user.id, 'client')">Client</button>
					<button @click="deleteUser(user.id)">Delete</button>
				  </div>
				  <div v-else-if="user.Role.role === 'client'">
					<button @click="changeUserRole(user.id, 'manager')">Manager</button>
					<button @click="deleteUser(user.id)">Delete</button>
				  </div>
				</div>
				<div v-else-if="userRole === 'manager' && user.Role.role === 'client'">
				  <button @click="deleteUser(user.id)">Delete</button>
				</div>
			  </td>
			</tr>
		  </tbody>
		</table>
	  </div>

	  <!-- Table des Managers -->
	  <h2>Managers</h2>
	  <table class="custom-table">
		<thead>
		  <tr>
			<th>Profil</th>
			<th>Email</th>
			<th>First name</th>
			<th>Last name</th>
			<th>Date of Birth</th>
			<th v-if="userRole !== 'admin'">Phone</th>
			<th>Inscription</th>
			<th>Actions</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="user in filteredUsers('manager')" :key="user.id">
			<td align="center">
			  <router-link :to="{ name: 'Profile', params: { id: user.id } }">
				<i class="fas fa-user profile-icon"></i>
			  </router-link>
			</td>
			<td>{{ user.email }}</td>
			<td>{{ user.first_name }}</td>
			<td>{{ user.last_name ? user.last_name : 'N/A' }}</td>
			<td>{{ user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('fr-FR') : 'N/A' }}</td>
			<td v-if="userRole !== 'admin'">{{ user.phone ? user.phone : 'N/A' }}</td>
			<td>{{ new Date(user.created_at).toLocaleDateString('fr-FR') }}</td>
			<td>
			  <div v-if="userRole === 'admin'">
				<div v-if="user.Role.role === 'manager'">
				  <button @click="changeUserRole(user.id, 'client')">Client</button>
				  <button @click="deleteUser(user.id)">Delete</button>
				</div>
			  </div>
			  <div v-else-if="userRole === 'manager' && user.Role.role === 'client'">
				<button @click="deleteUser(user.id)">Delete</button>
			  </div>
			</td>
		  </tr>
		</tbody>
	  </table>

	  <!-- Table des Clients -->
	  <h2>Clients</h2>
	  <table class="custom-table">
		<thead>
		  <tr>
			<th>Profil</th>
			<th>Email</th>
			<th>First name</th>
			<th>Last name</th>
			<th>Date of Birth</th>
			<th v-if="userRole !== 'admin'">Phone</th>
			<th>Inscription</th>
			<th>Actions</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="user in filteredUsers('client')" :key="user.id">
			<td align="center">
			  <router-link :to="{ name: 'Profile', params: { id: user.id } }">
				<i class="fas fa-user profile-icon"></i>
			  </router-link>
			</td>
			<td>{{ user.email }}</td>
			<td>{{ user.first_name }}</td>
			<td>{{ user.last_name ? user.last_name : 'N/A' }}</td>
			<td>{{ user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('fr-FR') : 'N/A' }}</td>
			<td v-if="userRole !== 'admin'">{{ user.phone ? user.phone : 'N/A' }}</td>
			<td>{{ new Date(user.created_at).toLocaleDateString('fr-FR') }}</td>
			<td>
			  <div v-if="userRole === 'admin'">
				<div v-if="user.Role.role === 'client'">
				  <button @click="changeUserRole(user.id, 'manager')">Manager</button>
				  <button @click="deleteUser(user.id)">Delete</button>
				</div>
			  </div>
			  <div v-else-if="userRole === 'manager' && user.Role.role === 'client'">
				<button @click="deleteUser(user.id)">Delete</button>
			  </div>
			</td>
		  </tr>
		</tbody>
	  </table>
	</div>
  </template>

  <script>
  import researchBar from '../researchBar.vue';

  export default {
	name: 'DashMembers',
	components: {
	  researchBar,
	},
	props: {
	  users: {
		type: Array,
		required: true,
	  },
	  userRole: {
		type: String,
		required: true,
	  },
	},
	data() {
	  return {
		searchQuery: '', // Requête de recherche
	  };
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
	  // Méthode pour filtrer les utilisateurs par rôle
	  filterUsersByRole(role) {
		return this.users.filter(user => user.Role && user.Role.role === role);
	  },
	  // Méthode pour filtrer les utilisateurs par requête de recherche
	  filterUsers(users) {
		return users.filter(user => {
		  const fullName = `${user.last_name} ${user.first_name} ${user.email} ${user.phone}`.toLowerCase();
		  return fullName.includes(this.searchQuery.toLowerCase());
		});
	  },
	  // Méthode pour changer le rôle d'un utilisateur
	  changeUserRole(userId, newRole) {
		this.$emit('change-role', userId, newRole);
	  },
	  // Méthode pour supprimer un utilisateur
	  deleteUser(userId) {
		this.$emit('delete-user', userId);
	  },
	},
  };
  </script>
