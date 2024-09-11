<!-- ./frontend/src/components/store/categories.vue -->

<template>
	<div class="categories">
	  <h2>List of Categories</h2>
	  <!-- Ajoutez ici le code pour afficher la liste des catégories -->
	  <ul>
		<li v-for="category in categories" :key="category.id">
		  {{ category.name }}
		</li>
	  </ul>
	</div>
  </template>

  <script>
  import axios from 'axios';

  export default {
	name: 'Categories',
	data() {
	  return {
		categories: [], // Liste des catégories
	  };
	},
	async mounted() {
	  await this.fetchCategories();
	},
	methods: {
	  async fetchCategories() {
		try {
		  const response = await axios.get('http://localhost:3000/api/categories');
		  this.categories = response.data;
		} catch (error) {
		  console.error('Erreur lors de la récupération des catégories :', error);
		}
	  },
	},
  };
  </script>

  <style scoped>
  .categories {
	padding: 20px;
  }

  h2 {
	text-align: center;
  }
  </style>
