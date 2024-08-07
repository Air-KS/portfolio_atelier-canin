<template>
	<div class="calendar-container">
		<h3>Réserver Maintenant</h3>
		<p>Contenu spécifique pour la réservation.</p>
		<div class="pag-container">
			<img
				src="@/assets/images/pagination/pag1-hover.svg"
				alt="number1"
				loading="lazy"
				@click="currentPage = 1"
			/>
			<img
				src="@/assets/images/pagination/pag2-hover.svg"
				alt="number2"
				loading="lazy"
				@click="currentPage = 2"
			/>
			<img
				src="@/assets/images/pagination/pag3-hover.svg"
				alt="number3"
				loading="lazy"
				@click="currentPage = 3"
			/>
			<img
				src="@/assets/images/pagination/pag4-hover.svg"
				alt="number4"
				loading="lazy"
				@click="currentPage = 4"
			/>
		</div>
		<CalendarStep
			v-if="currentPage === 1"
			:appointment="appointment"
			@next-step="currentPage = 2"
		/>
		<ServiceStep v-else-if="currentPage === 2" @next-step="currentPage = 3" />
		<InfoStep
			v-else-if="currentPage === 3"
			:appointment="appointment"
			@next-step="currentPage = 4"
		/>
		<PaymentStep v-else-if="currentPage === 4" :appointment="appointment" />
	</div>
</template>

<script>
import { ref } from 'vue';
import CalendarStep from './1CalendarStep.vue';
import ServiceStep from './2ServiceStep.vue';
import InfoStep from './3InfoStep.vue';
import PaymentStep from './4PaymentStep.vue';

export default {
	components: {
		CalendarStep,
		ServiceStep,
		InfoStep,
		PaymentStep,
	},
	setup() {
		const currentPage = ref(1);
		const appointment = ref({
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			appointment_time: '',
		});
		return { currentPage, appointment };
	},
};
</script>
