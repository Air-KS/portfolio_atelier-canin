<!--
	./frontend/src/components/researchBar.vue
-->

<template>
	<input
		type="text"
		class="research-bar"
		v-model="localSearchQuery"
		:placeholder="placeholder"
	/>
</template>

  <script>
export default {
	name: 'ResearchBar',
	props: {
		searchQuery: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: 'Search...',
		},
	},
	data() {
		return {
			localSearchQuery: this.searchQuery, // Initialisation de localSearchQuery avec la valeur de searchQuery
		};
	},
	watch: {
		searchQuery(newVal) {
			this.localSearchQuery = newVal;
		},
		localSearchQuery(newVal) {
			this.$emit('update:modelValue', newVal);
		},
	},
};
</script>

  <style scoped>
.research-bar {
	border: 1px solid var(--color-border-input);
	border-radius: 15px;
	padding: 10px;
	margin: 10px 0;
	width: 100%;
	max-width: 25%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	font-size: 16px;
	font-family: Arial, sans-serif;
	background-color: var(--color-background-placeholder);
	transition: all 0.3s ease;
}

.research-bar:focus {
	border-color: var(--color-border-input-focus);
	box-shadow: 0 0 8px var(--color-border-shadow);
	outline: none; /* Supprime le contour par défaut */
}

.research-bar::placeholder {
	color: var(--color-placeholder);
	font-style: italic;
}
</style>
