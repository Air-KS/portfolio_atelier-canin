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
		<div v-if="currentPage === 1" id="calendar">
			<FullCalendar :options="calendarOptions" />
		</div>
		<div v-else-if="currentPage === 2">
			<p>Texte pour la deuxième page.</p>
		</div>
		<!-- Ajoute du contenu pour les pages 3 et 4 -->
		<div v-else-if="currentPage === 3">
			<p>Texte pour la troisième page.</p>
		</div>
		<div v-else-if="currentPage === 4">
			<p>Texte pour la quatrième page.</p>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default {
	name: 'BooknowContent',
	components: {
		FullCalendar,
	},
	setup() {
		const currentPage = ref(1);
		const calendarOptions = ref({
			plugins: [dayGridPlugin, timeGridPlugin],
			initialView: 'dayGridMonth',
			events: [
				{
					title: 'Rendez-vous 1',
					start: '2024-07-14T10:00:00',
					color: 'green',
				},
				{
					title: 'Rendez-vous 2',
					start: '2024-07-15T14:00:00',
					color: 'red',
				},
			],
			dateClick(info) {
				const selectedTime = prompt("Entrez l'heure de réservation (HH:MM) :");
				const firstName = prompt('Entrez votre prénom :');
				const email = prompt('Entrez votre email :');
				const phone = prompt('Entrez votre numéro de téléphone :');

				const dateTime = `${info.dateStr}T${selectedTime}:00`;

				fetch('http://localhost:3000/api/schedule', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						first_name: firstName,
						email: email,
						phone: phone,
						date: dateTime,
					}),
				})
					.then(response => response.json())
					.then(data => {
						alert('Rendez-vous confirmé et notifications envoyées.');
						calendarOptions.value.events.push({
							title: `Rendez-vous de ${firstName}`,
							start: dateTime,
							color: 'blue',
						});
					})
					.catch(error => {
						console.error('Erreur :', error);
						alert("Erreur lors de l'envoi des notifications.");
					});
			},
			selectable: true,
			businessHours: [
				{
					daysOfWeek: [1, 2, 3, 4, 5], // Lundi à vendredi
					startTime: '09:00',
					endTime: '12:30',
				},
				{
					daysOfWeek: [1, 2, 3, 4, 5], // Lundi à vendredi
					startTime: '14:00',
					endTime: '17:30',
				},
				{
					daysOfWeek: [6], // Samedi
					startTime: '09:00',
					endTime: '12:00',
				},
				{
					daysOfWeek: [6], // Samedi
					startTime: '13:00',
					endTime: '15:00',
				},
			],
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay', // Ajout des vues timeGrid
			},
			select: function (info) {
				const selectedTime = prompt("Entrez l'heure de réservation (HH:MM) :");
				const firstName = prompt('Entrez votre prénom :');
				const email = prompt('Entrez votre email :');
				const phone = prompt('Entrez votre numéro de téléphone :');

				const dateTime = `${info.startStr.substring(0, 10)}T${selectedTime}:00`;

				fetch('http://localhost:3000/api/schedule', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						first_name: firstName,
						email: email,
						phone: phone,
						date: dateTime,
					}),
				})
					.then(response => response.json())
					.then(data => {
						alert('Rendez-vous confirmé et notifications envoyées.');
						calendarOptions.value.events.push({
							title: `Rendez-vous de ${firstName}`,
							start: dateTime,
							color: 'blue',
						});
					})
					.catch(error => {
						console.error('Erreur :', error);
						alert("Erreur lors de l'envoi des notifications.");
					});
			},
			editable: true,
			selectable: true,
		});

		return {
			currentPage,
			calendarOptions,
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

.pag-container {
	width: 80%;
	border: 1px solid black;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.pag-container img {
	width: 50px;
	cursor: pointer;
}

h3 {
	display: flex;
	flex-direction: column;
	font-size: 1.5empx;
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
	.pag-container img {
		width: 70px;
	}
}

@media (min-width: 1025px) {
	.calendar-container {
		padding-bottom: 50px;
	}

	#calendar {
		width: 70%;
		height: 90%;
	}
	.pag-container img {
		width: auto;
	}
}
</style>
