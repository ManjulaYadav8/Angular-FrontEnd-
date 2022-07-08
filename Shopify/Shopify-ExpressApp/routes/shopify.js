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





