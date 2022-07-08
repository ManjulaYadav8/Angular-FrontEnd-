const express = require('express');
const { get,post} = require("request-promise")
const router = express.Router();


var shop = 'manjulacodeswift.myshopify.com';
var accesstoken = '';

// router.get('/getOrders', async (req, res) => {
//     let options = {
//         // method: 'GET',
//         json:true,
//         url: "https://" + shop + "/admin/api/2022-04/orders.json",
//         headers: {
//             'X-Shopify-Access-Token': accesstoken,
//             'Content-Type': 'application/json'
//         }
//     };
//     try{
//         const result=await get(options);
//         console.log(result);
//         res.json(result);
//     }
//     catch(err){
//         console.log(err);
//         res.json(err);
//     }

// });

router.post('/create-order', async function (req, res) {

    let new_order = {
        order:{
            line_items:[
                {
                    variant_id: req.body.id,
                    price:req.body.price,
                    quantity:req.body.quantity
                }
            ],
            customer:req.body.customer,
            billing_address:req.body.billing_address,
            shipping_address:req.body.shipping_address

        }
    }
    

    let options = {
        method: 'POST',
        uri: 'https://' + shop + '/admin/api/2022-04/orders.json',
        json: true,
        resolveWithFullResponse: true,//added this to view status code
        headers: {
            'X-Shopify-Access-Token': accesstoken,
            'Content-Type': 'application/json'
        },
        body: new_order   //pass new order object - NEW - request-promise problably updated

    };


    try {

        const result = await post(options);
        console.log(result.body);
        res.json(result.body);
    }
    catch (error) {
        console.log(error);
        res.json(false);
    }




});



















module.exports = router;