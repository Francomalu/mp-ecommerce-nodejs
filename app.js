var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require('mercadopago');

mercadopago.configure({
	access_token: "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
	integrator_id:"dev_24c65fb163bf11ea96500242ac130004"
});

var port = process.env.PORT || 3000

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

app.post('/create_preference',(req,res)=>{
    let preference = {
		items: [
			{
                id: 1234,
				title: req.query.name,
                descripcion: "Dispositivo móvil de Tienda e-commerce",
				unit_price: Number(req.query.price),
				quantity: Number(req.query.quantity)
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
			installments: 6
		},
		external_reference: "franco.m.2@hotmail.es"
	};
	
	mercadopago.preferences.create(preference)
        .then((response)=>{
            res.redirect(response.body.init_point)
        });
});

app.post("/webhook", (req,res)=>{
	console.log(req.body)
})

app.get("/feedback",(req,res)=>{
	res.render('feedback',req.query)
})

app.listen(port);