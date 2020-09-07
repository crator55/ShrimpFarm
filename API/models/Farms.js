const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FarmsSchema = new Schema({

    name:{
        type: String,
        trim:true
    },
    location:{
        type: String,
        trim:true
    },
    ponds: [{
        pond: {
            type:Schema.ObjectId,
            ref:'Ponds'
        }
    }]

});
module.exports = mongoose.model('Farms',FarmsSchema);