<template>
	<div>
	  <p>Service et prix</p>
	  <button class="button" @click="goToNextStep">Suivant</button>
	</div>
  </template>

  <script>
  export default {
	setup(_, { emit }) {
	  const goToNextStep = () => emit('next-step');
	  return { goToNextStep };
	}
  };
  </script>
