const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    managerName:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Worker", workerSchema);