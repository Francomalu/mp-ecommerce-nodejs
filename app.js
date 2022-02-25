var express = require('express');
var exphbs  = require('express-handlebars');


var app = express();


const PaymentController = require("./controllers/PaymentController");
const PaymentService = require("./services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
	res.render('home');
});

app.get('/detail', (req, res) => {
	res.render('detail', req.query);
});

app.get("/feedback",(req,res) => {
	res.render('feedback',req.query)
})

app.post('/create_preference', (req,res) => {
	PaymentInstance.getMercadoPagoLink(req, res)
});

app.post("/webhook", (req,res) => PaymentInstance.webhook(req,res));

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/views', express.static(__dirname + '/views'));

app.listen(process.env.PORT || 3000);