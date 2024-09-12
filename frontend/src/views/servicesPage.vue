<!--
	./frontend/src/views/servicesPage.vue
-->

<template>
	<section class="prices-services">
		<div class="service-container">
			<div v-if="services.length">
				<ul class="">
					<h1 class="title">Nos Services</h1>

					<div
						class="service-section"
						v-for="service in services"
						:key="service.id"
					>
						<div class="service-header">
							<h2 class="service-title">{{ service.name }}</h2>
							<!-- Affiche le nom du service -->
							<p class="service-price">{{ service.price }} €</p>
							<!-- Affiche le prix -->
						</div>
						<p class="service-description">{{ service.description }}</p>
						<!-- Affiche la description -->
					</div>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Services',
	data() {
		return {
			services: [], // Déclaration de la propriété réactive services
			selectedWeight: 0, // Initialisation d'une propriété réactive pour l'exemple
		};
	},
	created() {
		this.fetchServices(); // Appelle la fonction fetchServices au montage du composant
	},
	methods: {
		async fetchServices() {
			try {
				const response = await axios.get('http://localhost:3000/api/services');
				this.services = response.data; // Affecte la réponse à la propriété réactive services
			} catch (error) {
				console.error('Erreur lors de la récupération des services :', error);
			}
		},
	},
};
</script>

<style scoped>

.service-container {
	width: 95%;
}

.title {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
	text-align: center;
}

.service-section {
	margin-bottom: 2rem;
	border-bottom: 1px solid #ccc;
}

.service-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.service-description {
	margin-bottom: 1rem;
}

.service-price {
	color: var(--color-primary);
	font-weight: bold;
}

@media (min-width: 600px) and (max-width: 1023px) {
	.service-container {
		width: 70%;
		margin: 0 auto;
	}
}

@media (min-width: 1024px) {
	.service-container {
		width: 50%;
		margin: 0 auto;
	}
}
</style>
