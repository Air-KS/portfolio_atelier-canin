<!--
	./frontend/src/components/Footer.vue
-->

<template>
	<footer class="footer-container">
		<div class="footer-content">
			<img src="@/assets/pets.png" alt="Pets" class="footer-image" />
			<div class="footer-links">
				<div>
					<h4>À propos de nous</h4>
					<p>Comment ça marche</p>
					<p>Localisation</p>
				</div>
				<div>
					<h4>Ressources</h4>
					<p>Condition de Confidentialité</p>
					<p>Politique d'annulation</p>
					<p>Centre d'aide</p>
				</div>
				<div>
					<h4>Compagnie</h4>
					<p>Contactez-nous</p>
					<p>Carrières</p>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p>Besoin d’aide ? help@gmail.com</p>
			<p>@2024 Atelier canin, Inc. Tous droits réservés</p>
		</div>
	</footer>
</template>

  <script>
export default {
	name: 'Footer',
};
</script>

  <style scoped>
.footer-container {
	background-color: #f2f2f2;
	padding: 20px;
	text-align: center;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer-image {
	height: 100px;
}

.footer-links {
	display: flex;
	justify-content: space-around;
	width: 100%;
}

.footer-links div {
	margin: 0 20px;
}

.footer-links h4 {
	margin-bottom: 10px;
}

.footer-bottom {
	margin-top: 20px;
	font-size: 14px;
}
</style>
