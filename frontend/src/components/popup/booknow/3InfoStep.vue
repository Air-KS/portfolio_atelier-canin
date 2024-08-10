<!--
	./frontend/src/components/popup/booknow/3InfoStep.vue
-->

<template>
	<div>
		<p>Information - First Name, Last Name, Email, Phone Number</p>
		<div class="form-group">
			<label for="first_name">First Name</label>
			<input type="text" v-model="appointment.first_name" id="first_name" />
		</div>
		<div class="form-group">
			<label for="last_name">Last Name</label>
			<input type="text" v-model="appointment.last_name" id="last_name" />
		</div>
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" v-model="appointment.email" id="email" />
		</div>
		<div class="form-group">
			<label for="phone">Phone</label>
			<input type="text" v-model="appointment.phone" id="phone" />
		</div>
		<button class="button" @click="goToNextStep">Next</button>
	</div>
</template>

  <script>
export default {
	props: ['appointment'],
	setup(props, { emit }) {
		const goToNextStep = () => emit('next-step');

		// Ajout d'un log pour vérifier les données
		console.log('Appointment Data in 3InfoStep:', props.appointment);

		return { goToNextStep };
	},
};
</script>

<style scoped>
.form-group {
	margin-bottom: 1em;
}
.form-group label {
	display: block;
	margin-bottom: 0.5em;
}
.form-group input {
	width: 100%;
	padding: 0.5em;
	box-sizing: border-box;
}
</style>
