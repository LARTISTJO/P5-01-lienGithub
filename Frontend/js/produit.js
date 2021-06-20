// Variables pour récupérer id
const getUrlId =  new URL (window.location.href);
const id = getUrlId.searchParams.get("id");

// Variables pour structurer le produit
let product = ''

// Fonction qui récupère et affiche l'article
function appareilChoix (){
    fetch('http://localhost:3000/api/cameras/' + id) // Article affiché par l'id en fonction de la sélection en page index
    .then((res) => res.json()) // Ici nous transmettons les données au format JSON
    .then (appareil => {
               
        
         product =
               `<figure id="produit">
                    <img class="image" src="${appareil.imageUrl}">
                    <figcaption>
                        <div class="descriptions">
                            <h3>${appareil.name}</h3>
                            <p>${appareil.description}</p>
                        </div>
                        <div id="euro">
                            <p class="prix">${appareil.price/1000}</p>
                            <span>€</span>
                        </div> 
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
                    for (lentilles in appareil.lenses) {
                        product += 
                        `<option value= "${appareil.lenses[lentilles]}">${appareil.lenses[lentilles]}</option>`
                    } 
                    product +=  `</select>
                    <div id="boutons">
                        <button class="btn" onclick="ajoutPanier()">Ajoutez au panier</button>
                    </div>
                </div>`
            
        const fragment = document.createRange()
        .createContextualFragment(product)
        document.getElementById('main').appendChild(fragment)       
})
}
 
appareilChoix(id);// Appel de la fonction, pour affichage des données

// Création variable panier
let panier = [];

if ("panier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('panier'));
}
//console.log(panier);

// Fonction qui récupère les éléments pour les transmettre à la page panier
function ajoutPanier() {

    // Création des éléments qui seront envoyés dans le localStorage
    let commande = {
        id,
        options : document.querySelector('#options').value,
        name : document.querySelector('h3').textContent,
        img : document.querySelector('.image').src,
        quantity : Number(document.querySelector('#quantity').value),
        prix : Number(document.querySelector('.prix').textContent)
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
    // Informations transmises au panier
    panier.push(commande);
    //console.log(panier);

    // Placement du panier dans le localStorage
    localStorage.setItem('panier', JSON.stringify(panier));
    console.log(panier); 
}