const mongoose = require('mongoose')

const proSchema = new mongoose.Schema({
    title: {type: String, required: true},
    quote: {type: String, required: true},
    description: String,
    imageUrl: String
})

proSchema.set('timestamps', true)
proSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

module.exports = mongoose.model('Pro', proSchema)