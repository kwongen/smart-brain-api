  
const handleClarifieFaceDetetion = (req, res) => {
	const {imageUrl} = req.body;

	// Your PAT (Personal Access Token) can be found in the portal under Authentification
	const PAT = '79c2e9a2c2ec4eab8e5b6d95223f0332';
	// Specify the correct user_id/app_id pairings
	// Since you're making inferences outside your app's scope
	const USER_ID = '6zn3arjp344j';
	const APP_ID = 'smart-brain-app';
	// Change these to whatever model and image URL you want to use
	const MODEL_ID = 'face-detection';

	const raw = JSON.stringify({
	    "user_app_id": {"user_id": USER_ID,"app_id": APP_ID},
	    "inputs": [{"data": {"image": {
	    						"url": imageUrl
	                    		// "	base64": IMAGE_BYTES_STRING
	                			}
	            			}
	        		}]
	});

	const requestOptions = {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Authorization': 'Key ' + PAT
	    },
	    body: raw
	};

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(data =>	res.send(data))
      .catch(error => {
      	console.log('error', error)
      	response.status(400).json("Error in face detection")
      });
}

const handleImage = (req,res,db) => {
	const { id } = req.body;

	db('users')
	.where('id','=',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => { 
		if(entries.length) {
			res.json(entries[0]);
		} else {
			res.status(400).json("No such user");
		}
	})
	.catch(err => console.log("error occured"));
}

module.exports = {
	handleImage,
	handleClarifieFaceDetetion
}