

//   const mercadopago = new MercadoPago('TEST-163eda9e-bd36-4357-9710-d49a4c8132a3', {
//     locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
//   });

//   const orderData = {
//     id:1234,
//     titleMP: document.getElementById("title_id").innerHTML,
//     description: "Dispositivo móvil de Tienda e-commerce",
//     quantity: document.getElementById("unit_id").innerHTML,
//     price: document.getElementById("price_id").innerHTML,
//     external_reference:"francomaluendez2016@gmail.com"
//   };


//   fetch("/create_preference",{
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderData),
//     })
//     .then(resp => resp.json())
//     .then(response => {
//       createCheckout(response.id)
//     })


//   createCheckout = (id)=>{
//     mercadopago.checkout({
//     preference: {
//       id: id
//     },
//     render: {
//       container: '.mercadopago-button', 
//       label: 'Pagar la compra',
//     }
//   });
// }