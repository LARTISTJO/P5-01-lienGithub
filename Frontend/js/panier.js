

//Création de l'élément figure

let listeAppareilsPhoto = document.getElementById("liste-appareils-photo"); //récupération de l'element id=liste-appareils-photo
let figure = document.createElement("figure"); //création d'une figure
listeAppareilsPhoto.appendChild(figure); // figure est un enfant de listeAppareilsPhoto 

//Création de l'img au sein de l'élément figure
let imageAppareil= document.createElement('img');
imageAppareil.setAttribute('src="../images/app-photo-1.jpg"');
imageAppareil.setAttribute('alt', 'appareil photo vintage');
figure.appendChild(imageAppareil);

//Création du figcaption au sein de l'élément figure
let figcaption= document.createElement('figcaption');
figure.appendChild(figcaption);

//Mise en place du texte au sein de la figcaption
let description = document.createElement('div');
let prix = document.createElement('div');
description.setAttribute('class', 'description');
prix.setAttribute('class', 'prix');
figcaption.appendChild(description);
figcaption.appendChild(prix);

//Mise en place des boutons au sein de la figcaption
let boutons = document.createElement('div');
boutons.setAttribute('class', 'boutons');
figcaption.appendChild(boutons);

//Mise en place du texte au sein de la class description
let h3 = document.createElement('h3');
let p = document.createElement('p');
description.appendChild (p)
description.appendChild(h3);

//Mise en place des button au sein de la class boutons
let liensBouton = document.createElement('a');
boutons.appendChild(liensBouton);

