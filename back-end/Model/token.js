const mongoose = require("mongoose");


const tokenSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ""
    }
})