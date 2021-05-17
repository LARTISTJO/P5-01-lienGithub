//........ Récupération produits Api
function appareilPhoto () {
	fetch("http://localhost:3000/api/cameras")
	.then( (res) => res.json())


	//........Structure html
	.then ((data) => {
		const structure = document.getElementById("appareils");
		for (let i = 0; i < data.length; i++){ 

	//........Figure
	const figure = document.createElement ("figure");
	appareils.appendChild(figure);
		
		//Création de l'img au sein de l'élément figure
		let img = document.createElement("img");
		img.src= data [i].imageUrl;
		img.alt = "Appareil photo vintage";
		figure.appendChild(img);

		//Création du figcaption au sein de l'élément figure
		let figcaption= document.createElement("figcaption");
		figure.appendChild(figcaption);


		//Mise en place du texte au sein de la figcaption
			let description = document.createElement("div");
			let prix = document.createElement("div");
			description.setAttribute("class", "description");
			figcaption.appendChild(description);

			//Mise en place du texte au sein de la class description
				let nameAppareil = document.createElement('h3');
				let texte = document.createElement('p');
				nameAppareil.innerHTML = data[i].name
				texte.textContent = "Magnifique Appareil, il fera votre bonheur"
				description.appendChild(nameAppareil);
				description.appendChild (texte)

			//Mise en place du prix au sein du figcaption
				prix.setAttribute("class", "prix");
				prix.innerHTML = data [i].price/1000 + "€";
				figcaption.appendChild(prix);

			//Mise en place des boutons et liens au sein du figcaption
				let liensBouton = document.createElement("a");
				let bouton = document.createElement ("button");
				bouton.textContent = "En savoir +";
				figcaption.appendChild(liensBouton);
				liensBouton.appendChild(bouton);
				}
			});
}

appareilPhoto ();
