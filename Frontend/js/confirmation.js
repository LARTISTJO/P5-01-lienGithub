// Récupération des données au sein  du  localStorage 
let obtenirData = JSON.parse(localStorage.getItem('confirmation'));

//Calcul du prix total du panier 
let coutTotal = 0;

let confirmation = document.querySelector('#confirmation');
let recap =
` <section id="remerciements">
<h3>Bonjour,</h3>
<p>
    Nous vous remercions pour votre achat !
</p>
<p>
    Ci-dessous se trouve le récapitulatif de votre commande.
</p>
<p> À bientôt sur Orinoco !</p>
</section>
<section id="recapitulatif">
<h3>Récapitulatif de votre commande</h3>
<p>Commande n° : <span id="orderId"></span></p>
<p>Le total de votre commande est : <span id="coutTotal"></span>€</p>
</section>`;

confirmation.innerHTML = recap;

// forEach ajouté pour que totalPrice reçoive la valeur de chaque produit acheté
obtenirData.products.forEach(elt => {
    coutTotal += elt.price;
});

// Affichage du numéro de commande et du coût total des articles sur la page confirmation.html
document.getElementById('orderId').innerHTML = obtenirData.orderId;
document.getElementById('coutTotal').innerHTML = coutTotal/1000;

// Affichage des données reçues en console
console.log(obtenirData);

localStorage.clear();