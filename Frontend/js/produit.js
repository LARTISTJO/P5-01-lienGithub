// Variables qui seront utiles pour la suite du développement de cette page
const getUrl = new URL(window.location.href);
const id = getUrl.searchParams.get('id');
const form = document.getElementById('selection');
const commandes = document.getElementById('commandes');
const prix = document.querySelector('.prix');
const coutTotal = document.querySelector('.coutTotal');

// Fonction qui récupère et affiche l'article
function appareilChoix (id) {
    fetch('http://localhost:3000/api/cameras/' + id) // Article affiché par l'id en fonction de la sélection en page index
    .then((res) => res.json()) // Ici nous transmettons les données au format JSON
    .then((data) => {
         // Transmission des informations reçues au fichier HTML de façon dynamique
        document.querySelector('h3').innerHTML = data.name;
        document.querySelector('.image').src = data.imageUrl;
        document.querySelector('.prix').innerHTML = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price/1000));
        let optionsLentilles = data.lenses.length;
        for(let i = 0; i < optionsLentilles; i++){
          document.getElementById('options').innerHTML +=  `<option>${data.lenses[i]}</option>`;
        }
      }	
		);}
   
appareilChoix (id);// Appel de la fonction, pour affichage des données

  // variable panier
let panier;

if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
} else {
    panier = [];
}

function ajoutPanier(e) {
    // On bloque l'action par défaut du navigateur
    e.preventDefault();

    // Création de notre objet
    let commande = {
        id,
        name : document.querySelector('h3').textContent,
        img : document.querySelector('.image').src,
        quantity : Number(document.querySelector('#number').value),
        price : Number(document.querySelector('.prix').textContent),
        options : document.querySelector('#options').value
    }

    // Vérification que la commande possède au moins un article sinon on sort de la fonction
    if (!commande.quantity > 0) {
        alert("vous devez choisir au moins un article pour passer la commande !")
        return;
    }

    // Fonction pour la quantité
    for (let i = 0; i < panier.length; i++) {
        if (commande.options == panier[i].options && commande.id == panier[i].id) {
            commande.quantity += Number(panier[i].quantity);
            panier.splice(i,1);
        }
    }

    // Informations transmises au panier + reset des valeurs
    panier.push(commande);
    form.reset();
    coutTotal.innerHTML = 0;
    
    // Placement du panier dans le localStorage
    localStorage.setItem('monPanier', JSON.stringify(panier));

}
// Click qui permet de placer le panier dans le localStorage
commandes.addEventListener('click', ajoutPanier);

//Fonctions pour augmenter et baisser la quantité
function increaseValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	document.getElementById('number').value = value;
  }
  
  function decreaseValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value < 1 ? value = 1 : '';
	value--;
	document.getElementById('number').value = value;
  }
  // Fonctions pour afficher le coût total
  function total(quantity) {
    let result = quantity * prix.innerHTML;
    coutTotal.innerHTML = result;
  }
  console.log(total);