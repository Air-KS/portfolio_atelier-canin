<template>
	<div class="home-container">
		<div class="separator"></div>
		<h2 class="sub-title">Why Atelier Canin ?</h2>
		<div class="section">
			<!-- Section 1 -->
			<div class="section-info" id="why1">
				<h3>Personalized 1 on 1 Sessions</h3>
				<div class="info">
					<div class="icon" aria-label="why service icon"></div>
					<p>
						Our professionals provide an isolated environment for only your pets
						where specialized attention to detail is given to all personalized
						requests.
					</p>
				</div>
			</div>

			<!-- Section 2 -->
			<div class="section-info" id="why2">
				<h3>Real Time Updates</h3>
				<div class="info">
					<div class="icon" aria-label="why service icon"></div>
					<p>
						Atl Canin app puts booking, payment, chatting, communication, support,
						and grooming services at your fingertips, allowing you to easily connect with groomers,
						rate their services, and view their profiles all in one place.
					</p>
				</div>
			</div>

			<!-- Section 3 -->
			<div class="section-info" id="why3">
				<h3>Disponibilité le jour même</h3>
				<div class="info">
					<div class="icon" aria-label="why service icon"></div>
					<p>
						Pas besoin de planifier à l’avance. Rapide,
						pratique et parfait pour les horaires chargés.
						Nous avons ce qu’il vous faut à tout moment et en tout lieu.
					</p>
				</div>
			</div>

			<!-- Section 4 -->
			<div class="section-info" id="why4">
				<h3>Produits naturels</h3>
				<div class="info">
					<div class="icon" aria-label="why service icon"></div>
					<p>
						Nos shampooings sont choisis de manière sélective pour assurer la brillance.
						Apporter de la commodité s’accompagne également d’une qualité de produit exceptionnelle.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeMid',
};
</script>

<style scoped>
.home-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 30px;
}

.separator {
	width: 100%;
	height: 1px;
	background-color: var(--color-hover);
	margin-bottom: 20px;
}

h2.sub-title {
	font-size: 24px;
}

.section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 90%;
}

.section-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	align-items: flex-start;
	margin: 10px 0;
	padding: 10px;
}

.section-info h3 {
	margin: 0;
	font-size: 1.2em;
	color: var(--color-hover);
	padding: 0px 80px;
}

.info {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	width: 100%; /* Pour s'assurer que le texte utilise l'espace restant */
}

/* icon */
.icon {
	width: 70px; /* Taille originale de l'icône */
	height: 70px; /* Taille originale de l'icône */
	background-size: contain;
	align-items: center;
	background-repeat: no-repeat;
	margin-right: 15px;
	flex-shrink: 0; /* Pour empêcher l'icône de rétrécir */
}
#why1 .icon {
	background-image: url('@/assets/images/homepage/why-atlcanin1.svg');
}
#why2 .icon {
	background-image: url('@/assets/images/homepage/why-atlcanin2.svg');
}
#why3 .icon {
	background-image: url('@/assets/images/homepage/why-atlcanin3.svg');
}
#why4 .icon {
	background-image: url('@/assets/images/homepage/why-atlcanin4.svg');
}

p {
	margin: 0;
}

@media (min-width: 600px) and (max-width: 1024px) {
	.separator {
		background-color: transparent;
	}
}

@media (min-width: 1025px) {
	.section {
		width: 70%;
	}
	.separator {
		margin-top: 30px;
		width: 70%;
	}
}
</style>
