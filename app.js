var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require('mercadopago');
const axios = require("axios");

const token = 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398';


mercadopago.configure({
	access_token: token
});

var port = process.env.PORT || 3001

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/views', express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/create_preference', async(req,res)=>{
	
	const arrImage = req.query.img.split('/')
	const urlImage = `https://francomalu-mp-ecommerce-nodejs.herokuapp.com/assets/${arrImage[2]}`
    let preference = {
		items: [
			{
                id: 1234,
				title: req.query.name,
                descripcion: "Dispositivo móvil de Tienda e-commerce",
				unit_price: Number(req.query.price),
				quantity: Number(req.query.quantity),
				picture_url: urlImage
			}
		],
		payer: {
			name: "Lalo",
			surname: "Landa",
			email: "test_user_63274575@testuser.com",
			phone: {
				area_code: "11",
				number: 22223333
			},
			identification: {
				type: "DNI",
				number: "12345678"
			},
			address: {
				street_name: "Falsa",
				street_number: 123,
				zip_code: "1111"
			}
		},
		back_urls: {
			success: "https://francomalu-mp-ecommerce-nodejs.herokuapp.com/feedback",
			failure: "https://francomalu-mp-ecommerce-nodejs.herokuapp.com/feedback",
			pending: "https://francomalu-mp-ecommerce-nodejs.herokuapp.com/feedback"
		},
		notification_url:"https://francomalu-mp-ecommerce-nodejs.herokuapp.com/webhook",
		auto_return: "approved",
		payment_methods: {
			excluded_payment_methods: [
				{
					"id": "amex"
				}
			],
			"excluded_payment_types": [
				{
					"id": "atm"
				}
			],
			installments: 6
		},
		external_reference: "franco.m.2@hotmail.es"
	};
	try {
		const request = await axios.post(`https://api.mercadopago.com/checkout/preferences?access_token=${token}`, preference, {
		  headers: {
			"Content-Type": "application/json",
			"x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
		  }
		});
		res.redirect(request.data.init_point)
	  } catch (e) {
		console.log(e);
	  }
});

app.post("/webhook", (req,res)=>{
	let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });
	console.log(body)
	return res.status(200)
})

app.get("/feedback",(req,res)=>{
	res.render('feedback',req.query)
})

app.listen(port);