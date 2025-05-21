const express = require("express");
const {connectDB} = require("./db.js");
const app = express();
const Worker = require('./models/Worker.js');
const Manager = require('./models/Manager');
require('dotenv').config();

app.listen(process.env.PORT, ()=>{
    console.log(`App running on port ${process.env.PORT}`);
})

app.get("/",(req, res)=>{
    res.send("Server is working");
})

connectDB();
//nodemon index.js to start running server



app.get('/check-workers', async (req, res) => {
  try {
    const workers = await Worker.find(); // fetch all workers
    res.json(workers); // return the data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/check-managers', async (req, res) => {
  try {
    const workers = await Manager.find(); // fetch all workers
    res.json(workers); // return the data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


