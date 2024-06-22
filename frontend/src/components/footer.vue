<template>
	<footer class="footer-container">
		<div class="footer-banner"></div>
		<div class="footer-content">
			<img
				src="../assets/images/animals-footer.webp"
				alt="Pets"
				class="footer-image"
			/>
			<div class="footer-links-container">
				<div class="footer-links">
					<div class="footer-section">
						<h4>À propos de nous</h4>
						<p>Comment ça marche</p>
						<p>Localisation</p>
					</div>
					<div class="footer-section">
						<h4>Ressources</h4>
						<p>Condition de Confidentialité</p>
						<p>Politique d'annulation</p>
						<p>Centre d'aide</p>
					</div>
					<div class="footer-section">
						<h4>Compagnie</h4>
						<p>Contactez-nous</p>
						<p>Carrières</p>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p class="footer-contact">Besoin d’aide ? help@gmail.com</p>
			<div class="footer-icons">
				<img src="../assets/images/facebook.svg" alt="Facebook" />
				<img src="../assets/images/instagram.svg" alt="Instagram" />
				<img src="../assets/images/linkedin.svg" alt="LinkedIn" />
				<img src="../assets/images/youtube.svg" alt="YouTube" />
				<img src="../assets/images/twitter-x.svg" alt="Twitter X" />
			</div>
		</div>
		<div class="footer-legal">
			<p class="footer-policy">
				Politique de confidentialité | Politique de cookies | Utilisation
				acceptable de la politique | Accessibilité
			</p>
			<p class="footer-rights">
				@2024 Atelier canin, Inc. Tous droits réservés
			</p>
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
	background: linear-gradient(to bottom, #4687af 30%, #0a101d 70%);
	padding: 20px;
	text-align: center;
	color: #ffffff;
	position: relative;
}

.footer-banner {
	width: 100%;
	background: #000000; /* Couleur de la banderole */
	color: var(--color-background);
	padding: 40px 0;
	position: absolute;
	top: 0;
	left: 0;
	text-align: center;
	font-size: 20px;
	font-weight: bold;
}

.footer-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px; /* Ajustement pour compenser la banderole */
}

.footer-image {
	width: auto;
	margin-bottom: 20px;
}

.footer-links-container {
	width: 70%;
}

.footer-links {
	display: flex;
	justify-content: space-around;
	width: 100%;
	border-top: 1px solid #ffffff;
	padding: 20px 0;
}

.footer-section {
	flex: 1;
	text-align: center;
	border-left: 1px solid #ffffff;
}

.footer-section:first-child {
	border-left: none;
}

.footer-links .footer-section:not(:last-child) {
	border-right: 1px solid #ffffff;
}

.footer-links h4 {
	margin-bottom: 10px;
	color: #ffffff;
}

.footer-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	border-top: 1px solid #ffffff;
	padding: 30px 20% 30px 20%;
}

.footer-icons img {
	margin-left: 20px; /* Espace entre les icônes */
}

.footer-legal {
	display: flex;
	justify-content: space-between;
	width: 100vw;
	padding: 20px 0;
	font-size: 20px;
	position: absolute;
	background: #000000;
	padding: 30px;
	right: 0;
}

.footer-policy {
	margin: 0;
	text-align: left;
	flex: 1;
	padding-left: 100px;
}

.footer-rights {
	margin: 0;
	text-align: right;
	flex: 1;
	padding-right: 100px;
}
</style>
