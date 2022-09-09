const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');


const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`;

const auth = {
	username: config.API_KEY,
	password: config.API_SECRET,
};
app.get('/',(req,res)=>{
	console.log("hello api")
})

app.get('/photos', async (req, res) => {
	try {
		const response = await axios.get(BASE_URL + '/resources/image', {
		auth,
		
	});
	return res.send(response.data);
	} catch (error) {
		console.log("error",error)
	}
	
});

app.get('/search', async (req, res) => {
	const response = await axios.get(BASE_URL + '/resources/search', {
		auth,
		params: {
			expression: req.query.expression,
		},
	});

	return res.send(response.data);
});

const PORT = 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
