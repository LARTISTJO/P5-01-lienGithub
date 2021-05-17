// Récupération d'un seul produit API 
let unProduit = new URLSearchParams(window.location.search)
let productId = unProduit.get ("id");
fetch("http://localhost:3000/api/cameras/")
.then(function(res) {
    if (res.ok){
        return res.json();
    }
})
.then((données) => {
    let data = données; 
    //création de l'element main;
    const structureImage = document.getElementById("mains");
    {

//Création de l'élément figure
let figure = document.createElement("figure"); //création d'une figure
figure.setAttribute = ("id", "produit"); // attribut pour la figure
mains.appendChild(figure); // figure est un enfant de main

    //Création de l'img au sein de l'élément figure
    let img = document.createElement("img");
    img.src= data [i].imageUrl;
    img.alt = "Appareil photo vintage";
    figure.appendChild(img);

//Création du figcaption au sein de l'élément figure
let figcaption = document.createElement('figcaption');
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
		bouton.textContent = "Commander";
		figcaption.appendChild(liensBouton);
		liensBouton.appendChild(bouton);

    };
})
données ();

//Création de l'élément choix
let choix = document.createElement("div"); //création d'une div
choix.setAttribute ('id','choix')
main.appendChild(choix); // choix est un enfant de main
    //Création de l'élément nombre au sein de l'élément choix
    let nombre = document.createElement('div');
    nombre.setAttribute('id', 'nombre');
    choix.appendChild(nombre);


