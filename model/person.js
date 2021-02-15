const mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Person', personSchema);