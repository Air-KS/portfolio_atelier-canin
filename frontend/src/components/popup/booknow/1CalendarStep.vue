<!--
	./frontend/src/components/popup/booknow/1CalendarStep.vue
-->

<template>
	<div class="calendar-container">
		<div id="calendar">
			<FullCalendar :options="calendarOptions" />
			<div v-if="showTimeslots" class="timeslot-popover">
				<h4>Choisir un horaire disponible pour {{ selectedDate }}</h4>
				<select v-model="appointment_time">
					<option v-for="time in availableTimeslots" :key="time" :value="time">
						{{ time }}
					</option>
				</select>
				<button @click="confirmTime">Confirmer</button>
				<button @click="cancelTime">Annuler</button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
	props: ['appointment'],
	components: {
		FullCalendar,
	},
	setup(props, { emit }) {
		const showTimeslots = ref(false);
		const selectedDate = ref('');
		const availableTimeslots = ref([]);
		const appointment_time = ref('');

		const formatTime = time => {
			let [hours, minutes] = time.split(':');
			hours = parseInt(hours);
			const ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			return `${hours}:${minutes} ${ampm}`;
		};

		const to24HourFormat = time => {
			let [hours, minutes] = time.split(/[: ]/);
			const ampm = time.split(' ')[1];
			if (ampm === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
			if (ampm === 'AM' && hours === '12') hours = '00';
			return `${hours}:${minutes}`;
		};

		const businessHours = [
			{ daysOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '12:30' },
			{ daysOfWeek: [1, 2, 3, 4, 5], startTime: '14:00', endTime: '17:30' },
			{ daysOfWeek: [6], startTime: '09:00', endTime: '12:00' },
			{ daysOfWeek: [6], startTime: '13:00', endTime: '15:00' },
		].map(slot => ({
			...slot,
			startTime: formatTime(slot.startTime),
			endTime: formatTime(slot.endTime),
		}));

		const calendarOptions = ref({
			plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
			initialView: 'dayGridMonth',
			events: [],
			selectable: true,
			businessHours: [
				{ daysOfWeek: [1, 2, 3, 4, 5], startTime: '09:00', endTime: '12:30' },
				{ daysOfWeek: [1, 2, 3, 4, 5], startTime: '14:00', endTime: '17:30' },
			],
			dateClick(info) {
				// Disable clicking on weekends
				if ([0, 6].includes(new Date(info.dateStr).getDay())) {
					return;
				}
				fetchAvailableTimeslots(info.dateStr);
			},
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth',
			},
			validRange: {
				start: new Date().toISOString().split('T')[0],
				end: '2025-12-31',
			},
		});

		const fetchAvailableTimeslots = date => {
			fetch(
				`http://localhost:3000/api/appointments/available-timeslots?date=${date}`
			)
				.then(response => response.json())
				.then(data => {
					selectedDate.value = date;
					availableTimeslots.value = data.timeslots.map(timeslot =>
						formatTime(timeslot)
					);
					showTimeslots.value = true;
				})
				.catch(error =>
					alert(
						'Erreur lors de la récupération des créneaux horaires disponibles.'
					)
				);
		};

		const confirmTime = () => {
			if (appointment_time.value === '') {
				alert('Veuillez sélectionner un créneau horaire.');
				return;
			}

			showTimeslots.value = false;

			// Convertir la date et l'heure en UTC
			const formattedTime = to24HourFormat(appointment_time.value);
			const localDateTime = new Date(
				`${selectedDate.value}T${formattedTime}:00`
			);
			const utcDateTime = new Date(
				localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
			).toISOString();

			const newEvent = {
				title: `Rendez-vous à ${appointment_time.value}`,
				start: utcDateTime,
				color: 'blue',
			};

			const eventIndex = calendarOptions.value.events.findIndex(
				event => event.color === 'blue'
			);
			if (eventIndex !== -1) {
				calendarOptions.value.events.splice(eventIndex, 1);
			}

			calendarOptions.value.events.push(newEvent);
			props.appointment.appointment_time = utcDateTime;

			// Émettre l'événement next-step
			emit('next-step');
		};

		const cancelTime = () => {
			showTimeslots.value = false;
			const eventIndex = calendarOptions.value.events.findIndex(
				event => event.color === 'blue'
			);
			if (eventIndex !== -1) {
				calendarOptions.value.events.splice(eventIndex, 1);
			}
			appointment_time.value = '';
			props.appointment.appointment_time = '';
		};

		return {
			showTimeslots,
			selectedDate,
			availableTimeslots,
			appointment_time,
			calendarOptions,
			confirmTime,
			cancelTime,
		};
	},
};
</script>

