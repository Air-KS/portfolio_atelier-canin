<!--
	./frontend/src/components/dashbord/dashBook.vue
-->

<template>
	<div>
		<!-- Barre de recherche pour filtrer les rendez-vous -->
		<researchBar
			v-model="searchQuery"
			placeholder="Search for an appointment"
		/>

		<h2>{{ title }}</h2>
		<table class="custom-table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nom</th>
					<th>Email</th>
					<th>Service</th>
					<th>Date</th>
					<th>Heure</th>
					<th>Statut</th>
				</tr>
			</thead>
			<tbody>
				<!-- Boucle sur les rendez-vous filtrés -->
				<tr v-for="appointment in filteredAppointments" :key="appointment.id">
					<td>{{ appointment.id }}</td>
					<td>{{ appointment.first_name }}</td>
					<td>{{ appointment.email }}</td>
					<td>{{ appointment.service ? appointment.service.name : 'Aucun' }}</td>
					<td>
						{{
							new Date(appointment.appointment_time).toLocaleDateString('fr-FR')
						}}
					</td>
					<td>
						{{
							new Date(appointment.appointment_time).toLocaleTimeString(
								'fr-FR',
								{ hour: '2-digit', minute: '2-digit' }
							)
						}}
					</td>
					<td>{{ appointment.status }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';
import researchBar from '../researchBar.vue';

export default {
	name: 'DashBook',
	components: {
		researchBar,
	},
	props: {
		title: String,
	},
	data() {
		return {
			appointments: [],
			searchQuery: '', // Requête de recherche
		};
	},
	computed: {
		// Filtrer les rendez-vous en fonction de la requête de recherche
		filteredAppointments() {
			if (!this.searchQuery) {
				return this.appointments; // Retourne tous les rendez-vous si aucune recherche
			}
			const search = this.searchQuery.toLowerCase();
			return this.appointments.filter(appointment => {
				const appointmentDate = new Date(
					appointment.appointment_time
				).toLocaleDateString('fr-FR');
				const appointmentTime = new Date(
					appointment.appointment_time
				).toLocaleTimeString('fr-FR', {
					hour: '2-digit',
					minute: '2-digit',
				});

				const appointmentData = `${appointment.first_name} ${
					appointment.email
				} ${
					appointment.service ? appointment.service.name : 'Aucun'
				} ${appointmentDate} ${appointmentTime} ${
					appointment.status
				}`.toLowerCase();

				return appointmentData.includes(search);
			});
		},
	},
	async mounted() {
		await this.fetchAppointments();
	},
	methods: {
		async fetchAppointments() {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/appointments'
				);
				this.appointments = response.data;
			} catch (error) {
				console.error(
					'Erreur lors de la récupération des rendez-vous :',
					error
				);
			}
		},
	},
};
</script>
