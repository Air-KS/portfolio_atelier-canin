<!-- ./frontend/src/components/store/orders.vue -->

<template>
	<div class="orders">
	  <h2>List of Orders</h2>
	  <!-- Ajoutez ici le code pour afficher la liste des commandes -->
	  <ul>
		<li v-for="order in orders" :key="order.id">
		  Order ID: {{ order.id }} - {{ order.status }}
		</li>
	  </ul>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'Orders',
	data() {
	  return {
		orders: [], // Liste des commandes
	  };
	},
	async mounted() {
	  await this.fetchOrders();
	},
	methods: {
	  async fetchOrders() {
		try {
		  const response = await axios.get('http://localhost:3000/api/orders');
		  this.orders = response.data;
		} catch (error) {
		  console.error('Erreur lors de la récupération des commandes :', error);
		}
	  },
	},
  };
  </script>

  <style scoped>
  .orders {
	padding: 20px;
  }

  h2 {
	text-align: center;
  }
  </style>
