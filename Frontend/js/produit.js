// Variables pour récupérer id
const getUrlId = window.location.search;
const getUrlParams = new URLSearchParams(getUrlId);
const id = getUrlParams.get("id");


// Variables pour structurer le produit
let structureProduit = document.querySelector('#main');
let product = ''
// Fonction qui récupère et affiche l'article
function appareilChoix (){
    fetch(`http://localhost:3000/api/cameras/${id}`) // Article affiché par l'id en fonction de la sélection en page index
    .then((res) => res.json()) // Ici nous transmettons les données au format JSON
    .then( appareil => {
               
       
         product =
                `<figure id="produit">
                <img class="image" src="${appareil.imageUrl}">
                <figcaption id ="capture">
                    <div class="description">
                        <h3>${appareil.name}</h3>
                        <p> Magnifique appareil photo il fera votre bonheur</p>
                    </div>
                    <p class="prix">${appareil.price/1000}€</p>
                </figcaption>
            </figure>
        <div id="selection">
            <div id="choix">  
                <div id="nombre">         
                    <label for="quantity">Quantité:</label>
                    <input type="number" id="quantity" value="1" min="0">  
                </div> 
            </div> `;
            product +=  `
            <div id="type"> 
                <div id="valeur">
                    <label for="options">Lentilles:</label>
                    <select id ="options">
                </div>
            </div> `
            appareil.lenses.forEach(lentilles => {
                product += 
                `<option value= "${lentilles}">${lentilles}</option>`
            })
            product +=  `</select>
            <div id="boutons">
                <button id="commandes" onclick="ajoutPanier(e)">Ajoutez au panier</button>
            </div>
        </div>`

        const fragment = document.createRange()
        .createContextualFragment(product)
        document.getElementById('main').appendChild(fragment)       
})

.catch ((err) => {
	alert (err);
})
}
  
appareilChoix ();// Appel de la fonction, pour affichage des données

 const commandes = document.querySelector("#commandes");

// Création variable panier
let panier;

if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
} else {
    panier = [];
}
// Fonction qui récupère les éléments pour les transmettre à la page panier
function ajoutPanier(e) {
    //Blocage de  l'action par défaut du navigateur
    e.preventDefault();

    // Création des éléments qui seront envoyés dans le localStorage
    let commande = {
        id,
        name : document.querySelector('h3').textContent,
        img : document.querySelector('.image').src,
        quantity : Number (document.querySelector('#quantityNumber').value),
        prix : Number (document.querySelector('.prix').textContent),
        options : document.querySelector('#options').value
    }

    // Vérification que la commande possède au moins un article
    if (!commande.quantity > 0) {
        alert("vous devez choisir au moins un article pour passer la commande !")
        return;
    }

    for (let i = 0; i < panier.length; i++) {
        if (commande.options == panier[i].options && commande.id == panier[i].id) {
            commande.quantity += Number(panier[i].quantity);
            panier.splice(i,1);
        }
    }

    // Informations transmises au panier + reset des valeurs
    panier.push(commande);
    form.reset();
   
    // Placement du panier dans le localStorage
    localStorage.setItem('monPanier', JSON.stringify(panier));

}
// Click qui permet de placer le panier dans le localStorage
commandes.addEventListener('click', ajoutPanier);



 