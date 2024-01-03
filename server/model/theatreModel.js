const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    isActive : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    isBlocked:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("theatres" , theatreSchema);