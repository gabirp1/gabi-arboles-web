const mongoose = require('mongoose')

const Tree = mongoose.model('Tree', {
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    scientificName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description:{
        type: String,
        required: false,
        trim: true
    }

})

module.exports = Tree
