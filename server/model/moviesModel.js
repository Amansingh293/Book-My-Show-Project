const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    duration:{
        type: String,
        required : true
    },
    language:{
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre:{
        type : String,
        required: true
    },
    poster:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("movies" , moviesSchema);