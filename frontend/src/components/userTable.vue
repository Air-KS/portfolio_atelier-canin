<!--
	./frontend/src/component/userTable.vue
-->

<template>
	<div>
		<!-- Titre de la table -->
		<h2>{{ title }}</h2>
		<table>
			<thead>
				<tr>
					<th>Profil</th>
					<th>Email</th>
					<th>First name</th>
					<th>Last name</th>
					<th>Date of Birth</th>
					<th v-if="role !== 'admin'">Phone</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<!-- Afficher chaque utilisateur -->
				<tr v-for="user in users" :key="user.id">
					<td align="center">
						<!-- Icône de profile cliquable -->
						<router-link :to="{ name: 'Profile', params: { id: user.id } }">
							<i class="fas fa-user profile-icon"></i>
						</router-link>
					</td>
					<td>{{ user.email }}</td>
					<td>{{ user.first_name }}</td>
					<td>{{ user.last_name }}</td>
					<td>{{ user.date_of_birth }}</td>
					<td v-if="role !== 'admin'">{{ user.phone }}</td>
					<td>
						<!-- Actions pour le rôle 'admin -->
						<div v-if="userRole === 'admin'">
							<!-- Actions pour 'manager' (sauf emails protégés) -->
							<div
								v-if="
									role === 'manager' &&
									!['jerome@gmail.com', 'kevin@gmail.com'].includes(user.email)
								"
							>
								<button @click="demoteToClient(user.id)">Client</button>
								<button @click="deleteUser(user.id)">Delete</button>
							</div>

							<!-- Actions pour 'client' -->
							<div v-else-if="role === 'client'">
								<button @click="promoteTomanager(user.id)">Manager</button>
								<button @click="deleteUser(user.id)">Delete</button>
							</div>
						</div>

						<!-- Actions pour'manager' -->
						<div v-else-if="userRole === 'manager' && role === 'client'">
							<button @click="deleteUser(user.id)">Delete</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	// // Props reçues
	props: {
		title: String, // Titre de la table
		users: Array, // Liste des utilisateurs
		role: String, // Rôle des utilisateurs
		userRole: String, // Rôle de l'utilisateur connecté
	},
	methods: {
		// Promouvoir utilisateur (client -> manager)
		promoteTomanager(userId) {
			this.$emit('change-role', userId, 'manager');
		},
		// Retrograder utilisateur (respondable -> client)
		demoteToClient(userId) {
			this.$emit('change-role', userId, 'client');
		},
		// Suprimer un utilisateur
		deleteUser(userId) {
			this.$emit('delete-user', userId);
		},
	},
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css'; /* Import FontAwesome */

table {
	/* Styles pour la table */
	border-collapse: collapse;
	width: 100%;
	margin-bottom: 20px;
}

/* Styles pour les cellules */
th,
td {
	border: 1px solid var(--color-border);
	padding: 8px;
}

/* Style pour les en-têtes de colonne */
th {
	background-color: #f2f2f2;
	text-align: center;
}

/* Style pour les lignes paires */
tr:nth-child(even) {
	background-color: #f9f9f9;
}

/* Style pour les lignes au survol */
tr:hover {
	background-color: var(--menu-color-hover);
}

.profile-icon {
	color: #4687af;
}
</style>
