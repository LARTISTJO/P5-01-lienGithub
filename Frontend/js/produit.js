function appareilPhoto () {
	fetch("http://localhost:3000/api/cameras")
	.then( (res) => res.json())


	//........Structure html
	.then ((data) => {
		const structure = document.getElementById("main");
		for (let i = 2; i < data.length; i++){ 
        if (i > 2) break;{
            
        }

	//........Figure
	const figure = document.createElement ("figure");
    figure.setAttribute("id", "produit")
	main.appendChild(figure);
		
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
				prix.innerHTML = data [i].price /1000 + "€";
				figcaption.appendChild(prix);

			//Mise en place des boutons et liens au sein du figcaption
				let liensBouton = document.createElement("a");
				let bouton = document.createElement ("button");
				bouton.textContent = "Commander";
				figcaption.appendChild(liensBouton);
				liensBouton.appendChild(bouton);

    //....... Quantité
    const choix = document.createElement ("div");
    choix.setAttribute("id", "choix")
	main.appendChild(choix);
    
        const nombre = document.createElement ("div");
        nombre.setAttribute("id", "nombre")
        choix.appendChild(nombre);

            const quantite = document.createElement ("p");
            quantite.textContent = "Quantité :"
            nombre.appendChild(quantite);

            const selection = document.createElement ("div");
            selection.setAttribute("class", "selection")
            nombre.appendChild(selection);

                const plus = document.createElement ("div");
                plus.setAttribute("class", "plus")
                plus.textContent = "+"
                selection.appendChild(plus);

                const chiffre = document.createElement ("p");
                chiffre.textContent = "1"
                selection.appendChild(chiffre);

                const moins = document.createElement ("div");
                moins.setAttribute("class", "moins")
                moins.textContent = "+"
                selection.appendChild(moins);

    const type = document.createElement ("div");
    type.setAttribute("id", "type")
    main.appendChild(type);

        const valeur = document.createElement ("div");
        valeur.setAttribute("id", "valeur")
        type.appendChild(valeur);

            const lentilles = document.createElement ("p");
            lentilles.textContent = "Lentilles :"
            valeur.appendChild(lentilles);

    


            
				}
			});
}

appareilPhoto ();
