<!--
	./frontend/src/components/Popup.vue
-->
<template>
	<div v-if="visible" class="overlay" @click="closePopup">
		<div class="popup" @click.stop>
			<div class="popup-content">
				<div class="sticky-container">
					<div class="headerPopup-container">
						<h3 v-if="title">{{ title }}</h3>
						<div @click="closePopup" class="x"></div>
					</div>
					<div class="separator"></div>
				</div>
				<div class="content">
					<slot></slot>
					<!-- Slot pour le contenu personnalisé -->
				</div>
			</div>
		</div>
	</div>
</template>



<script>
export default {
	name: 'Popup',
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
	},
	watch: {
		visible(newVal) {
			if (newVal) {
				document.body.classList.add('no-scroll');
			} else {
				document.body.classList.remove('no-scroll');
			}
		},
	},
	methods: {
		closePopup() {
			this.$emit('close-popup');
		},
	},
};
</script>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
}

h3 {
	display: flex;
	flex-direction: column;
	font-size: 20px;
	font-family: var(--font-family-body);
	text-align: center;
	margin: 0 auto;
}

.text-example {
	font-size: 10px;
	color: var(--color-border-input);
	font-style: italic;
}

.sticky-container {
	position: sticky;
	top: 0;
	z-index: 20;
	background-color: var(--color-background);
	width: 100%;
}

.headerPopup-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 10px 0px 10px 0px;
	background-color: var(--color-background);
}

.separator {
	width: 100%;
	height: 2px;
}

.popup {
	background-color: var(--color-background);
	border: 2px solid var(--color-border);
	padding: 0px 20px;
	border-radius: 25px 0px 0px 25px;
	width: 80%;
	height: 70%;
	overflow-y: auto;
}

.popup-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.x {
	width: 50px;
	height: 50px;
	background-image: url('@/assets/images/booknow/x.svg');
	background-size: cover;
	background-position: center;
}

.x:hover {
	background-image: url('@/assets/images/booknow/x-hover.svg');
	cursor: pointer;
}

@media (max-width: 599px) {
	.popup {
		width: 70%;
		height: 70%;
	}
}

@media (min-width: 600px) and (max-width: 1024px) {
	.popup {
		width: 70%;
		height: 70%;
	}
}

@media (min-width: 1025px) {
	.popup {
		width: 50%;
		height: 70%;
	}
}
</style>
