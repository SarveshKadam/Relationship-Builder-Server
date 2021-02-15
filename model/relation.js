const mongoose = require('mongoose');

let relationSchema = new mongoose.Schema({
    person1:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Person'
    },
    person1Name:{
        type:String
    },
    relation : {
        type : String,
        required: true
    },
    person2:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Person'
    },
    person2Name:{
        type:String
    }
})

module.exports = mongoose.model('Relation', relationSchema);