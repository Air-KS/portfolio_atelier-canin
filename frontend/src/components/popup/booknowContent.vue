<template>
	<div class="calendar-container">
	  <h3>Réserver Maintenant</h3>
	  <p>Contenu spécifique pour la réservation.</p>
	  <div class="pag-container">
		<img src="@/assets/images/pagination/pag1-hover.svg" alt="number1" loading="lazy" @click="currentPage = 1" />
		<img src="@/assets/images/pagination/pag2-hover.svg" alt="number2" loading="lazy" @click="currentPage = 2" />
		<img src="@/assets/images/pagination/pag3-hover.svg" alt="number3" loading="lazy" @click="currentPage = 3" />
		<img src="@/assets/images/pagination/pag4-hover.svg" alt="number4" loading="lazy" @click="currentPage = 4" />
	  </div>
	  <div v-if="currentPage === 1" id="calendar">
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
	  <div v-else-if="currentPage === 2">
		<p>Service et prix</p>
		<button @click="goToNextStep">Suivant</button>
	  </div>
	  <div v-else-if="currentPage === 3">
		<p>Information - Nom, Prénom, e-mail, numéro</p>
		<div class="form-group">
		  <label for="first_name">Prénom</label>
		  <input type="text" v-model="appointment.first_name" id="first_name" />
		</div>
		<div class="form-group">
		  <label for="last_name">Nom</label>
		  <input type="text" v-model="appointment.last_name" id="last_name" />
		</div>
		<div class="form-group">
		  <label for="email">Email</label>
		  <input type="email" v-model="appointment.email" id="email" />
		</div>
		<div class="form-group">
		  <label for="phone">Téléphone</label>
		  <input type="text" v-model="appointment.phone" id="phone" />
		</div>
		<button @click="goToNextStep">Suivant</button>
	  </div>
	  <div v-else-if="currentPage === 4">
		<p>Méthode de payement</p>
		<button @click="submitAppointment">Submit</button>
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
  name: 'BooknowContent',
  components: {
    FullCalendar
  },
  setup() {
    const currentPage = ref(1);
    const showTimeslots = ref(false);
    const selectedDate = ref('');
    const availableTimeslots = ref([]);
    const appointment_time = ref('');
    const appointment = ref({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      appointment_time: ''
    });

    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: [],
      dateClick(info) {
        console.log('Date clicked:', info.dateStr); // Log the date clicked
        fetchAvailableTimeslots(info.dateStr);
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
        right: 'dayGridMonth' // Affiche seulement le bouton "month"
      },
      validRange: {
        start: new Date().toISOString().split('T')[0], // Date actuelle
        end: '2025-12-31' // Exemple de date de fin
      }
    });

    const fetchAvailableTimeslots = (date) => {
      console.log('Fetching available timeslots for date:', date); // Log the date for which timeslots are being fetched
      fetch(`http://localhost:3000/api/appointments/available-timeslots?date=${date}`)
        .then(response => response.json())
        .then(data => {
          console.log('Available timeslots received:', data.timeslots); // Log the received timeslots
          selectedDate.value = date;
          availableTimeslots.value = data.timeslots;
          showTimeslots.value = true;
        })
        .catch(error => {
          console.error('Erreur :', error);
          alert("Erreur lors de la récupération des créneaux horaires disponibles.");
        });
    };

    const confirmTime = () => {
      if (appointment_time.value === '') {
        alert("Veuillez sélectionner un créneau horaire.");
        return;
      }

      console.log('Confirming time:', appointment_time.value, 'for date:', selectedDate.value); // Log the confirmed time and date

      showTimeslots.value = false;
      const newEvent = {
        title: `Rendez-vous à ${appointment_time.value}`,
        start: `${selectedDate.value}T${appointment_time.value}:00`,
        color: 'blue',
      };

      // Supprimer l'ancien rendez-vous s'il existe
      const eventIndex = calendarOptions.value.events.findIndex(event => event.color === 'blue');
      if (eventIndex !== -1) {
        calendarOptions.value.events.splice(eventIndex, 1);
      }

      calendarOptions.value.events.push(newEvent);
      appointment.value.appointment_time = newEvent.start;
    };

    const cancelTime = () => {
      showTimeslots.value = false;
      const eventIndex = calendarOptions.value.events.findIndex(event => event.color === 'blue');
      if (eventIndex !== -1) {
        calendarOptions.value.events.splice(eventIndex, 1);
      }
      appointment_time.value = '';
      appointment.value.appointment_time = '';
    };

    const goToNextStep = () => {
      currentPage.value += 1;
    };

    const submitAppointment = () => {
      console.log('Submitting appointment with details:', appointment.value); // Log the appointment details being submitted
      fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: appointment.value.first_name,
          last_name: appointment.value.last_name,
          email: appointment.value.email,
          phone: appointment.value.phone,
          appointment_time: appointment.value.appointment_time,
        }),
      })
        .then(response => response.json())
        .then(data => {
          alert('Rendez-vous confirmé et notifications envoyées.');
          console.log('Appointment confirmed:', data); // Log the confirmed appointment details
          // Réinitialiser l'état après la soumission
          appointment.value = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            appointment_time: ''
          };
        })
        .catch(error => {
          console.error('Erreur :', error);
          alert("Erreur lors de l'envoi des notifications.");
        });
    };

    return {
      currentPage,
      calendarOptions,
      showTimeslots,
      selectedDate,
      availableTimeslots,
      appointment_time,
      appointment,
      goToNextStep,
      confirmTime,
      cancelTime,
      submitAppointment
    };
  }
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
  background-color: var(--color-border); /* Couleur de fond des boutons prev et next */
  border: none;
}

.fc-button.fc-prev-button:hover,
.fc-button.fc-next-button:hover,
.fc-button.fc-today-button:hover {
  background-color: var(--color-hover); /* Couleur de fond des boutons au survol */
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
    width: 50%;
  }
  .pag-container img {
    width: auto;
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
