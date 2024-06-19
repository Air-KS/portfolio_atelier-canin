<!--
	./frontend/src/component/userTable.vue
 -->

<template>
	<div>
		<h2>{{ title }}</h2>
		<table>
			<thead>
				<tr>
					<th>Nom</th>
					<th>Prénom</th>
					<th>Date de Naissance</th>
					<th>Email</th>
					<th>Code Postal</th>
					<th>Ville</th>
					<th>Pays</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{ user.last_name }}</td>
					<td>{{ user.first_name }}</td>
					<td>{{ user.date_of_birth }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.zip_code }}</td>
					<td>{{ user.city }}</td>
					<td>{{ user.country }}</td>
					<td>
						<div v-if="userRole === 'admin'">
							<div
								v-if="role === 'responsable' && !['jerome@gmail.com', 'kevin@gmail.com'].includes(user.email)">
								<button @click="demoteToClient(user.id)">Client</button>
								<button @click="deleteUser(user.id)">Supprimer</button>
							</div>
							<div v-else-if="role === 'client'">
								<button @click="promoteToResponsable(user.id)">Responsable</button>
								<button @click="deleteUser(user.id)">Supprimer</button>
							</div>
						</div>
						<div v-else-if="userRole === 'responsable' && role === 'client'">
							<button @click="deleteUser(user.id)">Supprimer</button>
						</div>
						<!-- Aucune action pour ce rôle -->
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		users: Array,
		role: String,
		userRole: String,
	},
	methods: {
		promoteToResponsable(userId) {
			this.$emit('change-role', userId, 'responsable');
		},
		demoteToClient(userId) {
			this.$emit('change-role', userId, 'client');
		},
		deleteUser(userId) {
			this.$emit('delete-user', userId);
		},
	},
};
</script>

<style scoped>
table {
	border-collapse: collapse;
	width: 100%;
	margin-bottom: 20px;
}

th,
td {
	border: 1px solid black;
	padding: 8px;
}

th {
	background-color: #f2f2f2;
	text-align: center;
}

tr:nth-child(even) {
	background-color: #f9f9f9;
}

tr:hover {
	background-color: #ddd;
}
</style>
