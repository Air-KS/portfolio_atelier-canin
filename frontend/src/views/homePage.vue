<!--
	./frontend/src/views/homePage.vue
-->

<template>
	<div>
		<home-top />
		<home-Mid />
	</div>
</template>

<script>
import HomeTop from '../components/homePage/homeTop.vue';
import HomeMid from '../components/homePage/homeMiddle.vue';
import HomeDown from '../components/homePage/homeDown.vue';
// import axios from 'axios';

export default {
	components: { HomeTop, HomeMid, HomeDown },
	name: 'HomePage',
	created() {
		document.title = 'AtlCanin - Home';
	},
};
</script>
