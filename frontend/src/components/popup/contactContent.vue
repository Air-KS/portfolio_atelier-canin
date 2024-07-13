<!--
	./frontend/src/components/popup/ContactContent.vue
-->

<template>
	<div>
		<div class="sommaire">
			Contact rapide
			<p>
				- 06.07.08.09.10 -
				<br />
				- atlcanin@gmail.com -
			</p>
		</div>
		Il faut penser à faire un formulaire pour que l'utilisateur puisse contacter l'agence
	</div>
</template>

<script>
export default {
	name: 'ContactContent',
};
</script>

<style scoped>
h3 {
	text-align: center;
}
.sommaire {
	padding: 20px;
	font-weight: bold;
	font-size: 20px;
}
.sommaire p {
	font-weight: normal;
}
</style>
