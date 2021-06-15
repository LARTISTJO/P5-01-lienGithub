// Variables utilisées par la suite
let panier;
let mainHtml = document.querySelector('main');

// Vérification de l'existance du panier
if ("panier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('panier'));
    commandeAffichage();
} else { // si absence du panier retour vers la page index
    document.querySelector('#panier-vide').style.display = "flex";
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
        let prixVirgule = prix.toFixed(2);
        let quantite = panier[i].quantity;
        let options = panier[i].options;
       
        // Affichage des données obtenues au sein du localStorage 
        let table =
        
            `<form id="formPanier">
                <div id="img-texte">
                    <img class="form-img" src=${img}>
                    <h3>${name}</h3>
                </div>
                <div id="quantite-prix">
                    <p>Lentilles : <br>${options}</p>
                    <p>Prix : <span class="prixArticle">${prixVirgule}</span>€</p>
                </div>
                <div id="quantite-panier">
                    <input type= "number" id="numberQuantite" value=${quantite}>
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
    mainHtml.appendChild(affichage);
    totalPrice ();
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
    affichagePrix.innerHTML = `Le prix total du panier est : <span class="totalPrice">${sum.toFixed(2)}</span>€`;
    mainHtml.appendChild(affichagePrix);
}

// Fonction pour supprimer les articles du panier
let suppr = document.querySelectorAll('.btn');
for (let i = 0; i < suppr.length; i++) {
        suppr[i].addEventListener('click', () => {
            panier.splice(i, 1);
            localStorage.setItem('panier', JSON.stringify(panier));            
            // Si le panier est vide, on supprime le localStorage
            if (panier.length < 1) {
                localStorage.removeItem('panier');
              // Rafraîchissement de la page
              window.location.reload();
            }
        })
}

// Fonction pour mettre à jour la quantité et le prix du panier
let maj = document.querySelectorAll("#numberQuantite");
for (let i = 0; i < maj.length; i++) {
        maj[i].addEventListener('change', () => {
            panier[i].quantity = maj[i].value;
            localStorage.setItem('panier', JSON.stringify(panier));
              // Rafraîchissement de la page
              location.reload();
        })
}

let forme = document.querySelector('#forme');
let formulaire = 
 `<form id="form" name="myForm">
 <input class="panier" type="text" id="prenom" name="prenom" placeholder="Ex: 'Ruben'" required>
 <input class="panier" type="text" id="nom"  name="nom" placeholder="Ex: 'Manu'" required>
 <input class="panier" type="text" id="ville" name="ville" placeholder="Ex: 'Paris'" required>
 <input class="panier" type="text" id="adresse" name="adresse" placeholder="Ex: '3 rue du Mail'" required>
 <input class="panier" type="email" id="email" name="email" placeholder="Ex: 'ruben@email.fr'" required>
 <input class="panier" id="envoi" type="submit" value="Validation de votre commande">
</form>`;

forme.innerHTML = formulaire;

    // variables créées pour vérifier la validité des informations transmises par le client
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){3,25}$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

//  addEventListener mis en place pour obtenir les coordonnées du client
document.querySelector('#form').addEventListener('submit', (e) => {
    // Blocage du comportement par défaut 
    e.preventDefault();
    // Création du formulaire qui récupèrera les données du client avec un tableau  nommé "products"
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
        // Si le panier est vide on arrête la commande
        if (!panier) {
            alert("la commande ne peut pas être passée car le panier est vide");
            return
    }

        // Vérification sur le prénom
        if(!regexName.test(data.contact.firstName)) {
            alert("Attention à bien remplir correctement votre prénom");
            return
        }

        // Vérification sur le Nom
        if(!regexName.test(data.contact.lastName)) {
            alert("Attention remplissez correctement le champ nom");
            return
        }

        // Vérification sur la ville  
        if(!regexCity.test(data.contact.city)) {
            alert("Attention remplissez correctement le champ ville");
            return
        }

        // Vérification sur l'adresse
        if(!regexAddress.test(data.contact.address)) {
            alert("Attention remplissez correctement le champ adresse");
            return
        }

        // Vérification sur l'email
        if(!regexMail.test(data.contact.email)) {
            alert("Attention remplissez correctement le champ email");
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
        localStorage.removeItem('panier');
        // Ouverture de la page de confirmation
        location.replace("confirmation.html")
    })
    // Au cas où il y aurait une erreur
    .catch((error) => {
        console.error(error);
    });
})