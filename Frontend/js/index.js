
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
		let description = data[i].description;

		let produits =                                   // <- variable où l'on écrit le modèle HTML
		   `<figure>
            	<img src="${imageUrl}" alt="Appareil photo vintage"</img>
            	<figcaption>
                	<h3>${name}</h3>
                	<p  class="description">${description}</p>
					<div class="prix">${prix}</div>
                	<a href="produit.html?id=${id}"><button class="btn">En savoir +</button></a>   
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



