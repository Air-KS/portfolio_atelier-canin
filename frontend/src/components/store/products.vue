<!-- ./frontend/src/components/store/products.vue -->

<template>
	<div class="products">
	  <h2>List of Products</h2>
	  <!-- Ajoutez ici le code pour afficher la liste des produits -->
	  <ul>
		<li v-for="product in products" :key="product.id">
		  {{ product.name }} - {{ product.price }}
		</li>
	  </ul>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'Products',
	data() {
	  return {
		products: [], // Liste des produits
	  };
	},
	async mounted() {
	  await this.fetchProducts();
	},
	methods: {
	  async fetchProducts() {
		try {
		  const response = await axios.get('http://localhost:3000/api/products');
		  this.products = response.data;
		} catch (error) {
		  console.error('Erreur lors de la récupération des produits :', error);
		}
	  },
	},
  };
  </script>

  <style scoped>
  .products {
	padding: 20px;
  }

  h2 {
	text-align: center;
  }
  </style>
