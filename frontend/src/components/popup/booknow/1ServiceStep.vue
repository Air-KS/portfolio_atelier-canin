<!--
	./frontend/src/components/popup/booknow/1ServiceStep.vue
-->

<template>
	<div class="services-container">
		<p class="title">Services</p>
		<div v-if="services.length">
			<ul class="services-list">
				<!-- Liste des services existants -->
				<li v-for="service in services" :key="service.id" class="service-item">
					<div class="service-header">
						<label class="service-label">
							<input
								type="checkbox"
								:value="service.id"
								v-model="selectedServices"
								@change="checkSelection"
								class="service-checkbox"
							/>
						</label>
						<div class="service-name-price-container">
							<span class="service-name">{{ service.name }}</span>
							<span class="service-price">{{ service.price }} €</span>
						</div>
					</div>
					<p>{{ service.description }}</p>
				</li>

				<!-- Option pour sélectionner tous les services -->
				<li class="service-item">
					<div class="service-header">
						<label class="service-label">
							<input
								type="checkbox"
								:checked="allSelected"
								v-model="allSelected"
								@change="handleAllSelect"
								class="service-checkbox"
							/>
						</label>
						<div class="service-name-price-container">
							<span class="service-name">Soin Complet (-10%)</span>
							<span class="service-price">{{ totalWithDiscount }} €</span>
						</div>
					</div>
					<p>
						Sélectionnez tous les services disponibles pour un soin complet.
						<br />
						Les soins complets comprennent actuellement :
					</p>
					<!-- Liste des noms de services pour "Soin Complet" -->
					<ul class="complete-service-list">
						<li v-for="service in services" :key="service.id">
							{{ service.name }}
						</li>
					</ul>
				</li>

				<!-- Option pour "Aucun Service" -->
				<li class="service-item">
					<div class="service-header">
						<label class="service-label">
							<input
								type="checkbox"
								value="none"
								v-model="selectedServices"
								@change="handleNoneSelection"
								class="service-checkbox"
							/>
							<span class="service-name">Aucun Service</span>
						</label>
					</div>
					<p>Ne sélectionnez aucun service pour cet utilisateur.</p>
				</li>
			</ul>
		</div>

		<div class="button-container">
			<button class="button" @click="goToNextStep" :disabled="!isNextEnabled">
				Next
			</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

export default {
	setup(_, { emit }) {
		const services = ref([]);
		const selectedServices = ref(['none']);
		const allSelected = ref(false); // Variable pour suivre l'état de sélection "Soin Complet"

		// Récupérer les services depuis la base de données
		const fetchServices = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/services'
				);
				services.value = response.data;
			} catch (error) {
				console.error('Erreur lors de la récupération des services :', error);
			}
		};

		// Propriété calculée pour obtenir tous les noms de services
		const allServiceNames = computed(() => {
			return services.value.map(service => service.name).join(', ');
		});

		// Calculer le prix total avec une réduction de 10% si "Soin Complet" est sélectionné
		const totalWithDiscount = computed(() => {
			if (allSelected.value) {
				const total = services.value.reduce(
					(sum, service) => sum + parseFloat(service.price),
					0
				);
				return (total * 0.9).toFixed(2); // Appliquer une réduction de 10%
			}
			return 0;
		});

		// Gérer la sélection de "Soin Complet"
		const handleAllSelect = () => {
			if (allSelected.value) {
				selectedServices.value = services.value.map(service => service.id);
				// Supprime 'none' de la sélection
				selectedServices.value = selectedServices.value.filter(
					service => service !== 'none'
				);
			} else {
				selectedServices.value = [];
			}
		};

		// Vérifie si le bouton Next doit être activé
		const isNextEnabled = computed(() => selectedServices.value.length > 0);

		// Gérer la sélection de "Aucun service"
		const handleNoneSelection = () => {
			if (selectedServices.value.includes('none')) {
				selectedServices.value = ['none'];
				allSelected.value = false; // Décocher "Soin Complet" si "Aucun Service" est sélectionné
			} else if (selectedServices.value.length === 0) {
				selectedServices.value = [];
			}
		};

		// Vérifier la sélection des services
		const checkSelection = () => {
			if (
				selectedServices.value.includes('none') &&
				selectedServices.value.length > 1
			) {
				selectedServices.value = selectedServices.value.filter(
					service => service !== 'none'
				);
			}

			// Vérifie si tous les services sont sélectionnés
			const allServiceIds = services.value.map(service => service.id);
			const allSelectedManually = allServiceIds.every(id =>
				selectedServices.value.includes(id)
			);

			if (allSelectedManually) {
				allSelected.value = true; // Coche "Soin Complet" si tous les articles sont sélectionnés
			} else {
				allSelected.value = false; // Décoche "Soin Complet" s'il manque un article
			}
		};

		// Émission de l'événement pour aller à l'étape suivante avec les services sélectionnés
		const goToNextStep = () => {
			const selectedServiceNames = services.value
				.filter(service => selectedServices.value.includes(service.id))
				.map(service => service.name);
			emit('next-step', {
				selectedServices: selectedServices.value,
				selectedServiceNames,
			});
		};

		onMounted(fetchServices);

		return {
			services,
			selectedServices,
			allSelected,
			totalWithDiscount,
			allServiceNames,
			isNextEnabled,
			goToNextStep,
			handleNoneSelection,
			handleAllSelect,
			checkSelection,
		};
	},
};
</script>

