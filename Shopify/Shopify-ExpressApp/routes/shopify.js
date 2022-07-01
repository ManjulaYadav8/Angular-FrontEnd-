var express = require('express');
var router = express.Router();
var { Shopify, ApiVersion}=require("@shopify/shopify-api")
require("dotenv").config()


const {SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES,HOST}=process.env;

var shops={};
var datas=[];


Shopify.Context.initialize({
API_KEY:SHOPIFY_API_KEY,
API_SECRET_KEY:SHOPIFY_API_SECRET,
SCOPES:SCOPES,
HOST_NAME:HOST,
API_VERSION:ApiVersion.April22
})

router.get('/', (req,res)=>{
   
    console.log(req.query.shop);
    if(typeof  shops[req.query.shop] !== 'undefined'){
        res.send("Welcome to admin panel....!");
       
    }
    else{
       
        res.redirect(`/login?shop=${req.query.shop}`);
       
    }
    
})


router.get('/login', async(req,res)=>{
    const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        '/login/auth',
        
    )
    res.redirect(authRoute);
})


router.get("/login/auth", async(req,res)=>{
    const shopSession= await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
        );
    
    shops[shopSession.shop]=shopSession;
    datas.push(shopSession);
    



    
    // console.log(shops);
    console.log(datas);
    
    res.redirect(`https://${shopSession.shop}/admin/apps/oauth-node-36`);
    // module.exports=data;
    // module.exports=datas;
   

});


// module.exports=datas;
module.exports=router;





//  Session {
//     id: '569eb487-6688-4288-a10f-a13712b6089a',
//     shop: 'manjulacodeswift.myshopify.com',
//     state: '441798701459598',
//     isOnline: true,
//     accessToken: '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',
//     expires: 2022-07-02T05:11:22.825Z,
//     scope: 'write_marketing_events,write_products,write_customers,write_content,write_orders',
//     onlineAccessInfo: {
//       expires_in: 86398,
//       associated_user_scope: 'write_marketing_events,write_products,write_customers,write_content,write_orders',
//       session: '68cbfe1d0bd23d13b2c4aa217691fe8ca388aff40edd4a34e633c9d7a07ea8be',
//       account_number: 0,
//       associated_user: [Object]
//     }
//   }