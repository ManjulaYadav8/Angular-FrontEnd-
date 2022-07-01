const express = require('express');
const { get, post } = require('request-promise');
const router = express.Router();



// console.log(token.datas);
var shop = 'manjulacodeswift.myshopify.com'
var accesstoken = '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';


router.get('/getProducts', async function (req, res) {

    let options = {
        method: "GET",
        uri: 'https://' + shop + '/admin/api/2022-04/products.json',
        json: true,
        headers: {
            'X-Shopify-Access-Token': accesstoken,
            'content-type': 'application/json'
        }
    };

    try {
        const result = await get(options);
        console.log(result);
        res.json(result)
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }


});

router.post('/create-product', async function (req, res) {

    //this is what we need to post
    // POST /admin/products.json
    // {
    //   "product": {
    //     "title": "Burton Custom Freestyle 151",
    //     "body_html": "<strong>Good snowboard!</strong>",
    //     "vendor": "Burton",
    //     "product_type": "Snowboard",
    //     "tags": "Barnes & Noble, John's Fav, &quot;Big Air&quot;"
    //   }
    // }

    let data = req.body.product;

    console.log(data);
    let new_product = {
        product: {
            title: data.title,
            body_html: data.body_html,
            vendor: data.vendor,
            product_type: data.product_type,
            tags: data.tags,

        }
    }

    let options = {
        method: 'POST',
        uri: 'https://' + shop + '/admin/api/2022-04/products.json',
        json: true,
        resolveWithFullResponse: true,//added this to view status code
        headers: {
            'X-Shopify-Access-Token': accesstoken,
            'Content-Type': 'application/json'
        },
        body: new_product   //pass new product object - NEW - request-promise problably updated

    };



    try {

        const result = await post(options);
        console.log(result.body);
        res.json(true);
    }
    catch (error) {
        console.log(error);
        res.json(false);
    }




});

router.put("/update-product", async (req,res) => {

    console.log(req.body.id);
    
})



module.exports = router;