<style scoped>
.services-container {
	width: 900px;
	margin: 0 auto;
	margin-top: 20px;
	padding: 20px 20px 0 20px;
	border: 1px solid var(--color-border);
	border-radius: 10px;
	box-shadow: 0 0 8px var(--color-border-shadow);
	align-items: flex-start;
}

.title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 20px;
	color: #333;
}

.services-list {
	list-style: none;
	padding: 20px;
	margin: 0;
}

.service-item {
	border: 1px solid var(--color-hover);
	background-color: #ffffff;
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin: 10px 0px 30px 0px;
}

.service-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
}

.service-label {
	display: flex;
	align-items: center;
	gap: 5px;
}

.service-checkbox,
.checkbox-large {
	margin: 0 10px 0px 0px;
	width: 20px;
	height: 20px;
}

.service-name-price-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-grow: 1;
	width: 100%;
}

.service-name {
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.service-price {
	font-weight: bold;
	color: #333;
}

.complete-service-list {
	list-style-type: disc; /* Utilise des puces pour les éléments de la liste */
	margin-left: 50px;
	padding: 0;
}

.complete-service-list li {
	margin-bottom: 5px; /* Espace entre les éléments de la liste */
}

.serviceDescription {
	font-size: 5px;
}

.button-container {
	display: flex;
	justify-content: flex-end; /* Aligner à droite */
	margin-right: 30px;
}

.button {
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s ease;
}

.button:disabled {
	background-color: #cccccc;
	cursor: not-allowed;
}

p {
	font-size: 1rem;
}

/* Styles pour améliorer l'affichage mobile */
@media (max-width: 599px) {
	.services-container {
		border: none;
		width: 100%;
		box-shadow: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.services-list {
		padding: 0;
		margin-bottom: 30px;
		font-size: 0.9rem;
	}

	.service-item {
		border: solid 1px var(--color-hover);
		background-color: #ffffff;
		border-radius: 5px;
		box-shadow: none;
		width: 100%;
		margin: 0 0 30 0;
		padding: 10px;
		box-sizing: border-box;
	}
	p {
		font-size: 0.8rem;
	}
}

@media (min-width: 600px) and (max-width: 1024px) {
	.services-container {
		width: 90%;
	}
}

@media (min-width: 1025px) {
	.services-container {
		width: 70%;
	}
}
</style>
