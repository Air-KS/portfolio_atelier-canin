<!--
	./frontend/src/components/popup/booknow/booknowContent.vue
-->

<template>
	<div class="calendar-container">
		<h3>Book Now</h3>
		<p>Specific content for the booking.</p>
		<div class="pag-container">
			<img
				v-for="page in pages"
				:key="page"
				:src="getImageSrc(page)"
				:alt="'number' + page"
				loading="lazy"
				@click="currentPage = page"
			/>
		</div>
		<div class="separatorLocal"></div>
		<ServiceStep v-if="currentPage === 1" @next-step="currentPage = 2" />
		<CalendarStep
			v-else-if="currentPage === 2"
			:appointment="appointment"
			@next-step="currentPage = 3"
		/>
		<InfoStep
			v-else-if="currentPage === 3"
			:appointment="appointment"
			@next-step="currentPage = 4"
		/>
		<PaymentStep v-else-if="currentPage === 4" :appointment="appointment" />
	</div>
</template>

  <script>
import { ref, watch, onMounted } from 'vue';
import ServiceStep from './1ServiceStep.vue';
import CalendarStep from './2CalendarStep.vue';
import InfoStep from './3InfoStep.vue';
import PaymentStep from './4PaymentStep.vue';

export default {
	props: ['isLoggedIn', 'user'],
	components: {
		CalendarStep,
		ServiceStep,
		InfoStep,
		PaymentStep,
	},
	setup(props) {
		const currentPage = ref(1);
		const pages = [1, 2, 3, 4];
		const appointment = ref({
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			appointment_time: '',
		});

		console.log('User Data in BooknowContent:', props.user);

		const populateAppointment = () => {
			if (props.user) {
				appointment.value.first_name = props.user.first_name || '';
				appointment.value.last_name = props.user.last_name || '';
				appointment.value.email = props.user.email || '';
				appointment.value.phone = props.user.phone || '';
				console.log('Appointment Data:', appointment.value);
			}
		};

		watch(
			() => props.user,
			newVal => {
				if (newVal) {
					populateAppointment();
				}
			},
			{ immediate: true }
		);

		onMounted(() => {
			populateAppointment();
		});

		const getImageSrc = page => {
			return currentPage.value === page
				? require(`@/assets/images/pagination/pag${page}-current.svg`)
				: require(`@/assets/images/pagination/pag${page}.svg`);
		};

		return {
			currentPage,
			pages,
			appointment,
			getImageSrc,
		};
	},
};
</script>

  <style>
.pag-container {
	width: 20%;
	margin-right: 17px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.pag-container img {
	width: 60px;
	cursor: pointer;
}

.separatorLocal {
	width: 40%;
	margin: 0 auto;
	border-bottom: 1px solid var(--color-hover);
}

@media (min-width: 600px) and (max-width: 1024px) {
	.pag-container img {
		width: 70px;
	}
}

@media (min-width: 1025px) {
	.pag-container img {
		width: auto;
	}
}
</style>
