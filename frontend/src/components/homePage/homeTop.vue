<template>
	<div class="home-container">
		<div class="home-header">
			<!-- Title and sub title -->
			<h1 class="welcom">Welcome Holberton</h1>
			<h2 class="portfolio">Portfolio ATL Canin</h2>

			<!-- description -->
			<p>
				We are happy to introduce you today to Atelier Canin, a site
				specializing in pet grooming services. Come discover our services and
				our passion for the well-being of your four-legged companions !
			</p>

			<h1>Mobile Pet Grooming</h1>
			<p>
				On-Demand, Upfront Pricing, Instant Booking, Same-Day Availability, and
				Expert Care for All Furry Friends
			</p>
		</div>

		<!-- Comment -->
		<div class="img-dog">
			<img src="./../../assets/images/img-dog.png" alt="Cat and Dog" />
		</div>

		<div class="home-info">
			<div class="info-section" id="pick">
				<div class="info">
					<div class="icon"></div>
					<h3>Pick it !</h3>
				</div>
				<p>Pick from our variety of grooming services for dogs & cats</p>
			</div>

			<div class="separator"></div>
			<div class="info-section" id="book">
				<div class="info">
					<div class="icon"></div>
					<h3>Book it !</h3>
				</div>
				<p>
					Instantly get matched with a professional groomer for a date most
					convenient for you
				</p>
			</div>

			<div class="separator"></div>
			<div class="info-section" id="groom">
				<div class="info">
					<div class="icon"></div>
					<h3>Groom it !</h3>
				</div>
				<p>
					Sit back and relax as we bring the service to you with all the details
					at your fingertips
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeTop',
};
</script>

<style scoped>
.home-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
}

/* Header */
.home-header {
	text-align: center;
	width: 90%;
}

h1.welcom {
	font-size: 50px;
}

h2.portfolio {
	font-size: 30px;
	margin-top: -30px;
}

.info {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.info .icon {
	margin-right: 10px;
}

.home-info {
	display: flex;
	flex-direction: column;
	padding: 0px 20px 20px 20px;
	overflow: hidden;
	justify-content: left;
	align-items: left;
}

.info-section {
	background: #ffffff;
	text-align: left;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px;
	flex: 1;
}
.info-section h3 {
	margin: 0;
	font-size: 1.5em;
	color: var(--color-hover);
	/* Couleur du texte en rouge */
}

.info-section p {
	margin: 10px 0 0;
	font-size: 1em;
	color: #666;
	/* Couleur du texte en gris */
}

.img-dog {
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 0 auto;
}

.img-dog img {
	width: 95%;
}

.icon {
	width: 40px;
	height: 40px;
	background-size: contain;
	background-repeat: no-repeat;
}

/* Styles spécifiques pour chaque section */
#pick .icon {
	background-image: url('./../../assets/images/pick-it.svg'); /* URL de l'icône Pick it */
}
#book .icon {
	background-image: url('./../../assets/images/book-it.svg'); /* URL de l'icône Book it */
}
#groom .icon {
	background-image: url('./../../assets/images/groom-it.svg'); /* URL de l'icône Groom it */
}

@media (max-width: 599px) {
	.home-info {
		gap: 5px;
	}
	.info-section {
		border: 1px solid var(--color-border);
		border-radius: 0 25px 25px 0;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		margin-left: -20px;
		padding: 10px 10px 10px 20px;
		width: 98%;
	}
}

@media (min-width: 600px) and (max-width: 1024px) {
	.home-info {
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		background: white;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.separator {
		display: flex;
		width: 1px;
		height: auto;
		background-color: var(--color-hover);
		margin: 20px 5px 0px 5px;
	}
	.img-dog img {
		width: 100%;
	}
}

@media (min-width: 1025px) {
	.home-header {
		width: 50%;
	}

	.info-section {
		display: flex;
		flex-direction: column;
	}

	.home-info {
		border: 1px solid var(--color-border);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 25px;
		background: white;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 70%;
	}
	.separator {
		display: flex;
		width: 1px;
		height: auto;
		background-color: var(--color-hover);
		margin: 20px 5px 0px 5px;
	}
	.img-dog img {
		width: 70%;
	}
}
</style>
