<!--
	./frontend/src/components/popup/booknow/4PaymentStep.vue
-->

<template>
	<div>
		<p>Récapitulatif</p>
		<p>Nom : {{ appointment.last_name }}</p>
		<p>Prénom : {{ appointment.first_name }}</p>
		<p>Mail : {{ appointment.email }}</p>
		<p>Téléphone : {{ appointment.phone }}</p>
		<p>
			Date et Heure du rendez-vous :
			{{ formatDate(appointment.appointment_time) }}
		</p>
		<p>Méthode de paiement : {{ appointment.payment_method }}</p>
		<button class="button" @click="submitAppointment" :disabled="isSubmitting">{{ submitButtonText }}</button>
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
					alert('Rendez-vous confirmé et notifications envoyées.');
					window.location.href = '/'; // Rediriger vers la page d'accueil
				})
				.catch(() => {
					alert("Erreur lors de l'envoi des notifications.");
					isSubmitting.value = false;
					submitButtonText.value = 'Submit';
				});
		};

		const formatDate = dateTimeString => {
			const options = {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			};
			const date = new Date(dateTimeString);

			date.setHours(date.getHours() - 2);

			return date.toLocaleString('en-US', options);
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
