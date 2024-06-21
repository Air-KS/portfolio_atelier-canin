<!--
	./frontend/src/App.vue
-->

<template>
	<div id="app">
		<Header />
		<router-view />
	</div>
</template>

<script>
	import Header from './components/Header.vue';

	export default {
		name: 'App',
		components: {
			Header,
		},
	};
</script>

<style>
	body {
		padding-top: 80px;
	}
</style>
