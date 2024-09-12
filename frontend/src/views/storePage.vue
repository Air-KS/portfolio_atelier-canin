<!-- ./frontend/src/views/store.vue -->

<template>
	<div class="store">
	  <h1>Store</h1>
	  <StoreTabs :tabs="tabs" v-model="selectedTab" />

	  <!-- Affichage dynamique basé sur l'onglet sélectionné -->
	  <div v-if="selectedTab === 'Products'">
		<Products />
	  </div>

	  <div v-if="selectedTab === 'Categories'">
		<Categories />
	  </div>

	  <div v-if="selectedTab === 'Orders'">
		<Orders />
	  </div>
	</div>
  </template>

  <script>
  import StoreTabs from '@/components/store/storeTabs.vue';
  import Products from '@/components/store/products.vue';
  import Categories from '@/components/store/categories.vue';
  import Orders from '@/components/store/orders.vue';

  export default {
	name: 'Store',
	components: {
	  StoreTabs,
	  Products,
	  Categories,
	  Orders,
	},
	data() {
	  return {
		tabs: ['Products', 'Categories', 'Orders'],
		selectedTab: 'Products',
	  };
	},
  };
  </script>

  <style scoped>
  .store {
	padding: 20px;
  }

  h1 {
	text-align: center;
  }
  </style>
