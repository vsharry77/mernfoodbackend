require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OuA3cSIKVjKoATHc8y2BCrfkYubz7Y5RLRHUPgVy569ErQHWhmbqtQc3OlTxE3pqtuUHcbAQFq4O2mEiHAb5MM200OJna2zAR");
const PORT = process.env.PORT || 7000

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.dish,
                images:[product.imgdata]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://rad-frangollo-85066d.netlify.app/",
        cancel_url:"https://rad-frangollo-85066d.netlify.app/",
    });

    res.json({id:session.id})
 
})


app.listen(PORT,()=>{
    console.log("server start")
})