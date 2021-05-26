// Variables utilisées par la suite
let panier;
let mainHTML = document.querySelector('main');

// Vérification de l'existance du panier
if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
    affichageCommande();
} else {
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
        let prix = panier[i].price;
        let quantity = panier[i].quantity;
        
        // destructuration

        // Affichage des données obtenues au sein du localStorage
        let article =
            `<article>
                <div>
                <h3>${name}</h3>
                    <img class="article__img" src=${img} alt=${name}>
                </div>
                <div>
                    <p>Quantité : <span class="articleQuantity">${quantity}</p>
                    <p>Prix : <span class="prixArticle">${prix * quantity}</span>€</p>
                </div>
                <div>
                    <button class="btn">
                    <i class="fas fa-times"></i>
                    </button>
                </div>
            </article>`;

           
        affichage.innerHTML += article;
    }
    // Insertion au HTML + appel fonction prix total
    mainHTML.appendChild(affichage);
    totalPrice();
}

// Calcul du prix total
function totalPrice() {
    let affichagePrix = document.createElement('div');
    affichagePrix.className = "affichage_prix";
    let priceArray = document.querySelectorAll('.prixArticle');
    let sum = 0;
    priceArray.forEach(i => {
       i = Number(i.textContent);
       sum += i;
    });
    affichagePrix.innerHTML = `Le prix total du panier est : <span class="totalPrice">${sum}</span>€`;
    mainHTML.appendChild(affichagePrix);
}

// Supprimer un article du panier
let suppr = document.querySelectorAll('.btn');
for (let i = 0; i < suppr.length; i++) {
        suppr[i].addEventListener('click', () => {
            panier.splice(i, 1);
            localStorage.setItem('monPanier', JSON.stringify(panier));
        
            // S'il n'y a plus rien, on vide le localStorage
            if (panier.length < 1) {
                localStorage.removeItem('monPanier');
            }

            // Rafraîchissement de la page
            window.location.reload();
        })
}

// Création d'un event pour enregistrer les informations du client
document.querySelector('form').addEventListener('submit', (e) => {
    // On bloque le comportement par défaut du navigateur
    e.preventDefault();

    // Création de l'objet qui récupèrera les informations du formulaire avec un tableau produits
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


    // Vérification sur le prénom
    if(!/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/.test(data.contact.prenom)) {
        alert(" Attention, écrivez correctement votre prénom!!");
        return
    }

    // Vérification sur le Nom
    if(!/^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/.test(data.contact.nom)) {
        alert("Attention, écrivez correctement votre nom!!");
        return
    }

    // Vérification sur l'adresse (Ville) avec entre 5 et 20 lettres
    if(!/^[ a-zA-Zéèê\-]{5,20}/.test(data.contact.ville)) {
        alert("Attention, écrivez correctement le nom de votre ville (au minimum 5 lettres)");
        return
    }

    // On fait rentrer dans data.products les id des articles autant de fois que la quantity est demandée
    panier.forEach(elt => {
        for (let i = 0; i < elt.quantity; i++) {
            formInfo.produits.push(elt.id);    
        }
    })

    // Envoi fetch via la méthode POST de 'data'
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // Retour de l'envoi au server
    .then(response => response.json())
    .then(data => {
        // On va mettre dans le localStorage 'data'
        localStorage.setItem('confirmation', JSON.stringify(data));
        // Effaçons le panier vu que la commande est passée
        localStorage.removeItem('monPanier');
        // Ouverture de la page de confirmation
        location.replace("confirmation.html")
    })
    // Au cas où il y aurait une erreur
    .catch((error) => {
        console.error(error);
    });
})