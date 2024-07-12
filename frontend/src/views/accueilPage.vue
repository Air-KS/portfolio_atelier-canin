<!--
	./frontend/src/views/homePage.vue
-->

<template>
	<div>
		<home-top />
		<home-Mid />
		<home-Down />
	</div>
</template>

<script>
import homeTop from '../components/homePage/homeTop.vue';
import HomeMid from '../components/homePage/homeMiddle.vue';
import HomeDown from '../components/homePage/homeDown.vue';
// import axios from 'axios';

export default {
  components: { homeTop, HomeMid, HomeDown },
	name: 'AccueilPage',
	mounted() {
		document.title = 'AtlCanin - Home';
	},
};
</script>
