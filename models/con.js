const mongoose = require('mongoose')

const conSchema = new mongoose.Schema({
    title: {type: String, required: true},
    quote: {type: String, required: true},
    // type: {type: String, required: true},
    quoteReference: String,
    quoteLink: String,
    description: String,
    imgUrl: String
})

conSchema.set('timestamps', true)
conSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

module.exports = mongoose.model('Con', conSchema)