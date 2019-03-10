const mongoose = require('mongoose')

const proSchema = new mongoose.Schema({
    title: {type: String, required: true},
    quote: {type: String, required: true},
    type: {type: String, required: true},
    quoteReference: String,
    quoteLink: String,
    description: String,
    imgUrl: String
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