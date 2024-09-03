<!--
	./frontend/src/components/researchBar.vue
-->

<template>
	<div class="search-bar-container">
	  <input
		class="research-bar"
		type="text"
		:placeholder="placeholder"
		v-model="localSearchQuery"
	  />
	</div>
  </template>

  <script>
  export default {
	name: 'ResearchBar',
	props: {
	  modelValue: {
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
		localSearchQuery: this.modelValue, // Utiliser la prop modelValue pour initialiser la recherche locale
	  };
	},
	watch: {
	  modelValue(newVal) {
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
	width: 70%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	font-size: 16px;
	font-family: Arial, sans-serif;
	background-color: var(--color-background-placeholder);
	transition: all 0.3s ease;
  }

  .search-bar-container {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 20px;
  }

  .research-bar:focus {
	align-items: center;
	border-color: var(--color-border-input-focus);
	box-shadow: 0 0 8px var(--color-border-shadow);
	outline: none; /* Supprime le contour par défaut */
  }

  .research-bar::placeholder {
	color: var(--color-placeholder);
	font-style: italic;
  }
  </style>
