<template>
	<div>
	  <p>Méthode de payement</p>
	  <button @click="submitAppointment">Submit</button>
	</div>
  </template>

  <script>
  export default {
	props: ['appointment'],
	setup(props) {
	  const submitAppointment = () => {
		fetch('http://localhost:3000/api/appointments', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(props.appointment)
		})
		  .then(response => response.json())
		  .then(() => alert('Rendez-vous confirmé et notifications envoyées.'))
		  .catch(() => alert("Erreur lors de l'envoi des notifications."));
	  };
	  return { submitAppointment };
	}
  };
  </script>
