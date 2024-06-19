<!--
	./frontend/src/views/adminPage.vue
 -->


 <template>
	<div class="admin-container">
	  <h1>Admin Page</h1>
	  <UserTable
		title="Admins"
		:users="admins"
		role="admin"
		:userRole="userRole"
		@change-role="changeUserRole"
		@delete-user="deleteUser"
	  />
	  <UserTable
		title="Responsables"
		:users="responsables"
		role="responsable"
		:userRole="userRole"
		@change-role="changeUserRole"
		@delete-user="deleteUser"
	  />
	  <UserTable
		title="Clients"
		:users="clients"
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

  export default {
	name: 'AdminPage',
	components: {
	  UserTable,
	},
	data() {
	  return {
		users: [],
		admins: [],
		responsables: [],
		clients: [],
		userRole: '', // Variable pour stocker le rôle de l'utilisateur connecté
	  };
	},
	async created() {
	  await this.refreshUsers();
	  this.userRole = localStorage.getItem('role');
	},
	methods: {
	  async changeUserRole(userId, newRole) {
		try {
		  await axios.put(`http://localhost:3000/api/users/${userId}/role`, {
			role: newRole,
		  });
		  alert(`Utilisateur mis à jour avec succès vers ${newRole}`);
		  this.refreshUsers();
		} catch (error) {
		  console.error(`Erreur lors de la mise à jour de l'utilisateur :`, error);
		}
	  },
	  async deleteUser(userId) {
		try {
		  await axios.delete(`http://localhost:3000/api/users/${userId}`);
		  alert('Utilisateur supprimé avec succès');
		  this.refreshUsers();
		} catch (error) {
		  console.error('Erreur lors de la suppression de l\'utilisateur :', error);
		}
	  },
	  async refreshUsers() {
		try {
		  const response = await axios.get('http://localhost:3000/api/users');
		  this.users = response.data;

		  this.admins = this.filterUsersByRole('admin');
		  this.responsables = this.filterUsersByRole('responsable');
		  this.clients = this.filterUsersByRole('client');
		} catch (error) {
		  console.error('Erreur lors de la récupération des utilisateurs :', error);
		}
	  },
	  filterUsersByRole(role) {
		return this.users.filter(user => user.Register && user.Register.Role && user.Register.Role.role === role);
	  }
	},
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
  </style>