<style>
/* Styles spécifiques pour BooknowContent */
.calendar-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding-bottom: 20px;
	margin: 0 auto;
}

h3 {
	display: flex;
	flex-direction: column;
	font-size: 1.5em;
	font-family: var(--font-family-body);
	text-align: center;
}

#calendar {
	width: 95%;
	padding: 20px;
	border-radius: 5%;
	border: 2px solid var(--color-border);
}
.fc {
	font-family: Arial, Helvetica, sans-serif;
}

/* Personnalisation des boutons de la barre d'outils */
.fc-toolbar {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.fc-toolbar-title {
	padding: 10px;
	color: var(--color-hover); /* Couleur du titre */
	font-size: 10px;
}

.fc-toolbar-chunk {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
}

.fc-toolbar-chunk button {
	background-color: #00ff00; /* Couleur de fond des boutons */
	border: none;
	color: #ffffff; /* Couleur du texte des boutons */
	margin: 0 5px;
}

.fc-toolbar-chunk button:hover {
	background-color: #009900; /* Couleur de fond des boutons au survol */
}

/* Personnalisation des événements */
.fc-event {
	border: 1px solid #000000; /* Bordure des événements */
	border-radius: 5px;
	padding: 2px;
	font-size: 0.8em;
}
.fc-event-title {
	color: #ffffff; /* Couleur du texte des événements */
}

/* Personnalisation des jours */
.fc-daygrid-day {
	background-color: #f5f5f5; /* Couleur de fond des jours */
}
.fc-day-today {
	background-color: #ffff00 !important; /* Couleur de fond du jour actuel */
}

/* Personnalisation des jours fériés et indisponibles */
.fc-day-disabled {
	background-color: #d3d3d3 !important; /* Couleur de fond des jours fériés et indisponibles */
}

/* Personnalisation des jours disponibles */
.fc-day-available {
	background-color: #00ff00 !important; /* Couleur de fond des jours disponibles */
}

/* Personnalisation des jours occupés */
.fc-day-busy {
	background-color: #ff0000 !important; /* Couleur de fond des jours occupés */
}

.fc-button.fc-prev-button,
.fc-button.fc-next-button {
	background-color: var(
		--color-border
	); /* Couleur de fond des boutons prev et next */
	border: none;
}

.fc-button.fc-prev-button:hover,
.fc-button.fc-next-button:hover,
.fc-button.fc-today-button:hover {
	background-color: var(
		--color-hover
	); /* Couleur de fond des boutons au survol */
}
/* Changer la couleur au clic */
.fc-button:active {
	background-color: white; /* Couleur de fond des boutons au clic */
}

/* Styles pour améliorer l'affichage mobile */
@media (max-width: 599px) {
	.fc-toolbar-title {
		padding: 10px;
		font-size: 10px;
	}

	.fc-toolbar {
		flex-direction: column;
	}

	.fc-toolbar-chunk {
		flex-wrap: wrap;
	}

	.fc-toolbar-title {
		font-size: 1.2em;
	}

	.fc-button-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.fc-button {
		margin: 5px;
	}

	#calendar {
		width: 90%;
	}
}

@media (min-width: 600px) and (max-width: 1024px) {
	.calendar-container {
		padding-bottom: 50px;
	}
	#calendar {
		width: 70%;
	}
}

@media (min-width: 1025px) {
	.calendar-container {
		padding-bottom: 50px;
	}

	#calendar {
		width: 50%;
	}
	.fc-toolbar {
		flex-direction: row;
	}
}

.timeslot-popover {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	border: 1px solid #ccc;
	padding: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	z-index: 1000;
}
</style>
