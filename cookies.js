const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2300;

app.use(express.json());
app.use(cookieParser());

app.get('/home',(req, res)=>{
    res.cookie('user','Pramod',{maxAge:1000*30,httpOnly:true});
    res.json({
        message: "Hello Guest"
    });
});

app.get('/products', (req, res) => {
    let cookies = req.cookies;
    console.log("cookies",cookies);
    let user = cookies.user || "Guest";
    res.json({
        message: `Hello ${user}`        
    });
})

app.listen(PORT, () => {
    console.log(`app listening to ${PORT}`);
});