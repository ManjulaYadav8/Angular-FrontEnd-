const express = require('express');
const { get } = require("request-promise")
const router = express.Router();

var shop = 'manjulacodeswift.myshopify.com';
var accesstoken = '';

router.get('/getCustomers', async (req, res) => {
    let options = {
        // method: 'GET',
        json:true,
        url: "https://" + shop + "/admin/api/2022-04/customers.json",
        headers: {
            'X-Shopify-Access-Token': accesstoken,
            'Content-Type': 'application/json'
        }
    };
    try{
        const result=await get(options);
        console.log(result);
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.json(err);
    }

})

module.exports = router;



