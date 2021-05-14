// lien vers API
fetch("http://localhost:3000/api/teddies/")
.then(function(res) {
    if (res.ok){
        return res.json();
    }
})
.then (function(value){
    console.log(value);
})
.catch(function (err) {
    console.log("erreur");
});

//Création de l'élément figure

let main = document.getElementsByTagName("main"); //récupération de l'element id=liste-appareils-photo
let figure = document.createElement("figure"); //création d'une figure
main.appendChild(figure); // figure est un enfant de listeAppareilsPhoto 

//Création de l'img au sein de l'élément figure
let imageAppareil = document.createElement('img');
imageAppareil.setAttribute('src="../images/vcam_3.jpg"');
imageAppareil.setAttribute('alt', 'appareil photo vintage');
figure.appendChild(imageAppareil);

//Création du figcaption au sein de l'élément figure
let figcaption = document.createElement('figcaption');
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


//Création de l'élément choix
let main = document.getElementsByTagName("main"); //récupération de l'element id choix
let choix = document.createElement("div"); //création d'une div
choix.setAttribute ('id','choix')
main.appendChild(choix); // choix est un enfant de main

//Création de l'élément nombre au sein de l'élément choix
let nombre = document.createElement('div');
nombre.setAttribute('id', 'nombre');
choix.appendChild(nombre);
