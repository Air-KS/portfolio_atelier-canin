<!--
	./frontend/src/components/dashbord/dashTabs.vue
-->

<template>
	<div class="tabs">
	  <div
		v-for="tab in tabs"
		:key="tab"
		class="tab"
		:class="{ active: tab === modelValue }"
		@click="selectTab(tab)"
	  >
		{{ tab }}
	  </div>
	</div>
  </template>

  <script>
  export default {
	name: 'DashTabs',
	props: {
	  tabs: {
		type: Array,
		required: true
	  },
	  modelValue: {
		type: String,
		required: true
	  }
	},
	methods: {
	  selectTab(tab) {
		// Vérifie si l'onglet est différent de celui actuellement sélectionné
		if (tab !== this.modelValue) {
		  this.$emit('update:modelValue', tab); // Met à jour le modèle avec le nouvel onglet sélectionné
		}
	  }
	}
  };
  </script>

  <style scoped>
  .tabs {
	display: flex;
	justify-content: center;
	margin-bottom: 50px;
  }
  .tab {
	padding: 10px 20px;
	cursor: pointer;
	border: 1px solid #ccc;
	margin: 0 5px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
  }
  .tab.active {
	background-color: #007bff;
	color: white;
  }
  .tab:hover {
	background-color: #e0e0e0;
  }
  </style>
