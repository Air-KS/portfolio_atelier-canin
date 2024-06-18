<template>
	<div class="client-page">
	  <h1>Bienvenue, {{ email }}</h1>
	</div>
  </template>

  <script>
  import { useRoute } from 'vue-router';

  export default {
	name: 'ClientPage',
	setup() {
	  const route = useRoute();
	  return {
		email: route.params.email
	  };
	}
  };
  </script>

  <style scoped>
  .client-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
  }
  </style>
