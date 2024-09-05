<!--
	./frontend/src/components/profile/profTabs.vue
-->

<template>
	<div class="tabs">
		<button
			class="tab"
			v-for="tab in tabs"
			:key="tab"
			:class="{ active: selectedTab === tab }"
			@click="$emit('tab-selected', tab)"
		>
			{{ tab }}
		</button>
	</div>
</template>

  <script>
export default {
	name: 'ProfTabs',
	props: {
		tabs: Array,
		selectedTab: String,
	},
};
</script>

  <style scoped>
.tabs button.active {
	background-color: var(--color-button);
}
</style>
