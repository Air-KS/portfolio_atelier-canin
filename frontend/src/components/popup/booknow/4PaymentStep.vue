<!--
	./frontend/src/components/popup/booknow/4PaymentStep.vue
-->

<template>
	<div>
		<p>Summary</p>
		<p>Name: {{ appointment.first_name }}</p>
		<p>Email: {{ appointment.email }}</p>
		<p>
			Appointment Date and Time:
			{{ formatDate(appointment.appointment_time) }}
		</p>
		<p>Payment Method: {{ appointment.payment_method }}</p>
		<button class="button" @click="submitAppointment" :disabled="isSubmitting">
			{{ submitButtonText }}
		</button>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	props: ['appointment'],
	setup(props, { emit }) {
		const isSubmitting = ref(false);
		const submitButtonText = ref('Submit');

		const submitAppointment = () => {
			isSubmitting.value = true;
			submitButtonText.value = 'Submitting...';

			fetch('http://localhost:3000/api/appointments', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(props.appointment),
			})
				.then(response => response.json())
				.then(() => {
					alert('Appointment confirmed and notifications sent.');
					window.location.href = '/'; // Redirect to homepage
				})
				.catch(() => {
					alert('Error sending notifications.');
					isSubmitting.value = false;
					submitButtonText.value = 'Submit';
				});
		};

		// Modification pour afficher l'heure en format 24 heures
		const formatDate = dateTimeString => {
			const options = {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: false,
			};
			const date = new Date(dateTimeString);

			return date.toLocaleString('fr-FR', options);
		};

		return { submitAppointment, formatDate, isSubmitting, submitButtonText };
	},
};
</script>

<style scoped>
button[disabled] {
	background-color: grey;
	cursor: not-allowed;
}
</style>
