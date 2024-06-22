<!--
	./frontend/src/component/scrollTop.vue
-->

<template>
	<div></div>
</template>

<script>
export default {
	name: 'ScrollTop',
	watch: {
		$route(to, from) {
			if (to.path !== from.path) {
				window.scrollTo(0, 0);
			}
		},
	},
};
</script>
