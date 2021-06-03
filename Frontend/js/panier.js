// Variables utilisées par la suite
let panier;
let mainHTML = document.querySelector('main');

// Vérification de l'existance du panier
if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
    commandeAffichage();
} else { // si absence du panier retour vers la page index
    window.location.href =`index.html`;
}

// La fonction permettant d'afficher tous les articles présents dans le panier
function commandeAffichage() {
    let affichage = document.createElement('div');
    affichage.className = "affichage";
    
    // Récupération des informations du localStorage
    for (let i = 0; i < panier.length; i++) {
        let img = panier[i].img;
        let name = panier[i].name;
        let prix= panier[i].prix*panier[i].quantity;
        let prixVirgule = prix.toFixed(2)
        let quantity = panier[i].quantity;
        let options = panier[i].options

        // Affichage des données obtenues au sein du localStorage
        let table =
            `<form id="formPanier">
                <div id="img-texte">
                    <img class="form-img" src=${img}>
                    <h3>${name}</h3>
                </div>
                <div id="quantite-prix">
                    <p>Lentilles : <br>${options}</p>
                    <p>Quantité : ${quantity}</p>
                    <p>Prix : <span class="prixArticle">${prixVirgule}</span>€</p>
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
    let sum = "";
    priceInfo.forEach(i => {
       i = Number(i.textContent);
       sum += i.toFixed(2);
    });
    affichagePrix.innerHTML = `Le coût total du panier est : <span class="totalPrice">${sum}</span>€`;
    mainHTML.appendChild(affichagePrix);
}


// Fonction pour supprimer les articles du panier
let suppr = document.querySelectorAll('.btn');
for (let i = 0; i < suppr.length; i++) {
        suppr[i].addEventListener('click', () => {
            panier.splice(i, 1);
            localStorage.setItem('monPanier', JSON.stringify(panier));
        
            // Si le panier est vide, on supprime le localStorage
            if (panier.length < 1) {
                localStorage.removeItem('monPanier');

              // Rafraîchissement de la page
              window.location.reload();
            }
        })
}

//  addEventListener mis en place pour obtenir les coordonnées du client
document.querySelector('#form').addEventListener('submit', (e) => {
    // Blocage du comportement par défaut 
    e.preventDefault();

    // Création du formulaire qui récupèrera les données du client avec un tableau  nommé "produits"
    let data = {
        contact : {
            firstName: document.getElementById('prenom').value,
            lastName: document.getElementById('nom').value,
            city: document.getElementById('ville').value,
            address: document.getElementById('adresse').value,
            email: document.getElementById('email').value
        },
        products : []
    }

      // Si le panier est vide on stop la commande
      if (!panier) {
        alert("la commande ne peut pas être passée car le panier est vide");
        return
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

    if(!/^[ a-zA-Zéèê\-]{5}/.test(data.contact.ville)) {
        alert("Attention, écrivez correctement le nom de votre ville (au minimum 5 lettres)");
        return
    }

    // fonction que l'on fait rentrer dans data.products pour s'adapter à la quantité demandée
    panier.forEach(elt => {
        for (let i = 0; i < elt.quantity; i++) {
            data.products.push(elt.id);    
        }
    })

    // Fetch créé avec la méthode POST 
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    })
    // Retour de l'envoi au serveur
    .then(res => res.json())
    .then(data => {
        // Insertion au sein du localStorage de l'élément 'data'
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

