const express = require("express");
const app = express();
const port = 8080;

app.listen(8080, ()=>{
    console.log("App running on port 8080");
})

app.get("/",(req, res)=>{
    res.send("Server is working");
})


//nodemon index.js to start running server