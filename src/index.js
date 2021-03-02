const express= require("express");
const app = express();
const axios = require("axios");

const redirect_uri = "http://localhost/api/v1";

const discord_auth_url= `https://discord.com/api/oauth2/authorize?response_type=code&client_id=816071605386084353&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=${redirect_uri}&prompt=consent`


app.get("/precios",(req,res)=>{
    res.json({
    precios : {auto : "$12.999"}
})
})
app.get("/",(req,res)=>{
    res.redirect(discord_auth_url);
})

app.get("/api/v1",async (req,res)=>{
    res.json({message : "you are now authorized!"});
})
app.listen(process.env.PORT,()=>{
    console.log(`App now listening on port ${process.env.PORT}`);
});
