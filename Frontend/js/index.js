
let structure = document.querySelector('.appareils');

//........ Récupération produits Api
function appareilPhoto () {
	fetch('http://localhost:3000/api/cameras')
	.then( (res) => res.json())

	//........Structure html
	.then ((data) => {
	for (let i = 0; i < data.length; i++){
		let name = data[i].name;
		let imageUrl = data[i].imageUrl;
		let prix = data[i].price /1000 + "€";
        let id = data[i]._id;

		let produits =                                   // <- variable où l'on écrit le modèle HTML
		`<figure>
            	<img src="${imageUrl}" alt="Appareil photo vintage"</img>
            	<figcaption class="description">
                	<h3>${name}</h3>
                	<p>Magnifique Appareil, il fera votre bonheur</p>
					<div class="prix">${prix}</div>
                	<a href="produit.html?id=${id}"><button>En savoir +</button></a>   
            	</figcaption> 
			</figure>`

			structure.innerHTML += produits;
	}
})

.catch ((err) => {
	alert (err);
})
}

appareilPhoto ();



