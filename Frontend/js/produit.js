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
        <form id="selection">
            <div id="choix">  
                <div id="nombre">         
                    <p>Quantité:</p>
                    <div class="quantite quantite-panier"> 
                        <button id ="plus" ><i class="fas fa-plus"></i></button>
                        <input type="number" id="quantity" value="0">
                        <button class ="moins" type="button"><i class="fas fa-minus"></i></button>
                    </div>
                </div> 
            </div> `;
            product +=  `
            <div id="type"> 
                <div id="valeur">
                    <p ="options">Lentilles:</p>
                    <select id ="options">
                </div>
            </div>  `
            appareil.lenses.forEach(lentilles => {
                product += 
                `<option value= "${lentilles}">${lentilles}</option> `
            });
            product +=  ` </select>
            <div id="boutons">
                <button id="commandes">Ajoutez au panier</button>
            </div>
        </form>`

        const fragment = document.createRange()
        .createContextualFragment(product)
        document.getElementById('main').appendChild(fragment)
         
})

.catch ((err) => {
	alert (err);
})
}
  
appareilChoix ();// Appel de la fonction, pour affichage des données

let qtyPlus = document.querySelector ('#plus');
const qtyMoins = document.querySelector (".moins");
let quantity = document.querySelector("#quantity");

qtyPlus.addEventListener('click', () =>{
    quantity.value = parseInt(quantity.value) +1;
});



 