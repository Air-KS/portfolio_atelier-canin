<template>
	<div class="admin-container">
	  <h1>Admin Page</h1>
	  <table>
		<thead>
		  <tr>
			<th>Nom</th>
			<th>Prénom</th>
			<th>Date de Naissance</th>
			<th>Email</th>
			<th>Téléphone</th>
			<th>Adresse 1</th>
			<th>Adresse 2</th>
			<th>Code Postal</th>
			<th>Ville</th>
			<th>Pays</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="user in users" :key="user.id">
			<td>{{ user.last_name }}</td>
			<td>{{ user.first_name }}</td>
			<td>{{ user.date_of_birth }}</td>
			<td>{{ user.email }}</td>
			<td>{{ user.phone }}</td>
			<td>{{ user.address_one }}</td>
			<td>{{ user.address_two }}</td>
			<td>{{ user.zip_code }}</td>
			<td>{{ user.city }}</td>
			<td>{{ user.country }}</td>
		  </tr>
		</tbody>
	  </table>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'AdminPage',
	data() {
	  return {
		users: []
	  };
	},
	async created() {
	  try {
		const response = await axios.get('http://localhost:3000/api/users');
		this.users = response.data;
	  } catch (error) {
		console.error('Erreur lors de la récupération des utilisateurs :', error);
	  }
	}
  };
  </script>

  <style scoped>
  .admin-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
  }

  table {
	border-collapse: collapse;
	width: 100%;
  }

  th, td {
	border: 1px solid #ddd;
	padding: 8px;
  }

  th {
	background-color: #f2f2f2;
	text-align: left;
  }

  tr:nth-child(even) {
	background-color: #f9f9f9;
  }

  tr:hover {
	background-color: #ddd;
  }
  </style>
