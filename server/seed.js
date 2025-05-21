const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { randomChoice, hashPassword } = require('./helper.js');
const Worker = require("./models/Worker.js");
const Manager = require("./models/Manager.js");

dotenv.config();



mongoose.connect(process.env.MONGO_URL);
.then(() => console.log('Connected to MineSafe DB'))
.catch(err => console.error('DB connection error:', err));





const managerNames = [
  'Aman Verma',
  'Neha Reddy',
  'Karan Joshi',
  'Sita Reddy',
  'Mohit Mehra'
];

const workerNames = [
  "Aarav Sharma",
  "Priya Singh",
  "Rahul Mehta",
  "Anjali Patel",
  "Vikram Gupta",
  "Neha Reddy",
  "Rohit Desai",
  "Kavya Iyer",
  "Manish Joshi",
  "Sanya Kapoor",
  "Arjun Nair",
  "Pooja Malhotra",
  "Karan Verma",
  "Sneha Rao",
  "Devansh Chaudhary",
  "Ishita Dubey",
  "Rohan Bhatt",
  "Meera Kulkarni",
  "Aditya Chatterjee",
  "Nisha Saxena",
  "Sahil Thakur",
  "Tanya D’Souza",
  "Amitabh Pandey",
  "Swati Ghosh",
  "Harsh Vyas"
];

const managers = managerNames.map(name =>({
    fullName: name,
    password: hashPassword(name),
    workersList: []
}));


let workers = [];
managerNames.forEach((manager, i)=>{
    for(let j = 1; j <= 5; j++){
        const name = randomChoice(workerNames);
        workers.push({
            fullName: name,
            password: hashPassword(name),
            managerName: manager
        })

        managers[i].workersList.push(name);
    }
})


const seedData = async () =>{
    await Worker.deleteMany({});
    await Manager.deleteMany({});

    await Worker.insertMany(workers);
    await Manager.insertMany(managers);

    console.log("Data seeded and inserted");
    mongoose.disconnect();
}

seedData();