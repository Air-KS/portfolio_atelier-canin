<!-- ./frontend/src/components/storeTabs.vue -->

<template>
	<div class="store-tabs">
	  <ul class="tab-list">
		<li
		  v-for="tab in tabs"
		  :key="tab"
		  :class="{ active: selectedTab === tab }"
		  @click="selectTab(tab)"
		>
		  {{ tab }}
		</li>
	  </ul>
	</div>
  </template>

  <script>
  export default {
	name: 'StoreTabs',
	props: {
	  tabs: {
		type: Array,
		required: true
	  },
	  value: {
		type: String,
		default: ''
	  }
	},
	computed: {
	  selectedTab() {
		return this.value;
	  }
	},
	methods: {
	  selectTab(tab) {
		this.$emit('input', tab);
	  }
	}
  };
  </script>

  <style scoped>
  .store-tabs {
	margin-bottom: 20px;
  }

  .tab-list {
	list-style: none;
	display: flex;
	justify-content: center;
	padding: 0;
  }

  .tab-list li {
	padding: 10px 20px;
	cursor: pointer;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin: 0 5px;
  }

  .tab-list li.active {
	background-color: #4687af;
	color: #fff;
  }
  </style>
