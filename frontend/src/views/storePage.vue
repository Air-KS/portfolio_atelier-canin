<!-- ./frontend/src/views/store.vue -->

<template>
	<section class="prices-store">
		<div class="store-container">
			<div v-if="stores.length">
				<h1 class="title">Nos Produits</h1>
				<div class="store-grid">
					<div
						class="store-section"
						v-for="store in stores"
						:key="store.id"
					>
						<div class="store-header">
							<h2 class="store-title">{{ store.name }}</h2>
							<!-- Affiche le nom du produit -->
							<p class="store-price">{{ store.price }} €</p>
							<!-- Affiche le prix -->
						</div>
						<div v-if="store.image" class="store-image">
							<img :src="store.image ? store.image : require('../assets/images/store/defaultImage.png')" alt="Image du produit" class="store-img" />
						</div>
						<p class="store-description">{{ store.description }}</p>
						<!-- Affiche la description -->
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';

export default {
	name: 'StorePage',
	data() {
		return {
			stores: [], // Déclaration de la propriété réactive stores
		};
	},
	created() {
		this.fetchStores(); // Appelle la fonction fetchStores au montage du composant
	},
	methods: {
		async fetchStores() {
			try {
				const response = await axios.get('http://localhost:3000/api/stores');
				this.stores = response.data; // Affecte la réponse à la propriété réactive stores
			} catch (error) {
				console.error('Erreur lors de la récupération des produits :', error);
			}
		},
	},
};
</script>

<style scoped>

.store-container {
	width: 95%;
	margin: 0 auto;
}

.title {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
	text-align: center;
}

/* Grid layout pour afficher les produits */
.store-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
}

/* Styles pour chaque section du store */
.store-section {
	border: 1px solid #ddd;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	background-color: #fff;
}

.store-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.store-description {
	margin-bottom: 1rem;
}

.store-price {
	color: var(--color-primary);
	font-weight: bold;
}

.store-image {
	width: 100%;
	text-align: center;
	margin-bottom: 1rem;
}

.store-img {
	width: 240px;
	max-height: 240px;
	object-fit: cover;
	border-radius: 8px;
	border: 2px solid #ddd;
}

/* Responsive grid layout */
/* 600px et en dessous : 1 produit par ligne */
@media (max-width: 599px) {
	.store-grid {
		grid-template-columns: 1fr;
	}
}

/* Entre 600px et 1023px : 2 produits par ligne */
@media (min-width: 600px) and (max-width: 1023px) {
	.store-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

/* À partir de 1024px : 3 produits par ligne */
@media (min-width: 1024px) {
	.store-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}

</style>
