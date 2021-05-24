// Déclaration des variables
const parsedUrl = new URL(window.location.href);
const id = parsedUrl.searchParams.get("id");


// Notre fonction getData qui récupère et affiche l'article
function appareilPhotoUnique (id) {
    fetch('http://localhost:3000/api/cameras/' + id) // On va chercher grâce à l'id notre article
    .then((res) => res.json()) // Ici on parse le format JSON
    .then((data) => {
    
        let name = data.name; // déclaration des variables depuis l'objet data qui contient toutes les infos nécessaires
        let imageUrl = data.imageUrl;
        let price = data.price / 1000 ;
        let lenses = data.lenses;
        
        document.querySelector('h3').innerHTML = name; // on réinjecte nos données au HTML dynamiquement
        document.querySelector('.image').src = imageUrl;
        document.querySelector('.prix').innerHTML = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(data.price/1000));
        let optionsLentilles = data.lenses.length;
        for(let i = 0; i < optionsLentilles; i++){
          document.getElementById('options').innerHTML +=  `<option>${data.lenses[i]}</option>`;
        }
      }

			
		);}
   
appareilPhotoUnique (id);

  // Initialisation de la variable panier
let panier;
// Si localStorage contient déjà un panier alors 'panier' vaut son contenu, sinon 'panier' est vide
if ("monPanier" in localStorage) {
    panier = JSON.parse(localStorage.getItem('monPanier'));
} else {
    panier = [];
}

function Panier(e) {

    // On bloque l'action par défaut du navigateur
    e.preventDefault();

    // Création de notre objet
    let commande = {
        id,
        name : document.querySelector('h3').textContent,
        img : document.querySelector('.image').src,
        quantity : Number(document.querySelector('#Number').value),
        price : Number(document.querySelector('.prix').textContent),
        varnish : document.querySelector('#options').value
    }

    // Vérification que la commande possède au moins un article sinon on sort de la fonction
    if (!commande.quantity > 0) {
        alert("vous devez choisir au moins un article pour passer la commande !")
        return;
    }

    // Véfication sur les répétitions
    for (let i = 0; i < panier.length; i++) {
        if (commande.options == panier[i].options && commande.id == panier[i].id) {
            commande.quantity += Number(panier[i].quantity);
            panier.splice(i,1);
        }
    }

    // On rentre ça dans le panier + reset des valeurs
    panier.push(commande);
    form.reset();
    displayPrice.innerHTML = 0;
    
    // On place le panier dans le localStorage
    localStorage.setItem('monPanier', JSON.stringify(panier));

}
// l'eventListener déclencheur
commande.addEventListener('click', addPanier);

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