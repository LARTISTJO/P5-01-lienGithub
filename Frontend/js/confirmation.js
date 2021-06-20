// Récupération des données au sein  du  localStorage 
let obtenirData = JSON.parse(localStorage.getItem('confirmation'));
console.log(obtenirData);
//Calcul du prix total du panier 
let coutTotal = 0;

let confirmation = document.querySelector('#confirmation');
let recap =
` <section id="remerciements">
    <h3 id="h3Confir">Bonjour,</h3>
    <div id="names">
        <span id="firstName"></span>
        <span id="lastName"></span> 
    </div>
    <p> Merci pour votre achat sur notre site !</p>
    <p>Votre commande a été validée son montant est de : <span id="coutTotal"></span>€</p>
    <p>La référence de votre commande est : <div id="orderId".></div></p>
    <p>Vous recevrez un mail de confirmation à l'adresse : <div id="emaill"></div></p> 
    <p> À bientôt sur Orinoco !</p>
  </section>    
`;

confirmation.innerHTML = recap;

// forEach ajouté pour que coutTotal reçoive la valeur de chaque produit acheté
obtenirData.products.forEach(elt => {
    coutTotal += elt.price;
});

// Affichage du numéro de commande, du coût total des articles, et de certaines informations du client
document.getElementById('orderId').innerHTML = obtenirData.orderId;
document.getElementById('coutTotal').innerHTML = coutTotal/1000;
document.getElementById('firstName').innerHTML = obtenirData.contact.firstName;
document.getElementById('lastName').innerHTML = obtenirData.contact.lastName;
document.getElementById('emaill').innerHTML = obtenirData.contact.email;

// Suppression des éléments du localStorage suite à l'affichage des informations client
localStorage.clear();