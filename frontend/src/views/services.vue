<!-- ./frontend/src/views/services.vue -->
<template>
	<section class="prices-services">
		<div class="container">
			<h1 class="title">Services</h1>

			<!-- Global weight selector -->
			<div class="weight-selector">
				<label for="weight">Sélectionnez le poids de votre animal :</label>
				<select v-model="selectedWeight">
					<option value="0">Moins de 5 kg</option>
					<option value="1">Entre 5 et 10 kg</option>
					<option value="2">Plus de 10 kg</option>
				</select>
			</div>

			<div class="service-section" v-for="service in services" :key="service.id">
				<div class="service-header">
					<h2 class="service-title">{{ service.title }}</h2>
					<p class="service-price">{{ service.items[selectedWeight].price }}</p>
				</div>
				<p class="service-description">{{ service.description }}</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Services',
	data() {
		return {
			selectedWeight: 0, // Default weight category
			services: [
				{
					id: 1,
					title: 'Bain',
					description: 'Un bain complet avec des produits adaptés à la peau et au pelage de votre animal.',
					items: [
						{ id: 1, price: '$20' },
						{ id: 2, price: '$30' },
						{ id: 3, price: '$40' },
					],
				},
				{
					id: 2,
					title: 'Brushing',
					description: 'Un brossage soigneux pour éliminer les nœuds et rendre le pelage de votre animal doux et soyeux.',
					items: [
						{ id: 1, price: '$15' },
						{ id: 2, price: '$25' },
						{ id: 3, price: '$35' },
					],
				},
				{
					id: 3,
					title: 'Coupe de Ciseaux',
					description: 'Une coupe précise réalisée avec des ciseaux pour un look parfait.',
					items: [
						{ id: 1, price: '$25' },
						{ id: 2, price: '$35' },
						{ id: 3, price: '$45' },
					],
				},
				{
					id: 4,
					title: 'Tonte',
					description: 'Une tonte complète pour un pelage uniforme et facile à entretenir.',
					items: [
						{ id: 1, price: '$20' },
						{ id: 2, price: '$30' },
						{ id: 3, price: '$40' },
					],
				},
				{
					id: 5,
					title: 'Epilation',
					description: 'Épilation des poils pour certaines races spécifiques.',
					items: [
						{ id: 1, price: '$30' },
						{ id: 2, price: '$40' },
						{ id: 3, price: '$50' },
					],
				},
				{
					id: 6,
					title: 'Nettoyage des Yeux',
					description: 'Nettoyage délicat des yeux pour prévenir les infections.',
					items: [
						{ id: 1, price: '$10' },
						{ id: 2, price: '$15' },
						{ id: 3, price: '$20' },
					],
				},
				{
					id: 7,
					title: 'Nettoyage des Oreilles',
					description: 'Nettoyage des oreilles pour maintenir une bonne hygiène et prévenir les infections.',
					items: [
						{ id: 1, price: '$10' },
						{ id: 2, price: '$15' },
						{ id: 3, price: '$20' },
					],
				},
				{
					id: 8,
					title: 'Coupe Ongles',
					description: 'Coupe des ongles pour éviter les blessures et maintenir une bonne santé des pattes.',
					items: [
						{ id: 1, price: '$10' },
						{ id: 2, price: '$15' },
						{ id: 3, price: '$20' },
					],
				},
			],
		};
	},
};
</script>

<style scoped>
.prices-services {
	padding: 2rem;
	background-color: var(--color-background);
	color: var(--color-text-dark);
}

.container {
	max-width: 1200px;
	margin: 0 auto;
}

.title {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
	text-align: center;
}

.weight-selector {
	margin-bottom: 2rem;
	text-align: center;
}

.weight-selector label {
	margin-right: 1rem;
	font-weight: bold;
}

.service-section {
	margin-bottom: 2rem;
	border-bottom: 1px solid #ccc;
	padding-bottom: 1rem;
}

.service-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.service-title {
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
}

.service-description {
	margin-bottom: 1rem;
}

.service-price {
	color: var(--color-primary);
	font-weight: bold;
}

.links {
	display: flex;
	justify-content: center;
	margin-top: 2rem;
}

.link {
	margin: 0 1rem;
	color: var(--color-link);
	text-decoration: none;
	font-size: 1rem;
}

.link:hover {
	text-decoration: underline;
}

.link.apply {
	color: red;
	font-weight: bold;
}
</style>
