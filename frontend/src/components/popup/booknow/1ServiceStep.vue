<!--
	./frontend/src/components/popup/booknow/2ServiceStep.vue
-->

<template>
	<div>
		<p>Services</p>
		<button class="button" @click="goToNextStep">Next</button>
	</div>
</template>

  <script>
export default {
	setup(_, { emit }) {
		const goToNextStep = () => emit('next-step');
		return { goToNextStep };
	},
};
</script>
