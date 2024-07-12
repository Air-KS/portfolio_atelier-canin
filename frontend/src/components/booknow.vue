<template>
	<div v-if="visible" class="overlay" @click="closePopup">
		<div class="popup" @click.stop>
			<div class="popup-content">
				<div class="headerPopup-container">
					<h3>
						Adress: Le Jacquard, 25 Rue Corneille 2ème, 59100 Roubaix
						<span class="text-example">
							- This is the address of the Lille campus -
						</span>
						<br />
						Phone: 03.66.88.40.39
						<span class="text-example">
							- This is the number of the Lille campus -
						</span>
					</h3>
					<div @click="closePopup" class="x"></div>
				</div>
				<div class="separator"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Booknow',
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
	},
	watch: {
		visible(newVal) {
			console.log('visible changed:', newVal);
			if (newVal) {
				document.body.classList.add('no-scroll');
				console.log('Popup is now visible');
			} else {
				document.body.classList.remove('no-scroll');
				console.log('Popup is now hidden');
			}
		},
	},
	methods: {
		closePopup() {
			console.log('closePopup called');
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
	font-size: 12px;
	font-family: var(--font-family-body);
}

.text-example {
	font-size: 10px;
	color: var(--color-border-input);
	font-style: italic;
}

.headerPopup-container {
	display: flex;
	flex: row;
	justify-content: space-between;
	align-items: center;

	width: 100%;
}

.popup {
	background-color: var(--color-background);
	border: 2px solid var(--color-border);
	padding: 0px 20px;
	border-radius: 25px;
	width: 80%;
	height: 70%;
	overflow-y: auto;
}

.popup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.x {
	width: 70px;
	height: 70px;
	background-image: url('@/assets/images/booknow/x.svg');
	background-size: cover;
	background-position: center;
}
.x:hover {
	background-image: url('@/assets/images/booknow/x-hover.svg');
	cursor: pointer;
}

@media (max-width: 599) {
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
	h3 {
		font-size: 14px;
	}

	.text-example {
		font-size: 12px;
	}
}

@media (min-width: 1025px) {
	.popup {
		width: 50%;
		height: 70%;
	}

	h3 {
		font-size: 18px;
	}

	.text-example {
		font-size: 14px;
	}
}
</style>
