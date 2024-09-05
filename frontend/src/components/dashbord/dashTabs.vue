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
			required: true,
		},
		modelValue: {
			type: String,
			required: true,
		},
	},
	methods: {
		selectTab(tab) {
			// Vérifie si l'onglet est différent de celui actuellement sélectionné
			if (tab !== this.modelValue) {
				this.$emit('update:modelValue', tab); // Met à jour le modèle avec le nouvel onglet sélectionné
			}
		},
	},
};
</script>
