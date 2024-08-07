<!--
	./frontend/src/components/popup/booknow/booknowContent.vue
-->

<template>
	<div class="calendar-container">
	  <h3>Réserver Maintenant</h3>
	  <p>Contenu spécifique pour la réservation.</p>
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
	  const pages = [1, 2, 3, 4];
	  const appointment = ref({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		appointment_time: '',
	  });

	  const getImageSrc = (page) => {
		return currentPage.value === page
		  ? require(`@/assets/images/pagination/pag${page}-current.svg`)
		  : require(`@/assets/images/pagination/pag${page}.svg`);
	  };

	  return { currentPage, pages, appointment, getImageSrc };
	},
  };
  </script>

  <style>
  .pag-container img {
	cursor: pointer;
  }
  </style>
