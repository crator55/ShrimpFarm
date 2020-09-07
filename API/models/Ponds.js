const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PondsSchema = new Schema({

    name:{
        type: String,
        trim:true
    },
    areaSize:{
        type: Number,
        trim:true
    },
    location:{
        type: String,
        trim:true
    }

});
module.exports = mongoose.model('Ponds',PondsSchema);