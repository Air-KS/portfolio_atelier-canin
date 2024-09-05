<!--
	./frontend/src/components/profile/profBook.vue
-->

<template>
	<div>
		<h2>Rendez-vous</h2>
		<div v-if="appointments && appointments.length">
			<div
				v-for="appointment in appointments"
				:key="appointment.id"
				class="appointment-item"
			>
				<p>
					<strong>Date :</strong>
					{{ appointment.date }}
				</p>
				<p>
					<strong>Détails :</strong>
					{{ appointment.details }}
				</p>
			</div>
		</div>
		<div v-else>
			<p>Aucun rendez-vous pour l'instant.</p>
		</div>
	</div>
</template>

  <script>
export default {
	name: 'ProfBook',
	props: {
		appointments: Array,
	},
};
</script>

  <style scoped>
.appointment-item {
	margin-bottom: 15px;
	border-bottom: 1px solid #ddd;
	padding-bottom: 10px;
}
</style>
