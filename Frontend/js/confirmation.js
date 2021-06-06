// Récupération des données au sein  du  localStorage 
let obtenirData = JSON.parse(localStorage.getItem('confirmation'));

//Calcul du prix total du panier 
let coutTotal = 0;

// forEach ajouté pour que totalPrice reçoive la valeur de chaque produit acheté
obtenirData.products.forEach(elt => {
    coutTotal += elt.price;
});

// Affichage du numéro de commande et du coût total des articles sur la page confirmation.html
document.getElementById('orderId').innerHTML = obtenirData.orderId;
document.getElementById('coutTotal').innerHTML = coutTotal/1000;

localStorage.clear();

// Affichage des données reçues en console
console.log(obtenirData);