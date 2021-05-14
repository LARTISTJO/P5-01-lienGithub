
//...........................................................

let appareilPhoto;

// API REQUEST
const fetchAppareilPhoto = async() => {
	appareilPhoto = await fetch(
		'http://localhost:3000/api/cameras').then(res => res.json());

        console.log(appareilPhoto);
};

fetchAppareilPhoto ();

