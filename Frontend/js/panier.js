// Variables utilisées par la suite
let panier;
let mainHTML = document.querySelector('main');

// Vérification de l'existance du panier
if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
    affichageCommande();
} else { // si absence du panier retour vers la page index
    window.location.href =`index.html`;
}

// La fonction permettant d'afficher tous les articles présents dans le panier
function affichageCommande() {
    let affichage = document.createElement('div');
    affichage.className = "affichage";
    
    // Récupération des informations du localStorage
    for (let i = 0; i < panier.length; i++) {
        let img = panier[i].img;
        let name = panier[i].name;
        let prix= panier[i].price;
        let quantity = panier[i].quantity;

        // Affichage des données obtenues au sein du localStorage
        let table =
            `<form id="form-panier">
                <div id="img-texte">
                    <img class="form-img" src=${img}>
                    <h3>${name}</h3>
                </div>
                <div id="quantite-prix">
                    <p>Quantité : ${quantity}</p>
                    <p>Prix : <span class="articlePrice">${prix*quantity}</span>€</p>
                </div>
                <div class="quantite quantite-panier">
                    <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                    <input name="number" type="number" id="number"  placeholder="0"  onchange="total(value)">
                    <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                </div>
                <div id="btn-panier">
                    <button class="btn">
                    <i class="fas fa-times"></i>
                    </button>
                </div>
            </form>`;

           
        affichage.innerHTML += table;
    }
    // Création du  HTML et affichage de la fonction  totalPrice
    mainHTML.appendChild(affichage);
    totalPrice();
}

// Calcul du prix total
function totalPrice() {
    let affichagePrix = document.createElement('div');
    affichagePrix.className = "affichage-prix";
    let priceInfo = document.querySelectorAll('.prixArticle');
    let sum = 0;
    priceInfo.forEach(i => {
       i = Number(i.textContent);
       sum += i;
    });
    affichagePrix.innerHTML = `Le prix total du panier est : <span class="totalPrice">${sum}</span>€`;
    mainHTML.appendChild(affichagePrix);
}

// Fonction pour supprimer les articles du panier
let suppr = document.querySelectorAll('.btn');
for (let i = 0; i < suppr.length; i++) {
        suppr[i].addEventListener('click', () => {
            panier.splice(i, 1);
            localStorage.setItem('monPanier', JSON.stringify(panier));
        
            // S'il n'y a plus rien, on vide le localStorage
            if (panier.length < 1) {
                localStorage.removeItem('monPanier');

              // Rafraîchissement de la page
              window.location.reload();
            }
        })
}

//  addEventListener mis en place pour obtenir les coordonnées du client
document.querySelector('form').addEventListener('submit', (e) => {
    // Blocage du comportement par défaut 
    e.preventDefault();

    // Création du formulaire qui récupèrera les données du client avec un tableau  nommé "produits"
    let formInfo = {
        contact : {
            prenom: document.getElementById('prenom').value,
            nom: document.getElementById('nom').value,
            ville: document.getElementById('ville').value,
            adresse: document.getElementById('adresse').value,
            email: document.getElementById('email').value
        },
        produits : []
    }


    // Code mis en place pour que le client transmette les données correctement 
    if(!/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/.test(data.contact.prenom)) {
        alert(" Attention, écrivez correctement votre prénom!!");
        return
    }

    if(!/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/.test(data.contact.nom)) {
        alert("Attention, écrivez correctement votre nom!!");
        return
    }

    if(!/^[ a-zA-Zéèê\-]{5,20}/.test(data.contact.ville)) {
        alert("Attention, écrivez correctement le nom de votre ville (au minimum 5 lettres)");
        return
    }

    // fonction que l'on fait rentrer dans data.products pour s'adapter à la quantité demandée
    panier.forEach(elt => {
        for (let i = 0; i < elt.quantity; i++) {
            formInfo.produits.push(elt.id);    
        }
    })

    // Fetch créé avec la méthode POST 
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // Retour de l'envoi au serveur
    .then(res => res.json())
    .then(data => {
        // Insertion au sein du localStorage 'data'
        localStorage.setItem('confirmation', JSON.stringify(data));
        // Effacement du panier lorsque la commande est passée
        localStorage.removeItem('monPanier');
        // Ouverture de la page de confirmation
        location.replace("confirmation.html")
    })
    // Au cas où il y aurait une erreur
    .catch((error) => {
        console.error(error);
    });
})

