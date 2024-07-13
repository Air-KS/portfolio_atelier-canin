<!--
	./frontend/src/components/homePage/home.vue
-->

<template>
	<div class="home-container">
		<div class="separator"></div>
		<h2 class="sub-title">Why Atelier Canin ?</h2>
		<div class="content-container">
			<!-- Section 1 -->
			<div class="section">
				<div class="section-info" id="why1">
					<h3>Personalized 1 on 1 Sessions</h3>
					<div class="info">
						<div class="icon" aria-label="why service icon"></div>
						<p>
							Our professionals provide an isolated environment for only your
							pets where specialized attention to detail is given to all
							personalized requests.
						</p>
					</div>
				</div>
				<div class="number">
					<img
						src="@/assets/images/homepage/number1.svg"
						alt="number1"
						loading="lazy"
					/>
				</div>
			</div>

			<!-- Section 1 -->
			<div class="section">
				<div class="section-info" id="why2">
					<h3>Real Time Updates</h3>
					<div class="info">
						<div class="icon" aria-label="why service icon"></div>
						<p>
							Atl Canin app puts booking, payment, chatting, communication,
							support, and grooming services at your fingertips, allowing you to
							easily connect with groomers, rate their services, and view their
							profiles all in one place.
						</p>
					</div>
				</div>
				<div class="number">
					<img
						src="@/assets/images/homepage/number2.svg"
						alt="number2"
						loading="lazy"
					/>
				</div>
			</div>

			<!-- Section 1 -->
			<div class="section">
				<div class="section-info" id="why3">
					<h3>Same Day availability</h3>
					<div class="info">
						<div class="icon" aria-label="why service icon"></div>
						<p>
							No need to plan ahead. Quick, convenient, and perfect for busy
							schedules. We've got you covered anytime at any place.
						</p>
					</div>
				</div>
				<div class="number">
					<img
						src="@/assets/images/homepage/number3.svg"
						alt="number3"
						loading="lazy"
					/>
				</div>
			</div>

			<!-- Section 4 -->
			<div class="section">
				<div class="section-info" id="why4">
					<h3>Natural Products</h3>
					<div class="info">
						<div class="icon" aria-label="why service icon"></div>
						<p>
							Our shampoos are selectively chosen to ensure brilliance. Bringing
							convenience also comes with exceptional product quality.
						</p>
					</div>
				</div>
				<div class="number">
					<img
						src="@/assets/images/homepage/number4.svg"
						alt="number3"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
		<!-- Bouton pour ouvrir le pop-up -->
		<button @click="openPopup" class="button">Book Now</button>

		<!-- Utilisation du composant Booknow -->
		<!-- Utilisation du composant Popup -->
		<Popup
			:visible="showBooknowPopup"
			@close-popup="closePopup('booknow')"
			title="Book Now"
		>
			<BooknowContent />
		</Popup>
	</div>
</template>

<script>
import Popup from '@/components/popup/popup.vue';
import BooknowContent from '@/components/popup/booknowContent.vue';

export default {
	name: 'Home',
	components: {
		Popup,
		BooknowContent,
	},
	data() {
		return {
			showBooknowPopup: false, // Initialisation de l'état du pop-up
		};
	},
	methods: {
		openPopup() {
			this.showBooknowPopup = true;
		},
		closePopup() {
			this.showBooknowPopup = false;
		},
	},
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

.button {
	display: flex;
	align-items: center;
	border-radius: 25px;
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 1);
	text-decoration: none;
}

.separator {
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
	width: 100%;
}

/* icon */
.icon {
	width: 70px;
	height: 70px;
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
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 90%;
		margin: 0 auto;
	}

	.section-info {
		display: flex;
		align-items: left;
		width: 50%;
		border-radius: 10px;
	}

	.section-info h3 {
		font-size: 1.2em;
		padding: 0;
		margin-bottom: 10px;
	}

	.separator {
		margin-top: 30px;
		width: 70%;
	}
}

/* Cacher le chiffre pour les petits écrans */
@media (max-width: 1024px) {
	.number {
		display: none;
	}
}
</style>
